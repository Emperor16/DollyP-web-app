import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <header className="w-full bg-dp-white border-b border-dp-offwhite/40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-2xl tracking-wide text-dp-black"
        >
          <Link to="/">DOLLY P</Link>
        </motion.div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-10 font-sans text-dp-charcoal text-sm">
          <Link to="/shop" className="hover:text-dp-black transition">Shop</Link>
          <Link to="/reservation" className="hover:text-dp-black transition">Reservation</Link>
          <Link to="/cart" className="hover:text-dp-black transition">Cart</Link>
        </nav>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden text-dp-black">
          <span className="text-xl">☰</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
