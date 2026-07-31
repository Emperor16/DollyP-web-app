import { useEffect, useState } from "react";
import { getProducts,type Product } from "../services/productService";
import ProductGrid from "../components/products/ProductGrid";
import PageContainer from "../components/layout/PageContainer";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <p className="font-sans text-dp-charcoal">Loading products...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <h1 className="font-serif text-3xl text-dp-black mb-10 tracking-wide">
        Shop Luxury Fashion
      </h1>

      <ProductGrid products={products} />
    </PageContainer>
  );
};

export default Shop;
