// const express = require('express');
// const router = express.Router();

// // const { registerUser, loginUser } = require('../controllers/authenticationControllers');
// const { getUserProfile } = require('../controllers/employController');
// const leaveController = require('../controllers/leaveController');
// const { getAdminProfile } = require('../controllers/adminControllers');
// const { authenticate,validateAdmin,isAdmin} = require('../middlewares/authentication');
// const {
//   registerUser,
//   loginUser,
//   forgotPassword,
//   verifyOtp,
//   resetPasswordAfterOtp
// } = require('../controllers/authenticationControllers');


// router.get('/profile', authenticate, getUserProfile);  // use authenticate (same as authMiddleware)
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.post('/', authenticate, leaveController.applyLeave);
// router.get('/', authenticate, leaveController.getLeaves);
// router.get('/adminProfile', validateAdmin, getAdminProfile);
// router.post('/forgot-password', forgotPassword); 
// router.post('/verify-otp', verifyOtp);
// router.post('/reset-password', resetPasswordAfterOtp);



// // ADMIN ROUTES
// router.get('/admin/all', authenticate, isAdmin, leaveController.getAllLeaveRequests);
// router.put('/admin/update/:id', authenticate, isAdmin, leaveController.updateLeaveStatus);

// module.exports = router;


const express = require('express');
const router = express.Router();

// const { registerUser, loginUser } = require('../controllers/authenticationControllers');
const { getUserProfile } = require('../controllers/employController');
const jwt = require('jsonwebtoken');
const leaveController = require('../controllers/leaveController');  // <-- Add this line
const { applyLeave, getLeaves } = leaveController;

const { authenticate,validateAdmin,isAdmin} = require('../middlewares/authentication');
const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resetPasswordAfterOtp
} = require('../controllers/authenticationControllers');
const { getAdminProfile } = require('../controllers/adminControllers');


router.get('/profile', authenticate, getUserProfile);
router.get('/adminProfile', validateAdmin, getAdminProfile);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/', authenticate, applyLeave);
router.get('/', authenticate, getLeaves);
router.post('/forgot-password', forgotPassword); 
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPasswordAfterOtp);

// ADMIN ROUTES
router.get('/admin/all', authenticate, isAdmin, leaveController.getAllLeaveRequests);
router.put('/admin/update/:id', authenticate, isAdmin, leaveController.updateLeaveStatus);
router.post('/token',async(req,res)=>{
    const token = jwt.sign({_id:req.body._id,roletype:req.body.roletype,role:req.body.role},process.env.JWT_SECRET)

res.send(token)}
)

module.exports = router;