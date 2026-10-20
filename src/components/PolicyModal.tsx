import React from 'react';
import { X, ShieldAlert, FileText, Truck, RefreshCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PolicyModal: React.FC = () => {
  const { activePolicy, setActivePolicy } = useApp();

  if (!activePolicy) return null;

  const renderPolicyContent = () => {
    switch (activePolicy) {
      case 'Privacy Policy':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-[#455648] leading-relaxed">
            <h4 className="font-bold text-[#18261C] text-sm">Customer Data Protection Policy</h4>
            <p>
              Green Garden Nursery respects your privacy. We only collect essential customer contact information (Name, Delivery Address, Phone Number, Email) necessary for routing live nursery shipments and dispatching plant care instructions.
            </p>
            <p>
              We do not sell, rent, or trade your personal data with third-party advertising brokers. Any telephone or WhatsApp communications are used strictly for order verification, address navigation, and botanical care support.
            </p>
            <p>
              Payment data processed via UPI or Card is handled via encrypted banking gateways. Green Garden never stores raw credit card numbers or banking PINs.
            </p>
          </div>
        );

      case 'Terms and Conditions':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-[#455648] leading-relaxed">
            <h4 className="font-bold text-[#18261C] text-sm">Nursery Supply Terms & Plant Biology Notices</h4>
            <p>
              Plants are living biological organisms. Slight variations in size, foliage density, and blooming stage are natural and expected based on season, temperature, and sun exposure.
            </p>
            <p>
              Actual prices, contact information, delivery policies, and business-specific claims must be supplied by the nursery before the website goes live. Plant availability should be confirmed before publishing the final catalogue.
            </p>
            <p>
              Care instructions and soil recommendations provided on this site are compiled as general guidelines by horticultural specialists. Environmental factors such as local microclimate, water hardness, and indoor light levels will influence plant adaptation.
            </p>
          </div>
        );

      case 'Shipping Policy':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-[#455648] leading-relaxed">
            <h4 className="font-bold text-[#18261C] text-sm">Live Plant Handling & Packaging Protocol</h4>
            <p>
              All saplings and potted plants are watered and packed in ventilated, shock-absorbent cartons to protect root balls and delicate green shoots during transit.
            </p>
            <p>
              Orders are dispatched within 24 to 48 hours to minimize time in transit. Deliveries take 1-3 business days depending on customer distance from the nursery hub.
            </p>
            <p>
              Free Nursery Delivery is unlocked on all orders above ₹799. Standard delivery fee is ₹50 for local and regional transit.
            </p>
          </div>
        );

      case 'Return and Refund Policy':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-[#455648] leading-relaxed">
            <h4 className="font-bold text-[#18261C] text-sm">Live Arrival Guarantee & Replacement Process</h4>
            <p>
              We guarantee healthy live arrival. If a plant arrives with damaged stems or severe transit stress, please take a clear photograph within 24 hours of delivery and share it with our nursery support desk.
            </p>
            <p>
              We will gladly issue a free replacement sapling or a full refund after reviewing the photo evidence with our head horticulturist.
            </p>
            <p>
              Because plants are perishable live specimens, returns cannot be accepted due to general changes of mind after 48 hours of successful acclimatization in your home.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAFAF8] w-full max-w-xl rounded-2xl border border-[#DFE6DC] shadow-2xl p-6 sm:p-8 space-y-5 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E5ECE3]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#2D5A3C]" />
            <h3 className="text-xl font-bold text-[#142318] font-display">
              {activePolicy}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setActivePolicy(null)}
            className="p-1.5 text-[#586A5C] hover:text-[#18261C] rounded-lg hover:bg-[#EEF3ED]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-1">
          {renderPolicyContent()}
        </div>

        <div className="pt-4 border-t border-[#E5ECE3] flex justify-end">
          <button
            type="button"
            onClick={() => setActivePolicy(null)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#22452E] rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
