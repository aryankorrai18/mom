import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './All pages/User-profile/Components1/Header';
import Body from './All pages/User-profile/Components1/Body';
import LeaveBody from './All pages/User-profile/subPages-of-UP/LeaveBody';
import { EmployeeProvider } from './All pages/User-profile/Components1/EmployeeContext';
// import { AuthProvider } from './All pages/User-profile/Components1/AuthContext';
function App() {
   //useAutoLogout();
  // const location = useLocation();

  
  return (
    <EmployeeProvider >
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
            <Route path = "/" element={<Header />}/>
            {/* <Route path= "/logout" element={<Logout />}/> */}
            <Route path="/employee-dashboard" element={<Body />} />
            <Route path="/apply-for-leave" element={<LeaveBody />} /> 
            <Route path="*" element={<Navigate to="/" replace />} />
            {/* <Route path="/employee-dashboard" element={<div>Employee Dashboard</div>} /> */}
            {/* <Route path="/super-admin-dashboard" element={<div>Super Admin Dashboard</div>} /> */}
            
            

          </Routes>
        </main>
      </div>
    </EmployeeProvider>
  );
}

export default App;