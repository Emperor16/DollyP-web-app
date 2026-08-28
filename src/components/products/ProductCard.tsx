import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Product } from "../../services/productService";
import { getProductImage } from "../../utils/getProductImage";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-md bg-dp-offwhite aspect-[3/4]">
        <img
          src={getProductImage(product.images)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="font-serif text-lg text-dp-black tracking-wide">
          {product.name}
        </h3>

        <p className="font-sans text-sm text-dp-charcoal/70 mt-1">
          {product.category.toUpperCase()}
        </p>

        <p className="font-sans text-base text-dp-black mt-2">
          ₦{product.price.toLocaleString()}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="inline-block mt-3 font-sans text-sm text-dp-black underline underline-offset-4 hover:text-dp-gold transition"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
