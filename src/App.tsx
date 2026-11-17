import { BrowserRouter, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRouter from "./router/AppRouter";

import { CartProvider } from "./context/CartContexts";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import ErrorBoundary from "./components/error/ErrorBoundary";

const AppContent = () => {
  const location = useLocation();

  // Everything under /admin belongs to the admin application.
  const isAdminRoute =
    location.pathname === "/admin" ||
    location.pathname.startsWith("/admin/");

  return (
    <ErrorBoundary>
      {/* CUSTOMER NAVIGATION ONLY */}
      {!isAdminRoute && <Navbar />}

      <AppRouter />

      {/* CUSTOMER FOOTER ONLY */}
      {!isAdminRoute && <Footer />}
    </ErrorBoundary>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;