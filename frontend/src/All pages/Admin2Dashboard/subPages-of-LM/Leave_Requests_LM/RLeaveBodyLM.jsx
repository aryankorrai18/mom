import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RLeaveBodyLM.css';
import LMHeader from '../../Components3/LMHeader';

const RLeaveBodyLM = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token || ''}`,
    },
  };

const fetchLeaveRequests = async () => {
  if (!token) {
    console.warn("No token found. User may not be logged in.");
    setLoading(false);
    return;
  }

  try {
    const res = await axios.get('https://mom-employee-portal-backend.onrender.com/api/leaves/admin/all?status=all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLeaveRequests(res.data);
  } catch (error) {
    console.error("Failed to fetch leave requests:", error.response?.data || error.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`https://mom-employee-portal-backend.onrender.com/api/leaves/admin/update/${id}`, { status: 'Approved' }, config);
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error approving leave:', error.response?.data || error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`https://mom-employee-portal-backend.onrender.com/api/leaves/admin/update/${id}`, { status: 'Rejected' }, config);
      fetchLeaveRequests();
    } catch (error) {
      console.error('Error rejecting leave:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <LMHeader />
      <div className="rl-body-container">
        <h2 className="rl-title">Leave Requests</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="rl-table-wrapper">
            {leaveRequests.length === 0 ? (
              <p>No leave requests found.</p>
            ) : (
              <table className="rl-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date From</th>
                    <th>Date To</th>
                    <th>Type of Leave</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Applied Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request) => (
                    <tr key={request._id}>
                      <td>{request.userId?.name || 'N/A'}</td>
                      <td>{new Date(request.from).toLocaleDateString()}</td>
                      <td>{new Date(request.to).toLocaleDateString()}</td>
                      <td>{request.type}</td>
                      <td>{request.reason}</td>
                      <td>{request.status}</td>
                      <td>{new Date(request.appliedDate).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="rl-action-button rl-approve-button"
                          onClick={() => handleApprove(request._id)}
                          disabled={request.status !== 'Pending'}
                        >
                          Approve
                        </button>
                        <button
                          className="rl-action-button rl-reject-button"
                          onClick={() => handleReject(request._id)}
                          disabled={request.status !== 'Pending'}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RLeaveBodyLM;
