import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    setIsCheckoutOpen
  } = useApp();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 799;
  const progressToFreeDelivery = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);
  const remainingForFree = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FAFAF8] h-full shadow-2xl flex flex-col justify-between border-l border-[#DFE6DC]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5ECE3] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2D5A3C]" />
            <h3 className="text-base font-bold text-[#142318] font-display">
              Your Nursery Cart
            </h3>
            <span className="text-xs text-[#596B5D] font-mono tabular-nums">
              ({cart.reduce((a, b) => a + b.quantity, 0)} items)
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#58695C] hover:text-[#18261C] rounded-lg hover:bg-[#EEF3EC] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="px-5 py-2.5 bg-[#EEF5ED] border-b border-[#D8E6D6] text-xs">
          {remainingForFree > 0 ? (
            <p className="text-[#284B34] font-medium">
              Add <span className="font-bold tabular-nums font-mono">₹{remainingForFree}</span> more for Free Nursery Delivery!
            </p>
          ) : (
            <p className="text-[#1D6033] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>You have unlocked Free Nursery Delivery!</span>
            </p>
          )}
          <div className="w-full bg-[#D4E3D2] h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-[#2D5A3C] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeDelivery}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-[#EEF2EC]">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="pt-3 first:pt-0 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover border border-[#DFE6DC] bg-[#EAEFE8] shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#18261C] truncate">
                    {item.name}
                  </h4>
                  <div className="text-[11px] text-[#55675A]">
                    {item.unit || item.category}
                  </div>
                  <div className="text-xs font-bold text-[#142318] tabular-nums font-mono mt-0.5">
                    ₹{item.price} each
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5 border border-[#D5DED4] rounded-md bg-white p-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.id, -1)}
                    className="w-6 h-6 flex items-center justify-center text-xs text-[#334236] hover:bg-[#F0F4EF] rounded transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-xs font-semibold tabular-nums font-mono">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateCartQuantity(item.id, 1)}
                    className="w-6 h-6 flex items-center justify-center text-xs text-[#334236] hover:bg-[#F0F4EF] rounded transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-[#88998C] hover:text-red-700 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-[#A0B0A2] mx-auto" />
              <p className="text-sm font-semibold text-[#18261C]">Your cart is currently empty</p>
              <p className="text-xs text-[#526356] max-w-xs mx-auto">
                Discover our flowering shrubs, fruit plants, or organic compost to start growing your green space.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] rounded-lg transition-colors"
              >
                Browse Plants
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Subtotal & Checkout Trigger */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E5ECE3] bg-white space-y-3">
            <div className="space-y-1.5 text-xs text-[#4E6052]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#18261C] tabular-nums font-mono">
                  ₹{cartSubtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="font-semibold text-[#18261C] tabular-nums">
                  {cartSubtotal > freeDeliveryThreshold ? 'Free' : '₹50'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#142318] pt-2 border-t border-[#EEF2EC]">
                <span>Total Amount</span>
                <span className="tabular-nums font-mono">
                  ₹{cartSubtotal + (cartSubtotal > freeDeliveryThreshold ? 0 : 50)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#2D5A3C] hover:bg-[#22452E] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
