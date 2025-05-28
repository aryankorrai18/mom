import React, { createContext, useState, useEffect } from 'react';

const token = localStorage.getItem('token');

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://mom-employee-portal-backend.onrender.com/api/auth/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch employee data');
        }
        return res.json();
      })
      .then(data => {
        setEmployee({
          id: data.employeeId || '',
          gender: data.gender || '',         
          name: data.name || '',
          role: data.role || '',
          phone: data.phone || '',
          email: data.email || '',
          startingDate: data.startingDate || '',
          dateOfBirth: data.dateOfBirth || '',
          healthComplaints: data.healthComplaints || '',
          bloodGroup: data.bloodGroup || '',
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching employee:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    setEmployee(null);
    localStorage.removeItem('token');
  };

  return (
    <EmployeeContext.Provider value={{ employee, setEmployee, logout, loading, error }}>
      {children}
    </EmployeeContext.Provider>
  );
};
