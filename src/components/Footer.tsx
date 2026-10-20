import React from 'react';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActivePolicy, setCurrentView } = useApp();

  return (
    <footer className="bg-[#18261C] text-[#C9D6CB] border-t border-[#263D2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-[#68BA7F]" />
              <span className="text-xl font-bold font-display text-white tracking-tight">
                Green Garden
              </span>
            </div>
            <p className="text-sm font-medium text-white/90">
              Grow More Greenery
            </p>
            <p className="text-xs text-[#9EB3A2] leading-relaxed max-w-sm">
              Discover plants, explore gardening essentials and learn how to care for your green spaces. Cultivating healthy, acclimatized saplings for homes, gardens, farms and parks.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentView('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#68BA7F] bg-[#223627] hover:bg-[#2C4433] rounded-md transition-colors border border-[#35523D]"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Nursery Staff & Admin Dashboard</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#A8BDAA]">
              <li>
                <a href="#" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">Shop Plants</a>
              </li>
              <li>
                <a href="#care-guide" className="hover:text-white transition-colors">Plant Care</a>
              </li>
              <li>
                <a href="#essentials" className="hover:text-white transition-colors">Gardening Essentials</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Additional Policies */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Policies & Compliance
            </h4>
            <ul className="space-y-2 text-xs text-[#A8BDAA]">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('Privacy Policy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('Terms and Conditions')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('Shipping Policy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicy('Return and Refund Policy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Return and Refund Policy
                </button>
              </li>
            </ul>

            <div className="pt-2 text-[11px] text-[#7A917F] leading-normal border-t border-[#273B2C]">
              Notice: The uploaded document provides the nursery concept, plant information and proposed database structure. Actual prices, contact information, delivery policies and business-specific claims must be supplied by the nursery before the website goes live.
            </div>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 border-t border-[#233728] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A917F] gap-4">
          <p>© {new Date().getFullYear()} Green Garden Nursery – Nursery Plant Management. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Cultivated with care for greener living spaces</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
