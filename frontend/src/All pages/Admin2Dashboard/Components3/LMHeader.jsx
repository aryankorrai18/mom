import React from 'react';
import './LMHeader.css';
import Logo from '../../../assets/logo.png';
const LMHeader = ({adminDetails}) => {
  
  return (
    <header className="LMheader">
    <div className="LMheader-left">
          <img src={Logo} alt="Portal Logo" className="saheader-logo" />
          <div className="saadmin1-info">
            <span className="saadmin1_type">Admin Type: </span>
            <span>{adminDetails?.role || "N/A"}</span>
            <br />
            <span className="saadmin1_gender">Gender: </span>
            <span>{adminDetails?.gender || "N/A"}</span>
          </div>
        </div>
      <nav className="LMnav">
        <ul className="LMnav-list">
          <li className="LMnav-item">
            <a href="/leave-manager-dashboard" className="LMnav-link">Dashboard</a>
          </li>
          <li className="LMnav-item">
            <a href="/leave-manager-LR" className="LMnav-link">Leave Requests</a>
          </li>
          <li className="LMnav-item">
            <a href="/logout" className="LMnav-link">Logout</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default LMHeader;