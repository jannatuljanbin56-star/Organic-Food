/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SeoHead } from './components/SeoHead';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductAdminModal } from './components/ProductAdminModal';
import { AdminLoginModal } from './components/AdminLoginModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ContactPage } from './pages/ContactPage';
import { FarmsPage } from './pages/FarmsPage';
import { AboutPage } from './pages/AboutPage';
import { SitemapPage } from './pages/SitemapPage';
import { LocalSeoHubPage } from './pages/LocalSeoHubPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { SeoSpecInspector } from './components/SeoSpecInspector';

const AppContent: React.FC = () => {
  const { route } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Dynamic SEO Meta Tags, OpenGraph & Schema.org */}
      <SeoHead />

      {/* Main Responsive Header with Organic Food branding & bilingual switcher */}
      <Navbar />

      {/* Main Content View with Semantic Hierarchy */}
      <main className="flex-1">
        {route === 'home' && <HomePage />}
        {route === 'shop' && <ShopPage />}
        {route === 'product-detail' && <ProductDetailPage />}
        {route === 'farms' && <FarmsPage />}
        {route === 'about' && <AboutPage />}
        {route === 'contact' && <ContactPage />}
        {route === 'sitemap' && <SitemapPage />}
        {route === 'seo-hub' && <LocalSeoHubPage />}
        {route === 'checkout' && <CheckoutPage />}
        {route === 'admin' && <AdminDashboardPage />}
      </main>

      {/* Persistent Shopping Cart Drawer */}
      <CartDrawer />

      {/* Persistent Wishlist Drawer (Starts at 0 for new users) */}
      <WishlistDrawer />

      {/* Custom Product Creator Modal (Available for Admin) */}
      <ProductAdminModal />

      {/* Protected Admin Login Modal */}
      <AdminLoginModal />

      {/* Real-time SEO Specification Inspector */}
      <SeoSpecInspector />

      {/* Local SEO NAP Footnote & Sitemap Directory */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
