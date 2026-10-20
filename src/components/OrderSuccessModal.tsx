import React from 'react';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderSuccessModal: React.FC = () => {
  const { confirmedOrder, setConfirmedOrder, setCurrentView } = useApp();

  if (!confirmedOrder) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAFAF8] w-full max-w-lg rounded-2xl border border-[#DFE6DC] shadow-2xl p-6 sm:p-8 space-y-6 text-center my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 bg-[#EEF5ED] text-[#2D5A3C] rounded-full flex items-center justify-center mx-auto border border-[#CDE0CC]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#2D5A3C]">
            Order Confirmed & Logged
          </span>
          <h3 className="text-2xl font-bold text-[#142318] font-display mt-1">
            Thank You, {confirmedOrder.customerName}!
          </h3>
          <p className="text-xs text-[#526356] mt-1">
            Order Reference <span className="font-mono font-bold text-[#18261C]">{confirmedOrder.id}</span>
          </p>
        </div>

        {/* Status Callout */}
        <div className="p-3.5 bg-white rounded-xl border border-[#DFE5DC] text-left text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[#55675A]">Fulfillment Status</span>
            <span className="font-semibold text-[#2D5A3C] flex items-center gap-1">
              <PackageCheck className="w-3.5 h-3.5" />
              Preparing Root Balls in Nursery
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#55675A]">Payment Method</span>
            <span className="font-semibold text-[#18261C]">{confirmedOrder.paymentMethod} ({confirmedOrder.paymentStatus})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#55675A]">Total Billed</span>
            <span className="font-semibold text-[#18261C] font-mono tabular-nums">₹{confirmedOrder.total}</span>
          </div>
          <div className="pt-2 border-t border-[#EEF2EC] text-[11px] text-[#69796C]">
            Delivering to: <span className="font-medium text-[#18261C]">{confirmedOrder.deliveryAddress}, {confirmedOrder.city}</span>
          </div>
        </div>

        <p className="text-xs text-[#526356] leading-relaxed">
          Our nursery staff will carefully pack your live plants with ventilated moisture wrap to guarantee fresh arrival. An SMS and email receipt has been sent to {confirmedOrder.email}.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              setConfirmedOrder(null);
              setCurrentView('admin');
            }}
            className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-semibold text-[#2D5A3C] bg-[#EEF5ED] hover:bg-[#DFEDE0] border border-[#CCDCCD] rounded-lg transition-colors"
          >
            Track in Nursery Admin
          </button>

          <button
            type="button"
            onClick={() => setConfirmedOrder(null)}
            className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#22452E] rounded-lg transition-colors"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
