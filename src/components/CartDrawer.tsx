import React from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Store,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartTotal, 
    navigate,
    language,
    selectedLocation,
    siteContent
  } = useApp();

  if (!isCartDrawerOpen) return null;

  const isFreeDeliveryEligible = cartTotal >= siteContent.freeDeliveryThreshold;
  const deliveryFee = isFreeDeliveryEligible ? 0 : siteContent.deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <h2 className="text-lg font-serif font-bold text-stone-900">
                {language === 'bn' ? 'আপনার বাজার ঝুড়ি' : 'Local Farm Basket'}
              </h2>
              <span className="text-xs text-stone-500 font-medium">({cart.length} items)</span>
            </div>
            <button 
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Local Free Delivery Progress Bar */}
          <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100">
            <div className="flex items-center justify-between text-xs text-emerald-950 font-medium mb-1.5">
              <span>{isFreeDeliveryEligible 
                ? (language === 'bn' ? '🎉 আপনি ফ্রি লোকাল ডেলিভারি পেয়েছেন!' : '🎉 You unlocked FREE Local Farm Delivery!')
                : (language === 'bn' 
                    ? `ফ্রি ডেলিভারির জন্য আরও $${(siteContent.freeDeliveryThreshold - cartTotal).toFixed(2)} যোগ করুন` 
                    : `Add $${(siteContent.freeDeliveryThreshold - cartTotal).toFixed(2)} more for FREE local delivery`)}</span>
              <span>${cartTotal.toFixed(2)} / ${siteContent.freeDeliveryThreshold.toFixed(2)}</span>
            </div>
            <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-700 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (cartTotal / siteContent.freeDeliveryThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-stone-400" />
                </div>
                <h3 className="text-base font-serif font-bold text-stone-800 mb-1">
                  {language === 'bn' ? 'আপনার ঝুড়ি খালি' : 'Your farm basket is empty'}
                </h3>
                <p className="text-xs text-stone-500 mb-6 max-w-xs">
                  {language === 'bn' 
                    ? 'তাজা অর্গানিক শাকসবজি, খাটি মধু ও ঘানি ভাঙা তেল যুক্ত করুন।'
                    : 'Explore fresh organic produce harvested daily from local sustainable farms.'}
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('shop');
                  }}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
                >
                  {language === 'bn' ? 'অর্গানিক খাবার দেখুন' : 'Explore Farm Produce'}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-xl border border-stone-200 hover:border-emerald-200 bg-stone-50/50 transition-colors"
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-18 h-18 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-stone-900 truncate">
                      {language === 'bn' && item.product.bnName ? item.product.bnName : item.product.name}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {item.product.farmOrigin} · {item.product.unit}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-l-lg cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-r-lg cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-stone-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-stone-200 bg-stone-50 space-y-4">
              <div className="space-y-2 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>Estimated Local Delivery</span>
                  </span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500 pt-1 border-t border-dashed border-stone-200">
                  <span className="flex items-center gap-1">
                    <Store className="w-3.5 h-3.5 text-stone-400" />
                    <span>Or Pickup Free:</span>
                  </span>
                  <span className="truncate max-w-[180px]">{selectedLocation.name}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span>${(cartTotal + deliveryFee).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Satisfaction Guarantee: Harvested fresh within 24 hours.</span>
              </div>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigate('checkout');
                }}
                className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10 transition-colors cursor-pointer"
              >
                <span>{language === 'bn' ? 'অর্ডার সম্পন্ন করুন' : 'Proceed to Local Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
