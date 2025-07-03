const express = require('express');
const { saveMessage, getMessagesByRoom, deleteAllMessage } = require('../controllers/message.controller');

const router = express.Router();

// Route to save a new message
router.post('/save', saveMessage);
// Route to get messages by room ID
router.get('/:roomId', getMessagesByRoom);

router.delete('/clear' , deleteAllMessage)

// Export the router
module.exports = router;    