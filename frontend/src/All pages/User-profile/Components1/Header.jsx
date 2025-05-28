import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from '../../../assets/logo.png';
import { EmployeeContext } from './EmployeeContext';
import Logout from '../../Logout';

const Header = () => {
  const context = useContext(EmployeeContext);
  const employee = context ? context.employee : null;
  const logout = context ? context.logout : null;
  const navigate = useNavigate();

  if (!context) {
    console.error('EmployeeContext is not available. Ensure Header is wrapped in EmployeeProvider.');
    return <div>Error: Context not available</div>;
  }

  // const handleLogout = () => {
  //   if (logout) {
  //     logout();
  //     navigate('/');
  //   }
  // };

  return (
    <header className="UPheader">
      <div className="UPheader1_left">
        <img src={Logo} alt="Portal Logo" className="UPheader-logo" />
        <div className="UPemployee-info">
          <span className="UPemployee-id">Employee ID: {employee?.id || 'N/A'}</span>
          <span className="UPemployee-gender">Gender: {employee?.gender || 'N/A'}</span>
        </div>
      </div>
      <nav className="UPheader-nav">
        <Link to="/employee-dashboard" className="UPnav-link">Home</Link>
        <Link to="/apply-for-leave"  className="UPnav-link">Apply for Leave</Link>
        <a href="https://mom-employee-portal.vercel.app/login" target='blank' className="UPnav-link">Progress</a>
        <button onClick={() => navigate('/logout')} className="UPnav-link logout">Logout</button>
      </nav>
    </header>
  );
};

export default Header;