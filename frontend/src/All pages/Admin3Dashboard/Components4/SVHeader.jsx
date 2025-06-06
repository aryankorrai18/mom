import React from 'react';
import './SVHeader.css';
import Logo from '../../../assets/logo.png';
const SVHeader = ({adminDetails}) => {
  
  return (
    <header className="SVheader">
  <div className="SVheader-left">
        <img src={Logo} alt="Portal Logo" className="saheader-logo" />
        <div className="saadmin1-info">
          <span className="saadmin1_type">Admin Type: </span>
          <span>{adminDetails?.role || "N/A"}</span>
          <br />
          <span className="saadmin1_gender">Gender: </span>
          <span>{adminDetails?.gender || "N/A"}</span>
        </div>
      </div>
      <nav className="SVnav">
        <ul className="SVnav-list">
          <li className="SVnav-item">
            <a href="/supervisor-dashboard" className="SVnav-link">Dashboard</a>
          </li>
          <li className="SVnav-item"> 
            <a href="https://mom-employee-portal.vercel.app/login" target='blank' className="SVnav-link">Employees DB</a>
            </li>
          <li className="SVnav-item">
            <a href="/logout" className="SVnav-link">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default SVHeader;