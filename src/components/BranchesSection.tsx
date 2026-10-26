import React from 'react';
import { MapPin, Phone, MessageSquare, Compass, Clock, Check } from 'lucide-react';
import { Branch, Language } from '../types';

interface BranchesSectionProps {
  lang: Language;
  branches: Branch[];
  onOrderFromBranch: (branch: Branch) => void;
}

export default function BranchesSection({ lang, branches, onOrderFromBranch }: BranchesSectionProps) {
  return (
    <section id="branches" className="py-16 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-red-500">
            {lang === 'ar' ? 'أين تجدنا' : 'Our Presence'}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
            {lang === 'ar' ? 'فروع مستر بروستد' : 'Mr. Broast Branch Network'}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium">
            {lang === 'ar' 
              ? 'تفضل بزيارتنا في أي من فروعنا لتستمتع بالوجبات الساخنة الطازجة مباشرة من المطبخ، أو اطلب مباشرة عبر الواتساب.' 
              : 'Visit us at any of our primary locations for sizzling, fresh-out-the-fryer broasts, or choose your closest hub to trigger direct delivery.'}
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="branches-list-grid">
          {branches.map((b) => (
            <article
              key={b.id}
              id={`branch-card-${b.id}`}
              className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
            >
              
              {/* Branch Exterior Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <img
                  src={b.image}
                  alt={lang === 'ar' ? b.nameAr : b.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Visual Label Decor */}
                <div className={`absolute bottom-4 ${lang === 'ar' ? 'right-4' : 'left-4'} bg-red-500 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5`}>
                  <Clock className="w-3.5 h-3.5 text-white" />
                  <span>{lang === 'ar' ? 'مفتوح الآن' : 'Open Now'}</span>
                </div>
              </div>

              {/* Branch Card Details */}
              <div className="p-6 md:p-8 flex flex-col flex-grow space-y-4">
                
                {/* Branch Name */}
                <h3 className="text-xl md:text-2xl font-black text-zinc-905 dark:text-white leading-tight">
                  {lang === 'ar' ? b.nameAr : b.nameEn}
                </h3>

                {/* Info Metadata list */}
                <div className="space-y-3 flex-grow text-sm">
                  {/* Address */}
                  <div className="flex items-start space-x-3 text-zinc-600 dark:text-zinc-300">
                    <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">
                      {lang === 'ar' ? b.addressAr : b.addressEn}
                    </span>
                  </div>

                  {/* Operational hours */}
                  <div className="flex items-start space-x-3 text-zinc-600 dark:text-zinc-300">
                    <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-xs uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                        {lang === 'ar' ? 'ساعات العمل' : 'Hours'}
                      </span>
                      <span className="font-medium">
                        {lang === 'ar' ? b.workingHoursAr : b.workingHoursEn}
                      </span>
                    </div>
                  </div>

                  {/* Hotline details */}
                  <div className="flex items-start space-x-3 text-zinc-600 dark:text-zinc-300">
                    <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-xs uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                        {lang === 'ar' ? 'رقم الاتصال المباشر' : 'Direct Call Line'}
                      </span>
                      <span className="font-mono font-bold text-zinc-800 dark:text-zinc-200">
                        {b.phoneNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Navigation and Call Triggers Row */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-200/60 dark:border-zinc-800">
                  
                  {/* Direct Phone calling action */}
                  <a
                    href={`tel:${b.phoneNumber}`}
                    id={`branch-call-${b.id}`}
                    className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white font-bold text-xs md:text-sm transition-colors text-center cursor-pointer"
                  >
                    <Phone className="w-4 h-4 text-red-500" />
                    <span>{lang === 'ar' ? 'اتصل الآن' : 'Call Branch'}</span>
                  </a>

                  {/* Google Maps Direction Navigation */}
                  <a
                    href={b.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    id={`branch-navigate-${b.id}`}
                    className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white font-bold text-xs md:text-sm transition-colors text-center cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-red-500" />
                    <span>{lang === 'ar' ? 'اتجاهات الخريطة' : 'Get Directions'}</span>
                  </a>

                </div>

                {/* Primary Button: Pre-select this branch and pop menu cart to checkout */}
                <button
                  onClick={() => onOrderFromBranch(b)}
                  id={`branch-order-cta-${b.id}`}
                  className="w-full flex items-center justify-center space-x-2.5 py-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-black text-sm transition-all shadow-md shadow-red-500/10 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'ar' ? `اطلب من ${b.nameAr}` : `Order from This Branch`}</span>
                </button>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
