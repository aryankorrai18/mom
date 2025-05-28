// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// require('dotenv').config();

// const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

// exports.registerUser = async (req, res) => {
//   try {
//     const {
//       firstName,
//       lastName,
//       username,
//       mobilenumber,
//       email,
//       password,
//       dateOfBirth,
//       gender,
//       role,
//       roletype
//     } = req.body;

//     const existingUser = await User.findOne({
//       $or: [{ email }, { username }, { mobilenumber }]
//     });

//     if (existingUser) {
//       if (existingUser.mobilenumber === mobilenumber) {
//         return res.status(400).json({ message: 'User with this mobile number already exists!' });
//       }
//       if (existingUser.email === email) {
//         return res.status(400).json({ message: 'User with this email already exists!' });
//       }
//       if (existingUser.username === username) {
//         return res.status(400).json({ message: 'User with this username already exists!' });
//       }
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       firstName,
//       lastName,
//       username,
//       mobilenumber,
//       email,
//       password: hashedPassword,
//       dateOfBirth,
//       gender,
//       role,
//       roletype
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// exports.loginUser = async (req, res) => {
//   const { identifier, password, roletype, role } = req.body;

//   try {
//     const isEmail = /\S+@\S+\.\S+/.test(identifier);
//     const user = await User.findOne(
//       isEmail ? { email: identifier } : { username: identifier }
//     );

//     if (!user) {
//       return res.status(400).json({ message: 'User not found with that email or username' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(400).json({ message: 'Incorrect password' });
//     }

//     if (user.roletype !== roletype) {
//       return res.status(400).json({ message: `Role type mismatch: expected "${user.roletype}"` });
//     }

//     if (user.role !== role) {
//       return res.status(400).json({ message: `Role mismatch: expected "${user.role}"` });
//     }

//     const token = jwt.sign(
//       {
//         id: user._id,
//         roletype: user.roletype,
//         role: user.role
//       },
//       JWT_SECRET,
//       { expiresIn: '2h' }
//     );

//     let redirectTo;
//     if (roletype === 'Employee') {
//       redirectTo = '/employee-dashboard';
//     } else {
//       switch (role) {
//         case 'Super Admin':
//           redirectTo = '/super-admin-dashboard'; break;
//         case 'Supervisor':
//           redirectTo = '/supervisor-dashboard'; break;
//         case 'Leave Manager':
//           redirectTo = '/leave-manager-dashboard'; break;
//         default:
//           redirectTo = '/admin-dashboard';
//       }
//     }

//     return res.status(200).json({
//       message: 'Login successful',
//       redirectTo,
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         roletype: user.roletype,
//         role: user.role
//       }
//     });

//   } catch (err) {
//     console.error('[loginUser] Error:', err);
//     return res.status(500).json({ message: 'Server error during login' });
//   }
// };



const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

exports.registerUser = async (req, res) => {
  try {
    const {
      firstName, lastName, username, mobilenumber,
      email, password, dateOfBirth, gender, role, roletype
    } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }, { mobilenumber }]
    });

    if (existingUser) {
      if (existingUser.mobilenumber === mobilenumber) {
        return res.status(400).json({ message: 'User with this mobile number already exists!' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'User with this email already exists!' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'User with this username already exists!' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName, lastName, username, mobilenumber, email,
      password: hashedPassword, dateOfBirth, gender, role, roletype
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('[registerUser] Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.loginUser = async (req, res) => {
  const { identifier, password, roletype, role } = req.body;

  try {
    const isEmail = /\S+@\S+\.\S+/.test(identifier);
    const user = await User.findOne(
      isEmail ? { email: identifier } : { username: identifier }
    );

    if (!user) {
      return res.status(400).json({ message: 'User not found with that email or username' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Incorrect password' });

    if (user.roletype !== roletype)
      return res.status(400).json({ message: `Role type mismatch: expected "${user.roletype}"` });

    if (user.role !== role)
      return res.status(400).json({ message: `Role mismatch: expected "${user.role}"` });

    const payload = { id: user._id, roletype: user.roletype, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET_old, { expiresIn: '1h' });

    let redirectTo;
    if (roletype === 'Employee') {
      redirectTo = '/employee-dashboard';
    } else {
      switch (role) {
        case 'Super Admin': redirectTo = '/super-admin-dashboard'; break;
        case 'Supervisor': redirectTo = '/supervisor-dashboard'; break;
        case 'Leave Manager': redirectTo = '/leave-manager-dashboard'; break;
        default: redirectTo = '/admin-dashboard';
      }
    }

    return res.status(200).json({
      message: 'Login successful',
      redirectTo,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roletype: user.roletype,
        role: user.role
      }
    });

  } catch (err) {
    console.error('[loginUser] Error:', err);
    return res.status(500).json({ message: 'Server error during login' });
  }
};


// exports.loginUser = async (req, res) => {
//   const { identifier, password, roletype, role } = req.body;

//   try {
//     const isEmail = /\S+@\S+\.\S+/.test(identifier);
//     const user = await User.findOne(
//       isEmail ? { email: identifier } : { username: identifier }
//     );

//     if (!user) {
//       return res.status(400).json({ message: 'User not found with that email or username' });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: 'Incorrect password' });

//     if (user.roletype !== roletype) {
//       return res.status(400).json({ message:`Role type mismatch: expected "${user.roletype}" `});
//     }

//     if (user.role !== role) {
//       return res.status(400).json({ message: `Role mismatch: expected "${user.role}" `});
//     }

//     const token = jwt.sign(
//       { _id: user._id, roletype: user.roletype, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     let redirectTo;
//     if (roletype === 'Employee') {
//       redirectTo = '/employee-dashboard';
//     } else {
//       switch (role) {
//         case 'Super Admin': redirectTo = '/super-admin-dashboard'; break;
//         case 'Supervisor': redirectTo = '/supervisor-dashboard'; break;
//         case 'Leave Manager': redirectTo = '/leave-manager-dashboard'; break;
//         default: redirectTo = '/admin-dashboard';
//       }
//     }

//     return res.status(200).json({
//       message: 'Login successful',
//       token,
//       redirectTo,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//         roletype: user.roletype,
//         role: user.role
//       }
//     });

//   } catch (err) {
//     console.error('[loginUser] Error:', err);
//     return res.status(500).json({ message: 'Server error during login' });
//   }
// };

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: 'No user found with that email.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Support Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <p>Hello ${user.firstName || 'User'},</p>
        <p>Your OTP code is: <b>${otp}</b></p>
        <p>This code is valid for 10 minutes.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to your email' });

  } catch (err) {
    console.error('[forgotPassword] Error:', err);
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });

  } catch (err) {
    console.error('[verifyOtp] Error:', err);
    res.status(500).json({ message: 'OTP verification failed' });
  }
};

exports.resetPasswordAfterOtp = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });

  } catch (err) {
    console.error('[resetPasswordAfterOtp] Error:', err);
    res.status(500).json({ message: 'Password reset failed' });
  }
};
