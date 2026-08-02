import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContexts";

function App() {
  return (
    <BrowserRouter>
    <CartProvider>
      <Navbar />
      <AppRouter />
      <Footer />
    </CartProvider>
    </BrowserRouter>
  );
}

export default App;
