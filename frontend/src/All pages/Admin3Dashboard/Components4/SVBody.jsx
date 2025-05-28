import React from 'react';
import './SVBody.css';
import adminImage from '../../../assets/admin3.jpg';
import SVHeader from './SVHeader';
const SVBody = () => {
  const admin3Details = {
    name: 'Ram3',
    adminType: 'Supervisor',
    email: 'Ram3@info.com',
    phone: '+91 86495 47890',
    // status: 'Active',
    pendingLeaveRequests: 5,
    totalEmployees: 50,
  };
  const tagline = admin3Details.role !== 'N/A' 
    ? `"Lead with Ease, Succeed with Pride: Your Admin Powerhouse" -${admin3Details.name}!`
  
    : 'Making a difference every day!';
  return (
    <>
    <SVHeader />
    <div className="SV-body-container">
      <section className="SV-details">
        <h2 className="SV-details-title">Details of Admin</h2>
        <div className="SVadmin3-header">
        <img src={adminImage} alt="admin3" className="SVadmin3-image" />
        <p className="SVadmin3-tagline">{tagline}</p>
      </div>
        <div className="SV-details-card">
          <p className="SV-details-item">
            <span className="SV-details-label">Name:</span> {admin3Details.name}
          </p>
          <p className="SV-details-item">
            <span className="SV-details-label">Admin Type:</span> {admin3Details.adminType}
          </p>
          <p className="SV-details-item">
            <span className="SV-details-label">Email:</span> {admin3Details.email}
          </p>
          <p className="SV-details-item">
            <span className="SV-details-label">Phone:</span> {admin3Details.phone}
          </p>
        </div>
      </section>
      <div className='status3_Admin3 SV-details1'> 
        <p className="SV-details-title1" >
            <span >Status</span>
          </p>
          <div className='SV-details-card1'>
            <p className="SV-details-item1">
            <span className="SV-details-label1">Pending Leave Requests:</span> {admin3Details.pendingLeaveRequests}
          </p>
          <p className="SV-details-item1">
            <span className="SV-details-label1">Total Employees:</span> {admin3Details.totalEmployees}
          </p></div>
          </div>
    </div>
    </>
  );
};

export default SVBody;