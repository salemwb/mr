import React from 'react';
import { Facebook, Instagram, Twitter, Phone, MessageSquare, Clock, Heart, Shield } from 'lucide-react';
import { Language, RestaurantConfig } from '../types';

interface FooterProps {
  lang: Language;
  setActiveTab: (tab: string) => void;
  config: RestaurantConfig;
}

export default function Footer({ lang, setActiveTab, config }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 transition-colors duration-300">
      
      {/* Footer Top Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          
          {/* Column 1: Brand & Intro */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {config.logoUrl && (config.logoUrl.startsWith('http') || config.logoUrl.startsWith('https') || config.logoUrl.startsWith('/') || config.logoUrl.includes('.')) ? (
                <img 
                  referrerPolicy="no-referrer"
                  src={config.logoUrl} 
                  alt="Restaurant Logo" 
                  className="w-10 h-10 object-contain rounded-lg"
                  id="footer-custom-img-logo"
                />
              ) : (
                <span className="text-3xl" id="footer-custom-text-logo">{config.logoUrl || '🍗'}</span>
              )}
              <span className="text-2xl font-black tracking-tight text-white leading-none flex flex-col">
                <span className="text-red-500">{lang === 'ar' ? config.nameAr : config.nameEn}</span>
                <span className="text-[10px] tracking-widest text-zinc-600 font-bold uppercase mt-0.5">
                  {lang === 'ar' ? 'البروستد الأصلي' : 'The Original Broast'}
                </span>
              </span>
            </div>
            
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-medium">
              {lang === 'ar' ? config.footerTextAr : config.footerTextEn}
            </p>

            {/* Social media connections */}
            <div className="flex items-center space-x-3 pt-2">
              {config.facebookUrl && (
                <a
                  href={config.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  id="foot-sm-facebook"
                  className="p-2.5 rounded-xl bg-zinc-90 w-10 h-10 flex items-center justify-center bg-zinc-900 hover:bg-red-500 hover:text-white text-zinc-350 transition-colors cursor-pointer"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {config.instagramUrl && (
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  id="foot-sm-instagram"
                  className="p-2.5 rounded-xl bg-zinc-90 w-10 h-10 flex items-center justify-center bg-zinc-900 hover:bg-red-500 hover:text-white text-zinc-350 transition-colors cursor-pointer"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {config.twitterUrl && (
                <a
                  href={config.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                  id="foot-sm-twitter"
                  className="p-2.5 rounded-xl bg-zinc-90 w-10 h-10 flex items-center justify-center bg-zinc-900 hover:bg-red-500 hover:text-white text-zinc-350 transition-colors cursor-pointer"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Navigation map shortcuts */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">
              {lang === 'ar' ? 'روابط سريعة' : 'Sitemap'}
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs md:text-sm font-bold">
              <button
                onClick={() => setActiveTab('home')}
                className="text-left text-zinc-400 hover:text-red-500 transition-colors cursor-pointer block"
              >
                {lang === 'ar' ? '◄ الصفحة الرئيسية' : '▸ Home'}
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-left text-zinc-400 hover:text-red-500 transition-colors cursor-pointer block"
              >
                {lang === 'ar' ? '◄ قائمة المأكولات' : '▸ Interactive Menu'}
              </button>
              <button
                onClick={() => setActiveTab('branches')}
                className="text-left text-zinc-400 hover:text-red-505 transition-colors cursor-pointer block"
              >
                {lang === 'ar' ? '◄ فروعنا ومواقعنا' : '▸ Our Branches'}
              </button>
              <button
                onClick={() => setActiveTab('complaints-suggestions')}
                className="text-left text-zinc-400 hover:text-red-500 transition-colors cursor-pointer block"
              >
                {lang === 'ar' ? '◄ تقديم شكوى أو اقتراح' : '▸ Feedback & Support'}
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className="text-left text-zinc-400 hover:text-red-500 transition-colors cursor-pointer block text-red-500/80"
              >
                {lang === 'ar' ? '◄ لوحة التحكم للمشرف' : '▸ CMS Console Portal'}
              </button>
            </div>
          </div>

          {/* Column 3: Contact & Info */}
          <div className="md:col-span-4 space-y-4 text-xs md:text-sm">
            <h4 className="text-sm font-black uppercase tracking-wider text-white">
              {lang === 'ar' ? 'اتصل بنا' : 'Office Hotline'}
            </h4>
            
            <div className="space-y-3 font-medium">
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-red-500 shrink-0" />
                <span>{lang === 'ar' ? 'ساعات العمل: ١٢:٠٠ ظهراً - ٣:٠٠ صباحاً' : 'Working hours: 12:00 PM - 3:00 AM'}</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <span>{lang === 'ar' ? 'الهاتف الموحد: ٩٢٠٠١٢٣٤٥' : 'Unified Line: 920012345'}</span>
              </div>

              <div className="flex items-center space-x-2.5">
                <MessageSquare className="w-4 h-4 text-red-505 shrink-0" />
                <span>{lang === 'ar' ? 'الدعم على مدار الساعة' : 'Corporate 24/7 Assistance'}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-2xl flex items-center space-x-3 text-[11px] leading-tight text-white font-bold">
                <div className="w-8 h-8 rounded-full bg-red-650/20 text-red-500 flex items-center justify-center shrink-0">
                  🍗
                </div>
                <div>
                  <span className="block text-red-400 uppercase tracking-widest text-[9px] font-black">
                    {lang === 'ar' ? 'دجاج محلي طازج' : '100% Local Chicken'}
                  </span>
                  <span>{lang === 'ar' ? 'دجاج بروستد بلدي طازج ومقرمش يومياً' : 'Never frozen, freshly breaded daily.'}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Footer Bottom copyright info */}
      <div className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500 font-bold bg-zinc-950">
        <p className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <span>
            © {currentYear} {lang === 'ar' ? config.nameAr : config.nameEn}. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </span>
          <span className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-current" />
            <span>for lovers of crispy golden chicken.</span>
          </span>
          <span className="flex items-center space-x-1.5 opacity-60">
            <Shield className="w-3.5 h-3.5 text-green-500" />
            <span>{lang === 'ar' ? 'خادم آمن وموثوق' : 'Secure CMS Server Mode'}</span>
          </span>
        </p>
      </div>

    </footer>
  );
}
