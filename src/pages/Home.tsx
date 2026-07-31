import PageContainer from "../components/layout/PageContainer";
import ProductGrid from "../components/products/ProductGrid";
import { useProducts } from "../services/productService";

const Home = () => {
  const { products, loading, error } = useProducts();

  const featuredProducts = products.slice(0, 6);

  return (
    <PageContainer>
      <div className="text-center mb-16">
        <h1 className="font-serif text-5xl md:text-7xl text-dp-black mb-6">
          Luxury Fashion Redefined
        </h1>
        <p className="font-sans text-dp-charcoal/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Discover exquisite collections crafted with precision, elegance, and timeless artistry.
          Each piece tells a story of craftsmanship and refined taste.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="font-serif text-3xl text-dp-black text-center mb-12">
          Featured Collections
        </h2>
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dp-black"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
            {error}
          </div>
        )}

        <ProductGrid products={featuredProducts} />
      </div>

      <div className="bg-dp-offwhite/50 py-16 rounded-lg">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-dp-black mb-4">Need Assistance?</h2>
          <p className="font-sans text-dp-charcoal/80 mb-8">
            Our luxury consultants are here to help you find your perfect piece
          </p>
          <button 
            onClick={() => alert("Contact form would open here")}
            className="bg-dp-black text-dp-white px-8 py-3 font-sans hover:bg-dp-charcoal transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Home;