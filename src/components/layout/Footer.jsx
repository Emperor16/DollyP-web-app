const Footer = () => {
  return (
    <footer className="bg-dp-offwhite py-16 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h3 className="font-serif text-xl text-dp-black tracking-wide mb-6">
          DOLLY P
        </h3>

        <p className="font-sans text-sm text-dp-charcoal/80 leading-relaxed max-w-xl mx-auto">
          Luxury fashion crafted with precision, elegance, and timeless artistry.
        </p>

        <div className="mt-10 text-xs text-dp-charcoal/60">
          © {new Date().getFullYear()} Dolly P. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
