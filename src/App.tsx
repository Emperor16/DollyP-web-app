import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContexts";
import { AdminAuthProvider } from "./context/AdminAuthContext";

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <CartProvider>
          <Navbar />
          <AppRouter />
          <Footer />
        </CartProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;
