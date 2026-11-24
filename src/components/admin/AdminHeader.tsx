import { useState } from "react";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Plus,
  Store,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface AdminHeaderProps {
  onLogout: () => void;
}

const AdminHeader = ({ onLogout }: AdminHeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const mobileNavItemClass = ({ isActive }: { isActive: boolean }) =>
    `
      flex w-full items-center gap-3
      rounded-xl px-4 py-3
      font-sans text-sm
      transition-all duration-300
      ${
        isActive
          ? "bg-dp-gold/20 text-dp-black"
          : "text-dp-charcoal hover:bg-dp-gold/10 hover:text-dp-black"
      }
    `;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[1400px]">
      {/* MAIN FLOATING HEADER */}
      <nav
        className="
          relative
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
          onClick={closeMobileMenu}
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

        {/* DESKTOP NAVIGATION */}
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

        {/* DESKTOP RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-1">
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

        {/* MOBILE HAMBURGER */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((current) => !current)}
          aria-label={mobileMenuOpen ? "Close admin menu" : "Open admin menu"}
          aria-expanded={mobileMenuOpen}
          className="
            md:hidden
            flex h-10 w-10
            items-center justify-center
            rounded-full
            text-dp-black
            transition-all duration-300
            hover:bg-dp-gold/15
          "
        >
          {mobileMenuOpen ? (
            <X size={23} strokeWidth={1.6} />
          ) : (
            <Menu size={23} strokeWidth={1.6} />
          )}
        </button>
      </nav>

      {/* MOBILE GLASS DROPDOWN */}
      {mobileMenuOpen && (
        <div
          className="
            md:hidden
            mt-3
            overflow-hidden
            rounded-2xl
            border border-dp-gold/30
            bg-white/85
            p-3
            backdrop-blur-xl
            shadow-[0_18px_50px_rgba(0,0,0,0.12)]
          "
        >
          <div className="flex flex-col gap-1">
            <NavLink
              to="/admin/dashboard"
              onClick={closeMobileMenu}
              className={mobileNavItemClass}
            >
              <LayoutDashboard size={19} strokeWidth={1.6} />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/products"
              onClick={closeMobileMenu}
              className={mobileNavItemClass}
            >
              <Package size={19} strokeWidth={1.6} />
              Products
            </NavLink>

            <NavLink
              to="/admin/create"
              onClick={closeMobileMenu}
              className={mobileNavItemClass}
            >
              <Plus size={19} strokeWidth={1.6} />
              Add Product
            </NavLink>

            <NavLink
              to="/admin/reservations"
              onClick={closeMobileMenu}
              className={mobileNavItemClass}
            >
              <CalendarDays size={19} strokeWidth={1.6} />
              Reservations
            </NavLink>
          </div>

          {/* MOBILE SECONDARY ACTIONS */}
          <div className="mt-3 border-t border-dp-gold/20 pt-3">
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className="
                flex w-full items-center gap-3
                rounded-xl px-4 py-3
                font-sans text-sm text-dp-charcoal
                transition-all duration-300
                hover:bg-dp-gold/10
                hover:text-dp-black
              "
            >
              <Store size={19} strokeWidth={1.6} />
              View Store
            </NavLink>

            <button
              type="button"
              onClick={() => {
                closeMobileMenu();
                onLogout();
              }}
              className="
                flex w-full items-center gap-3
                rounded-xl px-4 py-3
                text-left
                font-sans text-sm text-dp-charcoal
                transition-all duration-300
                hover:bg-red-50
                hover:text-red-700
              "
            >
              <LogOut size={19} strokeWidth={1.6} />
              Log out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
