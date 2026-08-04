import { Link } from "react-router-dom";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-dp-offwhite flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-dp-black text-white p-6 space-y-8">
        <h2 className="font-serif text-2xl tracking-wide">Admin Panel</h2>

        <nav className="space-y-4 font-sans text-sm">
          <Link to="/admin/dashboard" className="block hover:text-dp-gold">
            Dashboard
          </Link>

          <Link to="/admin/products" className="block hover:text-dp-gold">
            Manage Products
          </Link>

          <Link to="/admin/create" className="block hover:text-dp-gold">
            Add Product
          </Link>

          <Link to="/admin/reservations" className="block hover:text-dp-gold">
            Reservations
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
};

export default AdminLayout;
