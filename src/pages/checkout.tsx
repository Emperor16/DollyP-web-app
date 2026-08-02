import PageContainer from "../components/layout/PageContainer";
import { useCart } from "../context/CartContexts";
import { useState } from "react";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    alert("Order placed successfully!");
    clearCart();
  };

  return (
    <PageContainer>
      <h1 className="font-serif text-3xl text-dp-black mb-10 tracking-wide">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* ORDER SUMMARY */}
        <div>
          <h2 className="font-serif text-xl text-dp-black mb-6">
            Order Summary
          </h2>

          <div className="space-y-6">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between">
                <p className="font-sans text-dp-black">
                  {item.product.name} ({item.size})
                </p>
                <p className="font-serif text-dp-black">
                  ₦{item.product.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <p className="font-serif text-2xl text-dp-black mt-10">
            Total: ₦{total.toLocaleString()}
          </p>
        </div>

        {/* CHECKOUT FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm"
            />
          </div>

          <div>
            <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm"
            />
          </div>

          <div>
            <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
              Phone Number
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm"
            />
          </div>

          <div>
            <label className="block font-sans text-sm text-dp-charcoal/80 mb-2">
              Delivery Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={4}
              required
              className="w-full border border-dp-charcoal/30 px-4 py-3 font-sans text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-dp-gold text-dp-black py-3 font-sans tracking-wide hover:bg-dp-velvet hover:text-white transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </PageContainer>
  );
};

export default Checkout;
