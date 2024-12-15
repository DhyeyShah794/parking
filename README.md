<h2>Woosh: The Smart Car Parking System</h2>

<h3>Achievement</h3>
Secured a spot in the <strong>top 8 finalists</strong> out of 450+ teams across India in Mastek Deep Blue Season 9 Hackathon. Woosh was the only solution selected for the finals under the problem statement of 'Finding a Car Parking System.'.

<h3>Problem Statement: </h3>
The exponential growth of urbanization in India has led to a significant increase in the number of vehicles on the roads. Because of the limited infrastructure development in our country, the current state of parking facilities in India is inadequate.

<strong>Issues</strong>faced:
<ul>
  <li><strong>Difficulty in Locating Parking: </strong>When visiting a new area, users often struggle to find a secure parking space for their vehicle.</li>
  <li><strong>Inefficient Spot Search: </strong>Within a parking lot, users must navigate the entire area to locate a vacant spot, as no guidance is provided.</li>
  <li><strong>Fuel Waste and Environmental Impact: </strong>The prolonged search for parking not only wastes time but also leads to unnecessary fuel consumption, contributing to a higher carbon footprint.</li>
  <li><strong>Lack of prior information: </strong>Users receive no prior details about available parking spots or fees, leading to frustration and dissatisfaction upon arrival.</li>
</ul>

<h3>Proposed Solution: </h3>
<ul>
  <li>The admin registers the organization and generates a unique QR code, which is placed at the entry and exit points of the parking area.</li>
  <li>The QR code records the user's entry and exit times and directs them to the corresponding parking layout editor.</li>
  <li>Hardware used are <strong>Node MCU ESP 8266, Node MCU ESP 8266, 2000mAh Battery</strong> and a surface mount cover.</li>
  <li>Magnetometers, installed at the center of each parking spot, detect changes in magnetic fields when a vehicle is parked, marking the spot as occupied. This data is used to provide real-time information on parking availability.</li>
  <li>The admin creates the parking layout using the layout editor and assigns each magnetometer to its corresponding parking spot.</li>
  <li>Users sign up or log in, scan the QR code at the entrance, navigate the parking lot, and park their vehicle. Before exiting, they scan the QR code again and pay the calculated amount.</li>
</ul>
The system can work for both, open and closed parking spaces.

<h3>Block Diagram</h3>
![image](https://github.com/user-attachments/assets/476c5c81-ea43-43a6-ab01-ff7faa7e92d8)

<h3>Tech Stack</h3>
<ul>
  <p><strong>Admin: </strong>Python and Flask</p>
  <p><strong>User: </strong>React JS</p>
  <p><strong>Layout Editor: </strong>Godot</p>
  <p><strong>Hardware Integration: </strong>Embedded C/C++</p>
  <p><strong>Real-time database: </strong>Firebase</p>
</ul>

<h3>Features</h3>
<h4>Admin:</h4>
<ul>
  <li><strong>Parking Layout Design: </strong> Develop a tailored parking layout specific to the organization's needs.</li>
  <li><strong>User Parking Status: </strong>Monitor and track which users have parked their vehicles within the organization.</li>
  <li><strong>Security Alerts: </strong>Receive alerts on the entry of a non-employee, hence distinguishing between employees and non-employees of an organization.Receive notifications upon the entry of non-employees, effectively distinguishing between employees and visitors.</li>
  <li><strong>Parking History Logs: </strong>Access a detailed record of all users who have utilized the parking lot on a daily basis.</li>
  <li><strong>Advanced Search: </strong> Conduct searches to retrieve a list of users based on a specific day, month, or year.</li>
  <li><strong>Monthly Analysis: </strong>Generate a pie chart to visually analyze the types of users utilizing the parking lot each month.</li>
</ul>

<h4>Users:</h4>
<ul>
  <li><strong>Auto-registration: </strong>Automatically register users as employees of the organization without requiring manual entry of the employee ID.</li>
  <li><strong>Notifications: </strong>Receive notifications about nearby parking areas.</li>
  <li><strong>Real-time availability: </strong>Obtain real-time information on available parking spots and associated fees before arrival.</li>
  <li><strong>Shortest Route Navigation: </strong>Get directions for the shortest route from the entry point to any available parking spot.</li>
  <li><strong>Spot Reservation: </strong>Enable users to reserve parking spots in advance for a specified duration.</li>
  <li><strong>Invoice Generation: </strong>Automatically calculate the payment amount based on the user's entry and exit times, considering any parking fees charged by the organization.</li>
  <li><strong>Vist History: </strong>Access a complete history of all organizations visited, including details of parking fees charged.</li>
</ul>

<h3>Unique Selling Point</h3>
<ul>
  <li><strong>Convenience and Ease of Use: </strong>Simplifies the parking experience with user-friendly features.</li>
  <li><strong>Layout Editor: </strong>Allows for customized parking layout design tailored to specific needs.</li>
  <li><strong>Efficient Parking: </strong>Optimizes parking space usage, reducing time spent searching for spots.</li>
  <li><strong>Improved Traffic Flow: </strong>By directing drivers to available parking spots efficiently, Woosh can reduce traffic congestion in parking facilities.</li>
  <li><strong>Real-time Availability: </strong>Provides up-to-date information on available parking spaces.</li>
  <li><strong>Environmental Sustainability: </strong>Minimizes fuel consumption and carbon footprint through efficient parking management.</li>
  <li><strong>Scalable and Flexible: </strong>Adapts to various parking lot sizes and organizational requirements.</li>
  <li><strong>Cost-effectiveness: </strong>While the initial investment in smart parking infrastructure may be higher than traditional parking systems, the long-term benefits, including reduced operational costs, increased revenue opportunities, and improved customer satisfaction, often justify the investment.</li>
</ul>

<h3>Demonstration Video</h3>

[![Woosh-The-Smart-Car-Parking-System](https://img.youtube.com/vi/WcQHFXUZhZg/0.jpg)](https://www.youtube.com/watch?v=WcQHFXUZhZg)
