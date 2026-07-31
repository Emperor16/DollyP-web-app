import PageContainer from "../components/layout/PageContainer";
import { useCart } from "../context/CartContexts";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { items } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-dp-black mb-4">Checkout</h1>
        <p className="font-sans text-dp-charcoal/80">
          Complete your purchase securely
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="font-serif text-2xl text-dp-black mb-2">Your cart is empty</h2>
          <p className="font-sans text-dp-charcoal/60 mb-6">Add some products to proceed with checkout</p>
          <Link 
            to="/shop"
            className="inline-block bg-dp-black text-dp-white px-6 py-3 font-sans hover:bg-dp-charcoal transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-dp-white border border-dp-offwhite/40 p-6">
              <h2 className="font-serif text-2xl text-dp-black mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="font-sans text-dp-charcoal/80">
                      {item.name} (x{item.quantity})
                    </span>
                    <span className="font-sans text-dp-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-dp-offwhite/40 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-sans text-dp-charcoal/80">Subtotal</span>
                  <span className="font-sans text-dp-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-sans text-dp-charcoal/80">Tax (8%)</span>
                  <span className="font-sans text-dp-black">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-serif font-bold text-dp-black">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-dp-white border border-dp-offwhite/40 p-6">
              <h2 className="font-serif text-2xl text-dp-black mb-4">Payment Information</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-sans text-dp-charcoal/80 mb-2">
                    Card Number
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-dp-offwhite/40 rounded focus:outline-none focus:ring-2 focus:ring-dp-black"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-sans text-dp-charcoal/80 mb-2">
                      Expiry Date
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-dp-offwhite/40 rounded focus:outline-none focus:ring-2 focus:ring-dp-black"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-sans text-dp-charcoal/80 mb-2">
                      CVV
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-dp-offwhite/40 rounded focus:outline-none focus:ring-2 focus:ring-dp-black"
                      placeholder="123"
                    />
                  </div>
                </div>
              </form>
            </div>

            <button
              className="w-full bg-dp-black text-dp-white py-4 font-serif text-lg hover:bg-dp-charcoal transition"
              onClick={() => alert("Order placed successfully!")}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Checkout;