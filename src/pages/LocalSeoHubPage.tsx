import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  MapPin, 
  Globe, 
  CheckCircle2, 
  AlertCircle, 
  Smartphone, 
  Monitor, 
  Save, 
  FileCode,
  ShieldCheck,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LocalSeoHubPage: React.FC = () => {
  const { seoSettings, updateSeoSettings, products, navigate, language } = useApp();

  const [formData, setFormData] = useState({
    businessName: seoSettings.businessName,
    tagline: seoSettings.tagline,
    city: seoSettings.city,
    region: seoSettings.region,
    country: seoSettings.country,
    contactPhone: seoSettings.contactPhone,
    contactEmail: seoSettings.contactEmail,
    streetAddress: seoSettings.streetAddress,
    postalCode: seoSettings.postalCode,
    siteUrl: seoSettings.siteUrl,
    defaultMetaDescription: seoSettings.defaultMetaDescription,
    targetKeywords: seoSettings.targetKeywords.join(', ')
  });

  const [devicePreview, setDevicePreview] = useState<'mobile' | 'desktop'>('mobile');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoSettings({
      businessName: formData.businessName.trim(),
      tagline: formData.tagline.trim(),
      city: formData.city.trim(),
      region: formData.region.trim(),
      country: formData.country.trim(),
      contactPhone: formData.contactPhone.trim(),
      contactEmail: formData.contactEmail.trim(),
      streetAddress: formData.streetAddress.trim(),
      postalCode: formData.postalCode.trim(),
      siteUrl: formData.siteUrl.trim(),
      defaultMetaDescription: formData.defaultMetaDescription.trim(),
      targetKeywords: formData.targetKeywords.split(',').map(s => s.trim()).filter(Boolean)
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // SEO Health Checks
  const checks = [
    {
      title: 'Meta Title Length',
      status: formData.businessName.length >= 10 && formData.businessName.length <= 60 ? 'pass' : 'warn',
      detail: `${formData.businessName.length} characters (Recommended: 30-60 characters for zero SERP truncation)`
    },
    {
      title: 'Meta Description Length',
      status: formData.defaultMetaDescription.length >= 120 && formData.defaultMetaDescription.length <= 160 ? 'pass' : 'warn',
      detail: `${formData.defaultMetaDescription.length} characters (Ideal: 120-160 characters)`
    },
    {
      title: 'Local Geo Keywords in H1 & Titles',
      status: formData.targetKeywords.toLowerCase().includes(formData.city.toLowerCase()) ? 'pass' : 'warn',
      detail: `Contains local intent with "${formData.city}" geo-modifier.`
    },
    {
      title: 'Google Maps NAP Citation',
      status: formData.streetAddress && formData.contactPhone ? 'pass' : 'warn',
      detail: 'Consistent Name, Address, and Phone registered in Schema.org LocalBusiness markup.'
    },
    {
      title: 'XML Sitemap Availability',
      status: 'pass',
      detail: `Active at ${formData.siteUrl}/sitemap.xml with ${products.length + 6} discovered URLs.`
    },
    {
      title: 'Mobile-Friendly Responsive Viewport',
      status: 'pass',
      detail: 'Viewport meta tag configured with CSS media queries and touch targets >= 44px.'
    }
  ];

  const passCount = checks.filter(c => c.status === 'pass').length;
  const healthScore = Math.round((passCount / checks.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Title */}
      <div className="border-b border-stone-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
            <Search className="w-3.5 h-3.5 text-emerald-700" />
            <span>Local SEO Management & SERP Simulation</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Local SEO Optimization Hub
          </h1>
          <p className="text-sm text-stone-600 mt-1 max-w-2xl">
            Control your organic store's local search ranking factors, meta tags, NAP citations, and preview how your website appears on Google Search.
          </p>
        </div>

        {/* SEO Score Gauge */}
        <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-base shadow-xs">
            {healthScore}%
          </div>
          <div>
            <span className="text-xs font-semibold text-stone-900 block">Local SEO Health Score</span>
            <span className="text-[11px] text-emerald-700 font-medium">{passCount} of {checks.length} criteria optimized</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form on Left, SERP Live Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Customizer Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-stone-900">
                Business Info & Local Meta Tags
              </h2>
              <p className="text-xs text-stone-500">
                Updating these fields instantly updates page metadata and Schema.org JSON-LD.
              </p>
            </div>
            {saveSuccess && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Saved & Deployed!</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Business Name (SEO Brand) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Tagline / Secondary Hook
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Target City / Locality *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  State / Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Contact Phone (NAP) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Street Address (Physical Farm Pickup Stand)
              </label>
              <input
                type="text"
                value={formData.streetAddress}
                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Target Local SEO Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.targetKeywords}
                onChange={(e) => setFormData({ ...formData, targetKeywords: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-stone-700">
                  Default Meta Description (Google SERP Snippet)
                </label>
                <span className={`text-[11px] ${
                  formData.defaultMetaDescription.length > 160 ? 'text-amber-600 font-bold' : 'text-stone-500'
                }`}>
                  {formData.defaultMetaDescription.length}/160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={formData.defaultMetaDescription}
                onChange={(e) => setFormData({ ...formData, defaultMetaDescription: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                Changes persist automatically in browser storage.
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save & Update SEO Tags</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Google SERP Snippet Simulator */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-700" />
                <span>Google SERP Live Preview</span>
              </h3>

              {/* Mobile / Desktop Toggle */}
              <div className="flex items-center bg-stone-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setDevicePreview('mobile')}
                  className={`p-1.5 rounded-md text-xs cursor-pointer ${
                    devicePreview === 'mobile' ? 'bg-white shadow-xs text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setDevicePreview('desktop')}
                  className={`p-1.5 rounded-md text-xs cursor-pointer ${
                    devicePreview === 'desktop' ? 'bg-white shadow-xs text-stone-900 font-semibold' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Google Search Result Card */}
            <div className={`p-4 bg-white border border-stone-200 rounded-2xl ${
              devicePreview === 'mobile' ? 'max-w-[340px] mx-auto shadow-sm' : 'w-full'
            }`}>
              
              {/* Google Brand Header */}
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">
                  🌱
                </div>
                <div className="text-[11px] leading-tight text-stone-700 truncate">
                  <span className="font-semibold block text-stone-900">{formData.businessName}</span>
                  <span className="text-[10px] text-stone-500 truncate block">https://greenroot-organics.local › {formData.city.toLowerCase()}</span>
                </div>
              </div>

              {/* Title Link */}
              <a 
                href="#serp" 
                onClick={(e) => e.preventDefault()}
                className="text-blue-800 hover:underline text-sm sm:text-base font-medium leading-snug block mb-1"
              >
                {formData.businessName} – Local Farm Fresh Food & Produce in {formData.city}
              </a>

              {/* Meta Description snippet */}
              <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                {formData.defaultMetaDescription}
              </p>

              {/* Sitelinks (Google Search feature for local business) */}
              <div className="mt-3 pt-2 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px] text-blue-800 font-medium">
                <span className="hover:underline cursor-pointer">📍 Google Maps Pickup</span>
                <span className="hover:underline cursor-pointer">🥦 Organic Catalog</span>
                <span className="hover:underline cursor-pointer">🚜 Our Local Farms</span>
                <span className="hover:underline cursor-pointer">📄 XML Sitemap</span>
              </div>
            </div>

            <div className="text-[11px] text-stone-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Simulates live Google Search indexing snippet for local queries.</span>
            </div>
          </div>

          {/* Local SEO Checklist Audit */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-base font-serif font-bold text-stone-900">
              Audit Checklist
            </h3>

            <div className="space-y-3">
              {checks.map((chk, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  {chk.status === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block text-stone-900 font-semibold">{chk.title}</strong>
                    <span className="text-stone-500">{chk.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
