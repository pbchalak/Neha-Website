import React, { useState } from 'react';
import { ShoppingBag, Eye, Sun, Droplets, CheckCircle, MessageSquare } from 'lucide-react';
import { Plant } from '../types';
import { useApp } from '../context/AppContext';

interface PlantCardProps {
  plant: Plant;
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const { setSelectedPlant, addToCart, setIsEnquiryOpen, setEnquiryTarget } = useApp();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (plant.stockQuantity <= 0) return;
    addToCart({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      quantity: 1,
      image: plant.image,
      category: plant.category
    });
  };

  const handleEnquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEnquiryTarget(`Enquiry regarding ${plant.name} (${plant.scientificName})`);
    setIsEnquiryOpen(true);
  };

  return (
    <article
      onClick={() => setSelectedPlant(plant)}
      className="group relative bg-white rounded-xl border border-[#E3E8E1] overflow-hidden hover:border-[#BFD0BE] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      {/* Visual Asset (65-75% visual dominance) */}
      <div className="relative aspect-[4/3] bg-[#EAEFE8] overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-[#E6ECE4] animate-pulse flex items-center justify-center text-xs text-[#6B7D70]">
            Loading specimen...
          </div>
        )}

        {imageError ? (
          <div className={`w-full h-full bg-gradient-to-br ${plant.fallbackGradient || 'from-emerald-800 to-slate-900'} flex flex-col items-center justify-center p-4 text-white text-center`}>
            <span className="text-xl font-display font-semibold mb-1">{plant.name}</span>
            <span className="text-xs italic text-white/80">{plant.scientificName}</span>
          </div>
        ) : (
          <img
            src={plant.image}
            alt={`${plant.name} (${plant.scientificName}) healthy nursery plant`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}

        {/* Quick action overlay */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPlant(plant);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-white/95 rounded-md shadow-sm hover:bg-white transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
          {plant.stockQuantity > 0 && (
            <button
              type="button"
              onClick={handleQuickAdd}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2D5A3C] rounded-md shadow-sm hover:bg-[#21432C] transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Zero-Pill Unboxed Clean Metadata */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#55675A] font-medium tracking-tight">
            <span>{plant.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Sun className="w-3 h-3 text-[#7B8B7F]" />
              {plant.sunlight}
            </span>
          </div>

          {/* Plant Name & Scientific Name */}
          <div className="mt-1">
            <h3 className="text-base font-semibold text-[#18261C] group-hover:text-[#2D5A3C] transition-colors">
              {plant.name}
            </h3>
            <p className="text-xs text-[#6A7B6E] italic font-serif">
              {plant.scientificName}
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs text-[#445347] line-clamp-2 mt-2 leading-relaxed">
            {plant.shortDescription}
          </p>
        </div>

        {/* Price, Stock and Actions */}
        <div className="pt-3 border-t border-[#EEF2EC] flex items-center justify-between gap-2">
          <div>
            <div className="text-base font-bold text-[#142318] tabular-nums font-mono">
              ₹{plant.price}
            </div>
            <div className="text-[11px] text-[#5A6D5F]">
              {plant.stockQuantity > 0 ? (
                <span className="text-[#2D5A3C] font-medium">{plant.stockQuantity} in stock</span>
              ) : (
                <span className="text-amber-800 font-medium">Restocking soon</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleEnquire}
              title="Enquire directly for plant availability or care questions"
              className="p-2 text-xs text-[#4E6052] hover:text-[#18261C] hover:bg-[#F2F6F1] rounded-md border border-[#DCE4DA] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>

            {plant.stockQuantity > 0 ? (
              <button
                type="button"
                onClick={handleQuickAdd}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] rounded-md transition-colors flex items-center gap-1"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEnquire}
                className="px-2.5 py-1.5 text-xs font-medium text-[#4D5F51] bg-[#F2F4F1] rounded-md hover:bg-[#E8EDE6] transition-colors"
              >
                Enquire
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
