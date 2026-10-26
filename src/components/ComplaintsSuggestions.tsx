import React, { useState } from 'react';
import { Mail, Phone, User, MessageSquareHeart, AlertCircle, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { Language, Submission } from '../types';

interface ComplaintsSuggestionsProps {
  lang: Language;
  onAddSubmission: (sub: Omit<Submission, 'id' | 'date' | 'status'>) => void;
  toast: (msg: string, type: 'success' | 'error') => void;
}

type FormType = 'complaint' | 'suggestion';

export default function ComplaintsSuggestions({
  lang,
  onAddSubmission,
  toast
}: ComplaintsSuggestionsProps) {
  const [activeForm, setActiveForm] = useState<FormType>('complaint');

  // Complaint Form State
  const [compName, setCompName] = useState('');
  const [compPhone, setCompPhone] = useState('');
  const [compSubject, setCompSubject] = useState('');
  const [compDetails, setCompDetails] = useState('');

  // Suggestion Form State
  const [suggName, setSuggName] = useState('');
  const [suggPhone, setSuggPhone] = useState('');
  const [suggTitle, setSuggTitle] = useState('');
  const [suggDetails, setSuggDetails] = useState('');

  // Success screen state
  const [showSuccess, setShowSuccess] = useState(false);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!compName || !compPhone || !compSubject || !compDetails) {
      toast(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields', 'error');
      return;
    }

    onAddSubmission({
      type: 'complaint',
      name: compName,
      phoneNumber: compPhone,
      titleOrSubject: compSubject,
      details: compDetails
    });

    // Clear form
    setCompName('');
    setCompPhone('');
    setCompSubject('');
    setCompDetails('');

    setShowSuccess(true);
    toast(lang === 'ar' ? 'تم تسجيل شكواك بنجاح' : 'Complaint submitted successfully', 'success');
  };

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggName || !suggPhone || !suggTitle || !suggDetails) {
      toast(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields', 'error');
      return;
    }

    onAddSubmission({
      type: 'suggestion',
      name: suggName,
      phoneNumber: suggPhone,
      titleOrSubject: suggTitle,
      details: suggDetails
    });

    // Clear form
    setSuggName('');
    setSuggPhone('');
    setSuggTitle('');
    setSuggDetails('');

    setShowSuccess(true);
    toast(lang === 'ar' ? 'شكرًا لاقتراحك الرائع!' : 'Thank you for your valuable suggestion!', 'success');
  };

  return (
    <section id="feedback-support" className="py-16 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-red-500">
            {lang === 'ar' ? 'مركز العناية بالعملاء' : 'Customer Care Center'}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
            {lang === 'ar' ? 'الشكاوى والاقتراحات' : 'Complaints & Suggestions'}
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base font-medium">
            {lang === 'ar' 
              ? 'ملاحظاتك تهمنا دائماً. نلتزم بقراءة كل رسالة والعمل الدؤوب لتحسين تجربتك مع مستر بروستد.' 
              : 'Our ultimate target is absolute guest satisfaction. Fill the dedicated form below; your request hits our system instantly.'}
          </p>
        </div>

        {showSuccess ? (
          /* High Contrast success confirmation block */
          <div className="bg-white dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-850 rounded-[2.5rem] p-8 md:p-12 text-center shadow-xl space-y-6 max-w-lg mx-auto" id="feedback-success-card">
            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
                {lang === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Submission Received!'}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-semibold">
                {lang === 'ar' 
                  ? 'نشكرك على تواصلك معنا وثقتك بنا. تمت مشاركة طلبك مع قسم الجودة والعمليات وسنتصل بك قريباً كأولوية قصوى.' 
                  : 'Thank you for reaching out to Mr. Broast! Our corporate quality-control division is reviewing your report right now.'}
              </p>
            </div>

            <button
              onClick={() => setShowSuccess(false)}
              id="success-back-btn"
              className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-650 text-white font-extrabold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-lg shadow-red-500/10"
            >
              {lang === 'ar' ? 'تعديل أو إرسال طلب آخر' : 'Submit Another Form'}
            </button>
          </div>
        ) : (
          /* Form container */
          <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850/60 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-300">
            
            {/* Form Toggle Segmented Control Tabs */}
            <div className="grid grid-cols-2 border-b border-zinc-100 dark:border-zinc-850">
              {/* Complaints Tab */}
              <button
                onClick={() => setActiveForm('complaint')}
                id="complaints-tab-btn"
                className={`flex items-center justify-center space-x-2 py-5 font-black text-sm md:text-base border-b-2 cursor-pointer transition-all ${
                  activeForm === 'complaint'
                    ? 'border-red-500 text-red-500 bg-red-50/10'
                    : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50'
                }`}
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span>{lang === 'ar' ? 'تقديم شكوى ⚠️' : 'File a Complaint ⚠️'}</span>
              </button>

              {/* Suggestions Tab */}
              <button
                onClick={() => setActiveForm('suggestion')}
                id="suggestions-tab-btn"
                className={`flex items-center justify-center space-x-2 py-5 font-black text-sm md:text-base border-b-2 cursor-pointer transition-all ${
                  activeForm === 'suggestion'
                    ? 'border-red-500 text-red-500 bg-red-50/10'
                    : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50'
                }`}
              >
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>{lang === 'ar' ? 'تقديم اقتراح ✨' : 'Make a Suggestion ✨'}</span>
              </button>
            </div>

            {/* Complaints Form Render */}
            {activeForm === 'complaint' ? (
              <form onSubmit={handleComplaintSubmit} className="p-6 md:p-10 space-y-6" id="complaints-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                      {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-4 rtl:left-auto rtl:right-4 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        required
                        id="comp-name-input"
                        placeholder={lang === 'ar' ? 'أدخل اسمك الكريم' : 'e.g. Ahmad Al-Harbi'}
                        value={compName}
                        onChange={(e) => setCompName(e.target.value)}
                        className="w-full pl-11 pr-4 rtl:pl-4 rtl:pr-11 py-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-zinc-400 pointer-events-auto"
                      />
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                      {lang === 'ar' ? 'رقم الهاتف المباشر *' : 'Direct Phone Number *'}
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-4 rtl:left-auto rtl:right-4 w-4 h-4 text-zinc-400" />
                      <input
                        type="tel"
                        required
                        id="comp-phone-input"
                        placeholder={lang === 'ar' ? 'مثال: +9665xxxxxxxx' : 'e.g., +9665xxxxxxxx'}
                        value={compPhone}
                        onChange={(e) => setCompPhone(e.target.value)}
                        className="w-full pl-11 pr-4 rtl:pl-4 rtl:pr-11 py-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-zinc-400 pointer-events-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* Complaint Subject Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                    {lang === 'ar' ? 'موضوع الشكوى *' : 'Complaint Subject *'}
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-4 rtl:left-auto rtl:right-4 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      id="comp-subject-input"
                      placeholder={lang === 'ar' ? 'مثال: مشكلة في جودة الطعام أو تأخر التوصيل' : 'e.g., Problem with food temperature, late delivery'}
                      value={compSubject}
                      onChange={(e) => setCompSubject(e.target.value)}
                      className="w-full pl-11 pr-4 rtl:pl-4 rtl:pr-11 py-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm font-bold text-zinc-905 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-zinc-400 pointer-events-auto"
                    />
                  </div>
                </div>

                {/* Complaint Details field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                    {lang === 'ar' ? 'تفاصيل الشكوى بالكامل *' : 'Full Complaint Details *'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    id="comp-details-input"
                    placeholder={lang === 'ar' ? 'قبل كتابة التفاصيل، يرجى كتابة اسم الفرع وتاريخ الطلب ليسهل علينا مراجعة كاميرات المراقبة والجودة للرد عليك بدقة...' : 'Please specify the exact branch location, order ID or time, and a clear rundown of the issue...'}
                    value={compDetails}
                    onChange={(e) => setCompDetails(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-zinc-400 pointer-events-auto"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  id="comp-submit-btn"
                  className="w-full py-4 rounded-xl bg-red-500 hover:bg-zinc-950 dark:hover:bg-white dark:hover:text-zinc-950 font-black text-sm tracking-wider uppercase text-white shadow-lg shadow-red-500/10 cursor-pointer flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <Send className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                  <span>{lang === 'ar' ? 'تقديم شكوى رسمية' : 'Submit Official Complaint'}</span>
                </button>

              </form>
            ) : (
              /* Suggestions Form Render */
              <form onSubmit={handleSuggestionSubmit} className="p-6 md:p-10 space-y-6" id="suggestions-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                      {lang === 'ar' ? 'الاسم الكريم *' : 'Your Name *'}
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-4 rtl:left-auto rtl:right-4 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        required
                        id="sugg-name-input"
                        placeholder={lang === 'ar' ? 'أدخل اسمك اللطيف' : 'e.g. Sarah Khaled'}
                        value={suggName}
                        onChange={(e) => setSuggName(e.target.value)}
                        className="w-full pl-11 pr-4 rtl:pl-4 rtl:pr-11 py-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-zinc-400 pointer-events-auto"
                      />
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                      {lang === 'ar' ? 'رقم الاتصال *' : 'Contact Phone *'}
                    </label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-4 rtl:left-auto rtl:right-4 w-4 h-4 text-zinc-400" />
                      <input
                        type="tel"
                        required
                        id="sugg-phone-input"
                        placeholder={lang === 'ar' ? 'مثال: +9665xxxxxxxx' : 'e.g. +9665xxxxxxxx'}
                        value={suggPhone}
                        onChange={(e) => setSuggPhone(e.target.value)}
                        className="w-full pl-11 pr-4 rtl:pl-4 rtl:pr-11 py-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-zinc-400 pointer-events-auto"
                      />
                    </div>
                  </div>
                </div>

                {/* Suggestion Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                    {lang === 'ar' ? 'عنوان الفكرة أو الاقتراح *' : 'Suggestion Title *'}
                  </label>
                  <div className="relative flex items-center">
                    <Sparkles className="absolute left-4 rtl:left-auto rtl:right-4 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      required
                      id="sugg-title-input"
                      placeholder={lang === 'ar' ? 'مثال: تقديم صلصة جديدة أو تصميم تغليف مستدام' : 'e.g., Sustainable Packaging, New Sauce flavor ideas'}
                      value={suggTitle}
                      onChange={(e) => setSuggTitle(e.target.value)}
                      className="w-full pl-11 pr-4 rtl:pl-4 rtl:pr-11 py-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-zinc-400 pointer-events-auto"
                    />
                  </div>
                </div>

                {/* Suggestion Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                    {lang === 'ar' ? 'تفاصيل الاقتراح بالكامل *' : 'Suggestion Details *'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    id="sugg-details-input"
                    placeholder={lang === 'ar' ? 'يسعدنا جداً قراءة أفكارك الإبداعية! اكتب لنا كيف يمكننا جعل مستر بروستد أفضل...' : 'Describe your creative recommendation for us! We thoroughly enjoy studying original proposals and menu updates.'}
                    value={suggDetails}
                    onChange={(e) => setSuggDetails(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-250 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-zinc-400 pointer-events-auto"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  id="sugg-submit-btn"
                  className="w-full py-4 rounded-xl bg-red-500 hover:bg-zinc-950 dark:hover:bg-white dark:hover:text-zinc-950 font-black text-sm tracking-wider uppercase text-white shadow-lg shadow-red-500/10 cursor-pointer flex items-center justify-center space-x-2 rtl:space-x-reverse"
                >
                  <Send className="w-4 h-4 mr-1 rtl:mr-0 rtl:ml-1" />
                  <span>{lang === 'ar' ? 'إرسال الفكرة للمراجعة ✨' : 'Share Suggestion with Us ✨'}</span>
                </button>

              </form>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
