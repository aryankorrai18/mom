// const Leave = require('../models/Leave');

// exports.applyLeave = async (req, res) => {
//   try {
//     const { from, to, type, reason } = req.body;

//     const newLeave = new Leave({
//       name: req.user.name,
//       from,
//       to,
//       type,
//       reason,
//       userId: req.user.id,
//     });

//     const savedLeave = await newLeave.save();
//     res.status(201).json(savedLeave);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getLeaves = async (req, res) => {
//   try {
//     const status = req.query.status;
//     const query = { userId: req.user.id };

//     if (status && status !== 'all') {
//       query.status = new RegExp(`^${status}$`, 'i');
//     }

//     const leaves = await Leave.find(query).sort({ appliedDate: -1 });
//     res.json(leaves);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all leave requests (admin view)
// exports.getAllLeaveRequests = async (req, res) => {
//   try {
//     const status = req.query.status;
//     const query = {};

//     if (status && status !== 'all') {
//       query.status = new RegExp(`^${status}$`, 'i');
//     }

//     const leaves = await Leave.find(query)
//       .sort({ appliedDate: -1 })
//       .populate('userId', 'name'); // ✅ Populate name field from User model
//     console.log('Admin leave requests:', leaves);
//     res.json(leaves);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// // Approve or Reject a leave request
// exports.updateLeaveStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body; // status should be 'Approved' or 'Rejected'

//     if (!['Approved', 'Rejected'].includes(status)) {
//       return res.status(400).json({ message: 'Invalid status' });
//     }

//     const leave = await Leave.findById(id);
//     if (!leave) {
//       return res.status(404).json({ message: 'Leave request not found' });
//     }

//     leave.status = status;
//     await leave.save();

//     res.json({ message: `Leave ${status.toLowerCase()} successfully`, leave });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };











const Leave = require('../models/Leave');

const applyLeave = async (req, res) => {
  try {
    const user = req.user;
    console.log('User in applyLeave:', user); // check what fields are present

    const { from, to, type, reason } = req.body;

    if (!from || !to || !type || !reason) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const leaveName = user.name || user.email || 'Unknown User';

    const newLeave = new Leave({
      name: leaveName,
      from,
      to,
      type,
      reason,
      userId: user._id,
    });

    await newLeave.save();
    res.status(201).json({ message: 'Leave applied successfully' });
  } catch (error) {
    console.error('Leave apply error:', error);
    res.status(500).json({ message: 'Error applying for leave', error: error.message });
  }
};


const getLeaves = async (req, res) => {
  try {
    const status = req.query.status;
    const query = { userId: req.user.id };

    if (status && status !== 'all') {
      query.status = new RegExp(`^${status}$`, 'i');
    }

    const leaves = await Leave.find(query).sort({ appliedDate: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllLeaveRequests = async (req, res) => {
  try {
    const status = req.query.status;
    const query = {};

    if (status && status !== 'all') {
      query.status = new RegExp(`^${status}$`, 'i');
    }

    const leaves = await Leave.find(query)
      .sort({ appliedDate: -1 })
      .populate('userId', 'name');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    res.json({ message: `Leave ${status.toLowerCase()} successfully`, leave: updatedLeave });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPendingLeaveCount = async (req, res) => {
  console.log("pending leave count called")
  try {
    const count = await Leave.countDocuments({ status: 'Pending' });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leave count', error });
  }
};
module.exports = {
  applyLeave,
  getLeaves,
  getAllLeaveRequests,
  updateLeaveStatus,
  getPendingLeaveCount
};
