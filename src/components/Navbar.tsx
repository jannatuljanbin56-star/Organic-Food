import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  FileText,
  Shield,
  PlusCircle,
  LogOut,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    route, 
    navigate, 
    cartItemsCount, 
    setIsCartDrawerOpen, 
    wishlistCount,
    setIsWishlistDrawerOpen,
    setIsProductModalOpen,
    language, 
    setLanguage,
    isAdmin,
    adminLogout
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Base links visible to ALL visitors
  const baseNavLinks = [
    { label: language === 'bn' ? 'হোম' : 'Home', route: 'home' as const, path: '/' },
    { label: language === 'bn' ? 'অর্গানিক খাবার' : 'Organic Produce', route: 'shop' as const, path: '/products' },
    { label: language === 'bn' ? 'লোকাল ফার্ম' : 'Local Farms', route: 'farms' as const, path: '/local-farms' },
    { label: language === 'bn' ? 'আমাদের গল্প' : 'About Soil & Farm', route: 'about' as const, path: '/about-our-farm' },
    { label: language === 'bn' ? 'যোগাযোগ ও ম্যাপ' : 'Contact & Google Map', route: 'contact' as const, path: '/contact-and-pickup' },
    { label: 'XML Sitemap', route: 'sitemap' as const, path: '/sitemap.xml', icon: FileText }
  ];

  // Admin link ONLY visible to authenticated admin
  const navLinks = isAdmin 
    ? [
        ...baseNavLinks,
        { 
          label: language === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard', 
          route: 'admin' as const, 
          path: '/admin-portal', 
          icon: Shield,
          isAdminOnly: true
        }
      ]
    : baseNavLinks;

  const handleNavClick = (targetRoute: any) => {
    navigate(targetRoute);
    setMobileMenuOpen(false);
  };

  const displayName = language === 'bn' ? 'অর্গানিক ফুড' : 'Organic Food';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo: Organic Food */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg p-1"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-serif text-xl font-bold shadow-sm shadow-emerald-900/10 group-hover:bg-emerald-800 transition-colors">
                  🌱
                </div>
                <div>
                  <span className="block text-xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                    {displayName}
                  </span>
                  <span className="block text-xs font-medium text-emerald-800 tracking-wider uppercase">
                    {language === 'bn' ? '১০০% খাঁটি ও সার্টিফাইড লোকাল ফসল' : '100% Certified Local Organics'}
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = route === link.route;
              const isAdminItem = (link as any).isAdminOnly;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.route)}
                  className={`text-sm font-medium transition-colors py-2 relative cursor-pointer ${
                    isAdminItem
                      ? 'text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200'
                      : isActive 
                        ? 'text-emerald-800 font-semibold' 
                        : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.icon && <link.icon className="w-3.5 h-3.5 opacity-80" />}
                    {link.label}
                  </span>
                  {!isAdminItem && isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Header Options: ONLY Bangla & English Language Switcher + Cart */}
          <div className="flex items-center gap-3">
            
            {/* The Sole Header Option: Bangla & English Language Switcher */}
            <div className="flex items-center bg-stone-100 rounded-xl p-1 border border-stone-200 shadow-xs">
              <button 
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'bn' 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="বাংলা ভাষা নির্বাচন করুন"
              >
                🇧🇩 বাংলা
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'en' 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'text-stone-600 hover:text-stone-900'
                }`}
                title="Select English Language"
              >
                🇬🇧 English
              </button>
            </div>

            {/* ONLY visible if admin is logged in */}
            {isAdmin && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setIsProductModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                  title="Add Custom Organic Item"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? '+ নতুন পণ্য' : '+ Add Product'}</span>
                </button>

                <button
                  onClick={adminLogout}
                  className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold cursor-pointer"
                  title="Logout from Admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Wishlist Button (Starts at 0 for new visitors) */}
            <button
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="relative p-2.5 text-stone-700 hover:text-rose-600 hover:bg-rose-50/70 rounded-xl transition-colors cursor-pointer border border-stone-200"
              aria-label="View saved wishlist"
              title={language === 'bn' ? 'পছন্দের তালিকা (উইশলিস্ট)' : 'My Wishlist'}
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-600 fill-rose-600' : ''}`} />
              <span className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm ${
                wishlistCount > 0 ? 'bg-rose-600' : 'bg-stone-400'
              }`}>
                {wishlistCount}
              </span>
            </button>

            {/* Cart Button (Starts at 0 for new visitors) */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 text-stone-700 hover:text-emerald-800 hover:bg-emerald-50/70 rounded-xl transition-colors cursor-pointer border border-stone-200"
              aria-label="View shopping cart"
              title={language === 'bn' ? 'শপিং কার্ট' : 'Shopping Cart'}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className={`absolute -top-1.5 -right-1.5 min-w-[20px] h-5 text-white text-[11px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm ${
                cartItemsCount > 0 ? 'bg-emerald-700' : 'bg-stone-400'
              }`}>
                {cartItemsCount}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2">
            
            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-center bg-stone-100 rounded-xl p-1 border border-stone-200 mb-2">
              <button 
                onClick={() => setLanguage('bn')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                  language === 'bn' 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'text-stone-600'
                }`}
              >
                🇧🇩 বাংলা
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                  language === 'en' 
                    ? 'bg-emerald-700 text-white shadow-xs' 
                    : 'text-stone-600'
                }`}
              >
                🇬🇧 English
              </button>
            </div>

            {/* Mobile Wishlist & Cart Quick Triggers */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                onClick={() => {
                  setIsWishlistDrawerOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 bg-stone-100 hover:bg-stone-200 rounded-xl text-xs font-semibold text-stone-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-600 fill-rose-600' : 'text-stone-500'}`} />
                <span>{language === 'bn' ? `উইশলিস্ট (${wishlistCount})` : `Wishlist (${wishlistCount})`}</span>
              </button>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 rounded-xl text-xs font-semibold text-emerald-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700" />
                <span>{language === 'bn' ? `কার্ট (${cartItemsCount})` : `Cart (${cartItemsCount})`}</span>
              </button>
            </div>

            {navLinks.map((link) => {
              const isActive = route === link.route;
              const isAdminItem = (link as any).isAdminOnly;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.route)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                    isAdminItem
                      ? 'bg-amber-100 text-amber-900 font-bold border border-amber-300'
                      : isActive 
                        ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                        : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.icon && <link.icon className="w-4 h-4 text-emerald-700" />}
                    {link.label}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">{link.path}</span>
                </button>
              );
            })}

            {/* Mobile Admin Actions (ONLY if admin) */}
            {isAdmin && (
              <div className="pt-3 mt-2 border-t border-stone-200 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsProductModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 text-white rounded-lg font-medium text-sm hover:bg-emerald-800 transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>{language === 'bn' ? 'নতুন অর্গানিক পণ্য যুক্ত করুন' : 'Add New Organic Product'}</span>
                </button>

                <button
                  onClick={() => {
                    adminLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-rose-100 text-rose-700 rounded-lg font-medium text-xs hover:bg-rose-200 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'অ্যাডমিন লগআউট' : 'Admin Logout'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
