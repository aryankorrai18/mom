import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SVBody from './All pages/Admin3Dashboard/Components4/SVBody';
import Logout from './All pages/Logout';


// import BackgroundImage from './assets/backgroundimage.png';

function App() {
  //  useAutoLogout();
  // const location = useLocation();

  
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
           <Route path="/dashboard" element={<Navigate to="/supervisor-dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/supervisor-dashboard" element={<SVBody />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            {/* LM body */}
          </Routes>
        </main>
      </div>
  );
}

export default App;