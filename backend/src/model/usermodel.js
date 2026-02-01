const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     role: { type: String, enum: ['student', 'company', 'admin'], default: 'student' },
     status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Admin approval status
     
     // Student Specific Fields
     collegeId: { type: String },
     branch: { type: String },
     graduationYear: { type: Number },
     cgpa: { type: Number },
     skills: { type: [String], default: [] },
     resume: { type: String }, // URL or path
     profileCompleted: { type: Boolean, default: false },

     // Company Specific Fields
     companyDetails: {
          registrationNumber: String,
          industryType: String,
          companySize: String,
          websiteUrl: String,
          description: String,
          contactPerson: String
     }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function () {
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

const User = mongoose.model('User', userSchema);
module.exports = User;
