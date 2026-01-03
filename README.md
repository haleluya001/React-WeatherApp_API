# 🌦️ React Weather App (Full-Stack)

A professional full-stack weather application built with **React**, **Node.js**, **Express**, and **Vite**.  
The app uses a secure custom backend to interface with **WeatherAPI.com**, delivering real-time weather data and accurate forecasts with precise local time formatting.

---

## 🚀 Features

- **Full-Stack Architecture**  
  Decoupled frontend and backend for improved security, scalability, and maintainability.

- **Real-Time Location Search**  
  Instantly fetch weather data for millions of locations worldwide.

- **Accurate Local Time Formatting**  
  Powered by `date-fns` for reliable timezone-aware date and time handling.

- **Essential Weather Metrics**  
  Displays temperature, UV index, humidity, wind speed, and wind gusts.

- **7-Day Forecast**  
  Detailed daily forecast with high and low temperature breakdowns.

- **Vite-Powered Development**  
  Fast development server and optimized production builds.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **date-fns** (Date & time manipulation)
- **Custom CSS3** 

### Backend
- **Node.js**
- **Express.js**
- **WeatherAPI.com** integration

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** v14 or higher  
- **npm** (comes with Node.js)

---

### 1️⃣ Backend Setup (Server)

Navigate to the server directory and install dependencies:

```bash```
```cd server```
```npm install ```
Start the backend server:
```node index.js```

---
### 2️⃣ Frontend Setup (Client)

Open a new terminal and navigate to the frontend directory:

```cd frontend```
```npm install```
```npm install date-fns```


Start the development server:

```npm run dev```


The frontend will be available at:
http://localhost:5173

---

### 📂 Project Structure
```text
.
├── server/
│   ├── index.js          # Express server & API routes
│   └── .env              # Environment variables (API key, port)
│
└── frontend/
    ├── src/
    │   ├── components/   # Reusable UI components
    │   ├── App.jsx       # Main application logic
    │   └── App.css       # Custom styling
    ├── package.json      # Frontend dependencies
    └── vite.config.js    # Vite configuration
```
---

### 👨‍💻 Author

Developed with ❤️ by Haleluya Tigabe
