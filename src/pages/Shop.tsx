import { useEffect, useState } from "react";
import { getProducts, type Product } from "../services/productService";
import ProductGrid from "../components/products/ProductGrid";
import PageContainer from "../components/layout/PageContainer";

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  useEffect(() => {
    getProducts().then((data) => {
      console.log("SHOP PRODUCTS:", data);
      setProducts(data);
      setFiltered(data);
    });
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    let result = [...products];

    // SEARCH
    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // CATEGORY
    if (category !== "") {
      result = result.filter((p) => p.category === category);
    }

    // PRICE RANGE
    if (priceRange) {
      const [min, max] = priceRange;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }

    // FEATURED
    if (featuredOnly) {
      result = result.filter((p) => p.isFeatured);
    }

    setFiltered(result);
  }, [search, category, priceRange, featuredOnly, products]);

  return (
    <PageContainer>
      <h1 className="font-serif text-3xl text-dp-black mb-10 tracking-wide">
        Shop Luxury Fashion
      </h1>

      {/* FILTERS */}
      <div className="mb-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SEARCH */}
        <div className="lg:col-span-1">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm focus:border-dp-black outline-none"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm focus:border-dp-black outline-none"
          >
            <option value="">All Categories</option>
            <option value="dress">Dress</option>
            <option value="gown">Gown</option>
            <option value="kaftan">Kaftan</option>
            <option value="two-piece">Two-Piece</option>
            <option value="outerwear">Outerwear</option>
          </select>
        </div>

        {/* PRICE RANGE */}
        <div>
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") setPriceRange(null);
              else {
                const [min, max] = val.split("-").map(Number);
                setPriceRange([min, max]);
              }
            }}
            className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm focus:border-dp-black outline-none"
          >
            <option value="">All Prices</option>
            <option value="50000-80000">₦50,000 - ₦80,000</option>
            <option value="80000-120000">₦80,000 - ₦120,000</option>
            <option value="120000-200000">₦120,000 - ₦200,000</option>
          </select>
        </div>

        {/* FEATURED */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={featuredOnly}
            onChange={() => setFeaturedOnly(!featuredOnly)}
            className="w-4 h-4"
          />
          <label className="font-sans text-sm text-dp-charcoal/80">
            Featured Only
          </label>
        </div>
      </div>

      {/* PRODUCT GRID */}
      {filtered.length === 0 ? (
        <p className="font-sans text-dp-charcoal/70">No products found.</p>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </PageContainer>
  );
};

export default Shop;
