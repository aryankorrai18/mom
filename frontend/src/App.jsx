import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './All pages/User-profile/Components1/Header';
import Body from './All pages/User-profile/Components1/Body';
import LeaveBody from './All pages/User-profile/subPages-of-UP/LeaveBody';
import { EmployeeProvider } from './All pages/User-profile/Components1/EmployeeContext';
import RegistrationPage from './All pages/Authentication/register/register';
import LoginPage from './All pages/Authentication/login/login';
import LandingPageBody from './All pages/Landing-page/body';
// import { useLocation } from 'react-router-dom';
import Contact from './All pages/Landing-page/contactus';
// import SAHeader from './All pages/SuperAdmin-dashboard/Components2/SAHeader';
import SABody from './All pages/SuperAdmin-dashboard/Components2/SABody';
import RLeaveBody from './All pages/SuperAdmin-dashboard/subPages-of-AD/Leave_Requests/RLeaveBody'
import MABody from './All pages/SuperAdmin-dashboard/subPages-of-AD/Manage_Admins/MABody';
import LMBody from './All pages/Admin2Dashboard/Components3/LMBody';
import RLeaveBodyLM from './All pages/Admin2Dashboard/subPages-of-LM/Leave_Requests_LM/RLeaveBodyLM';
import SVBody from './All pages/Admin3Dashboard/Components4/SVBody';
import { PublicRoute } from './All pages/protectedRoutes';
import { ProtectedRoute } from './All pages/protectedRoutes';
import Logout from './All pages/Logout';
import useAutoLogout from './hooks/useAutoLogout';
import Forgot from './All pages/Authentication/forgot/forgot';


// import BackgroundImage from './assets/backgroundimage.png';

function App() {
   useAutoLogout();
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
            <Route path = "/user-dashboard-header" element={<ProtectedRoute><Header /></ProtectedRoute>}/>
            {/* <Route path = "/landing-page-header" element={<LandingPageHeader />} /> */}
            <Route path = "/" element={<PublicRoute><LandingPageBody /></PublicRoute>} />
            <Route path='/contact-us' element={<Contact />} />
            <Route path= "/logout" element={<Logout />}/>
            <Route path="/employee-dashboard" element={<ProtectedRoute><Body /></ProtectedRoute>} />
            <Route path="/apply-for-leave" element={<ProtectedRoute><LeaveBody /></ProtectedRoute>} /> 
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegistrationPage /></PublicRoute>} />
            {/* <Route path="/employee-dashboard" element={<div>Employee Dashboard</div>} /> */}
            {/* <Route path="/super-admin-dashboard" element={<div>Super Admin Dashboard</div>} /> */}
            <Route path="/supervisor-dashboard" element={<ProtectedRoute><SVBody /></ProtectedRoute>} />
            <Route path="/leave-manager-dashboard" element={<ProtectedRoute><LMBody /></ProtectedRoute>} />
            <Route path="/leave-manager-LR" element={<ProtectedRoute><RLeaveBodyLM /></ProtectedRoute>} />
            <Route path="/super-admin-dashboard" element={<ProtectedRoute><SABody /></ProtectedRoute>} />
            <Route path="/leave-requests" element={<ProtectedRoute><RLeaveBody /></ProtectedRoute>} />
            <Route path="/manage-admins" element={<ProtectedRoute><MABody /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/forgot" element={<Forgot/>} />
            {/* LM body */}
          </Routes>
        </main>
      </div>
    </EmployeeProvider>
  );
}

export default App;