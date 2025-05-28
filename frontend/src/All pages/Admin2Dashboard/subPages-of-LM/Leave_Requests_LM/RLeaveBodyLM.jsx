import React, { useState } from 'react';
import './RLeaveBodyLM.css';
import LMHeader from '../../Components3/LMHeader';

const RLeaveBodyLM = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      name: 'John Doe',
      dateFrom: '2025-06-01',
      dateTo: '2025-06-05',
      type: 'Sick Leave',
      reason: 'Flu',
      status: 'Pending',
      appliedDate:'30-2-15'
    },
    {
      name: 'Jane Smith',
      dateFrom: '2025-06-10',
      dateTo: '2025-06-12',
      type: 'Casual Leave',
      reason: 'Family Trip',
      status: 'Pending',
      appliedDate:'30-2-15'
    },
    {
      name: 'Sam Brown',
      dateFrom: '2025-06-15',
      dateTo: '2025-06-16',
      type: 'Personal',
      reason: 'Appointment',
      status: 'Pending',
      appliedDate:'30-2-15'
    },
  ] );
    const handleApprove = (index) => {
    const updatedRequests = [...leaveRequests];
    updatedRequests[index].status = 'Approved';
    setLeaveRequests(updatedRequests);
  };

  const handleReject = (index) => {
    const updatedRequests = [...leaveRequests];
    updatedRequests[index].status = 'Rejected';
    setLeaveRequests(updatedRequests);
  };


  return (
    <>
    <LMHeader />
    <div className="LMrl-body-container">
      <h2 className="LMrl-title">Leave Requests</h2>
      <div className="LMrl-table-wrapper">
        <table className="LMrl-table">
          <thead>
            <tr>
              <th className="LMrl-table-header">Date From</th>
              <th className="LMrl-table-header">Name</th>
              <th className="LMrl-table-header">Date To</th>
              <th className="LMrl-table-header">Type of Leave</th>
              <th className="LMrl-table-header">Reason</th>
              <th className="LMrl-table-header">Status</th>
              <th className="LMrl-table-header">Applied Date</th>
              <th className="LMrl-table-header">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request, index) => (
              <tr key={index} className="LMrl-table-row">
                <td className="LMrl-table-cell">{request.name}</td>
                <td className="LMrl-table-cell">{request.dateFrom}</td>
                <td className="LMrl-table-cell">{request.dateTo}</td>
                <td className="LMrl-table-cell">{request.type}</td>
                <td className="LMrl-table-cell">{request.reason}</td>
                <td className="LMrl-table-cell">{request.status}</td>
                <td className="LMrl-table-cell">{request.appliedDate}</td>
                <td className="LMrl-table-cell1">
                  <button
                    className="LMrl-action-button LMrl-approve-button"
                    onClick={() => handleApprove(index)}
                    disabled={request.status !== 'Pending'}
                  >
                    Approve
                  </button>
                  <button
                    className="LMrl-action-button LMrl-reject-button"
                    onClick={() => handleReject(index)}
                    disabled={request.status !== 'Pending'}
                  >
                    Reject
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default RLeaveBodyLM;