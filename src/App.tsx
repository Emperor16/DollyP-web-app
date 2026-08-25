import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContexts";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import ErrorBoundary from "./components/error/ErrorBoundary";
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
    <ErrorBoundary>
      <AdminDashboard />
      <AdminAuthProvider>
        <CartProvider>
          <Navbar />
          <AppRouter />
          <Footer />
        </CartProvider>
      </AdminAuthProvider>
    </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
