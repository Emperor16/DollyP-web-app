import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import { getProducts, type Product } from "../../services/productService";

const AdminProducts = () => {
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
        <p className="font-sans text-dp-charcoal">Loading inventory...</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-dp-black tracking-wide">
            Product Inventory
          </h1>
          <p className="font-sans text-sm text-dp-charcoal/70 mt-1">
            Manage your boutique catalog, pricing, and stock levels.
          </p>
        </div>
        <Link
          to="/admin/create"
          className="bg-dp-black text-white px-6 py-3 text-sm font-sans tracking-wide hover:bg-dp-velvet transition"
        >
          Add New Product
        </Link>
      </div>

      <div className="bg-white border border-dp-charcoal/10 rounded-lg overflow-hidden">
       
      </div>
    </PageContainer>
  );
};

export default AdminProducts;