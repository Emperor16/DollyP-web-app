import PageContainer from "../components/layout/PageContainer";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { useCart } from "../context/CartContexts";

const Cart = () => {
  const { items, removeItem, updateQuantity } = useCart();

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-dp-black mb-4">Your Cart</h1>
        <p className="font-sans text-dp-charcoal/80">
          Review your selected items before checkout
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-serif text-2xl text-dp-black mb-2">Your cart is empty</h2>
          <p className="font-sans text-dp-charcoal/60">Add some products to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onRemove={removeItem}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary items={items} />
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Cart;