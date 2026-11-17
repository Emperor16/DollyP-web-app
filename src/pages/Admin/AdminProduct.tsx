import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import {
  getProducts,
  deleteProduct,
  type Product,
} from "../../services/productService";
import { safeArray } from "../../utils/safeArray";

import { getProductImage } from "../../utils/getProductImage";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 8;

  const fetchInventory = async () => {
    try {
      setLoading(true);

      const raw = await getProducts(); // now returns array
      setProducts(safeArray<Product>(raw));
    } catch {
      setError("Failed to load inventory catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  const paginatedProducts = products.slice(startIndex, endIndex);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } catch {
        alert("Failed to delete the product. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <p className="font-sans text-dp-charcoal">Loading inventory...</p>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <p className="font-sans text-red-600">{error}</p>
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

      <div className="bg-white border border-dp-charcoal/10 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-dp-offwhite border-b border-dp-charcoal/10 font-sans text-xs text-dp-charcoal uppercase tracking-wider">
              <th className="py-4 px-6">Product</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Stock</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-dp-charcoal/10 font-sans text-sm">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-dp-charcoal/60"
                >
                  No products found in inventory.
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-dp-offwhite/50 transition"
                >
                  <td className="py-4 px-6 flex items-center space-x-4">
                    <img
                      src={getProductImage(product.images)}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md border border-dp-charcoal/10"
                    />

                    <div>
                      <p className="font-medium text-dp-black">
                        {product.name}
                      </p>
                      <p className="text-xs text-dp-charcoal/60 line-clamp-1">
                        {product.description || "No description"}
                      </p>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-dp-charcoal capitalize">
                    {product.category || "uncategorized"}
                  </td>

                  <td className="py-4 px-6 font-medium text-dp-black">
                    ${Number(product.price).toFixed(2)}
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right space-x-3">
                    <Link
                      to={`/admin/edit/${product._id}`}
                      className="text-dp-black hover:text-dp-gold font-medium transition-colors"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800 font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
};

export default AdminProducts;
