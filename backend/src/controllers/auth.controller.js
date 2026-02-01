const asyncHandler = require('express-async-handler');
const User = require('../model/usermodel');

const registerUser = asyncHandler(async (req, res) => {
     const { name, email, password, role } = req.body;
     // console.log(req.body);

     if (!name || !email || !password) {
          res.status(400).json({ message: "Please fill all fields" });
     }

     const userExists = await User.findOne({ email });
     if (userExists) {
          res.status(400).json({ message: "User already exists" });
     }

     const user = await User.create({
          name,
          email,
          password, // Stored as plain text
          role: role || 'student'
     });

     if (user) {
          res.status(201).json({
               _id: user._id,
               name: user.name,
               email: user.email,
               role: user.role,
               token: user.generateAuthToken()
          });
     } else {
          res.status(400).json({ message: "Invalid User Data" });
     }
});


const loginUser = asyncHandler(async (req, res) => {
     const { email, password } = req.body;

     const user = await User.findOne({ email });

     // Compare plain text password directly
     if (user && user.password === password) {
          res.json({
               _id: user._id,
               name: user.name,
               email: user.email,
               role: user.role,
               token: user.generateAuthToken()
          });
     } else {
          res.status(400).json({ message: "Invalid Email or password" });
     }
});


const getUserProfile = asyncHandler(async (req, res) => {
     const user = await User.findById(req.user._id).select('-password');
     if(!user){
              res.status(400).json({message:"User not found."});
     }
     res.json(user);
});

module.exports = { registerUser, loginUser, getUserProfile };