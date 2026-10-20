/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { GardeningEssentialsSection } from './components/GardeningEssentialsSection';
import { PlantCareSection } from './components/PlantCareSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PlantDetailModal } from './components/PlantDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { EnquiryModal } from './components/EnquiryModal';
import { PolicyModal } from './components/PolicyModal';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1B271F]">
      <Navbar />

      <main className="flex-1">
        {currentView === 'storefront' ? (
          <>
            <Hero />
            <CatalogSection />
            <GardeningEssentialsSection />
            <PlantCareSection />
            <AboutSection />
            <ContactSection />
          </>
        ) : (
          <AdminDashboard />
        )}
      </main>

      <Footer />

      {/* Global Interactive Modals & Drawers */}
      <PlantDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <EnquiryModal />
      <PolicyModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
