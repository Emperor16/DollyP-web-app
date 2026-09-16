import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DollyPIcon from "../../assets/dollyp_icon.svg";
import { FiShoppingBag, FiCalendar, FiShoppingCart } from "react-icons/fi"; // premium icons

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        fixed top-4 inset-x-0 mx-auto w-[90%] md:w-[80%] backdrop-blur-xl bg-white/30 border border-[#D4AF37]/40 shadow-[0_6px_25px_rgba(0,0,0,0.10)] rounded-xl z-50
      "
    >
      <div className="px-6 py-3 flex items-center justify-between">
        
        {/* BRAND ICON + NAME */}
        <div className="flex items-center gap-3">
          <img 
            src={DollyPIcon} 
            alt="Dolly P Icon" 
            className="w-10 h-10"
          />
          <h1 className="font-serif text-2xl tracking-wide text-dp-black">
            DOLLY P
          </h1>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-lg text-dp-black">
          
          <Link 
            to="/shop" 
            className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
          >
            <FiShoppingBag className="text-xl" />
            Shop
          </Link>

          <Link 
            to="/reservation" 
            className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
          >
            <FiCalendar className="text-xl" />
            Reservation
          </Link>

          <Link 
            to="/cart" 
            className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
          >
            <FiShoppingCart className="text-xl" />
            Cart
          </Link>

        </nav>

        {/* MOBILE MENU */}
        <div className="md:hidden text-dp-black">
          <span className="text-3xl">☰</span>
        </div>

      </div>
    </motion.header>
  );
};

export default Navbar;
