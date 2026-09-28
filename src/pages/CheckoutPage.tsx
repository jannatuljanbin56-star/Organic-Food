import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  Truck, 
  Store, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  ArrowLeft, 
  Printer, 
  Clock, 
  Phone,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    locations, 
    selectedLocation, 
    setSelectedLocation, 
    placeOrder, 
    navigate, 
    seoSettings, 
    siteContent,
    language 
  } = useApp();

  const [deliveryType, setDeliveryType] = useState<'local_delivery' | 'pickup'>('local_delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'card'>('cod');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const deliveryFee = deliveryType === 'pickup' 
    ? 0 
    : (cartTotal >= siteContent.freeDeliveryThreshold ? 0 : siteContent.deliveryFee);
  const orderTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    if (deliveryType === 'local_delivery' && !customerAddress) return;

    const newOrder = placeOrder({
      items: [...cart],
      subtotal: cartTotal,
      deliveryFee,
      total: orderTotal,
      deliveryType,
      pickupLocation: deliveryType === 'pickup' ? selectedLocation.name : undefined,
      customerName,
      customerPhone,
      deliveryAddress: customerAddress,
      paymentMethod
    });

    setCompletedOrder(newOrder);
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
            Order Confirmed & Farm Notified
          </span>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            Thank You, {completedOrder.customerName}!
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            Your fresh local organic harvest order has been received. Order ID: <strong className="font-mono text-stone-900">{completedOrder.id}</strong>.
          </p>

          {/* Receipt Card */}
          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 text-left space-y-4 text-xs">
            <div className="flex justify-between border-b border-stone-200 pb-3">
              <div>
                <strong className="block text-stone-900 text-sm font-serif">{seoSettings.businessName}</strong>
                <span className="text-stone-500">{seoSettings.streetAddress}, {seoSettings.city}</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-stone-500 block">{new Date(completedOrder.createdAt).toLocaleDateString()}</span>
                <span className="text-emerald-700 font-semibold uppercase">{completedOrder.status}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-semibold text-stone-800 block">Harvest Items:</span>
              {completedOrder.items.map((it, i) => (
                <div key={i} className="flex justify-between text-stone-600">
                  <span>{it.quantity}x {it.product.name} ({it.product.unit})</span>
                  <span className="font-semibold text-stone-900">${(it.product.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 pt-3 space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${completedOrder.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery ({completedOrder.deliveryType === 'pickup' ? 'Farm Stand Pickup' : 'Local Delivery'})</span>
                <span>{completedOrder.deliveryFee === 0 ? 'FREE' : `$${completedOrder.deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-stone-900 pt-1 border-t border-dashed border-stone-300">
                <span>Total Paid / Due</span>
                <span>${completedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-stone-200 pt-3 text-[11px] text-stone-500">
              {completedOrder.deliveryType === 'pickup' ? (
                <div>
                  <strong className="text-stone-800">Pickup Location: </strong>
                  <span>{completedOrder.pickupLocation}</span>
                </div>
              ) : (
                <div>
                  <strong className="text-stone-800">Delivery Address: </strong>
                  <span>{completedOrder.deliveryAddress}</span>
                </div>
              )}
              <div>
                <strong className="text-stone-800">Customer Phone: </strong>
                <span>{completedOrder.customerPhone}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice Receipt</span>
            </button>

            <button
              onClick={() => navigate('shop')}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-stone-900">Your basket is empty</h1>
        <p className="text-xs text-stone-500">Add fresh local organic vegetables or honey before proceeding to checkout.</p>
        <button
          onClick={() => navigate('shop')}
          className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          Explore Fresh Produce
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-emerald-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Checkout Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Local Organic Checkout
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Serving {seoSettings.city}, Oakridge & Riverside with same-day harvested produce.
            </p>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            {/* Delivery Type Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700">
                Choose Fulfillment Method *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryType('local_delivery')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    deliveryType === 'local_delivery'
                      ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Truck className={`w-5 h-5 ${deliveryType === 'local_delivery' ? 'text-emerald-700' : 'text-stone-400'}`} />
                    <span className="text-xs font-bold text-stone-900">
                      {cartTotal >= 35 ? 'FREE' : '$4.50'}
                    </span>
                  </div>
                  <div>
                    <strong className="block text-xs text-stone-900 font-semibold">Local Home Delivery</strong>
                    <span className="text-[11px] text-stone-500">Same-day across {seoSettings.city}</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryType('pickup')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    deliveryType === 'pickup'
                      ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Store className={`w-5 h-5 ${deliveryType === 'pickup' ? 'text-emerald-700' : 'text-stone-400'}`} />
                    <span className="text-xs font-bold text-emerald-800">FREE</span>
                  </div>
                  <div>
                    <strong className="block text-xs text-stone-900 font-semibold">Farm Stand Pickup</strong>
                    <span className="text-[11px] text-stone-500">Google Maps verified hubs</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Farm Pickup Location Picker */}
            {deliveryType === 'pickup' && (
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
                <span className="font-semibold text-stone-800 block">Select Farm Stand for Pickup:</span>
                <select
                  value={selectedLocation.id}
                  onChange={(e) => {
                    const loc = locations.find(l => l.id === e.target.value);
                    if (loc) setSelectedLocation(loc);
                  }}
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name} — {loc.address}
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-stone-500 flex items-center gap-1.5 pt-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ready in 45 minutes. Open hours: {selectedLocation.hours.weekdays}</span>
                </div>
              </div>
            )}

            {/* Customer Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                Recipient Contact Info
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Jannatul Ferdous"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Phone Number (for SMS & Driver) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000 or 017xxxxxxxx"
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {deliveryType === 'local_delivery' && (
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Street Address & Apartment in {seoSettings.city} *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="House / Flat no, Road name, Neighborhood, City..."
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-stone-800 uppercase tracking-wider">
                Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'cod' ? 'border-emerald-700 bg-emerald-50/50' : 'border-stone-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="text-emerald-700"
                  />
                  <span className="text-xs font-medium text-stone-800">Cash on Delivery</span>
                </label>

                <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'bkash' ? 'border-emerald-700 bg-emerald-50/50' : 'border-stone-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="text-emerald-700"
                  />
                  <span className="text-xs font-medium text-stone-800">bKash / Mobile Pay</span>
                </label>

                <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors ${
                  paymentMethod === 'card' ? 'border-emerald-700 bg-emerald-50/50' : 'border-stone-200'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="text-emerald-700"
                  />
                  <span className="text-xs font-medium text-stone-800">Credit / Debit Card</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold shadow-md shadow-emerald-900/10 transition-colors cursor-pointer"
            >
              Confirm Order • ${orderTotal.toFixed(2)}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8 space-y-6">
          <h2 className="text-base font-serif font-bold text-stone-900">
            Order Summary ({cart.length} items)
          </h2>

          <div className="divide-y divide-stone-200 text-xs max-h-72 overflow-y-auto space-y-3">
            {cart.map((item) => (
              <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <span className="font-semibold text-stone-900 block truncate max-w-[170px]">
                      {item.product.name}
                    </span>
                    <span className="text-stone-500 text-[11px]">
                      {item.quantity} × ${item.product.price.toFixed(2)} / {item.product.unit}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-stone-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-stone-200 pt-4 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Local Delivery Fee</span>
              <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
              <span>Grand Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-stone-200 text-[11px] text-stone-500 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Certified Organic Quality Guarantee</span>
            </div>
            <p>If any produce is not crisp and fresh to your satisfaction, we will replace it immediately free of charge.</p>
          </div>
        </div>

      </div>

    </div>
  );
};
