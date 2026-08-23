import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { getProducts, type Product } from "../../services/productService";
import api from "../../services/api"; // <-- Use centralized api instance
import { safeArray } from "../../utils/safeArray"; // <-- Import safe array utility

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    // Fetch products safely
    getProducts().then((data) => setProducts(safeArray(data)));

    // Fetch reservations using the centralized api client (Token & 401s handled automatically!)
    api
      .get("/reservations")
      .then((res) => {
        // Handle standard response contract data shape
        const rawReservations = res.data.data || res.data.reservations;
        setReservations(safeArray(rawReservations));
      })
      .catch(() => setReservations([]));
  }, []);

  // Safe array coercions to prevent runtime crashes
  const safeProductsList = safeArray(products);
  const safeReservationsList = safeArray(reservations);

  // Stats (safe fallbacks)
  const totalProducts = safeProductsList.length;
  const featuredProducts = safeProductsList.filter((p) => p.isFeatured).length;
  const totalReservations = safeReservationsList.length;

  const categoryCounts = safeProductsList.reduce((acc: any, p) => {
    if (p && p.category) {
      acc[p.category] = (acc[p.category] || 0) + 1;
    }
    return acc;
  }, {});

  return (
    <AdminLayout>
      <h1 className="font-serif text-3xl text-dp-black mb-10 tracking-wide">
        Admin Dashboard
      </h1>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        {/* TOTAL PRODUCTS */}
        <div className="bg-white shadow-md p-8 rounded-lg border border-dp-offwhite">
          <h2 className="font-serif text-xl text-dp-black">Total Products</h2>
          <p className="font-sans text-4xl text-dp-gold mt-4">{totalProducts}</p>
        </div>

        {/* FEATURED PRODUCTS */}
        <div className="bg-white shadow-md p-8 rounded-lg border border-dp-offwhite">
          <h2 className="font-serif text-xl text-dp-black">Featured Items</h2>
          <p className="font-sans text-4xl text-dp-gold mt-4">{featuredProducts}</p>
        </div>

        {/* RESERVATIONS */}
        <div className="bg-white shadow-md p-8 rounded-lg border border-dp-offwhite">
          <h2 className="font-serif text-xl text-dp-black">Reservations</h2>
          <p className="font-sans text-4xl text-dp-gold mt-4">{totalReservations}</p>
        </div>
      </div>

      {/* CATEGORY BREAKDOWN */}
      <h2 className="font-serif text-2xl text-dp-black mb-6">Category Breakdown</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(categoryCounts).map((cat) => (
          <div
            key={cat}
            className="bg-white shadow-sm p-6 rounded-lg border border-dp-offwhite"
          >
            <h3 className="font-serif text-lg text-dp-black capitalize">
              {cat.replace("-", " ")}
            </h3>
            <p className="font-sans text-3xl text-dp-charcoal mt-3">
              {categoryCounts[cat]}
            </p>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-20">
        <h2 className="font-serif text-2xl text-dp-black mb-6">Quick Actions</h2>

        <div className="flex flex-wrap gap-6">
          <a
            href="/admin/create"
            className="px-8 py-3 bg-dp-gold text-dp-black font-sans tracking-wide rounded hover:bg-dp-velvet hover:text-white transition"
          >
            Add New Product
          </a>

          <a
            href="/admin/products"
            className="px-8 py-3 border border-dp-black text-dp-black font-sans tracking-wide rounded hover:bg-dp-black hover:text-white transition"
          >
            Manage Products
          </a>

          <a
            href="/admin/reservations"
            className="px-8 py-3 border border-dp-charcoal text-dp-charcoal font-sans tracking-wide rounded hover:bg-dp-charcoal hover:text-white transition"
          >
            View Reservations
          </a>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;