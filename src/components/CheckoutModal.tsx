import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Truck, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartSubtotal, createOrder } = useApp();

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    city: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery' as 'Cash on Delivery' | 'UPI' | 'Card' | 'Net Banking',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const deliveryFee = cartSubtotal > 799 ? 0 : 50;
  const totalAmount = cartSubtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      createOrder({
        customerName: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        deliveryAddress: formData.deliveryAddress,
        city: formData.city,
        pincode: formData.pincode,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      });
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAFAF8] w-full max-w-2xl rounded-2xl border border-[#DFE6DC] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E3ECE1] bg-white flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#142318] font-display">
              Complete Your Plant Order
            </h3>
            <p className="text-xs text-[#526356]">
              Secure nursery packing & doorstep seedling delivery
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-[#586A5C] hover:text-[#18261C] rounded-lg hover:bg-[#EEF3ED]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* Customer Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2C20]">
              1. Delivery Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#18261C] mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18261C] mb-1">
                  Contact Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98450 12345"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#18261C] mb-1">
                  Email Address (for Receipt & Tracking) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. radhika@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#18261C] mb-1">
                  Complete Street Address / Apartment / House No. *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Flat 304, Green Heights, Rose Garden Road"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18261C] mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bengaluru"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18261C] mb-1">
                  PIN / Postal Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 560038"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2C20]">
              2. Select Payment Mode
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label
                className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 transition-colors ${
                  formData.paymentMethod === 'Cash on Delivery'
                    ? 'border-[#2D5A3C] bg-[#EEF5ED]'
                    : 'border-[#DFE5DC] bg-white hover:bg-[#F9FBF8]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={formData.paymentMethod === 'Cash on Delivery'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'Cash on Delivery' })}
                  className="text-[#2D5A3C] focus:ring-[#2D5A3C]"
                />
                <Banknote className="w-4 h-4 text-[#2D5A3C]" />
                <div className="text-xs">
                  <span className="font-semibold block text-[#18261C]">Cash on Delivery</span>
                  <span className="text-[#5B6C5E]">Pay upon safe plant handover</span>
                </div>
              </label>

              <label
                className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 transition-colors ${
                  formData.paymentMethod === 'UPI'
                    ? 'border-[#2D5A3C] bg-[#EEF5ED]'
                    : 'border-[#DFE5DC] bg-white hover:bg-[#F9FBF8]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={formData.paymentMethod === 'UPI'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'UPI' })}
                  className="text-[#2D5A3C] focus:ring-[#2D5A3C]"
                />
                <Smartphone className="w-4 h-4 text-[#2D5A3C]" />
                <div className="text-xs">
                  <span className="font-semibold block text-[#18261C]">Instant UPI</span>
                  <span className="text-[#5B6C5E]">GPay, PhonePe, Paytm, QR</span>
                </div>
              </label>

              <label
                className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 transition-colors ${
                  formData.paymentMethod === 'Card'
                    ? 'border-[#2D5A3C] bg-[#EEF5ED]'
                    : 'border-[#DFE5DC] bg-white hover:bg-[#F9FBF8]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Card"
                  checked={formData.paymentMethod === 'Card'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'Card' })}
                  className="text-[#2D5A3C] focus:ring-[#2D5A3C]"
                />
                <CreditCard className="w-4 h-4 text-[#2D5A3C]" />
                <div className="text-xs">
                  <span className="font-semibold block text-[#18261C]">Credit / Debit Card</span>
                  <span className="text-[#5B6C5E]">Visa, Mastercard, RuPay</span>
                </div>
              </label>

              <label
                className={`p-3 rounded-lg border cursor-pointer flex items-center gap-3 transition-colors ${
                  formData.paymentMethod === 'Net Banking'
                    ? 'border-[#2D5A3C] bg-[#EEF5ED]'
                    : 'border-[#DFE5DC] bg-white hover:bg-[#F9FBF8]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Net Banking"
                  checked={formData.paymentMethod === 'Net Banking'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'Net Banking' })}
                  className="text-[#2D5A3C] focus:ring-[#2D5A3C]"
                />
                <ShieldCheck className="w-4 h-4 text-[#2D5A3C]" />
                <div className="text-xs">
                  <span className="font-semibold block text-[#18261C]">Net Banking</span>
                  <span className="text-[#5B6C5E]">All major retail banks</span>
                </div>
              </label>
            </div>
          </div>

          {/* Delivery Notes */}
          <div className="space-y-1 pt-1">
            <label className="block text-xs font-semibold text-[#18261C]">
              Special Handling or Delivery Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Leave with security guard, call when arriving at gate"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-white border border-[#D5DED5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#2D5A3C]"
            />
          </div>

          {/* Order Summary & Total */}
          <div className="p-4 bg-white rounded-xl border border-[#DFE6DC] space-y-2">
            <div className="flex justify-between text-xs text-[#526356]">
              <span>Cart Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} items)</span>
              <span className="font-mono tabular-nums text-[#18261C]">₹{cartSubtotal}</span>
            </div>
            <div className="flex justify-between text-xs text-[#526356]">
              <span>Nursery Specialized Live-Plant Delivery</span>
              <span className="font-mono tabular-nums text-[#18261C]">
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#142318] pt-2 border-t border-[#EEF2EC]">
              <span>Payable Total</span>
              <span className="font-mono tabular-nums">₹{totalAmount}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 text-xs sm:text-sm font-semibold text-white bg-[#2D5A3C] hover:bg-[#22452E] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Preparing Nursery Dispatch Ticket...</span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Confirm Order & Dispatch (₹{totalAmount})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
