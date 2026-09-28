import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistDrawerOpen, 
    setIsWishlistDrawerOpen, 
    wishlist, 
    removeFromWishlist, 
    addToCart, 
    clearWishlist,
    navigate,
    language 
  } = useApp();

  if (!isWishlistDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <h2 className="text-base font-serif font-bold text-stone-900">
                  {language === 'bn' ? 'পছন্দের তালিকা (উইশলিস্ট)' : 'My Saved Wishlist'}
                </h2>
                <span className="text-xs text-stone-500 font-medium">
                  {language === 'bn' ? `${wishlist.length}টি পছন্দের পণ্য` : `${wishlist.length} items saved`}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsWishlistDrawerOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-stone-800 text-lg">
                  {language === 'bn' ? 'আপনার উইশলিস্ট খালি' : 'Your wishlist is empty'}
                </h3>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  {language === 'bn'
                    ? 'কোনো পণ্য পূর্বনির্ধারিত নয়। যেকোনো পণ্যের হার্ট আইকনে ক্লিক করে আপনার পছন্দের তালিকা তৈরি করুন।'
                    : 'No items are pre-selected. Click the heart icon on any fresh organic produce to save it for later.'}
                </p>
                <button
                  onClick={() => {
                    setIsWishlistDrawerOpen(false);
                    navigate('shop');
                  }}
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'অর্গানিক খাবার দেখুন' : 'Explore Fresh Produce'}
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-100">
                {wishlist.map((product) => (
                  <div key={product.id} className="py-4 first:pt-0 flex items-start gap-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-stone-900 text-sm truncate">
                        {language === 'bn' && product.bnName ? product.bnName : product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                        <span className="font-bold text-stone-900">${product.price.toFixed(2)}</span>
                        <span>/</span>
                        <span>{language === 'bn' && product.bnUnit ? product.bnUnit : product.unit}</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 block truncate">
                        {product.farmOrigin}
                      </span>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => {
                            addToCart(product, 1);
                            removeFromWishlist(product.id);
                          }}
                          className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'কার্টে নিন' : 'Move to Cart'}</span>
                        </button>

                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-stone-50 space-y-3">
              <button
                onClick={() => {
                  wishlist.forEach(p => addToCart(p, 1));
                  clearWishlist();
                }}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{language === 'bn' ? 'সবগুলো পণ্য কার্টে যোগ করুন' : 'Move All Items to Cart'}</span>
              </button>

              <button
                onClick={clearWishlist}
                className="w-full py-2 text-stone-500 hover:text-rose-700 text-xs text-center cursor-pointer transition-colors"
              >
                {language === 'bn' ? 'উইশলিস্ট খালি করুন' : 'Clear Wishlist'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
