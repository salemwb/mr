import React from 'react';
import { ChefHat, ShoppingBag, MapPin, Award, Flame, ThumbsUp } from 'lucide-react';
import { Language, RestaurantConfig } from '../types';

interface HeroProps {
  lang: Language;
  onOrderNow: () => void;
  onExploreBranches: () => void;
  config: RestaurantConfig;
}

export default function Hero({ lang, onOrderNow, onExploreBranches, config }: HeroProps) {
  return (
    <section id="hero-banner" className="relative overflow-hidden bg-zinc-950 text-white py-16 md:py-28">
      {/* Absolute Background image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.bannerUrl || 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=1200'}
          alt="Golden Crispy Broasted Chicken"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main content column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Promo badge */}
            <div className={`inline-flex items-center space-x-2 bg-red-600/90 border border-red-500 rounded-full px-4 py-1.5 text-xs font-black tracking-wider uppercase shadow-lg shadow-red-500/20 mx-auto lg:mx-0 ${lang === 'ar' ? 'space-x-reverse' : ''}`}>
              <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
              <span>{lang === 'ar' ? 'أفضل بروستد في المدينة!' : 'Best Broast In Town!'}</span>
            </div>

            {/* Headings */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white">
              {lang === 'ar' ? (
                <>
                  <span className="text-red-500 block mb-2">{config.nameAr}</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">{config.heroTitleAr}</span>
                </>
              ) : (
                <>
                  <span className="text-red-500 block mb-2">{config.nameEn}</span>
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">{config.heroTitleEn}</span>
                </>
              )}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {lang === 'ar' ? config.heroSubtitleAr : config.heroSubtitleEn}
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 py-3 border-y border-zinc-800 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-red-500 font-black text-xl flex items-center gap-1">
                  <ChefHat className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                  <span>{lang === 'ar' ? (config.heroMetric1ValueAr || '100%') : (config.heroMetric1ValueEn || '100%')}</span>
                </span>
                <span className="text-[11px] md:text-xs text-zinc-400 font-bold uppercase mt-1">
                  {lang === 'ar' ? (config.heroMetric1LabelAr || 'طازج يومياً') : (config.heroMetric1LabelEn || 'Fresh Daily')}
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-x border-zinc-800 px-2">
                <span className="text-red-500 font-black text-xl flex items-center gap-1">
                  <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                  <span>{lang === 'ar' ? (config.heroMetric2ValueAr || 'سرّي') : (config.heroMetric2ValueEn || 'Secret')}</span>
                </span>
                <span className="text-[11px] md:text-xs text-zinc-400 font-bold uppercase mt-1">
                  {lang === 'ar' ? (config.heroMetric2LabelAr || 'بهارات أصلية') : (config.heroMetric2LabelEn || 'Bespoke Recipe')}
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-red-500 font-black text-xl flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                  <span>{lang === 'ar' ? (config.heroMetric3ValueAr || '4.9 ★') : (config.heroMetric3ValueEn || '4.9 ★')}</span>
                </span>
                <span className="text-[11px] md:text-xs text-zinc-400 font-bold uppercase mt-1">
                  {lang === 'ar' ? (config.heroMetric3LabelAr || 'تقييم ممتاز') : (config.heroMetric3LabelEn || 'Top Rating')}
                </span>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOrderNow}
                id="hero-order-cta"
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-red-500 hover:bg-red-600 font-black text-white shadow-xl shadow-red-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer text-base"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{lang === 'ar' ? 'اطلب الآن' : 'Order Online Now'}</span>
              </button>

              <button
                onClick={onExploreBranches}
                id="hero-branches-cta"
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 font-bold text-white transition-all flex items-center justify-center space-x-2 cursor-pointer text-base"
              >
                <MapPin className="w-5 h-5 text-red-500" />
                <span>{lang === 'ar' ? 'فروعنا القريبة' : 'Find Nearest Branches'}</span>
              </button>
            </div>

          </div>

          {/* Visual featured card of Hero */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative border-4 border-red-500 rounded-[2.5rem] overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500">
              <img
                src={config.heroFeaturedImageUrl || 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=600'}
                alt="Promo featured product"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="bg-red-500 text-xs font-black uppercase px-2.5 py-1 rounded-full text-center tracking-wider">
                  {lang === 'ar' ? (config.heroFeaturedTagAr || 'الأكثر مبيعاً') : (config.heroFeaturedTagEn || 'Best Seller')}
                </span>
                <h3 className="text-xl font-extrabold mt-2">
                  {lang === 'ar' ? (config.heroFeaturedNameAr || 'بروستد كلاسيك مقرمش') : (config.heroFeaturedNameEn || 'Classic Golden Drumsticks')}
                </h3>
                <p className="text-xs text-zinc-300 font-medium pb-2 border-b border-white/10">
                  {lang === 'ar' ? (config.heroFeaturedDescAr || 'الخلطة التي جعلتنا مشهورين!') : (config.heroFeaturedDescEn || 'The exact heritage blend recipe that made us famous!')}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-yellow-400 font-black text-xl">{config.heroFeaturedPrice || '36.00'} SR</span>
                  <button 
                    onClick={onOrderNow} 
                    id="hero-card-order-btn"
                    className="text-xs font-black text-white hover:text-red-400 underline decoration-2 cursor-pointer"
                  >
                    {lang === 'ar' ? 'اطلب الآن ←' : 'Order Now ←'}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
