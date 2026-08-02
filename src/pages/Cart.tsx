import PageContainer from "../components/layout/PageContainer";
import { useCart } from "../context/CartContexts";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <PageContainer>
      <h1 className="font-serif text-3xl text-dp-black mb-10 tracking-wide">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <p className="font-sans text-dp-charcoal/70">
          Your cart is empty.  
          <Link to="/shop" className="text-dp-black underline ml-2">
            Continue shopping
          </Link>
        </p>
      ) : (
        <div className="space-y-10">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-8 border-b pb-8"
            >
              <img
                src={item.product.images[0]}
                className="w-32 h-40 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="font-serif text-xl text-dp-black">
                  {item.product.name}
                </h2>
                <p className="font-sans text-sm text-dp-charcoal/70">
                  Size: {item.size}
                </p>
                <p className="font-serif text-lg text-dp-black mt-2">
                  ₦{item.product.price.toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="text-sm font-sans text-dp-charcoal/70 hover:text-dp-black"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right mt-10">
            <p className="font-serif text-2xl text-dp-black">
              Total: ₦{total.toLocaleString()}
            </p>

            <Link
              to="/checkout"
              className="inline-block mt-6 bg-dp-gold text-dp-black px-10 py-3 font-sans tracking-wide hover:bg-dp-velvet hover:text-white transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Cart;
