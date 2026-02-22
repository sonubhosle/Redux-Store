// components/CartDrawer.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShoppingBag,
  X,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Truck,
  Shield,
} from "lucide-react";
import { toast } from "react-toastify";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Mock cart data (replace with actual Redux state)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      color: "Black",
      inStock: true,
    },
    {
      id: 2,
      name: "Minimalist Watch",
      price: 199.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop",
      color: "Silver",
      inStock: true,
    },
    {
      id: 3,
      name: "Leather Backpack",
      price: 89.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop",
      color: "Brown",
      inStock: false,
    },
  ]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.info("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((sum, item) => {
      // Mock savings calculation (10% of each item)
      return sum + item.price * item.quantity * 0.1;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const savings = calculateSavings();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - savings + shipping;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const handleViewCart = () => {
    onClose();
    navigate("/cart");
  };

  const handleContinueShopping = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-70 bg-black/50
          transition-opacity duration-300 ease-in-out
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-80 h-full w-full sm:w-120 bg-white shadow-2xl
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                  {itemCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-stone-800">Your Cart</h2>
              <p className="text-sm text-stone-500">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl bg-stone-100 hover:bg-stone-200 transition-colors duration-200 group"
          >
            <X size={20} className="text-stone-600 group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={40} className="text-stone-400" />
              </div>
              <h3 className="text-lg font-semibold text-stone-800 mb-2">
                Your cart is empty
              </h3>
              <p className="text-sm text-stone-500 mb-6">
                Looks like you haven't added anything to your cart yet
              </p>
              <button
                onClick={handleContinueShopping}
                className="px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={`
                    flex gap-4 p-4 rounded-2xl border-2 transition-all duration-200
                    ${item.inStock 
                      ? "border-stone-200 hover:border-amber-200 hover:shadow-lg" 
                      : "border-red-200 bg-red-50/30"
                    }
                  `}
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-xs text-white font-bold px-2 py-1 bg-red-500 rounded-full">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-stone-800 mb-1 truncate">
                          {item.name}
                        </h4>
                        {item.color && (
                          <p className="text-xs text-stone-500 mb-2">
                            Color: {item.color}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-100 transition-colors duration-200 group"
                      >
                        <Trash2 size={16} className="text-stone-400 group-hover:text-red-500" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={!item.inStock}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          <Minus size={14} className="text-stone-600" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-stone-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={!item.inStock}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        >
                          <Plus size={14} className="text-stone-600" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-amber-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-xs text-stone-400">
                            ${item.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-stone-200 bg-stone-50">
            {/* Promo Code */}
            <div className="p-6 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Tag size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="w-full pl-10 pr-3 py-2.5 bg-white border-2 border-stone-200 rounded-xl text-sm text-stone-700 placeholder-stone-400 focus:border-amber-500 focus:outline-none transition-colors duration-200"
                  />
                </div>
                <button className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold rounded-xl transition-colors duration-200">
                  Apply
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Subtotal</span>
                <span className="font-semibold text-stone-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Savings</span>
                <span className="font-semibold text-green-600">-${savings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Shipping</span>
                <span className="font-semibold text-stone-800">
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 p-2 rounded-lg">
                  <Truck size={14} />
                  <span>Add ${(100 - subtotal).toFixed(2)} more for free shipping</span>
                </div>
              )}
              <div className="pt-3 border-t border-stone-200">
                <div className="flex justify-between text-base font-bold">
                  <span className="text-stone-800">Total</span>
                  <span className="text-amber-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-3">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Checkout
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={handleViewCart}
                  className="w-full py-3.5 bg-white hover:bg-stone-100 text-stone-700 font-semibold rounded-xl border-2 border-stone-200 hover:border-amber-500 transition-all duration-300"
                >
                  View Cart
                </button>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-2">
                <Shield size={14} />
                <span>Secure checkout · 30-day returns</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;