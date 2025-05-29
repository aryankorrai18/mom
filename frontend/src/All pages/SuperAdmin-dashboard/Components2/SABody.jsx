// import React from 'react';
// import './SABody.css';
// import adminImage from '../../../assets/admin1.jpg';
// import SAHeader from './SAHeader';
// const SABody = () => {
//   const adminDetails = {
//     name: 'Ram',
//     adminType: 'Super Admin',
//     email: 'Ram@info.com',
//     phone: '+91 78595 47890',
//     // status: 'Active',
//     pendingLeaveRequests: 5,
//     totalEmployees: 50,
//   };
//   const tagline = adminDetails.role !== 'N/A' 
//     ? `"Lead with Ease, Succeed with Pride: Your Admin Powerhouse" -${adminDetails.name}!`
  
//     : 'Making a difference every day!';
//   return (
//     <>
//     <SAHeader />
//     <div className="sa-body-container">
//       <section className="sa-details">
//         <h2 className="sa-details-title">Details of Admin</h2>
//         <div className="saadmin1-header">
//         <img src={adminImage} alt="admin1" className="saadmin1-image" />
//         <p className="saadmin1-tagline">{tagline}</p>
//       </div>
//         <div className="sa-details-card">
//           <p className="sa-details-item">
//             <span className="sa-details-label">Name:</span> {adminDetails.name}
//           </p>
//           <p className="sa-details-item">
//             <span className="sa-details-label">Admin Type:</span> {adminDetails.adminType}
//           </p>
//           <p className="sa-details-item">
//             <span className="sa-details-label">Email:</span> {adminDetails.email}
//           </p>
//           <p className="sa-details-item">
//             <span className="sa-details-label">Phone:</span> {adminDetails.phone}
//           </p>
//         </div>
//       </section>
//       <div className='status1_Admin1 sa-details1'> 
//         <p className="sa-details-title1" >
//             <span >Status</span>
//           </p>
//           <div className='sa-details-card1'>
//             <p className="sa-details-item1">
//             <span className="sa-details-label1">Pending Leave Requests:</span> {adminDetails.pendingLeaveRequests}
//           </p>
//           <p className="sa-details-item1">
//             <span className="sa-details-label1">Total Employees:</span> {adminDetails.totalEmployees}
//           </p></div>
//           </div>
//     </div></>

//   );
// };

// export default SABody;



import React, { useEffect, useState } from 'react';
import './SABody.css';
import adminImage from '../../../assets/admin1.jpg';
import SAHeader from './SAHeader';

const SABody = () => {
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
        const res = await fetch('https://mom-employee-portal-backend.onrender.com/api/auth/adminProfile', {
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
        const res = await fetch('https://mom-employee-portal-backend.onrender.com/api/admin/employee-count', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include'
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
        const res = await fetch('https://mom-employee-portal-backend.onrender.com/api/admin/pending-leave-count', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include'
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
      <SAHeader adminDetails={adminDetails} />
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

export default SABody;
