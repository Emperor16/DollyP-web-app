import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  Store,
} from "lucide-react";

import { NavLink } from "react-router-dom";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `
      flex items-center gap-2
      rounded-full px-4 py-2
      font-sans text-sm
      transition-all duration-300
      ${
        isActive
          ? "bg-dp-gold/20 text-dp-black"
          : "text-dp-charcoal hover:bg-dp-gold/10 hover:text-dp-black"
      }
    `;

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1400px]">
      <nav
        className="
          flex items-center justify-between
          px-5 md:px-7 py-3
          rounded-2xl
          border border-dp-gold/40
          bg-white/75
          backdrop-blur-xl
          shadow-[0_12px_40px_rgba(0,0,0,0.10)]
        "
      >
        {/* BRAND */}
        <NavLink
          to="/admin/dashboard"
          className="flex items-center gap-3 shrink-0"
        >
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-dp-gold
              font-serif text-lg text-dp-gold
            "
          >
            DP
          </div>

          <div className="flex items-center gap-3">
            <span className="font-serif text-xl md:text-2xl tracking-[0.12em] text-dp-black">
              DOLLY P
            </span>

            <span className="hidden lg:inline text-[9px] uppercase tracking-[0.3em] text-dp-charcoal/50">
              Admin
            </span>
          </div>
        </NavLink>

        {/* DESKTOP ADMIN NAVIGATION */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/admin/dashboard" className={navItemClass}>
            <LayoutDashboard size={18} strokeWidth={1.6} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/products" className={navItemClass}>
            <Package size={18} strokeWidth={1.6} />
            Products
          </NavLink>

          <NavLink to="/admin/create" className={navItemClass}>
            <Plus size={18} strokeWidth={1.6} />
            Add Product
          </NavLink>

          <NavLink to="/admin/reservations" className={navItemClass}>
            <CalendarDays size={18} strokeWidth={1.6} />
            Reservations
          </NavLink>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-1">
          <NavLink
            to="/"
            title="View Store"
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              text-dp-charcoal
              transition-all duration-300
              hover:bg-dp-gold/15
              hover:text-dp-black
            "
          >
            <Store size={19} strokeWidth={1.6} />
          </NavLink>

          <button
            type="button"
            onClick={onLogout}
            title="Log out"
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              text-dp-charcoal
              transition-all duration-300
              hover:bg-red-50
              hover:text-red-700
            "
          >
            <LogOut size={18} strokeWidth={1.6} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
