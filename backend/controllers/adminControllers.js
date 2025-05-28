const User = require('../models/User')

exports.getAdminProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("this is from admin endpoint" , userId)
    const user = await User.findById({_id:userId}).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fullName = `${user.firstName} ${user.lastName}`;

    res.json({
      name: fullName,
      employeeId: user.username,
      role: user.role,
      adminType:user.roletype,
      gender: user.gender,
      phone: user.mobilenumber,
      email: user.email,
      startingDate: user.startingDate || 'N/A',
      endingDate: user.endingDate || 'N/A',
      healthComplaints: user.healthComplaints || 'None',
      bloodGroup: user.bloodGroup || 'Unknown',
    });
  } catch (error) {
    console.error('[getAdminProfile] Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEmployeeCount = async (req, res) => {
  console.log('GET /admin/employee-count called');
  try {
    const count = await User.countDocuments({ roletype: 'Employee' });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee count', error });
  }
};

exports.deleteAdmin = async (req, res) => {
  const { _id } = req.params;

  try {
    const admin = await User.findById(_id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.roletype !== 'Admin') {
      return res.status(400).json({ message: 'User is not an admin' });
    }

    await User.findByIdAndDelete(_id);

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (err) {
    console.error('[deleteAdmin] Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const admins = await User.find({ roletype: "Admin" }).select("-password");

    if (admins.length === 0) {
      return res.status(404).json({ message: "No admins found" });
    }

    res.status(200).json({ admins });
  } catch (err) {
    console.error("[getAllAdmins] Error:", err);
    res.status(500).json({ message: "Server error", err: err.message });
  }
};
