import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, FarmLocation, SeoSettings, Order, PageRoute, SiteContentSettings } from '../types';
import { INITIAL_PRODUCTS, FARM_LOCATIONS, INITIAL_SEO_SETTINGS, INITIAL_SITE_CONTENT } from '../data/mockData';
import { db, analytics, firebaseConfig } from '../firebase';
import { collection, doc, setDoc, updateDoc, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';

interface AppContextType {
  route: PageRoute;
  selectedSlug: string | null;
  navigate: (route: PageRoute, slug?: string) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
  seoSettings: SeoSettings;
  updateSeoSettings: (settings: Partial<SeoSettings>) => void;
  siteContent: SiteContentSettings;
  updateSiteContent: (content: Partial<SiteContentSettings>) => void;
  locations: FarmLocation[];
  selectedLocation: FarmLocation;
  setSelectedLocation: (loc: FarmLocation) => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isProductModalOpen: boolean;
  setIsProductModalOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  // Wishlist feature (Starts at 0 for new users)
  wishlist: Product[];
  wishlistCount: number;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
  isWishlistDrawerOpen: boolean;
  setIsWishlistDrawerOpen: (open: boolean) => void;
  // Firebase status
  firebaseConnected: boolean;
  firebaseProjectId: string;
  // Admin authentication & control
  isAdmin: boolean;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
}

export const checkIsAdminHash = (hashStr: string): boolean => {
  if (!hashStr) return false;
  try {
    const decoded = decodeURIComponent(hashStr);
    return decoded === '#admin=67%' || decoded.includes('admin=67%') || hashStr === '#admin=67%' || hashStr === '#admin=67%25';
  } catch {
    return hashStr.includes('admin=67%') || hashStr.includes('admin=67%25');
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation state
  const [route, setRoute] = useState<PageRoute>(() => {
    if (typeof window !== 'undefined' && checkIsAdminHash(window.location.hash)) {
      return 'admin';
    }
    return 'home';
  });
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Admin authentication state: ONLY enabled if secret URL hash is #admin=67% or previously verified in this session
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      if (typeof window !== 'undefined' && checkIsAdminHash(window.location.hash)) {
        sessionStorage.setItem('organic_food_admin_auth', 'true');
        return true;
      }
      return sessionStorage.getItem('organic_food_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);

  // Listen to hash changes (e.g., user enters /#admin=67% into browser URL bar)
  useEffect(() => {
    const checkHashAuth = () => {
      if (checkIsAdminHash(window.location.hash)) {
        setIsAdmin(true);
        sessionStorage.setItem('organic_food_admin_auth', 'true');
        setRoute('admin');
      }
    };

    checkHashAuth();
    window.addEventListener('hashchange', checkHashAuth);
    return () => window.removeEventListener('hashchange', checkHashAuth);
  }, []);

  const adminLogin = (password: string): boolean => {
    // If user enters password manually or via secret
    if (password === 'admin123' || password === 'organic2026' || password === 'admin=67%') {
      setIsAdmin(true);
      sessionStorage.setItem('organic_food_admin_auth', 'true');
      setIsAdminLoginModalOpen(false);
      window.location.hash = 'admin=67%';
      navigate('admin');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('organic_food_admin_auth');
    try {
      // Clear secret hash from browser URL bar on logout
      if (window.location.hash) {
        window.history.pushState('', document.title, window.location.pathname);
      }
    } catch (e) {
      console.error(e);
    }
    setRoute('home');
  };

  // Products state with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('organic_food_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('organic_food_products', JSON.stringify(products));
  }, [products]);

  // SEO Settings with localStorage persistence - enforce businessName = "Organic Food"
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(() => {
    try {
      const saved = localStorage.getItem('organic_food_seo');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.businessName === 'GreenRoot Organics' || !parsed.businessName) {
          parsed.businessName = 'Organic Food';
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return {
      ...INITIAL_SEO_SETTINGS,
      businessName: 'Organic Food'
    };
  });

  useEffect(() => {
    localStorage.setItem('organic_food_seo', JSON.stringify(seoSettings));
  }, [seoSettings]);

  // Site Content state (Hero text, photos, budgets, delivery fees)
  const [siteContent, setSiteContent] = useState<SiteContentSettings>(() => {
    try {
      const saved = localStorage.getItem('organic_food_content');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SITE_CONTENT;
  });

  useEffect(() => {
    localStorage.setItem('organic_food_content', JSON.stringify(siteContent));
  }, [siteContent]);

  const updateSiteContent = (content: Partial<SiteContentSettings>) => {
    setSiteContent(prev => ({
      ...prev,
      ...content
    }));
  };

  // Cart state - strictly starts empty [] for new users (0 items, 0 budget preselected)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('organic_food_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('organic_food_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist state - strictly starts empty [] for new users (0 items, no pre-selections)
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('organic_food_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('organic_food_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some(p => p.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = wishlist.length;

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('organic_food_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('organic_food_orders', JSON.stringify(orders));
  }, [orders]);

  // Locations state
  const [locations] = useState<FarmLocation[]>(FARM_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<FarmLocation>(FARM_LOCATIONS[0]);

  // UI state
  const [language, setLanguage] = useState<'en' | 'bn'>('bn'); // Defaulting to Bengali friendly or toggleable
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Route URL synchronizer
  const navigate = (newRoute: PageRoute, slug?: string) => {
    // Protect admin route
    if (newRoute === 'admin' && !isAdmin) {
      setIsAdminLoginModalOpen(true);
      return;
    }

    setRoute(newRoute);
    if (slug) {
      setSelectedSlug(slug);
    } else {
      setSelectedSlug(null);
    }

    // Update browser URL cleanly for SEO and back/forward navigation
    let path = '/';
    if (newRoute === 'shop') path = '/products';
    else if (newRoute === 'product-detail' && slug) path = `/products/${slug}`;
    else if (newRoute === 'farms') path = '/local-farms';
    else if (newRoute === 'about') path = '/about-our-farm';
    else if (newRoute === 'contact') path = '/contact-and-pickup';
    else if (newRoute === 'sitemap') path = '/sitemap.xml';
    else if (newRoute === 'seo-hub') path = '/local-seo-manager';
    else if (newRoute === 'cart') path = '/cart';
    else if (newRoute === 'checkout') path = '/checkout';
    else if (newRoute === 'admin') path = '/admin-portal';

    if (window.location.pathname !== path) {
      window.history.pushState({ route: newRoute, slug }, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to popstate (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      if (pathname.startsWith('/products/')) {
        const slug = pathname.replace('/products/', '');
        setRoute('product-detail');
        setSelectedSlug(slug);
      } else if (pathname === '/products') {
        setRoute('shop');
      } else if (pathname === '/local-farms') {
        setRoute('farms');
      } else if (pathname === '/about-our-farm') {
        setRoute('about');
      } else if (pathname === '/contact-and-pickup') {
        setRoute('contact');
      } else if (pathname === '/sitemap.xml') {
        setRoute('sitemap');
      } else if (pathname === '/local-seo-manager') {
        setRoute('seo-hub');
      } else if (pathname === '/checkout') {
        setRoute('checkout');
      } else if (pathname === '/admin-portal') {
        if (sessionStorage.getItem('organic_food_admin_auth') === 'true' || checkIsAdminHash(window.location.hash)) {
          setIsAdmin(true);
          setRoute('admin');
        } else {
          setRoute('home');
        }
      } else {
        setRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Product management
  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    removeFromCart(id);
  };

  // SEO update
  const updateSeoSettings = (newSettings: Partial<SeoSettings>) => {
    setSeoSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  // Order placement with Firebase Firestore sync
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };
    
    // Save to local state
    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Sync to Firebase Firestore asynchronously
    try {
      const orderRef = doc(db, 'orders', newOrder.id);
      setDoc(orderRef, newOrder)
        .then(() => {
          console.log(`[Firebase] Order ${newOrder.id} successfully saved to Firestore in project ${firebaseConfig.projectId}`);
        })
        .catch((err) => {
          console.warn('[Firebase] Firestore sync warning (using local fallback):', err.message);
        });
    } catch (e) {
      console.warn('[Firebase] Firestore write caught error:', e);
    }

    // Log to Firebase Analytics
    try {
      if (analytics) {
        logEvent(analytics, 'purchase', {
          transaction_id: newOrder.id,
          value: newOrder.total,
          currency: 'USD',
          items: newOrder.items.map(it => ({
            item_id: it.product.id,
            item_name: it.product.name,
            price: it.product.price,
            quantity: it.quantity
          }))
        });
      }
    } catch (e) {
      console.warn('[Firebase] Analytics event error:', e);
    }

    return newOrder;
  };

  // Order status update (by Admin) with Firebase sync
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );

    // Sync update to Firebase Firestore
    try {
      const orderRef = doc(db, 'orders', orderId);
      updateDoc(orderRef, { status })
        .then(() => {
          console.log(`[Firebase] Order ${orderId} status updated to ${status} in Firestore`);
        })
        .catch((err) => {
          console.warn('[Firebase] Firestore update warning:', err.message);
        });
    } catch (e) {
      console.warn('[Firebase] Firestore update caught error:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        route,
        selectedSlug,
        navigate,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemsCount,
        seoSettings,
        updateSeoSettings,
        siteContent,
        updateSiteContent,
        locations,
        selectedLocation,
        setSelectedLocation,
        language,
        setLanguage,
        searchQuery,
        setSearchQuery,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isProductModalOpen,
        setIsProductModalOpen,
        orders,
        placeOrder,
        updateOrderStatus,
        wishlist,
        wishlistCount,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
        clearWishlist,
        isWishlistDrawerOpen,
        setIsWishlistDrawerOpen,
        firebaseConnected: true,
        firebaseProjectId: firebaseConfig.projectId,
        isAdmin,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        adminLogin,
        adminLogout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
