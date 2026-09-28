import React, { useState } from 'react';
import { X, Plus, Sparkles, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const ProductAdminModal: React.FC = () => {
  const { isProductModalOpen, setIsProductModalOpen, addProduct, seoSettings, language } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    bnName: '',
    category: 'vegetables' as Product['category'],
    price: '',
    unit: '1 kg',
    bnUnit: '১ কেজি',
    stockCount: '50',
    farmOrigin: 'Green Valley Organic Farm Stand',
    harvestDate: 'Harvested Today (Early Morning)',
    certification: 'USDA & Local Organic Certified',
    description: '',
    bnDescription: '',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    organicFeatures: '100% Pesticide Free, Non-GMO, Organically Grown',
    localKeywords: `organic produce ${seoSettings.city.toLowerCase()}, local fresh vegetables`
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isProductModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    const slug = formData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newProd: Omit<Product, 'id'> = {
      name: formData.name.trim(),
      bnName: formData.bnName.trim() || formData.name.trim(),
      slug: slug || `organic-item-${Date.now()}`,
      category: formData.category,
      price: parseFloat(formData.price) || 5.00,
      unit: formData.unit.trim() || '1 kg',
      bnUnit: formData.bnUnit.trim() || '১ কেজি',
      inStock: true,
      stockCount: parseInt(formData.stockCount) || 25,
      rating: 5.0,
      reviewsCount: 1,
      image: formData.image.trim() || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      description: formData.description.trim() || 'Freshly harvested certified organic produce from local partner farms.',
      bnDescription: formData.bnDescription.trim() || 'রাসায়নিক ও কীটনাশক মুক্ত তাজা জৈব খাদ্য।',
      farmOrigin: formData.farmOrigin.trim() || `${seoSettings.city} Regional Farm`,
      harvestDate: formData.harvestDate.trim() || 'Fresh Today',
      certification: formData.certification.trim() || 'Certified Organic',
      caloriesPer100g: 35,
      organicFeatures: formData.organicFeatures.split(',').map(s => s.trim()).filter(Boolean),
      localKeywords: formData.localKeywords.split(',').map(s => s.trim()).filter(Boolean)
    };

    addProduct(newProd);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsProductModalOpen(false);
      // Reset
      setFormData({
        name: '',
        bnName: '',
        category: 'vegetables',
        price: '',
        unit: '1 kg',
        bnUnit: '১ কেজি',
        stockCount: '50',
        farmOrigin: 'Green Valley Organic Farm Stand',
        harvestDate: 'Harvested Today (Early Morning)',
        certification: 'USDA & Local Organic Certified',
        description: '',
        bnDescription: '',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
        organicFeatures: '100% Pesticide Free, Non-GMO, Organically Grown',
        localKeywords: `organic produce ${seoSettings.city.toLowerCase()}, local fresh vegetables`
      });
    }, 900);
  };

  const sampleImages = [
    { label: 'Vegetables', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80' },
    { label: 'Fresh Carrots', url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80' },
    { label: 'Strawberries', url: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80' },
    { label: 'Organic Eggs', url: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80' },
    { label: 'Olive Oil', url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                {language === 'bn' ? 'নতুন অর্গানিক পণ্য যুক্ত করুন' : 'Add New Organic Farm Product'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'bn' ? 'আপনার স্টোরের জন্য নতুন জৈব খাদ্য তালিকাভুক্ত করুন' : 'List your custom harvest in the local catalog and SEO sitemap'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProductModalOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-sm flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-600" />
              <span>Product successfully added! Updating catalog and XML sitemap...</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Product Name (English) *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Organic Rainbow Carrots"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                নাম (বাংলায়)
              </label>
              <input
                type="text"
                value={formData.bnName}
                onChange={(e) => setFormData({ ...formData, bnName: e.target.value })}
                placeholder="যেমন: তাজা অর্গানিক গাজর"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none bg-white"
              >
                <option value="vegetables">Vegetables (শাকসবজি)</option>
                <option value="fruits">Fruits & Berries (ফলমূল)</option>
                <option value="dairy-honey">Honey & Dairy (মধু ও দুগ্ধজাত)</option>
                <option value="oils-grains">Oils & Grains (তেল ও চাল)</option>
                <option value="herbs">Herbs & Spices (ভেষজ ও মশলা)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Price (USD) *
              </label>
              <input
                type="number"
                step="0.10"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="4.50"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Unit / Package
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="1 kg / 500 g"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Farm Origin
              </label>
              <input
                type="text"
                value={formData.farmOrigin}
                onChange={(e) => setFormData({ ...formData, farmOrigin: e.target.value })}
                placeholder="e.g. Green Valley Homestead Farm"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Organic Certification
              </label>
              <input
                type="text"
                value={formData.certification}
                onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                placeholder="USDA & CCOF Certified Organic"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Crisp, sweet, organically grown in chemical-free rich topsoil..."
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Product Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
            {/* Quick sample image picker */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[11px] text-stone-500">Quick Presets:</span>
              {sampleImages.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({ ...formData, image: s.url })}
                  className="text-[11px] px-2 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Local SEO Metadata Tags</span>
            </span>
            <input
              type="text"
              value={formData.localKeywords}
              onChange={(e) => setFormData({ ...formData, localKeywords: e.target.value })}
              placeholder="Comma separated local keywords (e.g. organic food green valley, fresh farm produce)"
              className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white focus:outline-none"
            />
            <p className="text-[11px] text-stone-500">
              These local keywords will be indexed in Schema.org and help with local map search visibility.
            </p>
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-200">
            <button
              type="button"
              onClick={() => setIsProductModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Save & Publish to Catalog</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
