import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Car,
  Compass,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { locations, selectedLocation, setSelectedLocation, seoSettings, language } = useApp();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Farm Visit & Pickup',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'Farm Visit & Pickup',
        message: ''
      });
    }, 4000);
  };

  // Determine if location is currently open (simple daytime check)
  const currentHour = new Date().getHours();
  const isOpenNow = currentHour >= 8 && currentHour < 19;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header (Local SEO H1 with keywords) */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
          <MapPin className="w-3.5 h-3.5 text-emerald-700" />
          <span>Local SEO Google Maps Integration</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-stone-900 tracking-tight">
          {language === 'bn' 
            ? 'আমাদের সাথে যোগাযোগ ও গুগল ম্যাপ লোকেশন' 
            : `Visit Our Local Farm Stand in ${seoSettings.city}`}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          {language === 'bn'
            ? 'সরাসরি খামার পরিদর্শন করুন, তাজা ফসল নিজ হাতে তুলুন অথবা অনলাইনে অর্ডার করে দ্রুত পিকআপ নিন।'
            : `Pick up freshly harvested produce or speak directly with our organic grower team. Use our interactive Google Map for turn-by-turn navigation.`}
        </p>
      </div>

      {/* Location Selector Tabs (Zero-Pill: segmented functional tab buttons) */}
      <div className="flex items-center justify-center">
        <div className="inline-flex flex-wrap p-1.5 bg-stone-100 rounded-2xl border border-stone-200 gap-1">
          {locations.map((loc) => {
            const isSelected = selectedLocation.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-white text-emerald-900 shadow-sm border border-stone-200/80'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-700' : 'text-stone-400'}`} />
                <span>{loc.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Google Maps & Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Google Maps Interactive Embed */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          
          {/* Top Bar of the Map */}
          <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  {selectedLocation.name}
                </h3>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isOpenNow ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                }`}>
                  {isOpenNow ? '● Open Now' : '○ Closed (Opens 8 AM)'}
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-0.5">
                {selectedLocation.address}, {selectedLocation.city}, {selectedLocation.state} {selectedLocation.zip}
              </p>
            </div>

            <a
              href={selectedLocation.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>

          {/* Real Embedded Google Map iframe */}
          <div className="relative w-full h-[420px] sm:h-[480px] bg-stone-100">
            <iframe
              title={`Google Map Location: ${selectedLocation.name}`}
              src={selectedLocation.embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Bottom Bar: GPS Coordinates & Farm Stand Details */}
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="flex items-start gap-2">
              <Compass className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900 block">GPS Coordinates</span>
                <span className="text-stone-500 font-mono text-[11px]">
                  {selectedLocation.lat.toFixed(4)}° N, {Math.abs(selectedLocation.lng).toFixed(4)}° W
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900 block">Operating Hours</span>
                <span className="text-stone-500">{selectedLocation.hours.weekdays}</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Car className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900 block">Visitor Parking</span>
                <span className="text-stone-500">Free parking on-site with EV charging station</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Contact Form & Local NAP Card */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick NAP Contact Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg">
              Direct Contact Details
            </h3>

            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-stone-900 font-medium">Main Farm Address:</strong>
                  <span>{seoSettings.streetAddress}, {seoSettings.city}, {seoSettings.region}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <strong className="block text-stone-900 font-medium">Telephone (Local Orders):</strong>
                  <a href={`tel:${seoSettings.contactPhone}`} className="text-emerald-800 hover:underline font-semibold">
                    {seoSettings.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <strong className="block text-stone-900 font-medium">Email Dispatch:</strong>
                  <a href={`mailto:${seoSettings.contactEmail}`} className="text-emerald-800 hover:underline">
                    {seoSettings.contactEmail}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Farm Inquiry & Bulk Harvest Order Form */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-stone-900 text-lg">
              Send Farm Message
            </h3>
            <p className="text-xs text-stone-500">
              Inquire about seasonal CSA boxes, bulk wholesale orders, or farm tours.
            </p>

            {formSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Message Sent Successfully!</span>
                </div>
                <p>Our local farm manager will respond to you within 2 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rachel Adams"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rachel@example.com"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Phone (for SMS updates)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
                  >
                    <option value="Farm Visit & Pickup">Farm Visit & Pickup</option>
                    <option value="Bulk Organic Purchase">Bulk Organic Purchase / Restaurant Supply</option>
                    <option value="Delivery Schedule Question">Delivery Schedule Question</option>
                    <option value="Organic Certification Details">Organic Certification Details</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need..."
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Farm Desk</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
