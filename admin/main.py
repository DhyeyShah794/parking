from app import app
from flask import render_template, request, redirect, url_for, send_file, flash
from authenticate import authenticate_user
from config import authenticator, db, session, auth

import pyqrcode
import openpyxl
#pip install openpyxl

import pandas
import os
from io import BytesIO

@app.route('/admin')
@authenticate_user
def home():
    return render_template('home.html')

#root_url/parking-layout/org-id
@app.route('/qr-code')
def generate_qr_code():
    link=request.root_url+'parking-layout/'+session['localId']
    file_name=session['org_name']+'.png'
    qr = pyqrcode.create(link)
    qr_png = BytesIO()
    qr.png(qr_png, scale=10)
    qr_png.seek(0)
    
    flash("QR code downloaded successfully")
    return send_file(
        qr_png,
        as_attachment=True,
        download_name=file_name,
    )

@app.route('/add-employees', methods=['GET','POST'])
@authenticate_user
def add_employees():
    if request.method == 'POST':
        col1=request.form['col1']
        col2=request.form['col2']
        if 'excel_file' not in request.files:
            return 'No file part'
        
        excel_file = request.files['excel_file']
        if excel_file.filename == '':
            return 'No selected file'
        excel_file.save(excel_file.filename)
        print(excel_file.filename)
        df=pandas.read_excel(excel_file.filename)
        d={}
        for i in range(len(df)):
            d[str(df.iloc[i][col1])]=str(df.iloc[i][col2])
            
        ref=db.collection('employees').document(session['localId'])
        ref.set(d)
        os.remove(excel_file.filename)
        flash("Employees added successfully")
        return redirect(url_for('view_employees'))
    
    return render_template('add-employees.html', org_name=session['org_name'])

@app.route('/add-employee', methods=['GET','POST'])
@authenticate_user
def add_employee():
    if request.method == 'POST':
        ref=db.collection('employees').document(session['localId'])
        doc=ref.get()
        data[request.form['name']]=request.form['email']
        if doc.exists:
            data=doc.to_dict()
            ref.set(data)
        else:
            ref.set(data)
        return redirect(url_for('view_employees'))
    return render_template('add-employees.html', msg='Add Employee', org_name=session['org_name'])

@app.route('/view-employees', methods=['GET','POST'])
@authenticate_user
def view_employees():
    ref=db.collection('employees').document(session['localId'])
    doc=ref.get()
    if doc.exists:
        data=doc.to_dict()
        return render_template('view-employees.html', data=data, l=len(data))
    return 'No data available'

#fetch all the data of a particular employee from users
#takes the key as it is, eg:name. Will have to modify at the user's end only while saving data
@app.route('/view-employee/<k>', methods=['GET','POST'])
@authenticate_user
def view_employee(k):
    ref=db.collection('users').document(k)
    doc=ref.get()
    if doc.exists:
        data=doc.to_dict()
        print(data)
        return render_template('view-employee.html', data=data)
    return 'No data available'

@app.route('/remove-employee/<k>', methods=['GET','POST'])
@authenticate_user
def delete_employee(k):
    ref=db.collection('employees').document(session['localId'])
    doc=ref.get()
    data=doc.to_dict()
    data.pop(k)
    ref.set(data)
    flash('Employee deleted successfully')
    return redirect(url_for('view_employees'))

if __name__ == '__main__':
    app.run(debug=True)