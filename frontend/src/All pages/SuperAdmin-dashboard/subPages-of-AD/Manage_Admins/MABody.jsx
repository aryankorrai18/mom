// import React, { useState } from 'react';
// import './MABody.css';
// import SAHeader from '../../Components2/SAHeader';

// const ADMIN_TYPES = ['Admin', 'Super Admin', 'Leave Manager', 'Supervisor'];

// const MABody = () => {
//   const [admins, setAdmins] = useState([
//     { id: '1', name: 'Super Admin', email: 'superadmin@example.com', type: 'Super Admin' },
//     { id: '2', name: 'Leave Manager', email: 'leavemgr@example.com', type: 'Leave Manager' },
//     { id: '3', name: 'Supervisor', email: 'supervisor@example.com', type: 'Supervisor' },
//   ]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editForm, setEditForm] = useState({ name: '', email: '', type: '' });
//   const [editErrors, setEditErrors] = useState({ name: '', email: '', type: '' });
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [addForm, setAddForm] = useState({ name: '', email: '', type: 'Admin' });
//   const [addErrors, setAddErrors] = useState({ name: '', email: '', type: '' });
//   const [pendingLogins, setPendingLogins] = useState([]);
//   const [showNotification, setShowNotification] = useState(false);

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setEditForm(admins[index]);
//     setEditErrors({ name: '', email: '', type: '' });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditForm((prev) => ({ ...prev, [name]: value }));
//     setEditErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   const handleSaveEdit = (index) => {
//     const newErrors = {
//       name: editForm.name ? '' : 'Name is required',
//       email: editForm.email
//         ? isValidEmail(editForm.email)
//           ? ''
//           : 'Invalid email format'
//         : 'Email is required',
//       type: editForm.type ? '' : 'Admin type is required',
//     };

//     if (Object.values(newErrors).some((error) => error)) {
//       setEditErrors(newErrors);
//       return;
//     }

//     const newAdmins = [...admins];
//     newAdmins[index] = editForm;
//     setAdmins(newAdmins);
//     setEditIndex(null);
//     setEditErrors({ name: '', email: '', type: '' });
//   };

//   const handleCancelEdit = () => {
//     setEditIndex(null);
//     setEditErrors({ name: '', email: '', type: '' });
//   };

//   // Handle Remove button
//   const handleRemove = (index) => {
//     setAdmins(admins.filter((_, i) => i !== index));
//   };

//   // Handle Add Admin button
//   const handleAddAdmin = () => {
//     setShowAddForm(true);
//     setAddErrors({ name: '', email: '', type: '' });
//   };

//   // Handle Add form input changes
//   const handleAddChange = (e) => {
//     const { name, value } = e.target;
//     setAddForm((prev) => ({ ...prev, [name]: value }));
//     setAddErrors((prev) => ({ ...prev, [name]: '' }));
//   };

//   // Submit new admin
//   const handleAddSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {
//       name: addForm.name ? '' : 'Name is required',
//       email: addForm.email
//         ? isValidEmail(addForm.email)
//           ? ''
//           : 'Invalid email format'
//         : 'Email is required',
//       type: addForm.type ? '' : 'Admin type is required',
//     };

//     if (Object.values(newErrors).some((error) => error)) {
//       setAddErrors(newErrors);
//       return;
//     }

//     setAdmins([...admins, { ...addForm, id: `${Date.now()}` }]);
//     setAddForm({ name: '', email: '', type: 'Admin' });
//     setAddErrors({ name: '', email: '', type: '' });
//     setShowAddForm(false);
//   };

//   // Cancel add form
//   const handleCancelAdd = () => {
//     setShowAddForm(false);
//     setAddForm({ name: '', email: '', type: 'Admin' });
//     setAddErrors({ name: '', email: '', type: '' });
//   };

//   // Simulate a login attempt
//   const simulateLoginAttempt = () => {
//     const newLogin = {
//       id: `${Date.now()}`,
//       name: `New User ${Math.floor(Math.random() * 1000)}`,
//       email: `newuser${Math.floor(Math.random() * 1000)}@example.com`,
//       type: 'Admin',
//     };
//     setPendingLogins((prev) => [...prev, newLogin]);
//     setShowNotification(true);
//   };

//   // Handle notification accept
//   const handleAcceptLogin = () => {
//     if (pendingLogins.length > 0) {
//       setAdmins((prev) => [...prev, pendingLogins[0]]);
//       setPendingLogins((prev) => prev.slice(1));
//       if (pendingLogins.length === 1) setShowNotification(false);
//     }
//   };

//   // Handle notification decline
//   const handleDeclineLogin = () => {
//     if (pendingLogins.length > 0) {
//       setPendingLogins((prev) => prev.slice(1));
//       if (pendingLogins.length === 1) setShowNotification(false);
//     }
//   };

//   return (
//     <>
//     <SAHeader />
//     <div className="ma-body-container">
//       <div className="ma-notification-wrapper">
//         <button
//           onClick={simulateLoginAttempt}
//           className="ma-notification-button"
//           aria-label={`Notification: ${pendingLogins.length} pending login${pendingLogins.length === 1 ? '' : 's'}`}
//         >
//           <span className="bellicon" aria-hidden="true">🔔</span>
//           {pendingLogins.length > 0 && (
//             <span className="ma-notification-badge">{pendingLogins.length}</span>
//           )}
//         </button>
//         {showNotification && pendingLogins.length > 0 && (
//           <div className="ma-notification">
//             <p className="ma_paragraph_text">
//               {pendingLogins[0].name} is trying to login into admin dashboard. Do you want to accept or decline?
//             </p>
//             <button onClick={handleAcceptLogin} className="ma-notification-accept">
//               Accept
//             </button>
//             <button onClick={handleDeclineLogin} className="ma-notification-decline">
//               Decline
//             </button>
//           </div>
//         )}
//       </div>
//       <h2 className="ma-title">Manage Admins</h2>

//       <div className="ma-table-wrapper">
//         <table className="ma-table" aria-label="Admin list">
//           <thead>
//             <tr>
//               <th className="ma-table-header" scope="col">Name</th>
//               <th className="ma-table-header" scope="col">Email</th>
//               <th className="ma-table-header" scope="col">Admin Type</th>
//               <th className="ma-table-header" scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map((admin, index) => (
//               <tr key={admin.id} className="ma-table-row">
//                 {editIndex === index ? (
//                   <>
//                     <td className="ma-table-cell">
//                       <input
//                         type="text"
//                         name="name"
//                         value={editForm.name}
//                         onChange={handleEditChange}
//                         className="ma-input"
//                         placeholder="Enter name"
//                         aria-label="Edit admin name"
//                         aria-invalid={!!editErrors.name}
//                         aria-describedby={editErrors.name ? `edit-name-error-${index}` : undefined}
//                       />
//                       {editErrors.name && (
//                         <span id={`edit-name-error-${index}`} className="ma-error">{editErrors.name}</span>
//                       )}
//                     </td>
//                     <td className="ma-table-cell">
//                       <input
//                         type="email"
//                         name="email"
//                         value={editForm.email}
//                         onChange={handleEditChange}
//                         className="ma-input"
//                         placeholder="Enter email"
//                         aria-label="Edit admin email"
//                         aria-invalid={!!editErrors.email}
//                         aria-describedby={editErrors.email ? `edit-email-error-${index}` : undefined}
//                       />
//                       {editErrors.email && (
//                         <span id={`edit-email-error-${index}`} className="ma-error">{editErrors.email}</span>
//                       )}
//                     </td>
//                     <td className="ma-table-cell">
//                       <select
//                         name="type"
//                         value={editForm.type}
//                         onChange={handleEditChange}
//                         className="ma-input"
//                         aria-label="Edit admin type"
//                         aria-invalid={!!editErrors.type}
//                         aria-describedby={editErrors.type ? `edit-type-error-${index}` : undefined}
//                       >
//                         {ADMIN_TYPES.map((type) => (
//                           <option key={type} value={type}>{type}</option>
//                         ))}
//                       </select>
//                       {editErrors.type && (
//                         <span id={`edit-type-error-${index}`} className="ma-error">{editErrors.type}</span>
//                       )}
//                     </td>
//                     <td className="ma-table-cell1">
//                       <button
//                         onClick={() => handleSaveEdit(index)}
//                         className="ma-action-button ma-save-button"
//                         aria-label="Save changes"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={handleCancelEdit}
//                         className="ma-action-button ma-cancel-button"
//                         aria-label="Cancel edit"
//                       >
//                         Cancel
//                       </button>
//                     </td>
//                   </>
//                 ) : (
//                   <>
//                     <td className="ma-table-cell">{admin.name || 'N/A'}</td>
//                     <td className="ma-table-cell">{admin.email || 'N/A'}</td>
//                     <td className="ma-table-cell">{admin.type}</td>
//                     <td className="ma-table-cell1">
//                       <button
//                         onClick={() => handleEdit(index)}
//                         className="ma-action-button ma-edit-button"
//                         aria-label={`Edit ${admin.name}`}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleRemove(index)}
//                         className="ma-action-button ma-remove-button"
//                         aria-label={`Remove ${admin.name}`}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {showAddForm && (
//         <div className="ma-form-wrapper">
//           <h3>Add New Admin</h3>
//           <form onSubmit={handleAddSubmit} className="ma-add-form" noValidate>
//             <div className="ma-form-group">
//               <label htmlFor="add-name">Name:</label>
//               <input
//                 id="add-name"
//                 type="text"
//                 name="name"
//                 value={addForm.name}
//                 onChange={handleAddChange}
//                 className="ma-input"
//                 placeholder="Enter name"
//                 aria-label="New admin name"
//                 aria-invalid={!!addErrors.name}
//                 aria-describedby={addErrors.name ? 'add-name-error' : undefined}
//               />
//               {addErrors.name && (
//                 <span id="add-name-error" className="ma-error">{addErrors.name}</span>
//               )}
//             </div>
//             <div className="ma-form-group">
//               <label htmlFor="add-email">Email:</label>
//               <input
//                 id="add-email"
//                 type="email"
//                 name="email"
//                 value={addForm.email}
//                 onChange={handleAddChange}
//                 className="ma-input"
//                 placeholder="Enter email"
//                 aria-label="New admin email"
//                 aria-invalid={!!addErrors.email}
//                 aria-describedby={addErrors.email ? 'add-email-error' : undefined}
//               />
//               {addErrors.email && (
//                 <span id="add-email-error" className="ma-error">{addErrors.email}</span>
//               )}
//             </div>
//             <div className="ma-form-group">
//               <label htmlFor="add-type">Admin Type:</label>
//               <select
//                 id="add-type"
//                 name="type"
//                 value={addForm.type}
//                 onChange={handleAddChange}
//                 className="ma-input"
//                 aria-label="New admin type"
//                 aria-invalid={!!addErrors.type}
//                 aria-describedby={addErrors.type ? 'add-type-error' : undefined}
//               >
//                 {ADMIN_TYPES.map((type) => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//               {addErrors.type && (
//                 <span id="add-type-error" className="ma-error">{addErrors.type}</span>
//               )}
//             </div>
//             <div className="ma-form-actions">
//               <button type="submit" className="ma-action-button ma-save-button">
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancelAdd}
//                 className="ma-action-button ma-cancel-button"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//       <button onClick={handleAddAdmin} className="ma-add-button">
//         Add Admin
//       </button>
//     </div>
//     </>
//   );
// };

// export default MABody;

import React, { useEffect, useState } from "react";
import axios from "axios";
import SAHeader from "../../Components2/SAHeader";

const MABody = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

const fetchAdmins = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("https://mom-employee-portal-backend.onrender.com/api/auth/getAllAdmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAdmins(response.data.admins);
  } catch (err) {
    setError("Failed to fetch admins");
    console.error(err);
  }
};
const handleDeleteAdmin = async (adminId) => {
  const token = localStorage.getItem("token");

  if (!window.confirm("Are you sure you want to delete this admin?")) return;

  try {
    const res = await fetch(`https://mom-employee-portal-backend.onrender.com/api/admin/deleteAdmin/${adminId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return alert(`Error: ${data.message}`);
    }

    alert('Admin deleted successfully');

    // Refresh the admin list after deletion
    fetchAdmins();  // <-- corrected function name here
  } catch (err) {
    console.error('Delete admin error:', err);
    alert('Server error while deleting admin');
  }
};


  return (
    <>
    <SAHeader/>
    <div className="p-6 bg-[#eaf6fd] min-h-screen">
      {/* <div className="bg-teal-600 text-white text-xl py-4 px-6 rounded shadow-md mb-6 text-center font-semibold">
        Manage Admins
      </div> */}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <table className="min-w-full bg-white shadow-md rounded">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Admin Type</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id} className="border-t">
              <td className="py-3 px-4">{admin.username}</td>
              <td className="py-3 px-4">{admin.email}</td>
              <td className="py-3 px-4">{admin.role}</td>
              <td className="py-3 px-4">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDeleteAdmin(admin._id)}  // Assuming `admin._id` exists
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-center">
        {/* <button className="bg-teal-600 text-white px-5 py-2 rounded">Add Admin</button> */}
      </div>
    </div>
    </>
  );
};

export default MABody;