import React from 'react';
import { ShoppingBag, Check, ShieldCheck, Wrench } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GardeningProduct } from '../types';

export const GardeningEssentialsSection: React.FC = () => {
  const { gardeningProducts, addToCart } = useApp();

  const handleAddToCart = (product: GardeningProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
      unit: product.unit
    });
  };

  return (
    <section id="essentials" className="py-12 lg:py-16 bg-[#F4F6F2] border-y border-[#E2E8E0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2D5A3C]">
              Nutrient-Rich Growth Supplies
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#142318] font-display mt-1">
              Gardening Essentials
            </h2>
            <p className="text-sm text-[#4E6052] max-w-xl mt-1.5">
              Organic compost, earthworm vermicompost, balanced potting mixes, durable terracotta pots, seed starter kits, and professional gardening tools.
            </p>
          </div>
          <div className="text-xs text-[#526356] font-mono tabular-nums">
            {gardeningProducts.length} nursery-certified essential items
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gardeningProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#DFE6DC] overflow-hidden hover:border-[#BED0BC] hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div className="aspect-[4/3] bg-[#EAEFE8] relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="text-[11px] text-[#55675A] font-medium">
                    {item.unit}
                  </div>
                  <h3 className="text-sm font-semibold text-[#18261C] mt-0.5 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#48594C] line-clamp-2 mt-1.5 leading-relaxed">
                    {item.shortDescription}
                  </p>
                  <p className="text-[11px] text-[#697A6D] mt-2 italic bg-[#F7FAF6] p-2 rounded border border-[#E8EEE6]">
                    Tip: {item.usageTips}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EEF2EC] flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-[#142318] tabular-nums font-mono">
                      ₹{item.price}
                    </span>
                    <div className="text-[11px] text-[#5A6D5F]">
                      {item.stockQuantity > 0 ? `${item.stockQuantity} available` : 'Restocking'}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stockQuantity <= 0}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] disabled:opacity-40 rounded-md transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
