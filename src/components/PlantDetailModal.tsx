import React, { useState } from 'react';
import { X, Sun, Droplets, Layers, Sparkles, Check, ShoppingBag, MessageSquare, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PlantDetailModal: React.FC = () => {
  const { selectedPlant, setSelectedPlant, addToCart, setIsEnquiryOpen, setEnquiryTarget } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!selectedPlant) return null;

  const handleAddToCart = () => {
    if (selectedPlant.stockQuantity <= 0) return;
    addToCart({
      id: selectedPlant.id,
      name: selectedPlant.name,
      price: selectedPlant.price,
      quantity,
      image: selectedPlant.image,
      category: selectedPlant.category
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleEnquire = () => {
    setEnquiryTarget(`Enquiry regarding ${selectedPlant.name} (${selectedPlant.scientificName})`);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-[#FAFAF8] w-full max-w-4xl rounded-2xl border border-[#DFE6DE] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedPlant(null)}
          className="absolute top-4 right-4 z-10 p-2 text-[#4D5D51] hover:text-[#18261C] bg-white/80 hover:bg-white rounded-full shadow-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Photograph & Visual specs */}
          <div className="md:col-span-5 bg-[#EAEFE8] p-6 flex flex-col justify-between">
            <div className="rounded-xl overflow-hidden shadow-sm border border-[#D5E0D4] aspect-square bg-[#DFE7DD]">
              <img
                src={selectedPlant.image}
                alt={`${selectedPlant.name} (${selectedPlant.scientificName})`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-6 space-y-3">
              <div className="p-3.5 bg-white rounded-xl border border-[#DFE6DC] text-xs space-y-2">
                <div className="flex items-center justify-between text-[#5C6E61]">
                  <span>Category</span>
                  <span className="font-semibold text-[#18261C]">{selectedPlant.category}</span>
                </div>
                <div className="flex items-center justify-between text-[#5C6E61]">
                  <span>Stock Availability</span>
                  <span className="font-semibold text-[#2D5A3C]">
                    {selectedPlant.stockQuantity > 0 ? `${selectedPlant.stockQuantity} plants available` : 'Sold out / Restocking'}
                  </span>
                </div>
                {selectedPlant.idealSeason && (
                  <div className="flex items-center justify-between text-[#5C6E61]">
                    <span>Best Season</span>
                    <span className="font-semibold text-[#18261C]">{selectedPlant.idealSeason}</span>
                  </div>
                )}
                {selectedPlant.difficulty && (
                  <div className="flex items-center justify-between text-[#5C6E61]">
                    <span>Gardening Level</span>
                    <span className="font-semibold text-[#18261C]">{selectedPlant.difficulty}</span>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-[#69796C] text-center">
                Acclimatized specimen nurtured with organic compost in nursery beds.
              </div>
            </div>
          </div>

          {/* Right Column: Complete Plant Information & Contiguous Purchase Module */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header Info */}
              <div>
                <div className="text-xs text-[#5D6F62] font-medium tracking-tight">
                  {selectedPlant.category}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#142318] font-display mt-0.5">
                  {selectedPlant.name}
                </h2>
                <p className="text-sm text-[#4E6152] italic font-serif mt-0.5">
                  {selectedPlant.scientificName}
                </p>
              </div>

              {/* Price & Stock */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-[#E8EEE6]">
                <span className="text-3xl font-bold text-[#142318] tabular-nums font-mono">
                  ₹{selectedPlant.price}
                </span>
                <span className="text-xs text-[#526356]">
                  per nursery pot / rooted sapling
                </span>
              </div>

              {/* Descriptions */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#213125] leading-relaxed">
                  {selectedPlant.shortDescription}
                </p>
                <p className="text-xs text-[#4E6052] leading-relaxed">
                  {selectedPlant.fullDescription}
                </p>
              </div>

              {/* Key Care Requirements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-white border border-[#E1E8DF] flex items-start gap-2.5">
                  <Sun className="w-4 h-4 text-[#C98A2C] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-semibold text-[#1B271F]">Sunlight</span>
                    <span className="text-xs text-[#4F6253]">{selectedPlant.sunlight}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border border-[#E1E8DF] flex items-start gap-2.5">
                  <Droplets className="w-4 h-4 text-[#35728A] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-semibold text-[#1B271F]">Watering</span>
                    <span className="text-xs text-[#4F6253]">{selectedPlant.watering}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border border-[#E1E8DF] flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-[#8C6239] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-semibold text-[#1B271F]">Suitable Soil</span>
                    <span className="text-xs text-[#4F6253]">{selectedPlant.suitableSoil}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white border border-[#E1E8DF] flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#2D5A3C] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[11px] font-semibold text-[#1B271F]">Fertilizer</span>
                    <span className="text-xs text-[#4F6253]">{selectedPlant.fertilizer}</span>
                  </div>
                </div>
              </div>

              {/* Care Instructions List */}
              <div className="pt-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C2C20] mb-2">
                  Plant Care Instructions
                </h4>
                <ul className="space-y-1.5 text-xs text-[#47574B]">
                  {selectedPlant.careInstructions.map((instruction, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2D5A3C] mt-1.5 shrink-0" />
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contiguous Purchase Module */}
            <div className="pt-6 border-t border-[#E8EEE6] space-y-3">
              {selectedPlant.stockQuantity > 0 ? (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-between border border-[#CDD8CC] rounded-lg bg-white p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="w-9 h-9 flex items-center justify-center text-sm font-semibold text-[#18261C] hover:bg-[#F2F6F1] rounded disabled:opacity-40 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-mono tabular-nums text-sm font-semibold text-[#18261C]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(selectedPlant.stockQuantity, quantity + 1))}
                      disabled={quantity >= selectedPlant.stockQuantity}
                      className="w-9 h-9 flex items-center justify-center text-sm font-semibold text-[#18261C] hover:bg-[#F2F6F1] rounded disabled:opacity-40 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 py-3 px-5 text-sm font-semibold text-white bg-[#2D5A3C] hover:bg-[#22452E] rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart (₹{selectedPlant.price * quantity})</span>
                      </>
                    )}
                  </button>

                  {/* Enquire Now Button */}
                  <button
                    type="button"
                    onClick={handleEnquire}
                    className="py-3 px-4 text-xs font-semibold text-[#2D5A3C] bg-white hover:bg-[#F2F7F2] border border-[#CAD8CC] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enquire Now</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>This plant is currently out of stock in our nursery beds.</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleEnquire}
                    className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#2D5A3C] hover:bg-[#22452E] rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enquire for Next Batch Availability</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
