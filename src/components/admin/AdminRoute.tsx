import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

const AdminRoute = ({ children }: { children: React.ReactElement }) => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;