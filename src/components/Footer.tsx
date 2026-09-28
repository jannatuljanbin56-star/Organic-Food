import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Sprout, 
  FileCode, 
  ExternalLink,
  SearchCheck,
  Lock,
  Shield
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { seoSettings, navigate, language, isAdmin, setIsAdminLoginModalOpen } = useApp();

  const displayName = language === 'bn' ? 'অর্গানিক ফুড' : 'Organic Food';

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Local SEO Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-lg">
                🌱
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                {displayName}
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              {language === 'bn'
                ? 'রাসায়নিক ও কীটনাশকমুক্ত ১০০% সার্টিফাইড অর্গানিক ফসল সরাসরি লোকাল চাষীদের কাছ থেকে আপনার টেবিলে।'
                : 'Connecting sustainable local family farms directly to your household. 100% certified pesticide-free vegetables, heirloom grains, and raw unpasteurized honey.'}
            </p>
            <div className="flex items-center gap-3 pt-1 text-xs text-emerald-400">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                CCOF & USDA Organic
              </span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span className="flex items-center gap-1 font-medium">
                <Sprout className="w-4 h-4 text-emerald-500" />
                Zero Food Miles
              </span>
            </div>
          </div>

          {/* Local Business NAP (Name, Address, Phone) - Essential for Local SEO */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-semibold text-base tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'ফার্ম অবস্থান ও যোগাযোগ (NAP)' : 'Local Farm Stand & Pickup'}</span>
            </h3>
            
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <address className="not-italic text-stone-300">
                  <span className="font-medium text-white block">{displayName} Main Stand</span>
                  <span>{seoSettings.streetAddress}</span><br />
                  <span>{seoSettings.city}, {seoSettings.region}, {seoSettings.postalCode}</span>
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-500 shrink-0" />
                <a href={`tel:${seoSettings.contactPhone}`} className="hover:text-emerald-400 transition-colors">
                  {seoSettings.contactPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <a href={`mailto:${seoSettings.contactEmail}`} className="hover:text-emerald-400 transition-colors">
                  {seoSettings.contactEmail}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-xs text-stone-400">
                <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-stone-300">Mon – Fri: 7:30 AM – 7:00 PM</span>
                  <span className="block">Sat – Sun: 8:00 AM – 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Local Service Coverage & SEO Targets */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-semibold text-base tracking-wide">
              {language === 'bn' ? 'ডেলিভারি এলাকা ও সেবাসমূহ' : 'Local Delivery Zones'}
            </h3>
            <p className="text-xs text-stone-400">
              {language === 'bn' 
                ? 'তাজা ফসল সংগ্রহ করে সরাসরি এই সংলগ্ন এলাকাগুলোতে সরবরাহ করা হয়:' 
                : 'Same-day direct farm harvest dispatch to these surrounding neighborhoods:'}
            </p>
            <ul className="text-sm space-y-1.5 text-stone-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{seoSettings.city} Central & Downtown</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Oakridge Heights & Orchards</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Riverside Farm Market District</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Valley Green Estates (15 Mile Radius)</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => navigate('contact')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <span>{language === 'bn' ? 'পোস্টাল কোড দিয়ে চেক করুন' : 'Check delivery zone by Postal Code'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SEO, Sitemap & Webmaster Links */}
          <div className="space-y-4">
            <h3 className="text-white font-serif font-semibold text-base tracking-wide flex items-center gap-2">
              <SearchCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'এসইও এবং ইনডেক্সিং টুলস' : 'SEO & Indexing Tools'}</span>
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'bn'
                ? 'সার্চ ইঞ্জিনের জন্য অপ্টিমাইজড লিঙ্ক ও এক্সএমএল সাইটম্যাপ।'
                : 'This site strictly adheres to Search Engine Guidelines with optimized URLs, schema markup, and dynamic XML sitemaps.'}
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => navigate('sitemap')}
                className="flex items-center justify-between p-2.5 bg-stone-800 hover:bg-stone-700/80 rounded-lg text-xs font-medium text-stone-200 transition-colors cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span>View XML Sitemap (/sitemap.xml)</span>
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">Valid XML</span>
              </button>

              <button
                onClick={() => navigate('contact')}
                className="flex items-center justify-between p-2.5 bg-stone-800 hover:bg-stone-700/80 rounded-lg text-xs font-medium text-stone-200 transition-colors cursor-pointer text-left"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span>{language === 'bn' ? 'গুগল ম্যাপস লোকেশন' : 'Google Maps Farm Location'}</span>
                </span>
                <span className="text-sky-300 font-mono text-[11px]">Directions</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright, Links & Discreet Admin Portal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} {displayName}. All rights reserved. 
            <span className="ml-2 text-stone-400">Local SEO-Engineered for Organic Agriculture.</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400 flex-wrap">
            <button onClick={() => navigate('home')} className="hover:text-white transition-colors cursor-pointer">
              {language === 'bn' ? 'হোম' : 'Home'}
            </button>
            <button onClick={() => navigate('shop')} className="hover:text-white transition-colors cursor-pointer">
              {language === 'bn' ? 'ক্যাটালগ' : 'Catalog'}
            </button>
            <button onClick={() => navigate('farms')} className="hover:text-white transition-colors cursor-pointer">
              {language === 'bn' ? 'ফার্ম' : 'Farms'}
            </button>
            <button onClick={() => navigate('contact')} className="hover:text-white transition-colors cursor-pointer">
              {language === 'bn' ? 'গুগল ম্যাপ' : 'Google Map'}
            </button>
            <button onClick={() => navigate('sitemap')} className="hover:text-white transition-colors cursor-pointer">
              Sitemap XML
            </button>
            
            {/* Admin Portal ONLY visible if admin is authenticated via secret URL hash */}
            {isAdmin && (
              <>
                <span aria-hidden="true" className="text-stone-700">·</span>
                <button 
                  onClick={() => navigate('admin')}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'অ্যাডমিন প্যানেল' : 'Admin Panel'}</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
