import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star, 
  PlusCircle, 
  Check, 
  Sparkles, 
  SlidersHorizontal,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { 
    products, 
    navigate, 
    addToCart, 
    seoSettings, 
    language, 
    searchQuery, 
    setSearchQuery,
    setIsProductModalOpen,
    toggleWishlist,
    isWishlisted
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  const categories = [
    { id: 'all', label: language === 'bn' ? 'সব পণ্য' : 'All Products' },
    { id: 'vegetables', label: language === 'bn' ? 'শাকসবজি' : 'Fresh Vegetables' },
    { id: 'fruits', label: language === 'bn' ? 'ফলমূল' : 'Orchard Fruits' },
    { id: 'dairy-honey', label: language === 'bn' ? 'মধু ও ঘি' : 'Raw Honey & Dairy' },
    { id: 'oils-grains', label: language === 'bn' ? 'তেল ও চাল' : 'Cold-Pressed Oils & Grains' },
    { id: 'herbs', label: language === 'bn' ? 'ভেষজ ও পুদিনা' : 'Herbs & Botanicals' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesCategory = selectedCategory === 'all' || prod.category === selectedCategory;
      const matchesSearch = 
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.bnName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.farmOrigin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.localKeywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStock = !onlyInStock || prod.inStock;

      return matchesCategory && matchesSearch && matchesStock;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [products, selectedCategory, searchQuery, onlyInStock, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Local SEO Header & Breadcrumb */}
      <div className="border-b border-stone-200 pb-6">
        <nav aria-label="Breadcrumb" className="text-xs text-stone-500 mb-2 flex items-center gap-1.5">
          <button onClick={() => navigate('home')} className="hover:text-emerald-700 cursor-pointer">Home</button>
          <span>/</span>
          <span className="text-stone-900 font-medium">Local Organic Catalog</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              {language === 'bn' 
                ? `${seoSettings.city}-এর সেরা অর্গানিক খাদ্য সম্ভার` 
                : `100% Certified Organic Food & Produce in ${seoSettings.city}`}
            </h1>
            <p className="text-sm text-stone-600 mt-1 max-w-2xl">
              Freshly harvested pesticide-free vegetables, wood-churned oils, unpasteurized honey, and heirloom grains. Pick up locally or choose same-day delivery.
            </p>
          </div>

          <button
            onClick={() => setIsProductModalOpen(true)}
            className="self-start md:self-auto px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{language === 'bn' ? 'নতুন পণ্য তালিকাভুক্ত করুন' : 'List New Custom Product'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar Controls (Segmented Tabs adhering to frontend-design skill) */}
      <div className="space-y-4">
        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search, Sort and Stock filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'bn' ? 'পণ্য বা ফার্ম খুঁজুন...' : 'Search by item, farm, keyword...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* In stock toggle */}
            <label className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Select */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Product Results Count */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>Showing <strong>{filteredProducts.length}</strong> fresh organic items in {seoSettings.city}</span>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-emerald-700 hover:underline cursor-pointer"
          >
            Clear Search Filter
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-stone-50 border border-dashed border-stone-300 rounded-2xl p-12 text-center space-y-3">
          <p className="text-base font-serif font-bold text-stone-700">No organic items matched your query</p>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try searching for another keyword like "honey", "oil", "spinach", or add a custom product!
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <article 
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 transition-all flex flex-col group"
            >
              {/* Image & URL clickable to SEO Slug */}
              <div 
                onClick={() => navigate('product-detail', product.slug)}
                className="relative h-52 bg-stone-100 overflow-hidden cursor-pointer"
              >
                <img 
                  src={product.image} 
                  alt={`${product.name} - Organic Food in ${seoSettings.city}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                  {product.certification}
                </div>

                {/* Wishlist toggle button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-colors cursor-pointer z-10 ${
                    isWishlisted(product.id)
                      ? 'bg-rose-50 text-rose-600 shadow-sm'
                      : 'bg-stone-900/60 text-white hover:bg-stone-900/85 hover:text-rose-400'
                  }`}
                  aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  title={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? 'fill-rose-600 text-rose-600' : ''}`} />
                </button>

                {product.stockCount <= 10 && product.inStock && (
                  <div className="absolute bottom-2.5 right-2.5 bg-amber-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    Only {product.stockCount} left
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata */}
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-1.5">
                    <span>{product.farmOrigin}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.unit}</span>
                  </div>

                  <h3 
                    onClick={() => navigate('product-detail', product.slug)}
                    className="font-serif font-bold text-stone-900 text-base group-hover:text-emerald-800 transition-colors cursor-pointer line-clamp-1"
                  >
                    {language === 'bn' && product.bnName ? product.bnName : product.name}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {language === 'bn' && product.bnDescription ? product.bnDescription : product.description}
                  </p>

                  {/* Rating & Harvest time */}
                  <div className="flex items-center gap-2 mt-3 text-xs text-stone-500">
                    <span className="flex items-center gap-0.5 text-amber-600 font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {product.rating}
                    </span>
                    <span>({product.reviewsCount})</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[11px] text-emerald-700">{product.harvestDate}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-stone-400 block">Price</span>
                    <span className="text-lg font-bold text-stone-900">${product.price.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    disabled={!product.inStock}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-300 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{product.inStock ? 'Add to Cart' : 'Sold Out'}</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
