import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Globe, Sun, Moon, Lock } from 'lucide-react';
import { Language, Theme, RestaurantConfig } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  config: RestaurantConfig;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export default function Navbar({
  lang,
  setLang,
  theme,
  toggleTheme,
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  config,
  onOpenAdmin,
  isAdminLoggedIn
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'menu', labelEn: 'Menu', labelAr: 'القائمة' },
    { id: 'branches', labelEn: 'Branches', labelAr: 'الفروع' },
    { id: 'complaints-suggestions', labelEn: 'Feedback', labelAr: 'الشكاوى والاقتراحات' }
  ];

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const menuLabel = lang === 'ar' ? 'القيمة الكاملة' : 'Menu';

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Restaurant Name */}
          <div 
            onClick={() => { setActiveTab('home'); }} 
            className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer select-none"
            id="brand-logo-container"
          >
            <div className="flex items-center justify-center">
              {config.logoUrl && (config.logoUrl.startsWith('http') || config.logoUrl.startsWith('https') || config.logoUrl.startsWith('/') || config.logoUrl.includes('.')) ? (
                <img 
                  referrerPolicy="no-referrer"
                  src={config.logoUrl} 
                  alt="Restaurant Logo" 
                  className="w-10 h-10 object-contain rounded-lg"
                  id="navbar-custom-img-logo"
                />
              ) : (
                <span className="text-3xl filter drop-shadow animate-none" id="navbar-custom-text-logo">
                  {config.logoUrl || '🍗'}
                </span>
              )}
            </div>
            <span className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white flex flex-col leading-none">
              <span className="text-red-500 font-extrabold">
                {lang === 'ar' ? config.nameAr : config.nameEn}
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 font-medium uppercase mt-0.5">
                {lang === 'ar' ? 'البروستد الأصلي' : 'The Original Broast'}
              </span>
            </span>
          </div>

          {/* Desktop Navigation Link Tabs */}
          <nav className="hidden md:flex space-x-1 items-center" id="desktop-nav-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                    : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </button>
            ))}
          </nav>

          {/* Utility Buttons (Language, Theme, Cart, CMS panel) */}
          <div className="flex items-center space-x-2 md:space-x-3" id="navbar-utilities">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              id="language-switcher"
              className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-colors uppercase font-bold text-xs flex items-center space-x-1 cursor-pointer"
              title={lang === 'en' ? 'تبديل للغة العربية' : 'Switch to English'}
            >
              <Globe className="w-4 h-4 text-red-500" />
              <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
            </button>

            {/* Dark/Light Theme Button */}
            <button
              onClick={toggleTheme}
              id="theme-toggler"
              className="p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
              title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5 text-zinc-700" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>

            {/* Admin Console shortcut lock trigger */}
            <button
              onClick={onOpenAdmin}
              id="admin-dashboard-trigger"
              className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-red-500 text-white'
                  : isAdminLoggedIn
                  ? 'bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400'
              }`}
              title={lang === 'ar' ? 'لوحة التحكم للمشرف' : 'Admin CMS Dashboard'}
            >
              <Lock className="w-5 h-5" />
            </button>

            {/* Shopping Cart button with counter badge */}
            <button
              onClick={onOpenCart}
              id="cart-floating-trigger"
              className="relative p-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-all duration-200 shadow-lg shadow-red-500/25 active:scale-95 cursor-pointer flex items-center justify-center"
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950 text-[10px] font-black text-white ring-2 ring-white dark:ring-zinc-950 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-drawer-toggle"
              className="p-2.5 rounded-xl md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 px-4 pt-2 pb-6 space-y-2 shadow-inner transition-all duration-300">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left rtl:text-right px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-red-500 text-white'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                }`}
              >
                {lang === 'ar' ? item.labelAr : item.labelEn}
              </button>
            ))}
            
            {/* Direct Admin Control from Mobile Drawer */}
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              id="mobile-nav-admin"
              className={`w-full text-left rtl:text-right px-4 py-3 rounded-xl text-base font-bold transition-all flex items-center space-x-2 rtl:space-x-reverse ${
                activeTab === 'admin'
                  ? 'bg-red-500 text-white'
                  : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              <Lock className={`w-4 h-4 text-red-500 ${lang === 'ar' ? 'ml-2' : 'mr-2'}`} />
              <span>{lang === 'ar' ? 'لوحة التحكم والمحتوى' : 'CMS Admin Panel'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
