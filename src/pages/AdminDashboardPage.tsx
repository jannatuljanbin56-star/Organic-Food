import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Clock, 
  Truck, 
  CheckCircle2, 
  LogOut, 
  MapPin, 
  Phone, 
  DollarSign, 
  AlertCircle, 
  ExternalLink, 
  Save, 
  Image as ImageIcon, 
  Sparkles, 
  Layers, 
  X,
  CreditCard,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, Product } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { 
    isAdmin, 
    adminLogout, 
    products, 
    updateProduct, 
    deleteProduct, 
    setIsProductModalOpen, 
    orders, 
    updateOrderStatus, 
    seoSettings, 
    updateSeoSettings, 
    siteContent,
    updateSiteContent,
    locations,
    navigate,
    language,
    firebaseConnected,
    firebaseProjectId
  } = useApp();

  const [activeTab, setActiveTab] = useState<'inventory' | 'hero' | 'budget' | 'orders' | 'seo'>('inventory');

  // Full Product Edit Modal State
  const [selectedProductToEdit, setSelectedProductToEdit] = useState<Product | null>(null);
  const [productEditForm, setProductEditForm] = useState<Product | null>(null);
  const [productSaveSuccess, setProductSaveSuccess] = useState(false);

  // Hero CMS State
  const [heroForm, setHeroForm] = useState({
    announcementTextEn: siteContent.announcementTextEn,
    announcementTextBn: siteContent.announcementTextBn,
    heroHeadlineEn: siteContent.heroHeadlineEn,
    heroHeadlineBn: siteContent.heroHeadlineBn,
    heroSubtitleEn: siteContent.heroSubtitleEn,
    heroSubtitleBn: siteContent.heroSubtitleBn,
    heroImage: siteContent.heroImage
  });
  const [heroSaved, setHeroSaved] = useState(false);

  // Budget & Delivery Fees State
  const [budgetForm, setBudgetForm] = useState({
    deliveryFee: siteContent.deliveryFee.toString(),
    freeDeliveryThreshold: siteContent.freeDeliveryThreshold.toString(),
    bannerDiscountTextEn: siteContent.bannerDiscountTextEn,
    bannerDiscountTextBn: siteContent.bannerDiscountTextBn
  });
  const [budgetSaved, setBudgetSaved] = useState(false);

  // SEO Form State
  const [adminSeo, setAdminSeo] = useState({
    businessName: seoSettings.businessName,
    city: seoSettings.city,
    contactPhone: seoSettings.contactPhone,
    contactEmail: seoSettings.contactEmail,
    streetAddress: seoSettings.streetAddress,
    targetKeywords: seoSettings.targetKeywords.join(', ')
  });
  const [seoSaved, setSeoSaved] = useState(false);

  const [copiedSecretUrl, setCopiedSecretUrl] = useState(false);

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto shadow-inner border border-rose-200">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full">
            403 Restricted Admin Area
          </span>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mt-2">
            {language === 'bn' ? 'শুধুমাত্র অনুমোদিত অ্যাডমিন অ্যাক্সেস' : 'Administrator Authorization Required'}
          </h1>
          <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
            {language === 'bn' 
              ? 'এই অ্যাডমিন প্যানেলটি সাধারণ ভিজিটরদের জন্য সম্পূর্ণ অদৃশ্য ও সুরক্ষিত। শুধুমাত্র অ্যাডমিন যিনি ইউআরএলে সিক্রেট কি /#admin=67% দেবেন, তিনিই এটি দেখতে ও এডিট করতে পারবেন।' 
              : 'This panel is strictly restricted. Only the administrator visiting via the authorized secret URL key (/#admin=67%) has permission to view and edit.'}
          </p>
        </div>

        <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 text-xs text-stone-700 font-mono">
          <span className="text-stone-400 block mb-1">Required Access URL Format:</span>
          <span className="font-bold text-emerald-800 bg-white px-2 py-1 rounded border border-stone-300 inline-block">
            {typeof window !== 'undefined' ? window.location.origin : ''}/#admin=67%
          </span>
        </div>

        <button
          onClick={() => navigate('home')}
          className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          {language === 'bn' ? 'ওয়েবসাইটে ফিরে যান' : 'Return to Home'}
        </button>
      </div>
    );
  }

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalInStock = products.filter(p => p.inStock).length;

  const handleOpenEditProduct = (prod: Product) => {
    setSelectedProductToEdit(prod);
    setProductEditForm({ ...prod });
    setProductSaveSuccess(false);
  };

  const handleSaveProductChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productEditForm) return;

    updateProduct({
      ...productEditForm,
      price: Number(productEditForm.price) || 5.0,
      stockCount: Number(productEditForm.stockCount) || 0,
      inStock: Number(productEditForm.stockCount) > 0
    });

    setProductSaveSuccess(true);
    setTimeout(() => {
      setProductSaveSuccess(false);
      setSelectedProductToEdit(null);
      setProductEditForm(null);
    }, 1000);
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent(heroForm);
    setHeroSaved(true);
    setTimeout(() => setHeroSaved(false), 2000);
  };

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteContent({
      deliveryFee: parseFloat(budgetForm.deliveryFee) || 4.50,
      freeDeliveryThreshold: parseFloat(budgetForm.freeDeliveryThreshold) || 35.00,
      bannerDiscountTextEn: budgetForm.bannerDiscountTextEn,
      bannerDiscountTextBn: budgetForm.bannerDiscountTextBn
    });
    setBudgetSaved(true);
    setTimeout(() => setBudgetSaved(false), 2000);
  };

  const handleAdminSeoSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoSettings({
      businessName: adminSeo.businessName.trim(),
      city: adminSeo.city.trim(),
      contactPhone: adminSeo.contactPhone.trim(),
      contactEmail: adminSeo.contactEmail.trim(),
      streetAddress: adminSeo.streetAddress.trim(),
      targetKeywords: adminSeo.targetKeywords.split(',').map(s => s.trim()).filter(Boolean)
    });
    setSeoSaved(true);
    setTimeout(() => setSeoSaved(false), 2000);
  };

  const samplePhotoPresets = [
    { label: 'Farm Produce Basket', url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Greenhouse Beds', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Organic Harvest', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80' },
    { label: 'Sunlit Field', url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Admin Security Notice & Logout */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-lg">
            🛡️
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-serif font-bold text-white">
                {language === 'bn' ? 'অর্গানিক ফুড — অ্যাডমিন কন্ট্রোল প্যানেল' : 'Organic Food — Admin Control Center'}
              </h1>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/40">
                {language === 'bn' ? 'সম্পূর্ণ এডিট মোড সক্রিয়' : 'Full CMS Active'}
              </span>
              <span className="bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/40">
                🔑 Key: #admin=67%
              </span>
              <span className="bg-orange-500/20 text-orange-300 font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full border border-orange-500/40 flex items-center gap-1">
                🔥 Firebase: {firebaseProjectId}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {language === 'bn' 
                ? 'পণ্য, ছবি, টেক্সট, দাম এবং বাজেট আপনার ইচ্ছামতো পরিবর্তন করুন।' 
                : 'Manage products, photos, texts, prices, and delivery budgets with live updates.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              const url = window.location.origin + '/#admin=67%';
              navigator.clipboard.writeText(url);
              setCopiedSecretUrl(true);
              setTimeout(() => setCopiedSecretUrl(false), 2000);
            }}
            className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy Secret Admin URL"
          >
            <span>{copiedSecretUrl ? '✓ Copied!' : 'Copy /#admin=67% Link'}</span>
          </button>

          <button
            onClick={() => navigate('shop')}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{language === 'bn' ? 'স্টোর ভিউ দেখুন' : 'View Public Store'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={adminLogout}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'লগআউট' : 'Admin Logout'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 font-medium block">
            {language === 'bn' ? 'মোট পণ্য ক্যাটালগ' : 'Total Inventory'}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-stone-900">{products.length}</span>
            <span className="text-xs text-emerald-700">({totalInStock} In Stock)</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 font-medium block">
            {language === 'bn' ? 'ডেলিভারি ফি' : 'Standard Delivery Fee'}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-stone-900">${siteContent.deliveryFee.toFixed(2)}</span>
            <span className="text-xs text-stone-500">Per order</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 font-medium block">
            {language === 'bn' ? 'ফ্রি ডেলিভারি বাজেট' : 'Free Delivery Over'}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-700">${siteContent.freeDeliveryThreshold.toFixed(2)}</span>
            <span className="text-xs text-stone-500">Cart Total</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 font-medium block">
            {language === 'bn' ? 'অর্ডার রাজস্ব' : 'Total Sales Revenue'}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-stone-900">${totalRevenue.toFixed(2)}</span>
            <span className="text-xs text-stone-500">USD</span>
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'inventory'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{language === 'bn' ? 'পণ্য ও ছবি/দাম এডিট' : 'Products & Pricing'} ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'hero'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>{language === 'bn' ? 'হোমপেজ ব্যানার, ছবি ও টেক্সট' : 'Homepage Banner & Texts'}</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'budget'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>{language === 'bn' ? 'ডেলিভারি বাজেট ও ফি' : 'Delivery & Budget Settings'}</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{language === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Customer Orders'} ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-2 ${
            activeTab === 'seo'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>{language === 'bn' ? 'দোকানের নাম ও এসইও' : 'Store Name & Local SEO'}</span>
        </button>
      </div>

      {/* Tab 1: Product Inventory & In-Depth Photo/Price Editor */}
      {activeTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                {language === 'bn' ? 'পণ্য, ছবি ও মূল্য ব্যবস্থাপনা' : 'Product Inventory, Photos & Pricing'}
              </h2>
              <p className="text-xs text-stone-500">
                {language === 'bn' 
                  ? 'যেকোনো পণ্যের নামের টেক্সট, ছবি (Photo URL), বাজেট/মূল্য এবং স্টক ইচ্ছামতো পরিবর্তন করতে "Edit" চাপুন।' 
                  : 'Click "Edit" on any product to update photos, texts, prices, units, or stock in real-time.'}
              </p>
            </div>

            <button
              onClick={() => setIsProductModalOpen(true)}
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'bn' ? '+ নতুন পণ্য যোগ করুন' : '+ Add New Product'}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-700 font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Photo & Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Budget / Price</th>
                  <th className="py-3 px-4">Unit / Package</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-12 h-12 rounded-xl object-cover border border-stone-200 shadow-xs"
                        />
                        <div>
                          <span className="font-semibold text-stone-900 block text-sm">
                            {prod.name}
                          </span>
                          <span className="text-stone-500 text-[11px] block">{prod.bnName}</span>
                          <span className="text-[10px] text-emerald-700 font-mono">{prod.farmOrigin}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 uppercase text-[10px] font-semibold text-stone-600">
                      {prod.category}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-stone-900 text-sm">${prod.price.toFixed(2)}</span>
                    </td>

                    <td className="py-3 px-4 text-stone-600">
                      <span>{prod.unit}</span>
                      <span className="text-[10px] text-stone-400 block">{prod.bnUnit}</span>
                    </td>

                    <td className="py-3 px-4 font-semibold text-stone-700">
                      {prod.stockCount}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => updateProduct({ ...prod, inStock: !prod.inStock })}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer ${
                          prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {prod.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditProduct(prod)}
                        className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{language === 'bn' ? 'এডিট' : 'Edit'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${prod.name}" from catalog?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Homepage Banner, Photo & Text Editor (CMS) */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                {language === 'bn' ? 'হোমপেজ ব্যানার, ছবি ও টেক্সট এডিটর' : 'Homepage Hero Banner, Photo & Text CMS'}
              </h2>
              <p className="text-xs text-stone-500">
                {language === 'bn' 
                  ? 'হোমপেজের প্রধান হেডলাইন, বর্ণনা, ব্যানার ছবি এবং অ্যানাউন্সমেন্ট টেক্সট আপনার ইচ্ছামতো লিখুন।' 
                  : 'Customize the main hero title, description, banner photo, and notification bar.'}
              </p>
            </div>
            {heroSaved && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Updated Live!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveHero} className="space-y-5 text-xs">
            {/* Announcement bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Top Announcement Bar (English)
                </label>
                <input
                  type="text"
                  value={heroForm.announcementTextEn}
                  onChange={(e) => setHeroForm({ ...heroForm, announcementTextEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  টপ অ্যানাউন্সমেন্ট বার (বাংলায়)
                </label>
                <input
                  type="text"
                  value={heroForm.announcementTextBn}
                  onChange={(e) => setHeroForm({ ...heroForm, announcementTextBn: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            {/* Hero Headlines */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Hero Headline (English) *
                </label>
                <input
                  type="text"
                  required
                  value={heroForm.heroHeadlineEn}
                  onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  হোমপেজ প্রধান হেডলাইন (বাংলায়) *
                </label>
                <input
                  type="text"
                  required
                  value={heroForm.heroHeadlineBn}
                  onChange={(e) => setHeroForm({ ...heroForm, heroHeadlineBn: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            {/* Hero Subtitle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Hero Subtitle / Description (English)
                </label>
                <textarea
                  rows={3}
                  value={heroForm.heroSubtitleEn}
                  onChange={(e) => setHeroForm({ ...heroForm, heroSubtitleEn: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  হোমপেজ বর্ণনা / সাবটাইটেল (বাংলায়)
                </label>
                <textarea
                  rows={3}
                  value={heroForm.heroSubtitleBn}
                  onChange={(e) => setHeroForm({ ...heroForm, heroSubtitleBn: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            {/* Hero Image / Photo with live preview */}
            <div className="space-y-3 pt-2">
              <label className="block font-semibold text-stone-700">
                Hero Banner Photo URL
              </label>
              
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-full sm:w-2/3 space-y-2">
                  <input
                    type="url"
                    value={heroForm.heroImage}
                    onChange={(e) => setHeroForm({ ...heroForm, heroImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-stone-500">Preset Photos:</span>
                    {samplePhotoPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setHeroForm({ ...heroForm, heroImage: preset.url })}
                        className="text-[11px] px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="w-32 h-20 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                  <img 
                    src={heroForm.heroImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Homepage Content</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Budget, Delivery Fees & Minimum Order Threshold */}
      {activeTab === 'budget' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                {language === 'bn' ? 'বাজেট, ডেলিভারি খরচ ও কার্ট লিমিট' : 'Store Budget, Delivery Fees & Pricing Settings'}
              </h2>
              <p className="text-xs text-stone-500">
                {language === 'bn' 
                  ? 'লোকাল হোম ডেলিভারি ফি এবং ফ্রি ডেলিভারির জন্য সর্বনিম্ন অর্ডার বাজেট নির্ধারণ করুন।' 
                  : 'Configure standard shipping costs, free delivery qualifying threshold, and checkout pricing.'}
              </p>
            </div>
            {budgetSaved && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Budget Settings Saved!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveBudget} className="space-y-4 text-xs max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Standard Local Delivery Fee ($) *
                </label>
                <input
                  type="number"
                  step="0.10"
                  required
                  value={budgetForm.deliveryFee}
                  onChange={(e) => setBudgetForm({ ...budgetForm, deliveryFee: e.target.value })}
                  placeholder="4.50"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
                <span className="text-[11px] text-stone-400 mt-0.5 block">Applied when order is below free threshold.</span>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Free Delivery Minimum Budget ($) *
                </label>
                <input
                  type="number"
                  step="0.50"
                  required
                  value={budgetForm.freeDeliveryThreshold}
                  onChange={(e) => setBudgetForm({ ...budgetForm, freeDeliveryThreshold: e.target.value })}
                  placeholder="35.00"
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
                <span className="text-[11px] text-stone-400 mt-0.5 block">Orders above this budget receive 100% free delivery.</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Promotional Banner Text (English)
              </label>
              <input
                type="text"
                value={budgetForm.bannerDiscountTextEn}
                onChange={(e) => setBudgetForm({ ...budgetForm, bannerDiscountTextEn: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                প্রমোশনাল ব্যানার টেক্সট (বাংলায়)
              </label>
              <input
                type="text"
                value={budgetForm.bannerDiscountTextBn}
                onChange={(e) => setBudgetForm({ ...budgetForm, bannerDiscountTextBn: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Budget & Pricing</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Customer Orders Manager */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-serif font-bold text-stone-900">
              {language === 'bn' ? 'গ্রাহকদের অর্ডার তালিকা' : 'Customer Placed Orders'}
            </h2>
            <p className="text-xs text-stone-500">
              {language === 'bn' 
                ? 'ডেলিভারি স্ট্যাটাস পরিবর্তন করুন (Confirmed -> Harvesting -> Out for Delivery -> Delivered)' 
                : 'Track and update delivery progress for customer orders in real-time.'}
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-stone-500 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
              <ShoppingBag className="w-10 h-10 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-semibold">No orders received yet.</p>
              <p className="text-xs text-stone-400">When customers place an order at checkout, it will show up here instantly.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div 
                  key={ord.id}
                  className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-stone-900 text-sm">{ord.id}</span>
                        <span className="text-xs text-stone-500">
                          {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <span className="text-xs text-stone-700 block mt-0.5">
                        Customer: <strong>{ord.customerName}</strong> ({ord.customerPhone})
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-stone-900">${ord.total.toFixed(2)}</span>
                      
                      {/* Status Dropdown */}
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Harvesting">Harvesting</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="text-xs space-y-1 text-stone-600">
                    <span className="font-semibold text-stone-800 block">Ordered Harvest:</span>
                    <div className="flex flex-wrap gap-2">
                      {ord.items.map((it, idx) => (
                        <span key={idx} className="bg-white px-2 py-1 rounded border border-stone-200 text-[11px]">
                          {it.quantity}x {it.product.name} (${(it.product.price * it.quantity).toFixed(2)})
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-500 pt-1 flex flex-wrap gap-4">
                    <span>Fulfillment: <strong>{ord.deliveryType === 'pickup' ? `Farm Pickup (${ord.pickupLocation})` : `Home Delivery (${ord.deliveryAddress})`}</strong></span>
                    <span>Payment: <strong className="uppercase">{ord.paymentMethod}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Local SEO & Store Info */}
      {activeTab === 'seo' && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                {language === 'bn' ? 'স্টোর পরিচিতি ও লোকাল এসইও' : 'Store Identity & Local SEO Parameters'}
              </h2>
              <p className="text-xs text-stone-500">
                {language === 'bn' 
                  ? 'দোকানের নাম "Organic Food" এবং যোগাযোগের তথ্য পরিবর্তন করুন।' 
                  : 'Customize the business title, local phone, city, and target search keywords.'}
              </p>
            </div>
            {seoSaved && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved to Live Site!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleAdminSeoSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Business Name (Default: Organic Food) *
                </label>
                <input
                  type="text"
                  required
                  value={adminSeo.businessName}
                  onChange={(e) => setAdminSeo({ ...adminSeo, businessName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Target City / Locality *
                </label>
                <input
                  type="text"
                  required
                  value={adminSeo.city}
                  onChange={(e) => setAdminSeo({ ...adminSeo, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Contact Phone (For Customers & Google)
                </label>
                <input
                  type="text"
                  value={adminSeo.contactPhone}
                  onChange={(e) => setAdminSeo({ ...adminSeo, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={adminSeo.contactEmail}
                  onChange={(e) => setAdminSeo({ ...adminSeo, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Farm Stand Physical Address
              </label>
              <input
                type="text"
                value={adminSeo.streetAddress}
                onChange={(e) => setAdminSeo({ ...adminSeo, streetAddress: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Target Local SEO Keywords
              </label>
              <input
                type="text"
                value={adminSeo.targetKeywords}
                onChange={(e) => setAdminSeo({ ...adminSeo, targetKeywords: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </form>
        </div>
      )}

      {/* Product Edit Modal (In-Depth Editor for Text, Photo, Budget/Price, Stock) */}
      {selectedProductToEdit && productEditForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
            
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
                  ✎
                </div>
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-base">
                    {language === 'bn' ? 'পণ্য সম্পাদনা (ছবি, দাম ও টেক্সট)' : 'Edit Product (Photo, Price & Texts)'}
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    ID: {productEditForm.id} · {productEditForm.slug}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProductToEdit(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProductChanges} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {productSaveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Changes saved successfully! Updating storefront...</span>
                </div>
              )}

              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Product Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={productEditForm.name}
                    onChange={(e) => setProductEditForm({ ...productEditForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    পণ্যের নাম (বাংলায়)
                  </label>
                  <input
                    type="text"
                    value={productEditForm.bnName}
                    onChange={(e) => setProductEditForm({ ...productEditForm, bnName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Price/Budget, Unit, Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Price / Budget ($) *
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={productEditForm.price}
                    onChange={(e) => setProductEditForm({ ...productEditForm, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Unit / Quantity (e.g. 1 kg)
                  </label>
                  <input
                    type="text"
                    value={productEditForm.unit}
                    onChange={(e) => setProductEditForm({ ...productEditForm, unit: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={productEditForm.stockCount}
                    onChange={(e) => setProductEditForm({ ...productEditForm, stockCount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Photo & Image URL with Live Thumbnail */}
              <div className="space-y-2">
                <label className="block font-semibold text-stone-700">
                  Product Image URL (Photo)
                </label>
                <div className="flex gap-4 items-start">
                  <div className="flex-1 space-y-1">
                    <input
                      type="url"
                      value={productEditForm.image}
                      onChange={(e) => setProductEditForm({ ...productEditForm, image: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                    />
                    <p className="text-[10px] text-stone-500">Paste any image URL from Unsplash or web.</p>
                  </div>
                  <div className="w-16 h-16 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                    <img 
                      src={productEditForm.image} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Description (English)
                  </label>
                  <textarea
                    rows={2}
                    value={productEditForm.description}
                    onChange={(e) => setProductEditForm({ ...productEditForm, description: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    বিবরণ (বাংলায়)
                  </label>
                  <textarea
                    rows={2}
                    value={productEditForm.bnDescription}
                    onChange={(e) => setProductEditForm({ ...productEditForm, bnDescription: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              {/* Farm Origin & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Farm Origin
                  </label>
                  <input
                    type="text"
                    value={productEditForm.farmOrigin}
                    onChange={(e) => setProductEditForm({ ...productEditForm, farmOrigin: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Certification Tag
                  </label>
                  <input
                    type="text"
                    value={productEditForm.certification}
                    onChange={(e) => setProductEditForm({ ...productEditForm, certification: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setSelectedProductToEdit(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Product Updates</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
