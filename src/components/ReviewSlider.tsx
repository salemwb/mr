import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Language, Review } from '../types';

interface ReviewSliderProps {
  lang: Language;
  reviews: Review[];
}

export default function ReviewSlider({ lang, reviews = [] }: ReviewSliderProps) {
  const [index, setIndex] = useState(0);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-400 font-bold">
        {lang === 'ar' ? 'لا توجد آراء عملاء حالياً.' : 'No testimonials available yet.'}
      </div>
    );
  }

  // Adjust index in case size shrank under management
  const currentIndex = index >= reviews.length ? 0 : index;
  const current = reviews[currentIndex];

  const prev = () => {
    setIndex((prevVal) => (prevVal === 0 ? reviews.length - 1 : prevVal - 1));
  };

  const next = () => {
    setIndex((prevVal) => (prevVal === reviews.length - 1 ? 0 : prevVal + 1));
  };

  return (
    <div id="customer-reviews" className="relative max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 md:p-12 shadow-2xl transition-all duration-300">
        
        {/* Quote decoration */}
        <div className={`absolute top-10 ${lang === 'ar' ? 'left-10' : 'right-10'} text-red-500 opacity-20`}>
          <Quote className="w-16 h-16 md:w-24 md:h-24 stroke-[1]" />
        </div>

        <div className="flex flex-col items-center text-center space-y-6 relative z-10">
          
          {/* Avatar frame with golden ring */}
          <div className="relative">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-red-500 shadow-md">
              <img
                src={current.avatar}
                alt={current.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              {lang === 'ar' ? 'ممتاز' : 'LVL 5'}
            </div>
          </div>

          {/* Rating stars */}
          <div className="flex space-x-1 justify-center text-amber-500">
            {Array.from({ length: current.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          {/* Comment text */}
          <p className="text-lg md:text-xl font-medium text-zinc-700 dark:text-zinc-200 italic leading-relaxed max-w-2xl px-2">
            " {lang === 'ar' ? current.commentAr : current.commentEn} "
          </p>

          {/* Customer info */}
          <div>
            <h4 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white">
              {lang === 'ar' ? current.nameAr : current.nameEn}
            </h4>
            <span className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              {lang === 'ar' ? current.roleAr : current.roleEn}
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={prev}
              id="review-prev"
              className="p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  id={`review-indicator-${i}`}
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === i 
                      ? 'bg-red-500 w-6' 
                      : 'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              id="review-next"
              className="p-3 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
