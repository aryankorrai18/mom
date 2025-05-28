const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found' });

    const fullName = `${user.firstName} ${user.lastName}`;

    res.json({
      name: fullName,
      employeeId: user.username,
      role: user.role,
      gender: user.gender,
      phone: user.mobilenumber,
      email: user.email,
      startingDate: user.startingDate || 'N/A',
      dateOfBirth: user.dateOfBirth || 'N/A',
      healthComplaints: user.healthComplaints || 'None',
      bloodGroup: user.bloodGroup || 'Unknown',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
