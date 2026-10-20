import React from 'react';
import { Check, HeartHandshake, Trees, Sprout, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const whyPoints = [
    'Explore different categories of plants.',
    'Discover plants for gardens and suitable indoor spaces.',
    'Access useful plant-care information.',
    'Learn about soil, compost and plant nutrition.',
    'Find options for home gardening and landscaping.',
    'Explore gardening products, subject to availability.'
  ];

  return (
    <section id="about" className="py-12 lg:py-16 bg-[#F6F5F0] border-t border-[#E3E7E0] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* About Us & Purpose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#2D5A3C]">
              About Green Garden
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#142318] font-display leading-tight">
              Cultivating Healthy Plants for Every Living Space
            </h2>
            <p className="text-sm sm:text-base text-[#405244] leading-relaxed">
              Green Garden is a plant nursery concept focused on growing, maintaining and supplying healthy plants for homes, gardens, farms, parks and landscaping. The nursery offers a variety of flowering plants, fruit plants, medicinal plants, ornamental plants and vegetable seedlings.
            </p>
            <p className="text-sm sm:text-base text-[#405244] leading-relaxed">
              Our aim is to encourage gardening, promote greenery and help people discover plants suitable for their spaces.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-xl border border-[#DFE5DC]">
                <Trees className="w-5 h-5 text-[#2D5A3C] mb-2" />
                <h4 className="text-sm font-semibold text-[#18261C]">Promote Greenery</h4>
                <p className="text-xs text-[#596B5D] mt-1">
                  Supporting urban gardening, parks, and regional biodiversity.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-[#DFE5DC]">
                <Sprout className="w-5 h-5 text-[#2D5A3C] mb-2" />
                <h4 className="text-sm font-semibold text-[#18261C]">Healthy Saplings</h4>
                <p className="text-xs text-[#596B5D] mt-1">
                  Hardened root balls ready for transplanting into beds or pots.
                </p>
              </div>
            </div>
          </div>

          {/* Importance of Plants card */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#DFE6DC] shadow-xs space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8A5F32]">
                Environmental & Well-being Impact
              </div>
              <h3 className="text-2xl font-bold text-[#142318] font-display">
                Importance of Plants
              </h3>
              <p className="text-xs sm:text-sm text-[#4E6052] leading-relaxed">
                Plants contribute to greener surroundings and support gardening, landscaping and environmental conservation. They bring colour and visual appeal to homes, offices, gardens and public spaces.
              </p>
              <p className="text-xs sm:text-sm text-[#4E6052] leading-relaxed">
                Green Garden aims to encourage people to grow plants, maintain green spaces and develop an interest in gardening.
              </p>
            </div>

            <div className="pt-4 border-t border-[#EEF2EC]">
              <h4 className="text-sm font-bold text-[#18261C] mb-3">
                Why Choose Green Garden?
              </h4>
              <ul className="space-y-2.5">
                {whyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3E5142]">
                    <span className="w-4 h-4 rounded-full bg-[#EEF5ED] text-[#2D5A3C] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-[#78887B] italic mt-4 pt-3 border-t border-[#F0F4EF]">
                These are proposed website messaging points, not independently verified business claims.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
