import React from 'react';
import { 
  Sprout, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Heart, 
  Award, 
  ArrowRight 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { navigate, seoSettings, language } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
          <Heart className="w-3.5 h-3.5 text-emerald-700" />
          <span>Our Soil & Community Roots</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          {language === 'bn' 
            ? 'খাঁটি অর্গানিক খাদ্যের প্রতি আমাদের অঙ্গীকার' 
            : `Cultivating Pure Organic Nutrition for ${seoSettings.city}`}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          {language === 'bn'
            ? 'গ্রিনরুট অর্গানিক্সের লক্ষ্য প্রতিটি পরিবারের কাছে রাসায়নিকমুক্ত, পুষ্টিকর এবং সতেজ খাবার পৌঁছে দেওয়া।'
            : `Founded on the conviction that healthy communities require living soil, transparent farming, and minimal supply chain interference.`}
        </p>
      </div>

      {/* Story & Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-4 text-stone-600 text-sm leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Why Local Organic Food Matters More Than Ever
          </h2>
          <p>
            Industrial grocery supply chains often keep produce in nitrogen-chilled storage facilities for weeks before it reaches supermarket shelves. In the process, delicate polyphenols, vitamin C, and fresh aroma rapidly degrade.
          </p>
          <p>
            At <strong className="text-stone-900">{seoSettings.businessName}</strong>, we shorten the distance between soil and your dining table to mere hours. When you order from our catalog, that vegetable was thriving in living organic loam just hours prior.
          </p>
          <div className="pt-2">
            <blockquote className="border-l-4 border-emerald-600 pl-4 py-1 italic font-serif text-stone-800 text-base">
              "We don't just grow food; we feed the soil microorganisms that create real nutritional density."
            </blockquote>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80" 
              alt="Organic farm field in morning sunlight" 
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Organic Certifications & Testing */}
      <div className="border-t border-stone-200 pt-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-xl font-serif font-bold text-stone-900">
            Our Strict Quality & Organic Testing Protocols
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Every batch undergoes multi-stage inspections before dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-center space-y-2">
            <Award className="w-8 h-8 text-emerald-700 mx-auto" />
            <h4 className="font-serif font-bold text-stone-900 text-base">Soil Heavy Metal Testing</h4>
            <p className="text-xs text-stone-600">Zero lead, arsenic, or industrial pollutants detected in regional soil testing.</p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-center space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-700 mx-auto" />
            <h4 className="font-serif font-bold text-stone-900 text-base">Pesticide Residue Analysis</h4>
            <p className="text-xs text-stone-600">HPLC lab chromatography proves non-detectable levels for over 250 common sprays.</p>
          </div>

          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-center space-y-2">
            <Sprout className="w-8 h-8 text-emerald-700 mx-auto" />
            <h4 className="font-serif font-bold text-stone-900 text-base">Non-GMO Heirloom Seeds</h4>
            <p className="text-xs text-stone-600">Propagating heritage open-pollinated seeds to preserve biodiversity and deep flavor.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <span>Order Fresh Certified Harvest</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
