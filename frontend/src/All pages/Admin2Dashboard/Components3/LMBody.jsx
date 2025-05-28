// import React from 'react';
// import './LMBody.css';
// import adminImage from '../../../assets/admin2.jpg';
// import LMHeader from './LMHeader';
// const LMBody = () => {
//   const admin2Details = {
//     name: 'Ram2',
//     adminType: 'Leave Manager',
//     email: 'Ram2@info.com',
//     phone: '+91 84563 47890',
//     pendingLeaveRequests: 5,
//     totalEmployees: 50,
//   };
//   const tagline = admin2Details.role !== 'N/A' 
//     ? `"Lead with Ease, Succeed with Pride: Your Admin Powerhouse" -${admin2Details.name}!`

// import SABody from "../../SuperAdmin-dashboard/Components2/SAbody";
// import MABody from "../../SuperAdmin-dashboard/subPages-of-AD/Manage_Admins/MABody";

  
//     : 'Making a difference every day!';
//   return (
//     <>
//     <LMHeader />
//     <div className="LM-body-container">
//       <section className="LM-details">
//         <h2 className="LM-details-title">Details of Admin</h2>
//         <div className="LMadmin2-header">
//         <img src={adminImage} alt="admin2" className="LMadmin2-image" />
//         <p className="LMadmin1-tagline">{tagline}</p>
//       </div>
//         <div className="LM-details-card">
//           <p className="LM-details-item">
//             <span className="LM-details-label">Name:</span> {admin2Details.name}
//           </p>
//           <p className="LM-details-item">
//             <span className="LM-details-label">Admin Type:</span> {admin2Details.adminType}
//           </p>
//           <p className="LM-details-item">
//             <span className="LM-details-label">Email:</span> {admin2Details.email}
//           </p>
//           <p className="LM-details-item">
//             <span className="LM-details-label">Phone:</span> {admin2Details.phone}
//           </p>
//         </div>
//       </section>
//       <div className='status2_Admin2 LM-details1'> 
//         <p className="LM-details-title1" >
//             <span >Status</span>
//           </p>
//           <div className='LM-details-card1'>
//             <p className="LM-details-item1">
//             <span className="LM-details-label1">Pending Leave Requests:</span> {admin2Details.pendingLeaveRequests}
//           </p>
//           <p className="LM-details-item1">
//             <span className="LM-details-label1">Total Employees:</span> {admin2Details.totalEmployees}
//           </p></div>
//           </div>
//     </div>
//     </>
//   );
// };

// export default LMBody;
// import SABody from "../../SuperAdmin-dashboard/Components2/SAbody";
import React, { useEffect, useState } from 'react';
import './LMBody.css';
import adminImage from '../../../assets/admin1.jpg';
import LMHeader from "./LMHeader";

const LMBody = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [getEmployeeCount, setEmployeeCount] = useState(null);
  const [getpendingLeaveCount, setPendingLeaveCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error('Token is missing from localStorage');
      setError('Unauthorized: No token found');
      setLoading(false);
      return;
    }

    const fetchAdminProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/adminProfile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch admin data');
        }

        const data = await res.json();
        setAdminDetails(data);
      } catch (err) {
        console.error('Admin fetch error:', err);
        setError(err.message);
      }
    };

    const fetchEmployeeCount = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/employee-count', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch employee count');
        }

        const data = await res.json();
        setEmployeeCount(data.count);
      } catch (err) {
        console.error('Employee count fetch error:', err);
        setError(err.message);
      }
    };

    const fetchPendingLeaveCount = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/pending-leave-count', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch pending leave count');
        }

        const data = await res.json();
        setPendingLeaveCount(data.count);
      } catch (err) {
        console.error('Pending leave count fetch error:', err);
        setError(err.message);
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([fetchAdminProfile(), fetchEmployeeCount(), fetchPendingLeaveCount()]);
      setLoading(false);
    };

    fetchAllData();
  }, [token]);

  if (loading) return <p>Loading admin details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!adminDetails) return null;

  const tagline = adminDetails.role !== 'N/A'
    ? ` "Lead with Ease, Succeed with Pride: Your Admin Powerhouse" - ${adminDetails.name}!`
    : 'Making a difference every day!';

  return (
    <>
      <LMHeader adminDetails={adminDetails} />
      <div className="sa-body-container">
        <section className="sa-details">
          <h2 className="sa-details-title">Details of Admin</h2>
          <div className="saadmin1-header">
            <img src={adminImage} alt="admin1" className="saadmin1-image" />
            <p className="saadmin1-tagline">{tagline}</p>
          </div>
          <div className="sa-details-card">
            <p className="sa-details-item"><span className="sa-details-label">Name:</span> {adminDetails.name}</p>
            <p className="sa-details-item"><span className="sa-details-label">Admin Type:</span> {adminDetails.role}</p>
            <p className="sa-details-item"><span className="sa-details-label">Email:</span> {adminDetails.email}</p>
            <p className="sa-details-item"><span className="sa-details-label">Phone:</span> {adminDetails.phone}</p>
          </div>
        </section>
        <div className='status1_Admin1 sa-details1'>
          <p className="sa-details-title1"><span>Status</span></p>
          <div className='sa-details-card1'>
            <p className="sa-details-item1"><span className="sa-details-label1">Pending Leave Requests:</span> {getpendingLeaveCount ?? 'Loading...'}</p>
            <p className="sa-details-item1"><span className="sa-details-label1">Total Employees:</span> {getEmployeeCount ?? 'Loading...'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LMBody;
