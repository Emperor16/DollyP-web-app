import type { Product } from "../services/productService";

interface Props {
  images: string[];
}

const ProductImages = ({ images }: Props) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[3/4] bg-dp-offwhite rounded-md flex items-center justify-center">
        <span className="text-dp-charcoal/40">No images available</span>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[3/4] rounded-md overflow-hidden bg-dp-offwhite">
      <img
        src={images[0]}
        alt="Product"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ProductImages;