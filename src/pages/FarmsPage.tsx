import React from 'react';
import { 
  Sprout, 
  MapPin, 
  ShieldCheck, 
  Sun, 
  Droplet, 
  HeartHandshake, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FarmsPage: React.FC = () => {
  const { navigate, seoSettings, language } = useApp();

  const partnerFarms = [
    {
      name: 'Valley Sun Organic Ranch',
      location: 'Green Valley Foothills, CA',
      distance: '6.4 miles from town center',
      specialty: 'Heirloom Vine Tomatoes, Rainbow Chard & Sweet Corn',
      soilType: 'Compost-Enriched Silty Loam (0% synthetic nitrogen)',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      description: 'Family-tilled since 1984. Dedicated to bio-diverse crop rotation, natural pest management with beneficial insects, and deep-root water conservation.'
    },
    {
      name: 'Riverbank Greenhouses & Beds',
      location: 'Riverside Basin, CA',
      distance: '11.2 miles from market pavilion',
      specialty: 'Baby Spinach, Hydro-Washed Herbs & Microgreens',
      soilType: 'Certified Organic Peat & Living Microbial Soil',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      description: 'Heated by solar thermal arrays and watered from natural aquifers. Leaves are cut fresh on the exact morning of customer delivery.'
    },
    {
      name: 'Meadow Bloom Apiaries',
      location: 'Oakridge Wildflower Valleys, CA',
      distance: '14.8 miles from depot',
      specialty: 'Pure Raw Wildflower Honey & Bee Pollen',
      soilType: 'Pesticide-Free Wild Clover Sanctuary',
      image: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=800&q=80',
      description: 'Ethical beekeeping preserving pollinator colonies across 350 acres of untouched indigenous flora. Never heated, ultra-filtered, or adulterated.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
          <Sprout className="w-3.5 h-3.5 text-emerald-700" />
          <span>Local Sustainable Agriculture</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          {language === 'bn' ? 'আমাদের স্থানীয় জৈব খামারসমূহ' : `Our Partner Organic Farms in ${seoSettings.region}`}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          {language === 'bn'
            ? 'জানুন আপনার খাবার কোথা থেকে আসছে। প্রতিটি ফসলের পেছনে রয়েছে কঠোর জৈব মানদণ্ড এবং নিষ্ঠাবান স্থানীয় চাষীদের শ্রম।'
            : `Know your farmer, know your soil. We partner exclusively with regenerative family farms operating within 25 miles of ${seoSettings.city}.`}
        </p>
      </div>

      {/* Sustainable Soil Standards */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-white text-base">Zero Synthetic Inputs</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              No artificial glyphosates, chemical fungicides, or artificial nitrogen. Every harvest is tested for pesticide residue.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-3">
              <Droplet className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-white text-base">Living Soil & Water Care</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              We practice cover cropping and natural composting to regenerate biological microbial activity in regional soils.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-3">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-white text-base">Fair Local Farmer Pay</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Growers receive 78% of the final retail price—3x higher than industrial supermarket brokers.
            </p>
          </div>
        </div>
      </div>

      {/* Farm Profiles */}
      <div className="space-y-8">
        <div className="border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Meet the Family Farms Supplying {seoSettings.businessName}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partnerFarms.map((farm, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:border-emerald-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <img 
                  src={farm.image} 
                  alt={farm.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{farm.location} ({farm.distance})</span>
                  </div>

                  <h3 className="font-serif font-bold text-stone-900 text-lg">
                    {farm.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {farm.description}
                  </p>

                  <div className="pt-2 text-xs text-stone-700 space-y-1">
                    <div>
                      <strong className="text-emerald-800">Specialty Harvest: </strong>
                      <span>{farm.specialty}</span>
                    </div>
                    <div>
                      <strong className="text-stone-800">Soil Standard: </strong>
                      <span className="text-stone-500">{farm.soilType}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => navigate('contact')}
                  className="w-full py-2.5 px-3 bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Locate on Google Maps</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Callout */}
      <div className="bg-emerald-50 rounded-2xl p-6 sm:p-8 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-serif font-bold text-emerald-950">
            Taste the Difference of Living Organic Soil Today
          </h3>
          <p className="text-xs text-emerald-800 mt-1 max-w-xl">
            Harvested this morning and delivered to your doorstep within hours. Free local pickup available at our 3 farm stands.
          </p>
        </div>

        <button
          onClick={() => navigate('shop')}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shrink-0 shadow-xs transition-colors cursor-pointer"
        >
          Explore Fresh Harvest
        </button>
      </div>

    </div>
  );
};
