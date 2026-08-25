import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { getProducts, type Product } from "../../services/productService";
import api from "../../services/api";
import { safeArray } from "../../utils/safeArray";

interface Reservation {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
}

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(safeArray<Product>(data)));

    api.get("/reservations")
      .then((res) => {
        const rawReservations = res.data.data || res.data.reservations;
        setReservations(safeArray<Reservation>(rawReservations));
      })
      .catch(() => setReservations([]));
  }, []);

  const safeProductsList = safeArray<Product>(products);
  const safeReservationsList = safeArray<Reservation>(reservations);

  const totalProducts = safeProductsList.length;
  const featuredProducts = safeProductsList.filter((p) => p.isFeatured).length;
  const totalReservations = safeReservationsList.length;

  const categoryCounts: Record<string, number> = safeProductsList.reduce(
    (acc, p) => {
      if (p?.category) {
        acc[p.category] = (acc[p.category] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <AdminLayout>
      {/* ... your JSX unchanged ... */}
    </AdminLayout>
  );
};

export default AdminDashboard;
