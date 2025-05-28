import React, { useContext } from 'react';
import { EmployeeContext } from './EmployeeContext';
import './Body.css';
import EmployeeImage from '../../../assets/employee.jpg';
import Header from './Header';

const Body = () => {
  const context = useContext(EmployeeContext);
  const employee = context ? context.employee : null;


  
  if (!context) {
    console.error('EmployeeContext is not available. Ensure Body is wrapped in EmployeeProvider.');
    return <div>Error: Context not available</div>;
  }

  const userDetails = {
    name: employee?.name || 'N/A',
    employeeId: employee?.id || 'N/A',
    role: employee?.role || 'N/A',
    gender: employee?.gender,
    phone: employee?.phone || 'N/A',
    email: employee?.email || 'N/A',
    startingDate: employee?.startingDate || 'N/A',
    dateOfBirth: employee?.dateOfBirth || 'N/A',
    healthComplaints: employee?.healthComplaints || 'N/A',
    bloodGroup: employee?.bloodGroup || 'N/A',
  };

  const tagline = userDetails.role !== 'N/A' 
    ? `"Shine Bright, Thrive Right: Your Success, Our Pride" -${userDetails.name}!`
    : 'Making a difference every day!';

  return (
    <>
    <Header />
    <div className="UPuser-profile">
      <h2 className="UPsection-title">User Profile</h2>
      <div className="UPemployee-header">
        <img src={EmployeeImage} alt="Employee" className="UPemployee-image" />
        <p className="UPemployee-tagline">{tagline}</p>
      </div>
      <div className="UPprofile-details">
        <div className="UPdetail-item">
          <span className="UPdetail-label">Name:</span>
          <span className="UPdetail-value">{userDetails.name}</span>
        </div>
        <div className="UPdetail-item">
          <span className="UPdetail-label">Employee ID:</span>
          <span className="UPdetail-value">{userDetails.employeeId}</span>
        </div>
        <div className="UPdetail-item">
          <span className="UPdetail-label">Role:</span>
          <span className="UPdetail-value">{userDetails.role}</span>
        </div>
        <div className="UPdetail-item">
          <span className="UPdetail-label">Phone:</span>
          <span className="UPdetail-value">{userDetails.phone}</span>
        </div>
        <div className="UPdetail-item">
          <span className="UPdetail-label">Email:</span>
          <span className="UPdetail-value">{userDetails.email}</span>
        </div>
        <div className="UPdetail-item">
          <span className="UPdetail-label">Starting Date:</span>
          <span className="UPdetail-value">{userDetails.startingDate}</span>
        </div>
        <div className="UPdetail-item">
          <span className="UPdetail-label">Date Of Birth:</span>
          <span className="UPdetail-value">{userDetails.dateOfBirth}</span>
        </div>
        <div className="UPdetail-item">
          <span className="UPdetail-label">Health Complaints:</span>
          <span className="UPdetail-value">{userDetails.healthComplaints}</span>
        </div>
        <div className="UPdetail-item">
          <span className="UPdetail-label">Blood Group:</span>
          <span className="UPdetail-value">{userDetails.bloodGroup}</span>
        </div>
      </div>
    </div>
    </>
  );
};

export default Body;