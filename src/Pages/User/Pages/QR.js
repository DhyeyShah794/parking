import { doc, getDoc, updateDoc } from "firebase/firestore";
import QrScanner from 'qr-scanner';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';
import Bottombar from '../../../Components/Navbar/Bottombar';
import Navbar from '../../../Components/Navbar/Navbar';
import { auth, db } from '../../../Firebase.js';


QrScanner.WORKER_PATH = './worker.js';

const ReadQR = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [cameraErrorMessage, setCameraErrorMessage] = useState('');
  const [scanning, setScanning] = useState(false); 
  useEffect(() => {
    const handleCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setCameraPermissionGranted(true);
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraPermissionGranted(false);
        setCameraErrorMessage('Error accessing camera.');
      }
    };

    handleCameraPermission();
  }, []);

  useEffect(() => {
    if (data) {
      window.location.href = data;
    
    }
  }, [data, navigate]);

  const handleCameraScan = async () => {
    if (!cameraPermissionGranted) {
      alert('Please grant camera permission before scanning.');
      return;
    }

    if (scanning) {
      return;
    }

    try {
      let constraints = { video: { facingMode: 'environment' } };
      const devices = await navigator.mediaDevices.enumerateDevices();
      const rearCamera = devices.find(device => device.kind === 'videoinput' && device.label.toLowerCase().includes('back'));
      
      if (!rearCamera) {
      
        constraints = { video: { facingMode: 'user' } };
      }

      setScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.setAttribute('playsinline', 'true'); 
      videoElement.setAttribute('id', 'qrScanner'); 
      document.body.appendChild(videoElement);
      const scanner = new QrScanner(videoElement, (result) => {
        if (result) {
          setData(result);
          const user = auth.currentUser;
          const uid = user.uid;
          const docRef = doc(db, "users", uid);
          getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
              if (docSnap.data().entryTime) {
                updateDoc(docRef, {
                  exitTime: new Date().toLocaleString()
                });
              }
              else {
                updateDoc(docRef, {
                  entryTime: new Date().toLocaleString()
                });
              }
            } else {
              console.log("No such document!");
            }
          });

          scanner.stop();
          videoElement.remove();
          setScanning(false); 
        }
      });
      scanner.start();
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraErrorMessage('Error accessing camera.');
      setScanning(false); 
    }
  };

  const value = "QR";

  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="container">
        <h2 className="text-center mb-4">Scan QR Code</h2>
        <div className="card border-0">
          <div className="card-body d-flex flex-column align-items-center justify-content-center">
            {cameraErrorMessage && <p className="error-message">{cameraErrorMessage}</p>}
            <button
              type="button"
              className="btn btn-primary mx-2 scan-button"
              onClick={handleCameraScan}
              disabled={!cameraPermissionGranted || scanning} // Disable button while scanning
            >
              {scanning ? 'Scanning...' : 'Scan QR Code'}
            </button>
          </div>
        </div>
        <div className="bottombar">
          <Bottombar value={value}/>
        </div>
      </div>
    </>
  );
};

export default ReadQR;







// import React, { useState, useEffect } from 'react';
// import Navbar from '../../../Components/Navbar/Navbar';
// import Bottombar from '../../../Components/Navbar/Bottombar';
// import QrScanner from 'react-qr-scanner';
// import '../../../App.css';

// function QR() {
//   const [qrResult, setQrResult] = useState(null);
//   const [permissionGranted, setPermissionGranted] = useState(false);
//   const [cameraErrorMessage, setCameraErrorMessage] = useState('');

//   const requestCameraPermission = async () => {
//     try {
//       const devices = await navigator.mediaDevices.enumerateDevices();
//       const rearCamera = devices.find(device => device.kind === 'videoinput' && device.label.includes('back'));
      
//       if (rearCamera) {
//         await navigator.mediaDevices.getUserMedia({ video: { deviceId: rearCamera.deviceId } });
//         setPermissionGranted(true);
//       } else {
//         setCameraErrorMessage('Rear camera not found.');
//       }
//     } catch (error) {
//       setCameraErrorMessage('Error accessing camera.');
//     }
//   };

//   useEffect(() => {
//     requestCameraPermission();
//   }, []);

//   const handleScan = data => {
//     if (data) {
//       setQrResult(data);
//       if (isValidURL(data.text)) {
//         window.open(data.text, '_blank');
//       }
//       setPermissionGranted(false);
//     }
//   };

//   const isValidURL = (url) => {
//     try {
//       new URL(url);
//       return true;
//     } catch (error) {
//       return false;
//     }
//   };

//   const handleError = err => {
//     console.error(err);
//   };

//   const handleRequestPermissionAgain = () => {
//     setPermissionGranted(false);
//     setCameraErrorMessage('');
//     requestCameraPermission();
//   };

//   const value = "QR";

//   return (
//     <div>
//       <div className="navbar">
//         <Navbar />
//       </div>
//       <div style={{ textAlign: 'center', position: 'relative', height: '100vh' }}>
//         <h1>QR test</h1>
//         {permissionGranted && (
//           <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '300px' }}>
//             <div className="scanner-animation">
//               <QrScanner
//                 onScan={handleScan}
//                 onError={handleError}
//                 style={{ width: '100%' }}
//                 constraints={{facingMode: 'environment'}}
//               />
//             </div>
//           </div>
//         )}
//         {qrResult && <p>Scanned QR Code Content: {qrResult.text}</p>}
//         {cameraErrorMessage && <p>{cameraErrorMessage}</p>}
//         {!permissionGranted && !qrResult && (
//           <button onClick={handleRequestPermissionAgain} className="camera-permission-button">
//             Request Camera Permission
//           </button>
//         )}
//       </div>
//       <div className="bottombar">
//         <Bottombar value={value}/>
//       </div>
//     </div>
//   )
// }

// export default QR;
