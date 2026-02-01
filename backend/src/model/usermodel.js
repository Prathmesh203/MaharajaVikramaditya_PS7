const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const user = mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     role: { type: String, enum: ['student', 'company', 'admin'], default: 'student' },
}, { timestamps: true });

user.methods.generateAuthToken = function () {
try {
    return jwt.sign(
    { _id: this._id, role: this.role },
    "Prathmesh@123",
    { expiresIn: '7d' }
  );
} catch (error) {
  return "failed to generate jwt"
}
};
const User =  mongoose.model('User', user);
module.exports = User;
