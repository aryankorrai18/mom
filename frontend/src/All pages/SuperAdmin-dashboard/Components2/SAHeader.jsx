import React from 'react';
import './SAHeader.css';
import Logo from '../../../assets/logo.png';
const SAHeader = () => {
  
  return (
    <header className="saheader">
     <div className="saheader-left">
        <img src={Logo} alt="Portal Logo" className="saheader-logo" />
        <div className="saadmin1-info">
          <span className="saadmin1_type">Admin Type:</span>
          <span className="saadmin1_gender">Gender: </span>
        </div>
      </div>
      <nav className="sanav">
        <ul className="sanav-list">
          <li className="sanav-item">
            <a href="/super-admin-dashboard" className="sanav-link">Dashboard</a>
          </li>
          <li className="sanav-item">
            <a href="/leave-requests" className="sanav-link">Leave Requests</a>
          </li>
          <li className="sanav-item">
            <a href="/manage-admins" className="sanav-link">Manage Admins</a>
          </li>
          <li className="sanav-item"> 
            <a href="https://mom-employee-portal.vercel.app/login" target='blank' className="sanav-link">Employees DB</a>
            </li>
          <li className="sanav-item">
            <a href="/logout" className="sanav-link">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default SAHeader;