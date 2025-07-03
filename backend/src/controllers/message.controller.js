const Message = require('../models/message.model');

// Save a new message
const saveMessage = async (sender, message, roomId , time , date) => {
  try {
    const newMessage = new Message({ sender, message, roomId ,  time , date  });
    return await newMessage.save(); // return saved message (to emit back)
  } catch (err) {
    console.error("Error saving message:", err.message);
  }
};

// Get all messages from a room
const getMessagesByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
};


const deleteAllMessage  = async (req , res) => {
  try{
    console.log(req.body)
    const {roomId} = req.body
    console.log(roomId)
    const message = await Message.deleteMany({roomId})
    res.status(200).json({message : "All messages are Cleared."})
  }catch (err){
    res.status(500).json({ error: "Error in deleting messages" });
  }
}
module.exports = {
  saveMessage,
  getMessagesByRoom,
  deleteAllMessage
};
