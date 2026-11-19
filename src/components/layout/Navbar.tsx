import { useState } from "react";
import {
  CalendarDays,
  Menu,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItemClass = ({ isActive }: { isActive: boolean }) => `
    flex items-center gap-2
    rounded-full
    px-4 py-2
    font-sans text-sm
    transition-all duration-300
    ${
      isActive
        ? "bg-dp-gold/20 text-dp-black"
        : "text-dp-charcoal hover:bg-dp-gold/10 hover:text-dp-black"
    }
  `;

  const mobileNavItemClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) => `
    flex w-full items-center gap-3
    rounded-xl
    px-4 py-3
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
    <header className="fixed inset-x-0 top-5 z-50 px-4">
      <motion.div
        initial={{ y: -25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="
          mx-auto
          w-full
          max-w-[1200px]
        "
      >
        <nav
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-dp-gold/40
            bg-white/75
            px-5 py-3
            shadow-[0_12px_40px_rgba(0,0,0,0.10)]
            backdrop-blur-xl
            md:px-7
          "
        >
          {/* BRAND */}
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            aria-label="Dolly P home"
            className="
              flex
              shrink-0
              items-center
              gap-3
            "
          >
            {/* SAME BRAND MARK AS ADMIN HEADER */}
            <div
              className="
                flex
                h-10 w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-dp-gold
                font-serif
                text-lg
                text-dp-gold
              "
            >
              DP
            </div>

            <span
              className="
                whitespace-nowrap
                font-serif
                text-xl
                tracking-[0.12em]
                text-dp-black
                md:text-2xl
              "
            >
              DOLLY P
            </span>
          </NavLink>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-1 md:flex">
            <NavLink
              to="/shop"
              className={navItemClass}
            >
              <ShoppingBag
                size={18}
                strokeWidth={1.6}
              />

              Shop
            </NavLink>

            <NavLink
              to="/reservation"
              className={navItemClass}
            >
              <CalendarDays
                size={18}
                strokeWidth={1.6}
              />

              Reservation
            </NavLink>

            <NavLink
              to="/cart"
              className={navItemClass}
            >
              <ShoppingCart
                size={18}
                strokeWidth={1.6}
              />

              Cart
            </NavLink>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((current) => !current)
            }
            aria-label={
              mobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="
              flex
              h-10 w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              text-dp-black
              transition-all
              duration-300
              hover:bg-dp-gold/15
              md:hidden
            "
          >
            {mobileMenuOpen ? (
              <X
                size={23}
                strokeWidth={1.6}
              />
            ) : (
              <Menu
                size={23}
                strokeWidth={1.6}
              />
            )}
          </button>
        </nav>

        {/* MOBILE DROPDOWN */}
        {mobileMenuOpen && (
          <div
            className="
              mt-3
              overflow-hidden
              rounded-2xl
              border
              border-dp-gold/30
              bg-white/90
              p-3
              shadow-[0_18px_50px_rgba(0,0,0,0.12)]
              backdrop-blur-xl
              md:hidden
            "
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-1"
            >
              <NavLink
                to="/shop"
                onClick={closeMobileMenu}
                className={mobileNavItemClass}
              >
                <ShoppingBag
                  size={19}
                  strokeWidth={1.6}
                />

                Shop
              </NavLink>

              <NavLink
                to="/reservation"
                onClick={closeMobileMenu}
                className={mobileNavItemClass}
              >
                <CalendarDays
                  size={19}
                  strokeWidth={1.6}
                />

                Reservation
              </NavLink>

              <NavLink
                to="/cart"
                onClick={closeMobileMenu}
                className={mobileNavItemClass}
              >
                <ShoppingCart
                  size={19}
                  strokeWidth={1.6}
                />

                Cart
              </NavLink>
            </nav>
          </div>
        )}
      </motion.div>
    </header>
  );
};

export default Navbar;