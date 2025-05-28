import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import RegistrationPage from './All pages/Authentication/register/register';
import LoginPage from './All pages/Authentication/login/login';
import LandingPageBody from './All pages/Landing-page/body';
import Contact from './All pages/Landing-page/contactus';
import Forgot from './All pages/Authentication/forgot/forgot';

function App(){


  return (
    
      <div
        style={{
          fontFamily: "'DM Sans', Arial, sans-serif",
          minHeight: '100vh',
          // backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* <Header /> */}
        
        <main style={{ padding: '20px', textAlign: 'center' }}>
          <Routes>
            {/* <Route path = "/landing-page-header" element={<LandingPageHeader />} /> */}
            <Route path = "/" element={<LandingPageBody />} />
            <Route path='/contact-us' element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            {/* <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} /> */}
            <Route path="/forgot" element={<Forgot/>} />
            {/* LM body */}
          </Routes>
        </main>
      </div>
  );
}

export default App;