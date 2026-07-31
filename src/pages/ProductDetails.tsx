import PageContainer from "../components/layout/PageContainer";
<<<<<<< HEAD
import ProductImages from "../components/products/ProductImages";
import { useProducts } from "../services/productService";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading, error } = useProducts();

  const product = products.find((p) => p._id === id);

  if (loading) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dp-black"></div>
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </PageContainer>
    );
  }

  if (!product) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="font-serif text-2xl text-dp-black mb-2">Product not found</h2>
          <p className="font-sans text-dp-charcoal/60">The product you're looking for doesn't exist.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages images={product.images || []} />
        
        <div>
          <h1 className="font-serif text-3xl text-dp-black mb-4">{product.name}</h1>
          <p className="font-sans text-dp-charcoal/80 mb-6 leading-relaxed">
            {product.description}
          </p>
          <div className="text-3xl font-serif text-dp-black mb-6">
            ${product.price}
          </div>
          <button
            className="bg-dp-black text-dp-white px-8 py-3 font-sans hover:bg-dp-charcoal transition"
            onClick={() => alert("Added to cart!")}
          >
            Add to Cart
          </button>
        </div>
      </div>
=======

const ProductDetails = () => {
  return (
    <PageContainer>
      <h1 className="font-serif text-3xl text-dp-black mb-4">PRODUCT DETAILS PAGE</h1>
      <p className="font-sans text-gray-600">Dynamic product details and selection options will render here.</p>
>>>>>>> 5975c4c
    </PageContainer>
  );
};

export default ProductDetails;