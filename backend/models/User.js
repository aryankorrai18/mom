const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName:{
  type: String,
  required: true
  },
  lastName:{ 
  type: String,
  required: true
  },
  username:{
  type: String,
  required: true,
  unique: true
  },
  mobilenumber:{
  type: String,
  required: true
  },
  email:{
  type: String,
  required:true, 
  unique: true
  },
  password:{ 
  type: String,
  required: true 
  },
  dateOfBirth:{
  type: String,
  required: true
  },
  gender:{ 
  type: String,
  required: true
  },
  role: {
  type: String,
  required: true
  },
  roletype: {
  type: String, 
  required: true 
  },
  startingDate:{
  type: String, 
  default: 'N/A'
  },
  endingDate: { 
  type: String, 
  default: 'N/A'
  },
  healthComplaints: {
  type: String,
  default: 'None' 
  },
  bloodGroup:{ 
  type: String, 
  default: 'Unknown'
  },
  otp: String,
  otpExpires: Date
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
