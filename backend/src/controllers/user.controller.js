const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { name, email, password, dob, mobile } = req.body;

    const profile = req.file;
    if(!name && !email && !password && !dob && !mobile){
        return res.status(400).json({message:"All Fields are Required"})
    }
    if (!profile) {
        return res.status(400).json({ message: "Profile image is required" });
    }
    try {
        // Check if user already exists
        const existingUser = await User.find({ email });
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword, dob, mobile, profilePicture: profile.filename });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
        return res.status(200).json({ message: "You are Login Successfully", token, user: { id: user._id, name: user.name, mobile: user.mobile, email: user.email, dob: user.dob, profilePicture: user.profilePicture } });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            return res.status(404).json({ message: 'No users found' });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserProfile = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({ _id: userId },);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ user, message: 'User profile fetched successfully' });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserProfile
}

