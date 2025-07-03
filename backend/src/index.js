require('dotenv').config();
const express = require('express');
const dbConfig = require('./dbConfig/dbConfig');
const cors = require('cors');
const { Server } = require("socket.io");
const http = require('http');
const path = require("path")

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://192.168.1.40:5173", // IP of your PC
    methods: ["GET", "POST"]
  }
});

// 🔌 Use socket handler
const socketHandler = require('./socket/socket');
socketHandler(io);

// Routers
const userRouter = require('./routers/user.router');
app.use('/api/users', userRouter);

const messageRouter = require('./routers/message.router');
app.use('/api/messages', messageRouter);

// DB connection
dbConfig();

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0' , () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
