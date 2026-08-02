import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, type Product } from "../services/productService";
import PageContainer from "../components/layout/PageContainer";
import { useCart } from "../context/CartContexts";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      getProductById(id).then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) {
    return (
      <PageContainer>
        <p className="text-dp-charcoal/70 font-sans">Loading product...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* IMAGE GALLERY */}
        <div>
          <div className="overflow-hidden rounded-lg aspect-[3/4] bg-dp-offwhite">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="font-serif text-4xl text-dp-black tracking-wide">
            {product.name}
          </h1>

          <p className="font-sans text-dp-charcoal/70 mt-4 leading-relaxed">
            {product.description}
          </p>

          <p className="font-serif text-3xl text-dp-black mt-6">
            ₦{product.price.toLocaleString()}
          </p>

          {/* SIZES */}
          <div className="mt-8">
            <h3 className="font-sans text-sm text-dp-charcoal/80 tracking-wide mb-3">
              SELECT SIZE
            </h3>

            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2 border text-sm font-sans tracking-wide transition 
                    ${
                      selectedSize === size
                        ? "bg-dp-black text-white border-dp-black"
                        : "border-dp-charcoal/40 text-dp-black hover:border-dp-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button
            disabled={!selectedSize}
            onClick={() =>
              addToCart({
                product,
                size: selectedSize,
                quantity: 1,
              })
            }
            className={`mt-10 w-full py-3 font-sans tracking-wide transition 
              ${
                selectedSize
                  ? "bg-dp-gold text-dp-black hover:bg-dp-velvet hover:text-white"
                  : "bg-dp-offwhite text-dp-charcoal/50 cursor-not-allowed"
              }`}
          >
            {selectedSize ? "Add to Cart" : "Select a Size"}
          </button>

          {/* EXTRA INFO */}
          <div className="mt-12 border-t pt-8">
            <p className="font-sans text-dp-charcoal/70 text-sm leading-relaxed">
              Each Dolly P piece is handcrafted with premium fabrics sourced
              across Africa. Slight variations in pattern and texture are part
              of the garment’s unique character.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProductDetails;