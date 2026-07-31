import PageContainer from "../components/layout/PageContainer";
import ProductGrid from "../components/products/ProductGrid";
import { useCart } from "../context/CartContexts";
import { useProducts } from "../services/productService";

const Shop = () => {
  const { items } = useCart();
  const { products, loading, error } = useProducts();

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-dp-black mb-4">Shop</h1>
        <p className="font-sans text-dp-charcoal/80">
          Discover our curated collection of luxury pieces
        </p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-dp-black"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <ProductGrid products={products} />
    </PageContainer>
  );
};

export default Shop;