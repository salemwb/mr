import React, { useState, useEffect } from 'react';
import { MessageCircle, Heart, Star, ShoppingBag, Send, MapPin, ChevronRight, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';

// Data Seeds & Initializers
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_BRANCHES,
  INITIAL_SUBMISSIONS,
  DEFAULT_CONFIG,
  INITIAL_REVIEWS
} from './data';

// Component Imports
import { Category, Product, Branch, RestaurantConfig, Submission, CartItem, Language, Theme, Review } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import BranchesSection from './components/BranchesSection';
import ComplaintsSuggestions from './components/ComplaintsSuggestions';
import ReviewSlider from './components/ReviewSlider';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';

// Safe Storage Wrapper to prevent layout blocking in restricted sandboxed iframes
const safeStorage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage.getItem blocked:', e);
      return null;
    }
  },
  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage.setItem blocked:', e);
    }
  },
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('localStorage.clear blocked:', e);
    }
  }
};

export default function App() {
  // Locale Languages & Themes
  const [lang, setLang] = useState<Language>(() => {
    const saved = safeStorage.get('mr_broast_lang');
    return (saved as Language) || 'en';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = safeStorage.get('mr_broast_theme');
    return (saved as Theme) || 'light';
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [cartOpen, setCartOpen] = useState(false);

  // Core Seed Databases
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = safeStorage.get('mr_broast_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = safeStorage.get('mr_broast_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [branches, setBranches] = useState<Branch[]>(() => {
    const saved = safeStorage.get('mr_broast_branches');
    return saved ? JSON.parse(saved) : INITIAL_BRANCHES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = safeStorage.get('mr_broast_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = safeStorage.get('mr_broast_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [config, setConfig] = useState<RestaurantConfig>(() => {
    const saved = safeStorage.get('mr_broast_config');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = safeStorage.get('mr_broast_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Shopping Cart & Chosen Checkout Branch
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = safeStorage.get('mr_broast_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedBranchId, setSelectedBranchId] = useState<string>(() => {
    const saved = safeStorage.get('mr_broast_selected_branch');
    if (saved) return saved;
    return branches[0]?.id || 'branch-olaya';
  });

  // Admin Login persistent token
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return safeStorage.get('mr_broast_admin_login') === 'true';
  });


  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Trigger non-intrusive notification banners
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Synchronize LocalStorage Blocks
  useEffect(() => {
    safeStorage.set('mr_broast_lang', lang);
    // Control HTML text layout directions dynamically for RTL and LTR support
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    safeStorage.set('mr_broast_theme', theme);
    // Propagate theme classes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    safeStorage.set('mr_broast_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    safeStorage.set('mr_broast_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    safeStorage.set('mr_broast_branches', JSON.stringify(branches));
  }, [branches]);

  useEffect(() => {
    safeStorage.set('mr_broast_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    safeStorage.set('mr_broast_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    safeStorage.set('mr_broast_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    safeStorage.set('mr_broast_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    safeStorage.set('mr_broast_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    safeStorage.set('mr_broast_selected_branch', selectedBranchId);
  }, [selectedBranchId]);

  useEffect(() => {
    safeStorage.set('mr_broast_admin_login', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // --- ACTIONS ---

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.product.id === product.id);
      if (existing) {
        showToast(
          lang === 'ar' 
            ? `تم زيادة كمية ${product.nameAr} في السلة!` 
            : `Updated ${product.nameEn} count in your cart!`, 
          'success'
        );
        return prevItems.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      showToast(
        lang === 'ar' 
          ? `أضيفت ${product.nameAr} للسلة بنجاح! 🍗` 
          : `Added ${product.nameEn} to your order! 🍗`, 
        'success'
      );
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (productId: string, difference: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + difference;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveCartItem = (productId: string) => {
    const item = cartItems.find(i => i.product.id === productId);
    setCartItems((prevItems) => prevItems.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(
        lang === 'ar' 
          ? `تم إزالة ${item.product.nameAr} من السلة` 
          : `Removed ${item.product.nameEn} from your cart`, 
        'success'
      );
    }
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        showToast(lang === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from your favorites list', 'success');
        return prev.filter((id) => id !== productId);
      }
      showToast(lang === 'ar' ? 'أضيفت للمفضلة الجانبية ❤️' : 'Added to your favorites list ❤️', 'success');
      return [...prev, productId];
    });
  };

  const handleAddSubmission = (newSub: Omit<Submission, 'id' | 'date' | 'status'>) => {
    const submission: Submission = {
      id: 'sub-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      ...newSub
    };
    setSubmissions((prev) => [submission, ...prev]);
  };

  // Pre-select a branch and trigger cart drawer side slip checkout instantly
  const handleOrderFromBranch = (branch: Branch) => {
    setSelectedBranchId(branch.id);
    setActiveTab('menu'); // Switch view tab to menu so they see food items
    setCartOpen(true); // Pop cart drawer instantly
    showToast(
      lang === 'ar'
        ? `تم اختيار فرع ${branch.nameAr} لتوصيل طلبك!`
         : `Fulfilling branch set to ${branch.nameEn}!`,
      'success'
    );
  };

  // Featured meals filter
  const featuredMeals = products.filter((p) => p.isAvailable && p.isFeatured);
  // Special values
  const specialOffers = products.filter((p) => p.isAvailable && p.isSpecialOffer);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200 font-sans flex flex-col transition-colors duration-300">
      
      {/* Dynamic Toast Feedback Card */}
      {toastMessage && (
        <div 
          id="toast-notification-banner"
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-3 px-6 py-4 rounded-2xl shadow-2xl border transition-all ${
            toastType === 'success'
              ? 'bg-zinc-950 border-green-500/30 text-white dark:bg-white dark:text-zinc-950 dark:border-green-300'
              : 'bg-red-600 border-red-500 text-white'
          } ${lang === 'ar' ? 'space-x-reverse' : ''}`}
        >
          {toastType === 'success' ? (
            <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-white shrink-0" />
          )}
          <span className="text-xs md:text-sm font-black tracking-wide leading-tight">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Primary Sticky Header */}
      <Navbar
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        config={config}
        onOpenAdmin={() => setActiveTab('admin')}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* sliding Cart Drawer Sheet */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        lang={lang}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        branches={branches}
        toast={showToast}
        selectedBranchId={selectedBranchId}
        setSelectedBranchId={setSelectedBranchId}
      />

      {/* RENDER ACTIVE TAB BODY */}
      <main className="flex-grow">
        
        {activeTab === 'home' && (
          <div className="space-y-0" id="home-view-container">
            {/* Hero Splash Area */}
            <Hero
              lang={lang}
              onOrderNow={() => {
                setActiveTab('menu');
                setTimeout(() => {
                  document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              onExploreBranches={() => {
                setActiveTab('branches');
                setTimeout(() => {
                  document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              config={config}
            />

            {/* SPECIAL OFFERS ROW (If active) */}
            {specialOffers.length > 0 && (
              <section className="py-16 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900" id="special-offers-grid">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
                    <div>
                      <span className="text-xs font-black uppercase text-red-500 tracking-widest block mb-1">
                        {lang === 'ar' ? config.offersTitleAr || 'عروض ساخنة لفترة محدودة' : config.offersTitleEn || 'Hot Limited Offers'}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white leading-tight">
                        {lang === 'ar' ? config.offersHeadingAr || 'وفر مع عروض مستر بروستد 🔥' : config.offersHeadingEn || 'Save Big With Mr. Broast Deals 🔥'}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialOffers.slice(0, 3).map((p) => (
                      <div
                        key={p.id}
                        className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-150 dark:border-zinc-800 p-5 flex items-center space-x-4 relative group"
                      >
                        <img
                          src={p.image}
                          alt={lang === 'ar' ? p.nameAr : p.nameEn}
                          referrerPolicy="no-referrer"
                          className="w-24 h-24 rounded-2xl object-cover shrink-0"
                        />
                        <div className="flex-grow space-y-1 min-w-0 pr-2">
                          <span className="bg-red-500 text-white font-extrabold text-[9px] uppercase px-2 py-0.5 rounded-full inline-block mb-1">
                            {lang === 'ar' ? p.discountTagAr || 'عرض الموفر' : p.discountTagEn || 'PROMO'}
                          </span>
                          <h3 className="font-extrabold text-sm text-zinc-900 dark:text-white truncate">
                            {lang === 'ar' ? p.nameAr : p.nameEn}
                          </h3>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                            {lang === 'ar' ? p.descriptionAr : p.descriptionEn}
                          </p>
                          <div className="flex items-center space-x-2 pt-1">
                            <span className="text-red-500 font-black text-sm">{p.price.toFixed(2)} SR</span>
                            {p.originalPrice && (
                              <span className="text-xs text-zinc-400 line-through">{p.originalPrice.toFixed(2)} SR</span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddToCart(p)}
                          className="p-3.5 rounded-2xl bg-red-500 hover:bg-zinc-900 text-white shrink-0 active:scale-90 transition-all cursor-pointer"
                          title="Add to cart"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* FEATURED MEALS RENDER (BEST-SELLERS SECTION) */}
            <section className="py-16 bg-zinc-50 dark:bg-zinc-900/60" id="featured-best-sellers">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-red-500">
                    {lang === 'ar' ? config.featuredTitleAr || 'الخيارات المفضلة للجميع' : config.featuredTitleEn || 'Customer Favorites'}
                  </span>
                  <h2 className="text-3xl md:text-3xl font-black text-zinc-90 w-full text-zinc-850 dark:text-white">
                    {lang === 'ar' ? config.featuredHeadingAr || 'الأكثر طلبًا ومبيعًا لدينا 👑' : config.featuredHeadingEn || 'Our Legendary Featured Meals 👑'}
                  </h2>
                  <p className="text-zinc-550 dark:text-zinc-400 text-sm">
                    {lang === 'ar' 
                      ? config.featuredDescAr || 'مجموعة منتقاة بعناية من أفضل المأكولات التي يفضلها عملاؤنا الكرام دائماً.' 
                      : config.featuredDescEn || 'Hand-picked fast food selections that our guests order day in, day out.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredMeals.slice(0, 3).map((p) => (
                    <article
                      key={p.id}
                      className="bg-white dark:bg-zinc-950 rounded-[2rem] overflow-hidden border border-zinc-150 dark:border-zinc-850 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.nameEn}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform"
                        />
                        <div className="absolute top-4 right-4 bg-amber-500 text-zinc-950 font-black text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                          {lang === 'ar' ? 'موصى به' : 'HERO CHOICE'}
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow space-y-2">
                        <h3 className="text-base font-extrabold text-zinc-900 dark:text-white line-clamp-1">
                          {lang === 'ar' ? p.nameAr : p.nameEn}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed line-clamp-2 pb-4 flex-grow">
                          {lang === 'ar' ? p.descriptionAr : p.descriptionEn}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-850/60">
                          <span className="text-base font-black text-red-500">{p.price.toFixed(2)} SR</span>
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="px-4 py-2 bg-red-500 text-white rounded-xl text-xs font-extrabold uppercase hover:bg-zinc-900 transition-colors cursor-pointer"
                          >
                            {lang === 'ar' ? 'اطلب الآن' : 'Order Now'}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Redirect button to full menu view */}
                <div className="text-center mt-10">
                  <button
                    onClick={() => {
                      setActiveTab('menu');
                      setTimeout(() => {
                        document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-6 py-3.5 border border-zinc-300 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white font-extrabold text-xs tracking-wider uppercase hover:bg-red-500 hover:border-red-500 hover:text-white transition-all cursor-pointer flex items-center space-x-2 mx-auto"
                  >
                    <span>{lang === 'ar' ? 'عرض القائمة الكاملة 🍟' : 'Browse Full Menu 🍟'}</span>
                  </button>
                </div>

              </div>
            </section>

            {/* Quick Branches Location Preview Panel */}
            <section className="py-16 bg-white dark:bg-zinc-950" id="quick-branches-preview">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Copy content */}
                  <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
                    <span className="text-xs font-black uppercase text-red-500 tracking-widest block">
                      {lang === 'ar' ? 'فروعنا وتغطيتنا الجغرافية' : 'Coverage Area'}
                    </span>
                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white leading-tight">
                      {lang === 'ar' ? 'مستر بروستد دائمًا في خدمتك' : 'Closer Than You Think!'}
                    </h2>
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {lang === 'ar' 
                        ? 'ننتشر في أهم وأكبر الأحياء لنضمن وصول الوجبات ساخنة مقرمشة. تصفح فروعنا وتعرف على أرقام التواصل المباشرة ومواقع خرائط قوقل.' 
                        : 'Operating state-of-the-art fast food kitchens in high-traffic commercial sectors. Get in touch with our operations teams for immediate pick-ups or dispatch lines.'}
                    </p>
                    <button
                      onClick={() => setActiveTab('branches')}
                      className="px-6 py-3 rounded-xl bg-red-500 text-white font-black text-xs uppercase tracking-wider shadow-md hover:bg-neutral-900 transition-colors mx-auto lg:mx-0 cursor-pointer"
                    >
                      {lang === 'ar' ? 'عرض جميع الفروع' : 'Explore Branch Grid'}
                    </button>
                  </div>

                  {/* Branches cards horizontally stacked */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {branches.slice(0, 2).map((b) => (
                      <div key={b.id} className="bg-zinc-50 dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-150 dark:border-zinc-800 space-y-4">
                        <img src={b.image} className="w-full h-32 rounded-2xl object-cover" />
                        <div>
                          <h4 className="font-extrabold text-sm text-zinc-900 dark:text-white">{lang === 'ar' ? b.nameAr : b.nameEn}</h4>
                          <span className="text-[10px] text-zinc-400 block mt-1">🕒 {lang === 'ar' ? b.workingHoursAr : b.workingHoursEn}</span>
                        </div>
                        <button
                          onClick={() => handleOrderFromBranch(b)}
                          className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-800 hover:bg-red-500 dark:hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          {lang === 'ar' ? 'اطلب من هذا الفرع' : 'Order From Here'}
                        </button>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </section>

            {/* Customer Testimonials Row */}
            <section className="py-16 bg-zinc-50 dark:bg-zinc-900/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-red-550">
                    {lang === 'ar' ? 'شهادات نعتز بها' : 'Testimonials'}
                  </span>
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white">
                    {lang === 'ar' ? 'ماذا يقول عشاق مستر بروستد؟' : 'Chords of Satisfaction'}
                  </h2>
                </div>
                <ReviewSlider lang={lang} reviews={reviews} />
              </div>
            </section>

          </div>
        )}

        {/* Dynamic Digital Menu Tab Section */}
        {activeTab === 'menu' && (
          <MenuSection
            lang={lang}
            products={products}
            categories={categories}
            favorites={favorites}
            toggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Physical branch locations Tab */}
        {activeTab === 'branches' && (
          <BranchesSection
            lang={lang}
            branches={branches}
            onOrderFromBranch={handleOrderFromBranch}
          />
        )}

        {/* Support log, suggestions & complaints support tab */}
        {activeTab === 'complaints-suggestions' && (
          <ComplaintsSuggestions
            lang={lang}
            onAddSubmission={handleAddSubmission}
            toast={showToast}
          />
        )}

        {/* Gated administrative control workspace CMS options */}
        {activeTab === 'admin' && (
          <PayloadAdminBoundary>
            <AdminPanel
              lang={lang}
              categories={categories}
              products={products}
              branches={branches}
              config={config}
              submissions={submissions}
              reviews={reviews}
              onUpdateProducts={setProducts}
              onUpdateCategories={setCategories}
              onUpdateBranches={setBranches}
              onUpdateConfig={setConfig}
              onUpdateSubmissions={setSubmissions}
              onUpdateReviews={setReviews}
              toast={showToast}
              isLoggedIn={isAdminLoggedIn}
              setIsLoggedIn={setIsAdminLoggedIn}
            />
          </PayloadAdminBoundary>
        )}

      </main>

      {/* Floating Action Button: Quick WhatsApp line to restaurant director support */}
      {config.whatsappFloatingNum && (
        <a
          href={`https://wa.me/${config.whatsappFloatingNum.replace('+', '')}?text=${encodeURIComponent(
            lang === 'ar' 
              ? 'مرحباً مستر بروستد! أود الاستفسار عن عروض اليوم وقائمة الطعام...' 
              : 'Hello Mr. Broast support! I would love to enquire about today\'s special crispy meals...'
          )}`}
          target="_blank"
          rel="noreferrer"
          id="whatsapp-floating-hotline"
          className={`fixed bottom-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-45 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-107 active:scale-95 group flex items-center justify-center animate-pulse`}
          title={lang === 'ar' ? 'تواصل معنا على الواتساب' : 'Chat with live support on WhatsApp'}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className={`max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-xs whitespace-nowrap text-white ${
            lang === 'ar' ? 'mr-0 group-hover:mr-2' : 'ml-0 group-hover:ml-2'
          }`}>
            {lang === 'ar' ? 'تحدث معنا مباشرة' : 'Live WhatsApp Help'}
          </span>
        </a>
      )}

      {/* Corporate footer */}
      <Footer
        lang={lang}
        setActiveTab={setActiveTab}
        config={config}
      />

    </div>
  );
}

interface BoundaryProps {
  children: React.ReactNode;
}

interface BoundaryState {
  hasError: boolean;
}

// Basic error boundary component wrapper to prevent layout rendering breakdown during dynamic administrative saves
class PayloadAdminBoundary extends React.Component<BoundaryProps, BoundaryState> {
  props: BoundaryProps;
  state: BoundaryState;

  constructor(props: BoundaryProps) {
    super(props);
    this.props = props;
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: any, errInfo: any) {
    console.error('Payload Admin rendering captured an issue: ', err, errInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-200 text-red-700 font-bold" id="cms-error-fallback">
          <p>Local CMS Schema conflict occurred!</p>
          <button 
            onClick={() => { safeStorage.clear(); window.location.reload(); }}
            className="mt-4 px-4 py-2 rounded-xl bg-red-650 hover:bg-neutral-900 text-white font-bold text-xs"
          >
            Reset Seed Database & Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
