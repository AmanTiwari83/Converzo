const express = require('express');
const { registerUser, loginUser, getUsers, getUserProfile } = require('../controllers/user.controller');
const upload = require("../middlewares/multer")
const router = express.Router();
// Register route
router.post('/register',upload.single('profile') , registerUser);
// Login route
router.post('/login', loginUser);
// Get all users route
router.get("/", getUsers); 
// Get user profile route
router.get("/profile/:id", getUserProfile);

// Export the router
module.exports = router;