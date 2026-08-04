import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/checkout";
import Reservation from "../pages/Reservation";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/admin/products" element={<AdminProducts />} />
<Route path="/admin/create" element={<AdminCreate />} />
<Route path="/admin/edit/:id" element={<AdminEdit />} />
<Route path="/admin/reservations" element={<AdminReservation />} />

      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/reservation" element={<Reservation />} />
    </Routes>
  );
}

export default AppRouter;
