const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  roomId: { type: String, required: true },
  date: { type: String}, 
  time : { type : String,}
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
