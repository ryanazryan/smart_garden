# Smart Garden

**Smart Garden** is a website integrated with Internet of Things (IoT) technology to help users monitor and manage their garden more efficiently. The system uses sensors to detect the water flow level through sound and light, sending data via SMS for real-time updates. This platform is designed to assist gardeners in maintaining optimal conditions for their plants and ensuring water management.

## Web UI Previews
<div align="center" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
  <img src="https://github.com/ryanazryan/smart_garden/blob/main/public/build/src/images/Smart%20Garden%20Light%20UI%20Web.png?raw=true" alt="Dashboard Light Web UI" style="width:100%; height: auto; object-fit: cover;">
  <img src="https://github.com/ryanazryan/smart_garden/blob/main/public/build/src/images/Smart%20Garden%20Water%20Supply%20Web%20UI%20Light.png?raw=true" alt="Dashboard Light Web UI Supply Water" style="width: 100%; height: auto; object-fit: cover;">
  <img src="https://github.com/ryanazryan/smart_garden/blob/main/public/build/src/images/Smart%20Garden%20Dark%20UI%20Web.png?raw=true" alt="Dashboard Dark Web UI" style="width: 100%; height: auto; object-fit: cover;">
  <img src="https://github.com/ryanazryan/smart_garden/blob/main/public/build/src/images/Smart%20Garden%20Water%20Supply%20Dark%20Web%20UI.png?raw=true" alt="Dashboard Dark Web UI Supply Water" style="width: 100%; height: auto; object-fit: cover;">
</div>

## Mobile UI Previews
<div align="center" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
  <img src="https://github.com/ryanazryan/smart_garden/blob/main/public/build/src/images/Smart%20Garden%20Light%20Mode%20UI.png?raw=true" alt="Dashboard Light Mobile UI" style="width: 500px; height: 800px; object-fit: cover;">
  <img src="https://github.com/ryanazryan/smart_garden/blob/main/public/build/src/images/Smart%20Garden%20Dark%20Mode%20UI.png?raw=true" alt="Dashboard Dark Mobile UI" style="width: 500px; height: 800px; object-fit: cover;">
  <img src="https://github.com/ryanazryan/smart_garden/blob/main/public/build/src/images/Smart%20Garden%20Water%20Supply%20Mobile%20UI.png?raw=true" alt="Dashboard Light Mobile UI Supply Water" style="width: 500px; height: 800px; object-fit: cover;">
  <img src="https://github.com/ryanazryan/smart_garden/blob/main/public/build/src/images/Smart%20Garden%20Water%20Supply%20UI%20Mobile.png?raw=true" alt="Dashboard Dark Mobile UI Supply Water" style="width: 500px; height: 800px; object-fit: cover;">
</div>

## Features
- **IoT Integration**: Monitors water flow levels and moisture through sound and light sensors.
- **SMS Notifications**: Sends real-time data alerts via SMS.
- **User-friendly Interface**: Provides a responsive and interactive website for managing garden conditions.
- **Admin Dashboard**: Allows administrators to monitor IoT sensor data and manage garden settings.
- **Real-time Data Monitoring**: Displays sensor data in real-time on the website.
  
## Technologies Used
- **Backend**: Laravel (PHP Framework)
- **Frontend**: HTML, CSS (Tailwind CSS), JavaScript
- **Database**: MySQL
- **IoT Devices**:
  - **NodeMCU (ESP8266)**: Used to collect and transmit sensor data.
  - **Moisture Sensor**: Detects the moisture levels of the soil.
  - **Sound and Light Sensors**: Measure the water flow level based on sound and light variations.
  
## Installation
1. Clone the repository:
   ```bash
   
   git clone https://github.com/<your-username>/smart-garden.git
