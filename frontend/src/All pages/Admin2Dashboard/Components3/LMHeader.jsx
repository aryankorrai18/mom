import React from 'react';
import './LMHeader.css';
import Logo from '../../../assets/logo.png';
const LMHeader = () => {
  
  return (
    <header className="LMheader">
     <div className="LMheader-left">
        <img src={Logo} alt="Portal Logo" className="LMheader-logo" />
        <div className="LMadmin1-info">
          <span className="LMadmin1_type">Admin Type:</span>
          <span className="LMadmin1_gender">Gender: </span>
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