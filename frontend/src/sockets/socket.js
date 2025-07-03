// socket.js (optional shared instance file)
import { io } from "socket.io-client";

const socket = io("http://192.168.1.40:3000"); // your backend URL
export default socket;
