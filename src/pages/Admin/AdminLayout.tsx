import React from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAdminAuth();

  return (
    <div className="min-h-screen bg-dp-offwhite">
      {/* FLOATING ADMIN HEADER */}
      <AdminHeader onLogout={logout} />

      {/* ADMIN CONTENT */}
      <main className="mx-auto w-full max-w-[1400px] px-6 md:px-10 pt-32 pb-16">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
