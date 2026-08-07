import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/checkout";
import Reservation from "../pages/Reservation";

// Admin Imports
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProducts from "../pages/Admin/AdminProduct";
import AdminEdit from "../components/admin/AdminEdit";
import AdminReservation from "../pages/Admin/AdminReservation";
import AdminLogin from "../pages/Admin/AdminLogin"; 
import AdminRoute from "../components/admin/AdminRoute";

function AppRouter() {
  return (
    <Routes>
      {/* Public Storefront Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/reservation" element={<Reservation />} />

      {/* Public Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes (Wrapped in AdminRoute) */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProducts />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/edit/:id"
        element={
          <AdminRoute>
            <AdminEdit />
          </AdminRoute>
        }
      />
      
      <Route
        path="/admin/reservations"
        element={
          <AdminRoute>
            <AdminReservation />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRouter;