# 💬 Converzo - Real-time Chat Application

Converzo is a real-time, full-stack chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.IO. It offers private messaging, instant communication, and a smooth, WhatsApp-inspired user experience.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based)
- 👥 **Real-time Messaging** using Socket.IO
- 🧑‍🤝‍🧑 **Private Chat Rooms**
- 🕒 **Human-readable Timestamps** ("Today", "Yesterday")
- 📱 **Responsive Design** for mobile & desktop
- 🧾 **Persistent Chat History** stored in MongoDB
- 🟢 **Online Status Indicators**

---

## 🛠️ Tech Stack

| Layer         | Technology                          |
|---------------|--------------------------------------|
| **Frontend**  | React.js, Axios, Socket.IO-Client    |
| **Backend**   | Node.js, Express.js, Socket.IO       |
| **Database**  | MongoDB + Mongoose ORM               |
| **Auth**      | JSON Web Tokens (JWT)                |
| **Realtime**  | WebSockets via Socket.IO             |

---

## 📦 Installation & Setup

### ✅ Prerequisites

- Node.js & npm
- MongoDB (local or cloud like Atlas)
- Git

---

### 📁 Project Structure

Converzo/
├── backend/ # Express.js + Socket.IO API
│ ├── controllers/ # API controllers
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ ├── utils/ # Helper functions
│ ├── socket/ # Socket.IO logic
│ ├── .env.example # Sample env config
│ └── server.js # Entry point
│
├── frontend/ # React client
│ ├── components/ # Reusable components
│ ├── pages/ # Page views
│ ├── utils/ # Helper logic
│ ├── App.js # Main App component
│ └── index.js # React root entry
│
└── README.md # You're here :)

---

### 🔧 Backend Setup

1. Open terminal and go to the backend folder:
   ```bash
   cd backend
   npm install
  
    
   Fill in your .env file with:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

   npm run dev

### 🔧 Frontend Setup
 ```bash
   cd frontend
   npm install
   npm run dev
   ```


🌐 Demo
🚧 Live demo coming soon...
Or test it locally by opening the frontend on multiple tabs/devices connected to the same Wi-Fi.

🙌 Contributing
Contributions are welcome!
Open an issue or fork and submit a pull request with improvements.

📄 License
This project is licensed under the MIT License.

👤 Author
Aman Tiwari
🔗<a href="https://github.com/AmanTiwari83/Converzo">Github</a>

Thank You😊
