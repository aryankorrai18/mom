import React from 'react';
import './header.css';
import logo from '../../assets/logo.png';
import { useNavigate } from "react-router-dom";


function LandingPageHeader() {
  const navigate=useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

   const handleSignupClick = () => {
    navigate("/register");
  };
  return (
    <header className="header-bar text-success">
      <div className="container mainparent">
        <div className="container1">
          <img src={logo} alt="logo" className="header" />
          <div className="mompharmacy">
            <h2 className="heading">Mom Pharmacy</h2>
            <p className="quote">Healing Through Care 🫀</p>
          </div>
        </div>
        <nav className="nav mt-3 mt-md-0">
          <a className="nav-link text-white" href="#carousel">What's new?</a>
          <a className="nav-link text-white" href="#contact">Contact Us</a>
          <div className="auth-buttons">
            <button className="btn login-btn" style={{ border: "2px solid #116861" }} onClick={handleLoginClick}>
              Login
            </button>
            <button className="btn signup-btn" style={{ border: "2px solid #116861" }} onClick={handleSignupClick}>
              Signup
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default LandingPageHeader;