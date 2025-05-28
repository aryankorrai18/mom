import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const roleRoutes = {
  Employee: ['/employee-dashboard', '/apply-for-leave'],
  "Super Admin": ['/super-admin-dashboard', '/leave-requests', '/manage-admins'],
  Supervisor: ['/supervisor-dashboard'],
  "Leave Manager": ['/leave-manager-dashboard', '/leave-manager-LR'],
  Admin: ['/admin-dashboard'],
};

const getDefaultRedirect = (roletype, role) => {
  if (roletype === 'Employee') return '/employee-dashboard';

  switch (role) {
    case 'Super Admin':
      return '/super-admin-dashboard';
    case 'Supervisor':
      return '/supervisor-dashboard';
    case 'Leave Manager':
      return '/leave-manager-dashboard';
    default:
      return '/admin-dashboard';
  }
};

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!token) {
    alert("Please login first");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!user?.roletype && !user?.role) {
    return <Navigate to="/login" replace />;
  }

  let allowedRoutes = [];
  if (user.roletype === 'Employee') {
    allowedRoutes = roleRoutes['Employee'];
  } else {
    allowedRoutes = roleRoutes[user.role] || roleRoutes['Admin'];
  }

  const pathAllowed = allowedRoutes.some(path => location.pathname.startsWith(path));
  if (!pathAllowed) {
    return <Navigate to={getDefaultRedirect(user.roletype, user.role)} replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (token && (user?.roletype || user?.role)) {
    return (
      <Navigate
        to={getDefaultRedirect(user.roletype, user.role)}
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};
