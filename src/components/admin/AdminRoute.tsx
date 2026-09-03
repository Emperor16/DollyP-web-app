import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();

  // 1. If user is authenticated and tries to access /admin/login → redirect to dashboard
  if (isAuthenticated && location.pathname === "/admin/login") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // 2. If user is NOT authenticated → redirect to login
  if (!isAuthenticated && location.pathname !== "/admin/login") {
    return <Navigate to="/admin/login" replace />;
  }

  // 3. Otherwise → allow access
  return children;
};

export default AdminRoute;
