import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  Truck, 
  Share2, 
  FileCode,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedSlug, 
    products, 
    navigate, 
    addToCart, 
    seoSettings, 
    language,
    toggleWishlist,
    isWishlisted
  } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showSchemaPreview, setShowSchemaPreview] = useState(false);

  const product = products.find(p => p.slug === selectedSlug) || products[0];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb Navigation (Essential for local SEO indexing) */}
      <nav aria-label="Breadcrumb" className="text-xs text-stone-500 flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700 cursor-pointer">Home</button>
          <span>/</span>
          <button onClick={() => navigate('shop')} className="hover:text-emerald-700 cursor-pointer">Organic Groceries</button>
          <span>/</span>
          <span className="text-stone-900 font-medium truncate max-w-xs">{product.name}</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-xs text-stone-600 hover:text-emerald-700 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'Link Copied!' : 'Share SEO URL'}</span>
        </button>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Product Image & Badges */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xs">
            <img 
              src={product.image} 
              alt={`${product.name} - 100% Certified Organic in ${seoSettings.city}`}
              className="w-full h-96 sm:h-[450px] object-cover"
            />
            <div className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-lg">
              {product.certification}
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs rounded-xl p-3 border border-stone-200 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-700 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                <span>{product.farmOrigin}</span>
              </span>
              <span className="text-emerald-800 font-semibold">{product.harvestDate}</span>
            </div>
          </div>

          {/* Organic Soil Features */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {product.organicFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details & Order Box */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
              <span className="font-semibold text-emerald-800 uppercase tracking-wider">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <strong>{product.rating}</strong> ({product.reviewsCount} local reviews)
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-600">{product.unit}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              {language === 'bn' && product.bnName ? product.bnName : product.name}
            </h1>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-900">${product.price.toFixed(2)}</span>
              <span className="text-xs text-stone-500">Includes all local taxes and zero processing markup</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-stone-600 leading-relaxed">
            {language === 'bn' && product.bnDescription ? product.bnDescription : product.description}
          </p>

          {/* Local Sourcing & Delivery Highlights */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2.5 text-xs text-emerald-950">
            <div className="flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>Same-Day Local Delivery available in {seoSettings.city} on orders by 2 PM.</span>
            </div>
            <div className="flex items-center gap-2 text-stone-600">
              <Clock className="w-4 h-4 text-stone-500" />
              <span>Free instant pickup at {seoSettings.streetAddress} (Google Maps verified).</span>
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-stone-300 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 px-6 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {quantity} to Local Basket • ${(product.price * quantity).toFixed(2)}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                  isWishlisted(product.id)
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-stone-300 hover:border-stone-400 text-stone-600 hover:text-rose-600'
                }`}
                title={isWishlisted(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                aria-label="Toggle wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* SEO Metadata and Schema inspection drawer */}
          <div className="pt-4 border-t border-stone-200">
            <button
              onClick={() => setShowSchemaPreview(!showSchemaPreview)}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{showSchemaPreview ? 'Hide Schema.org JSON-LD' : 'Inspect Schema.org Product Structured Data'}</span>
            </button>

            {showSchemaPreview && (
              <div className="mt-3 p-3 bg-stone-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto border border-stone-800">
                <pre>{JSON.stringify({
                  "@context": "https://schema.org/",
                  "@type": "Product",
                  "name": product.name,
                  "image": [product.image],
                  "description": product.description,
                  "sku": product.id,
                  "brand": { "@type": "Brand", "name": product.farmOrigin },
                  "offers": {
                    "@type": "Offer",
                    "priceCurrency": "USD",
                    "price": product.price.toFixed(2),
                    "availability": "https://schema.org/InStock"
                  }
                }, null, 2)}</pre>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Related Local Items */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-stone-200 space-y-6">
          <h2 className="text-xl font-serif font-bold text-stone-900">
            More Fresh Harvest in {product.category.toUpperCase()}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate('product-detail', rel.slug)}
                className="bg-white rounded-xl border border-stone-200 p-4 hover:border-emerald-300 transition-colors cursor-pointer group"
              >
                <img 
                  src={rel.image} 
                  alt={rel.name} 
                  className="w-full h-36 object-cover rounded-lg mb-3 group-hover:scale-102 transition-transform"
                />
                <h3 className="font-serif font-bold text-sm text-stone-900 group-hover:text-emerald-700 transition-colors truncate">
                  {rel.name}
                </h3>
                <div className="flex justify-between items-center mt-2 text-xs">
                  <span className="font-semibold text-stone-900">${rel.price.toFixed(2)}</span>
                  <span className="text-stone-500">{rel.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
