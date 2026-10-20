import React from 'react';
import { ShoppingBag, ShieldCheck, Store } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { cartTotalCount, setIsCartOpen, currentView, setCurrentView } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur-md border-b border-[#E7E5DF] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setCurrentView('storefront');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-bold tracking-tight text-[#1B3926] font-display whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          Green Garden
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        {currentView === 'storefront' ? (
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#465349]">
            <a
              href="#catalog"
              className="hover:text-[#1B3926] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2D5A3C] hover:after:w-full after:transition-all"
            >
              Shop Plants
            </a>
            <a
              href="#essentials"
              className="hover:text-[#1B3926] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2D5A3C] hover:after:w-full after:transition-all"
            >
              Gardening Essentials
            </a>
            <a
              href="#care-guide"
              className="hover:text-[#1B3926] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2D5A3C] hover:after:w-full after:transition-all"
            >
              Plant Care Guide
            </a>
            <a
              href="#about"
              className="hover:text-[#1B3926] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2D5A3C] hover:after:w-full after:transition-all"
            >
              About Nursery
            </a>
            <a
              href="#contact"
              className="hover:text-[#1B3926] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#2D5A3C] hover:after:w-full after:transition-all"
            >
              Contact Us
            </a>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-4 text-xs text-[#526356]">
            <span>Nursery Plant Operations & Admin Portal</span>
          </div>
        )}

        {/* Zone 3: 1 primary action + cart & portal switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {currentView === 'storefront' ? (
            <>
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-lg border border-[#D5DCD4] text-[#1B3926] hover:bg-[#EEF3ED] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5A3C]"
                aria-label={`Open shopping cart with ${cartTotalCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#2D5A3C] text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                    {cartTotalCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('admin')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#2D5A3C] bg-[#EEF4EE] hover:bg-[#E0EBE0] border border-[#CCDCCD] rounded-lg transition-colors whitespace-nowrap"
                title="Switch to Nursery Plant Management & Inventory"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Nursery Admin</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentView('storefront')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2D5A3C] hover:bg-[#234830] rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Back to Storefront</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
