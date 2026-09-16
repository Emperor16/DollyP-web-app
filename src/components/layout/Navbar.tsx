import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DollyPIcon from "../../assets/dollyp_icon.svg";

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        fixed top-4 left-1/2 -translate-x-1/2 
        w-[92%] md:w-[85%] 
        backdrop-blur-xl bg-white/40 
        border border-[#D4AF37]/40 
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        rounded-2xl 
        z-50
      "
    >
      <div className="px-8 py-4 flex items-center justify-between">
        
        {/* BRAND ICON + NAME */}
        <div className="flex items-center gap-4">
          <img 
            src={DollyPIcon} 
            alt="Dolly P Icon" 
            className="w-12 h-12"
          />
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl tracking-wide text-dp-black"
          >
            <Link to="/">DOLLY P</Link>
          </motion.div>
        </div>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-10 font-sans text-lg text-dp-black">
          <Link 
            to="/shop" 
            className="hover:text-[#D4AF37] transition-colors"
          >
            Shop
          </Link>

          <Link 
            to="/reservation" 
            className="hover:text-[#D4AF37] transition-colors"
          >
            Reservation
          </Link>

          <Link 
            to="/cart" 
            className="hover:text-[#D4AF37] transition-colors"
          >
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
