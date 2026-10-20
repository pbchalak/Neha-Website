import React from 'react';
import { ArrowRight, Leaf, Shield, Sparkles, Sun } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-[#E7E5DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Hero: 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#2D5A3C] bg-[#EEF4EE] px-3 py-1 rounded-md border border-[#D3E2D3]">
              <Leaf className="w-3.5 h-3.5" />
              <span>Nursery Plant Management & Botanical Supply</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#142318] leading-[1.1] font-display text-balance">
              Bring Home the Beauty of Nature
            </h1>

            <p className="text-base sm:text-lg text-[#3E4D42] leading-relaxed max-w-2xl">
              Discover a variety of plants that add freshness, colour and natural beauty to your surroundings. From vibrant flowering plants to green ornamental plants, fruit plants and vegetable seedlings, explore the world of gardening with Green Garden. Find plants, learn about their care requirements and make your home and garden greener.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#2D5A3C] hover:bg-[#22452E] rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-[0.99]"
              >
                <span>Explore Plants</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#2D5A3C] bg-white hover:bg-[#F2F6F2] border border-[#CAD8CC] rounded-lg shadow-2xs transition-all whitespace-nowrap"
              >
                <span>Contact Us</span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#526356]">
              <span>Grown in sustainable nurseries</span>
              <span aria-hidden="true">·</span>
              <span>Acclimatized for home gardens</span>
              <span aria-hidden="true">·</span>
              <span>Comprehensive care guides</span>
            </div>
          </div>

          {/* Right Column: Hero Nursery Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#DCE4DB] aspect-[4/3] lg:aspect-[5/4] bg-[#E8EDE6]">
              <img
                src="/src/assets/images/hero_botanical_nursery_1792516246969.jpg"
                alt="Green Garden sunlit greenhouse nursery with lush healthy plants and terracotta pots"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 rounded-lg bg-black/40 backdrop-blur-xs border border-white/10 text-xs">
                <p className="font-semibold text-sm">Green Garden Greenhouse Hub</p>
                <p className="text-white/80">Cultivating healthy flowering, fruit, medicinal, and ornamental species</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Highlights Strip below Hero split */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#E7E5DF]">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-[#E4EAE2]">
            <Leaf className="w-5 h-5 text-[#2D5A3C] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#18261C]">20+ Hand-Curated Species</p>
              <p className="text-xs text-[#5C6E61]">Flowering, fruit, medicinal & ornamental</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-[#E4EAE2]">
            <Sun className="w-5 h-5 text-[#2D5A3C] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#18261C]">Sun & Soil Calibrated</p>
              <p className="text-xs text-[#5C6E61]">Accurate sunlight & watering guides</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-[#E4EAE2]">
            <Sparkles className="w-5 h-5 text-[#2D5A3C] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#18261C]">Gardening Essentials</p>
              <p className="text-xs text-[#5C6E61]">Compost, potting soil, pots & tools</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-white/70 border border-[#E4EAE2]">
            <Shield className="w-5 h-5 text-[#2D5A3C] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#18261C]">Safe Nursery Delivery</p>
              <p className="text-xs text-[#5C6E61]">Carefully packaged live root systems</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
