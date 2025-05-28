import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import SAHeader from './All pages/SuperAdmin-dashboard/Components2/SAHeader';
import SABody from './All pages/SuperAdmin-dashboard/Components2/SABody';
import RLeaveBody from './All pages/SuperAdmin-dashboard/subPages-of-AD/Leave_Requests/RLeaveBody'
import MABody from './All pages/SuperAdmin-dashboard/subPages-of-AD/Manage_Admins/MABody';
import Logout from './All pages/Logout';

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
            <Route path="/" element={<Navigate to="/super-admin-dashboard" replace />} /> 
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/super-admin-dashboard" element={<SABody />} />
            <Route path="/leave-requests" element={<RLeaveBody />} />
            <Route path="/manage-admins" element={<MABody />} />
            {/* LM body */}
          </Routes>
        </main>
      </div>
  );
}

export default App;