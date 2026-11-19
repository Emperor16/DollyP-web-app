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

import DollyPIcon from "../../assets/dollyp_icon.svg";

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
        ? "bg-dp-gold/15 text-dp-black"
        : "text-dp-charcoal hover:bg-dp-gold/10 hover:text-dp-black"
    }
  `;

  const mobileNavItemClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) => `
    flex w-full
    items-center gap-3
    rounded-xl
    px-4 py-3
    font-sans text-sm
    transition-all duration-300
    ${
      isActive
        ? "bg-dp-gold/15 text-dp-black"
        : "text-dp-charcoal hover:bg-dp-gold/10 hover:text-dp-black"
    }
  `;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="
        fixed
        left-1/2
        top-4
        z-50
        w-[calc(100%-2rem)]
        max-w-[1400px]
        -translate-x-1/2
      "
    >
      <nav
        className="
          relative
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-dp-gold/35
          bg-white/80
          px-4
          py-2.5
          shadow-[0_12px_40px_rgba(0,0,0,0.10)]
          backdrop-blur-xl
          sm:px-5
          sm:py-3
          md:px-7
        "
      >
        {/* BRAND */}
        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className="
            flex
            min-w-0
            shrink-0
            items-center
            gap-2.5
            sm:gap-3
          "
          aria-label="Dolly P home"
        >
          <img
            src={DollyPIcon}
            alt=""
            className="
              h-8 w-8
              shrink-0
              object-contain
              sm:h-9 sm:w-9
              lg:h-10 lg:w-10
            "
          />

          <span
            className="
              whitespace-nowrap
              font-serif
              text-lg
              tracking-[0.12em]
              text-dp-black
              sm:text-xl
              lg:text-2xl
            "
          >
            DOLLY P
          </span>
        </NavLink>

        {/* DESKTOP NAVIGATION */}
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
              size={22}
              strokeWidth={1.6}
            />
          ) : (
            <Menu
              size={22}
              strokeWidth={1.6}
            />
          )}
        </button