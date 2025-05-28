import React from 'react';
import './LMBody.css';
import adminImage from '../../../assets/admin2.jpg';
import LMHeader from './LMHeader';
const LMBody = () => {
  const admin2Details = {
    name: 'Ram2',
    adminType: 'Leave Manager',
    email: 'Ram2@info.com',
    phone: '+91 84563 47890',
    pendingLeaveRequests: 5,
    totalEmployees: 50,
  };
  const tagline = admin2Details.role !== 'N/A' 
    ? `"Lead with Ease, Succeed with Pride: Your Admin Powerhouse" -${admin2Details.name}!`
  
    : 'Making a difference every day!';
  return (
    <>
    <LMHeader />
    <div className="LM-body-container">
      <section className="LM-details">
        <h2 className="LM-details-title">Details of Admin</h2>
        <div className="LMadmin2-header">
        <img src={adminImage} alt="admin2" className="LMadmin2-image" />
        <p className="LMadmin1-tagline">{tagline}</p>
      </div>
        <div className="LM-details-card">
          <p className="LM-details-item">
            <span className="LM-details-label">Name:</span> {admin2Details.name}
          </p>
          <p className="LM-details-item">
            <span className="LM-details-label">Admin Type:</span> {admin2Details.adminType}
          </p>
          <p className="LM-details-item">
            <span className="LM-details-label">Email:</span> {admin2Details.email}
          </p>
          <p className="LM-details-item">
            <span className="LM-details-label">Phone:</span> {admin2Details.phone}
          </p>
        </div>
      </section>
      <div className='status2_Admin2 LM-details1'> 
        <p className="LM-details-title1" >
            <span >Status</span>
          </p>
          <div className='LM-details-card1'>
            <p className="LM-details-item1">
            <span className="LM-details-label1">Pending Leave Requests:</span> {admin2Details.pendingLeaveRequests}
          </p>
          <p className="LM-details-item1">
            <span className="LM-details-label1">Total Employees:</span> {admin2Details.totalEmployees}
          </p></div>
          </div>
    </div>
    </>
  );
};

export default LMBody;