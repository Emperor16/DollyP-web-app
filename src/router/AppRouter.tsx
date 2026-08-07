import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/checkout";
import Reservation from "../pages/Reservation";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminProducts from "../pages/Admin/AdminProduct";
import AdminEdit from "../components/admin/AdminEdit";
import AdminReservation from "../pages/Admin/AdminReservation";
import AdminRoute from "../components/admin/AdminRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/reservation" element={<Reservation />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/edit/:id" element={<AdminEdit />} />
      <Route path="/admin/reservations" element={<AdminReservation />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );

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
  path="/admin/create"
  element={
    <AdminRoute>
      <AdminCreate />
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

<Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
}

export default AppRouter;