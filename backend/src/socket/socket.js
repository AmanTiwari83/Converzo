const {saveMessage} = require("../controllers/message.controller");

const getRoomId = (user1, user2) => [user1, user2].sort().join('_');

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🔌 Socket connected.");

    socket.on("joinRoom", ({ sender, receiver }) => {
      const roomId = getRoomId(sender, receiver);
      socket.join(roomId);
    });

    socket.on("privateMessage", async ({ sender, receiver, message , time , date }) => {
      const roomId = getRoomId(sender, receiver);
      const saved = await saveMessage(sender, message, roomId , time  , date);
      io.to(roomId).emit("newPrivateMessage", saved);
    });

    socket.on("typing", ({ sender, receiver }) => {
      const roomId = getRoomId(sender, receiver);
      socket.broadcast.to(roomId).emit("userTyping", sender);
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });
  });
};
