import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Package,
  Plus,
  Store,
} from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-7xl">
      <nav
        className="
          flex items-center justify-between
          px-6 py-3
          rounded-2xl
          border border-dp-gold/40
          bg-white/75
          backdrop-blur-xl
          shadow-[0_12px_40px_rgba(0,0,0,0.08)]
        "
      >
        {/* BRAND */}
        <a href="/admin" className="flex items-center gap-4 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-dp-gold text-dp-gold font-serif text-xl">
            DP
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl tracking-[0.12em] text-dp-black">
              DOLLY P
            </span>

            <span className="hidden lg:inline text-[10px] uppercase tracking-[0.25em] text-dp-charcoal/60">
              Admin
            </span>
          </div>
        </a>

        {/* ADMIN NAVIGATION */}
        <div className="hidden md:flex items-center gap-1">
          <a
            href="/admin"
            className="
              flex items-center gap-2
              rounded-full px-4 py-2
              font-sans text-sm text-dp-black
              transition
              hover:bg-dp-gold/15
            "
          >
            <LayoutDashboard size={18} strokeWidth={1.7} />
            Dashboard
          </a>

          <a
            href="/admin/products"
            className="
              flex items-center gap-2
              rounded-full px-4 py-2
              font-sans text-sm text-dp-black
              transition
              hover:bg-dp-gold/15
            "
          >
            <Package size={18} strokeWidth={1.7} />
            Products
          </a>

          <a
            href="/admin/create"
            className="
              flex items-center gap-2
              rounded-full px-4 py-2
              font-sans text-sm text-dp-black
              transition
              hover:bg-dp-gold/15
            "
          >
            <Plus size={18} strokeWidth={1.7} />
            Add Product
          </a>

          <a
            href="/admin/reservations"
            className="
              flex items-center gap-2
              rounded-full px-4 py-2
              font-sans text-sm text-dp-black
              transition
              hover:bg-dp-gold/15
            "
          >
            <CalendarDays size={18} strokeWidth={1.7} />
            Reservations
          </a>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          <a
            href="/"
            title="View Store"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              text-dp-charcoal
              transition
              hover:bg-dp-gold/15
              hover:text-dp-black
            "
          >
            <Store size={19} strokeWidth={1.7} />
          </a>

          <button
            type="button"
            title="Log out"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              text-dp-charcoal
              transition
              hover:bg-red-50
              hover:text-red-700
            "
          >
            <LogOut size={18} strokeWidth={1.7} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;