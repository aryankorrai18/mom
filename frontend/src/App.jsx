import React from 'react';
import { Routes, Route,  } from 'react-router-dom';
import './App.css';

import LMBody from './All pages/Admin2Dashboard/Components3/LMBody';
import RLeaveBodyLM from './All pages/Admin2Dashboard/subPages-of-LM/Leave_Requests_LM/RLeaveBodyLM';

import LMHeader from './All pages/Admin2Dashboard/Components3/LMHeader';

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
          <Route path='/' element={<LMHeader />} />
            {/* <Route path= "/logout" element={<Logout />} /> */}
           <Route path="/leave-manager-dashboard" element={<LMBody />} />
           <Route path="/leave-manager-LR" element={<RLeaveBodyLM />} />
            
            
            
          </Routes>
        </main>
      </div>
    
  );
}

export default App;