import React, { useState, useMemo } from 'react';
import { Search, Heart, HeartOff, SlidersHorizontal, Check, AlertCircle, ShoppingCart } from 'lucide-react';
import { Product, Category, Language } from '../types';

interface MenuSectionProps {
  lang: Language;
  products: Product[];
  categories: Category[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function MenuSection({
  lang,
  products,
  categories,
  favorites,
  toggleFavorite,
  onAddToCart
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'featured'>('default');

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.categoryId === selectedCategory);
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => {
        const titleMatch = (lang === 'ar' ? p.nameAr : p.nameEn).toLowerCase().includes(query);
        const descMatch = (lang === 'ar' ? p.descriptionAr : p.descriptionEn).toLowerCase().includes(query);
        return titleMatch || descMatch;
      });
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'featured') {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy, lang]);

  return (
    <section id="menu-section" className="py-12 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
            {lang === 'ar' ? 'استكشف قائمتنا الشهية' : 'Explore Our Delectable Menu'}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">
            {lang === 'ar' 
              ? 'اختر وجبتك المفضلة من قطع البروستد المقرمشة، البرجر الفاخر، السندوتشات الطازجة والمقبلات المميزة.'
              : 'Choose your preferred meal from our crispy golden broasts, royal burgers, wraps, side appetizers and premium sauces.'}
          </p>
        </div>

        {/* Search, Filter & Sort Controls */}
        <div className="bg-white dark:bg-zinc-950 rounded-2xl md:rounded-3xl p-5 shadow-lg border border-zinc-100 dark:border-zinc-850 mb-10 space-y-5">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input Bar */}
            <div className="relative md:col-span-8 flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                id="menu-search-input"
                placeholder={lang === 'ar' ? 'ابحث عن وجبة، منتج أو صلصة...' : 'Search for a meal, burger, side or sauce...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  id="search-query-clear"
                  className={`absolute ${lang === 'ar' ? 'left-16' : 'right-4'} text-zinc-400 hover:text-zinc-600 text-sm font-bold`}
                >
                  {lang === 'ar' ? 'مسح' : 'Clear'}
                </button>
              )}
            </div>

            {/* Sort Dropdown Filter */}
            <div className="relative md:col-span-4 flex items-center">
              <SlidersHorizontal className="absolute left-4 w-4 h-4 text-zinc-400 pointer-events-none" />
              <select
                id="menu-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-sm font-bold text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer"
              >
                <option value="default">{lang === 'ar' ? 'الترتيب الافتراضي' : 'Default Sorting'}</option>
                <option value="price-asc">{lang === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                <option value="price-desc">{lang === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                <option value="featured">{lang === 'ar' ? 'المميزة والأكثر مبيعاً' : 'Best Sellers & Highlights'}</option>
              </select>
            </div>
          </div>

          {/* Category Quick Selector Pills */}
          <div className="flex items-center space-x-2 py-1 overflow-x-auto scrollbar-none" id="categories-pill-container">
            {/* 'All' category button */}
            <button
              id="category-pill-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/20 scale-105'
                  : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
              }`}
            >
              {lang === 'ar' ? 'الكل 🍟' : 'All Items 🍟'}
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`category-pill-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-extrabold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-red-500 text-white shadow-md shadow-red-500/20 scale-105'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                {lang === 'ar' ? cat.nameAr : cat.nameEn}
              </button>
            ))}
          </div>

        </div>

        {/* Empty Search / Filter Results State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white dark:bg-zinc-950 rounded-3xl p-12 text-center border border-zinc-100 dark:border-zinc-850 max-w-md mx-auto" id="empty-menu-fallback">
            <AlertCircle className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
            <h3 className="text-lg font-black text-zinc-800 dark:text-white mb-1">
              {lang === 'ar' ? 'لم نجد أي وجبة تطابق بحثك' : 'No Items Found'}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              {lang === 'ar' 
                ? 'يرجى مراجعة التهجئة أو استخدام كلمات بحث مختلفة مثل "برجر" أو "سبايسي".' 
                : 'Try adjusting your search query or flipping to another tasty category tab.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-extrabold text-xs tracking-wider uppercase cursor-pointer"
            >
              {lang === 'ar' ? 'إعادة تعيين المرشحات' : 'Clear All Filters'}
            </button>
          </div>
        ) : (
          /* Products Responsive Bento Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8" id="menu-products-grid">
            {filteredProducts.map((p) => {
              const isFav = favorites.includes(p.id);
              const hasDiscount = p.isSpecialOffer && p.originalPrice;

              return (
                <article
                  key={p.id}
                  id={`product-card-${p.id}`}
                  className={`group relative bg-white dark:bg-zinc-950 rounded-[2rem] overflow-hidden border border-zinc-100 dark:border-zinc-850/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col h-full ${
                    !p.isAvailable ? 'opacity-70 dark:opacity-60' : ''
                  }`}
                >
                  
                  {/* Card Image Wrapper with Badges */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-150 dark:bg-zinc-900">
                    <img
                      src={p.image}
                      alt={lang === 'ar' ? p.nameAr : p.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay for Legibility */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                    {/* Top Left Discount Tag / Popular Badge */}
                    <div className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} flex flex-col gap-1.5`}>
                      {hasDiscount && (
                        <span className="bg-red-600 text-white font-black text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md animate-pulse">
                          {lang === 'ar' ? p.discountTagAr || 'مخصم' : p.discountTagEn || 'SALE'}
                        </span>
                      )}

                      {p.isFeatured && (
                        <span className="bg-amber-500 text-zinc-900 font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
                          {lang === 'ar' ? 'نوصي به 👑' : 'BEST SELLER 👑'}
                        </span>
                      )}
                    </div>

                    {/* Top Right Heart Favorite Toggle Button */}
                    <button
                      onClick={() => toggleFavorite(p.id)}
                      id={`favorite-btn-${p.id}`}
                      className={`absolute top-4 ${lang === 'ar' ? 'left-4' : 'right-4'} p-2 rounded-full backdrop-blur-md transition-all shadow-md active:scale-90 cursor-pointer ${
                        isFav 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-white/95 hover:bg-white text-zinc-700 dark:bg-zinc-900/95 dark:hover:bg-zinc-900 dark:text-zinc-300'
                      }`}
                      aria-label="Add to Favorites"
                    >
                      {isFav ? <Heart className="w-4 h-4 fill-current" /> : <Heart className="w-4 h-4" />}
                    </button>

                    {/* Out of Stock Floating Label */}
                    {!p.isAvailable && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-zinc-900 border border-zinc-800 text-white rounded-2xl px-4 py-2 flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-black uppercase tracking-wider">
                            {lang === 'ar' ? 'غير متوفر حالياً' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-6 flex flex-col flex-grow space-y-3">
                    
                    {/* Category Label */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-500">
                        {p.categoryId.replace('-', ' ')}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 line-through">
                          {p.originalPrice?.toFixed(2)} SR
                        </span>
                      )}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white line-clamp-1 leading-tight">
                      {lang === 'ar' ? p.nameAr : p.nameEn}
                    </h3>

                    {/* Product Description */}
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed line-clamp-2 flex-grow">
                      {lang === 'ar' ? p.descriptionAr : p.descriptionEn}
                    </p>

                    {/* Price and Add to Action */}
                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-850/60 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-zinc-400 font-bold leading-none">
                          {lang === 'ar' ? 'السعر' : 'Price'}
                        </span>
                        <span className="text-lg font-black text-red-500 dark:text-red-400 mt-1">
                          {p.price.toFixed(2)} <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">{lang === 'ar' ? 'ر.س' : 'SR'}</span>
                        </span>
                      </div>

                      {p.isAvailable ? (
                        <button
                          onClick={() => onAddToCart(p)}
                          id={`add-to-cart-${p.id}`}
                          className="px-4 py-2.5 rounded-xl bg-red-500 hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-950 text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center space-x-1 sm:space-x-1.5 hover:-translate-y-0.5 shadow-md shadow-red-500/10"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'إضافة' : 'Add to Cart'}</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 font-semibold text-xs cursor-not-allowed"
                        >
                          {lang === 'ar' ? 'نفذ' : 'Sold Out'}
                        </button>
                      )}
                    </div>

                  </div>

                </article>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
