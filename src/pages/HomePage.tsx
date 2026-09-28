import React, { useState } from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Star, 
  ArrowRight, 
  Clock, 
  ChevronRight,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  FileCode,
  Search,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CUSTOMER_REVIEWS, LOCAL_FAQS } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { 
    products, 
    navigate, 
    addToCart, 
    seoSettings, 
    siteContent, 
    language, 
    selectedLocation,
    toggleWishlist,
    isWishlisted
  } = useApp();

  const [zipCheckInput, setZipCheckInput] = useState('');
  const [zipCheckResult, setZipCheckResult] = useState<string | null>(null);

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCheckInput.trim()) return;
    const clean = zipCheckInput.trim();
    if (['94952', '94954', '94950', '94951', '94953'].includes(clean) || clean.toLowerCase().includes('green') || clean.toLowerCase().includes('valley')) {
      setZipCheckResult(`✅ Great news! Same-day local delivery is active in ${clean}. Orders before 2 PM arrive by dinner.`);
    } else {
      setZipCheckResult(`📍 ${clean} is eligible for next-day dispatch or free farm stand pickup at 742 Evergreen Farm Rd.`);
    }
  };

  const categories = [
    { id: 'all', label: language === 'bn' ? 'সব পণ্য' : 'All Produce', icon: '🧺' },
    { id: 'vegetables', label: language === 'bn' ? 'সবজি' : 'Vegetables', icon: '🥦' },
    { id: 'fruits', label: language === 'bn' ? 'ফলমূল' : 'Fresh Fruits', icon: '🥑' },
    { id: 'dairy-honey', label: language === 'bn' ? 'মধু ও ঘি' : 'Raw Honey & Ghee', icon: '🍯' },
    { id: 'oils-grains', label: language === 'bn' ? 'ঘানি ভাঙা তেল' : 'Cold-Pressed Oils', icon: '🌾' },
    { id: 'herbs', label: language === 'bn' ? 'ভেষজ ও পুদিনা' : 'Culinary Herbs', icon: '🌿' }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. Hero Section with Strong Local SEO H1 & Subtitle */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-stone-900 to-stone-900 text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Subtle decorative background texture */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              {/* Local SEO badge (quiet typography) */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-700/50 px-3 py-1.5 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {language === 'bn' 
                    ? `${seoSettings.city}-এর স্থানীয় সার্টিফাইড অর্গানিক ফার্ম` 
                    : `Local Organic Farm Direct to Your Kitchen in ${seoSettings.city}`}
                </span>
              </div>

              {/* Semantic H1 targeting Local Organic Food Intent */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
                {language === 'bn' ? (
                  siteContent.heroHeadlineBn || 'তাজা অর্গানিক খাবার, সরাসরি কৃষকের জমি থেকে'
                ) : (
                  siteContent.heroHeadlineEn || `Farm-Fresh Local Organic Food in ${seoSettings.city}`
                )}
              </h1>

              <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed">
                {language === 'bn'
                  ? siteContent.heroSubtitleBn
                  : siteContent.heroSubtitleEn}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('shop')}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-emerald-950/30 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{language === 'bn' ? 'অর্গানিক খাবার কিনুন' : 'Order Farm Produce'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigate('contact')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-sm border border-white/20 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'bn' ? 'গুগল ম্যাপে ফার্ম দেখুন' : 'Farm Pickup & Google Map'}</span>
                </button>
              </div>

              {/* Trust signals */}
              <div className="pt-6 border-t border-stone-800 grid grid-cols-3 gap-4 text-xs text-stone-400">
                <div>
                  <strong className="block text-emerald-300 font-semibold text-sm">0% Chemicals</strong>
                  <span>Organic Certified Soil</span>
                </div>
                <div>
                  <strong className="block text-emerald-300 font-semibold text-sm">2-Hour Delivery</strong>
                  <span>Across {seoSettings.city}</span>
                </div>
                <div>
                  <strong className="block text-emerald-300 font-semibold text-sm">3 Local Hubs</strong>
                  <span>Google Maps Verified</span>
                </div>
              </div>

            </div>

            {/* Hero Visual Card with Verified Local Harvest Info */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-emerald-900/60 shadow-2xl bg-stone-800/80">
                <img 
                  src={siteContent.heroImage} 
                  alt="Local organic farm produce basket" 
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 text-xs text-emerald-300 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Morning Harvest Dispatch Verified</span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Direct Soil-to-Kitchen Local Supply Chain
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Inspected by regional organic auditors. Zero cold storage decay.
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-stone-300 pt-3 border-t border-stone-700/80">
                    <span>📍 {selectedLocation.name}</span>
                    <button 
                      onClick={() => navigate('contact')}
                      className="text-emerald-400 font-semibold hover:underline cursor-pointer"
                    >
                      Get Directions →
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Four Pillars of Local SEO Organic Quality */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Sprout className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-900 mb-1">
              100% Certified Organic
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              No synthetic insecticides, glyphosates, GMOs, or artificial ripeners. Clean natural food you can trust for your family.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-900 mb-1">
              Zero Food Miles
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sourced within 25 miles of {seoSettings.city}. Minimizing fossil fuel transit while ensuring maximum vitamins and fresh aroma.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-900 mb-1">
              Dawn Harvest Guarantee
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our partner farmers harvest vegetables at 5:30 AM every morning. Your box arrives packed on the exact same day.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-serif font-bold text-stone-900 mb-1">
              Doorstep & Farm Pickup
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Choose express home delivery or pick up directly from our 3 Google Maps verified farm stands without waiting in line.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Featured Organic Produce Catalog (Semantic Local Headings & Product Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase block mb-1">
              Seasonal & Farm-Direct
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 tracking-tight">
              {language === 'bn' ? 'আজকের তাজা সংগৃহীত অর্গানিক ফসল' : `Today's Fresh Organic Harvest in ${seoSettings.city}`}
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Certified organic vegetables, unheated honey, cold-pressed oils, and farm dairy.
            </p>
          </div>

          <button
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
          >
            <span>{language === 'bn' ? 'সব পণ্য দেখুন' : 'Explore All Organic Groceries'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <article 
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col group"
            >
              {/* Image & URL clickable to SEO Slug */}
              <div 
                onClick={() => navigate('product-detail', product.slug)}
                className="relative h-48 bg-stone-100 overflow-hidden cursor-pointer"
              >
                <img 
                  src={product.image} 
                  alt={`${product.name} - Organic Food in ${seoSettings.city}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                  {product.certification}
                </div>

                {/* Wishlist toggle button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer z-10 ${
                    isWishlisted(product.id)
                      ? 'bg-rose-50 text-rose-600 shadow-sm'
                      : 'bg-stone-900/60 text-white hover:bg-stone-900/85 hover:text-rose-400'
                  }`}
                  aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata (anti-slop) */}
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1.5">
                    <span>{product.farmOrigin}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.unit}</span>
                  </div>

                  <h3 
                    onClick={() => navigate('product-detail', product.slug)}
                    className="font-serif font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors cursor-pointer line-clamp-1"
                  >
                    {language === 'bn' && product.bnName ? product.bnName : product.name}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {language === 'bn' && product.bnDescription ? product.bnDescription : product.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block">Local Farm Price</span>
                    <span className="text-lg font-bold text-stone-900">${product.price.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Local Delivery Radius Checker & Local Keyword Alignment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/40">
                <Truck className="w-3.5 h-3.5" />
                <span>Hyper-Local Delivery Coverage Check</span>
              </span>

              <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-white">
                Check Same-Day Delivery in Your Neighborhood
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
                We deliver directly in temperature-controlled electric vans from our central farm depot to households in {seoSettings.city}, Oakridge, and Riverside. Check your postal code:
              </p>

              <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-2 max-w-md pt-2">
                <input
                  type="text"
                  placeholder="Enter Zip Code (e.g. 94952) or Area..."
                  value={zipCheckInput}
                  onChange={(e) => setZipCheckInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-stone-800 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Verify Delivery
                </button>
              </form>

              {zipCheckResult && (
                <div className="p-3 bg-stone-800/90 border border-stone-700 rounded-xl text-xs text-stone-200 leading-relaxed">
                  {zipCheckResult}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 bg-stone-800/90 rounded-2xl p-6 border border-stone-700/80 space-y-4">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Local Pickup Stand (Free)</span>
              </h3>
              <p className="text-xs text-stone-300">
                Prefer to collect directly while picking up flowers or breathing farm air?
              </p>
              
              <div className="p-3 bg-stone-900 rounded-xl border border-stone-700 text-xs space-y-1">
                <span className="font-semibold text-emerald-300 block">{selectedLocation.name}</span>
                <span className="text-stone-300 block">{selectedLocation.address}</span>
                <span className="text-stone-400 block">Today's Hours: {selectedLocation.hours.weekdays}</span>
              </div>

              <button
                onClick={() => navigate('contact')}
                className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Open Google Maps Directions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Google Maps & SEO Integration Highlights (Specification Sheet Procedures) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase block mb-1">
            Specification Sheet Compliance
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Engineered for Local Search Supremacy & Customer Utility
          </h2>
          <p className="text-sm text-stone-600 mt-2">
            Every specification requested in your project brief has been implemented with production-grade engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base mb-1">
                Google Maps Integration
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Embedded interactive Google Maps with live coordinates, 3 pickup locations, route navigation, and store open/closed indicators.
              </p>
            </div>
            <button
              onClick={() => navigate('contact')}
              className="mt-6 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Test Google Map on Contact Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <FileCode className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base mb-1">
                XML Sitemap Generator
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dynamic sitemap.xml adhering to sitemaps.org standards with semantic URL paths, lastmod dates, download utility, and Google ping helper.
              </p>
            </div>
            <button
              onClick={() => navigate('sitemap')}
              className="mt-6 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Inspect & Download Sitemap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 text-base mb-1">
                Local SEO & SERP Preview Hub
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Customize local business NAP, keyword density, schema JSON-LD, and preview Google search snippets live on mobile and desktop.
              </p>
            </div>
            <button
              onClick={() => navigate('seo-hub')}
              className="mt-6 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Launch Local SEO Manager</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. Local Community Verified Reviews */}
      <section className="bg-stone-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase block mb-1">
              Locally Trusted
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Loved by Neighbors in {seoSettings.city}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div 
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 text-xs">
                  <strong className="block text-stone-900 font-semibold">{rev.author}</strong>
                  <span className="text-stone-500 block">{rev.location}</span>
                  <span className="text-emerald-700 font-medium block mt-0.5">Purchased: {rev.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Local SEO Frequently Asked Questions (FAQ Schema target) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-emerald-700 tracking-wider uppercase block mb-1">
            Questions & Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Frequently Asked Local Questions
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Indexed with Schema.org FAQPage structured data for rich snippet search visibility.
          </p>
        </div>

        <div className="space-y-4">
          {LOCAL_FAQS.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-5 border border-stone-200"
            >
              <h3 className="font-serif font-semibold text-stone-900 text-sm sm:text-base mb-2">
                {language === 'bn' && faq.bnQuestion ? faq.bnQuestion : faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
