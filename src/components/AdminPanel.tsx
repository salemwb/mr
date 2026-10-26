import React, { useState, useEffect } from 'react';
import {
  Lock, LogIn, LogOut, Package, FolderHeart, MapPin, LayoutDashboard,
  Megaphone, Plus, Trash2, Edit2, Check, X, Sparkles, FileText, CheckCircle2,
  RefreshCw, FileSpreadsheet, KeyRound, Image, ExternalLink, Settings, Star
} from 'lucide-react';
import {
  Category, Product, Branch, RestaurantConfig, Submission, Language, Review
} from '../types';

interface AdminPanelProps {
  lang: Language;
  categories: Category[];
  products: Product[];
  branches: Branch[];
  config: RestaurantConfig;
  submissions: Submission[];
  reviews: Review[];
  onUpdateProducts: (newProducts: Product[]) => void;
  onUpdateCategories: (newCategories: Category[]) => void;
  onUpdateBranches: (newBranches: Branch[]) => void;
  onUpdateConfig: (newConfig: RestaurantConfig) => void;
  onUpdateSubmissions: (newSubmissions: Submission[]) => void;
  onUpdateReviews: (newReviews: Review[]) => void;
  toast: (msg: string, type: 'success' | 'error') => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
}

type AdminTab = 'overview' | 'products' | 'categories' | 'branches' | 'cms' | 'messages' | 'reviews';

export default function AdminPanel({
  lang,
  categories,
  products,
  branches,
  config,
  submissions,
  reviews = [],
  onUpdateProducts,
  onUpdateCategories,
  onUpdateBranches,
  onUpdateConfig,
  onUpdateSubmissions,
  onUpdateReviews,
  toast,
  isLoggedIn,
  setIsLoggedIn
}: AdminPanelProps) {
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Input states for creating/editing Category
  const [catEditingId, setCatEditingId] = useState<string | null>(null);
  const [catNameEn, setCatNameEn] = useState('');
  const [catNameAr, setCatNameAr] = useState('');

  // Input states for creating/editing Product
  const [prodEditingId, setProdEditingId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState<Omit<Product, 'id'>>({
    nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '',
    price: 0, categoryId: '', image: '', isAvailable: true,
    isFeatured: false, isSpecialOffer: false, originalPrice: undefined,
    discountTagEn: '', discountTagAr: ''
  });
  const [showProductForm, setShowProductForm] = useState(false);

  // Input states for creating/editing Branch
  const [branchEditingId, setBranchEditingId] = useState<string | null>(null);
  const [branchForm, setBranchForm] = useState<Omit<Branch, 'id'>>({
    nameEn: '', nameAr: '', addressEn: '', addressAr: '',
    googleMapsUrl: '', workingHoursEn: '', workingHoursAr: '',
    whatsappNumber: '', phoneNumber: '', image: ''
  });
  const [showBranchForm, setShowBranchForm] = useState(false);

  // Inline deletion confirmations to bypass restricted iframe blocking of confirm() dialogs
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(null);
  const [deletingBranchId, setDeletingBranchId] = useState<string | null>(null);

  // Complaints filter
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'complaint' | 'suggestion'>('all');

  // Reviews editing and addition states
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState<Omit<Review, 'id'>>({
    nameEn: '',
    nameAr: '',
    roleEn: '',
    roleAr: '',
    rating: 5,
    commentEn: '',
    commentAr: '',
    avatar: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);

  // CMS edit state
  const [cmsForm, setCmsForm] = useState<RestaurantConfig>({
    ...config,
    offersTitleEn: config.offersTitleEn || '',
    offersTitleAr: config.offersTitleAr || '',
    offersHeadingEn: config.offersHeadingEn || '',
    offersHeadingAr: config.offersHeadingAr || '',
    featuredTitleEn: config.featuredTitleEn || '',
    featuredTitleAr: config.featuredTitleAr || '',
    featuredHeadingEn: config.featuredHeadingEn || '',
    featuredHeadingAr: config.featuredHeadingAr || '',
    featuredDescEn: config.featuredDescEn || '',
    featuredDescAr: config.featuredDescAr || '',
    adminPassword: config.adminPassword || 'admin123'
  });

  // Sync state with incoming config updates dynamically
  useEffect(() => {
    setCmsForm({
      ...config,
      offersTitleEn: config.offersTitleEn || '',
      offersTitleAr: config.offersTitleAr || '',
      offersHeadingEn: config.offersHeadingEn || '',
      offersHeadingAr: config.offersHeadingAr || '',
      featuredTitleEn: config.featuredTitleEn || '',
      featuredTitleAr: config.featuredTitleAr || '',
      featuredHeadingEn: config.featuredHeadingEn || '',
      featuredHeadingAr: config.featuredHeadingAr || '',
      featuredDescEn: config.featuredDescEn || '',
      featuredDescAr: config.featuredDescAr || '',
      adminPassword: config.adminPassword || 'admin123'
    });
  }, [config]);

  // Handle Authentication Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = config.adminPassword || 'admin123';
    if (password === correctPassword) {
      setIsLoggedIn(true);
      toast(lang === 'ar' ? 'تم تسجيل الدخول بنجاح كمسؤول' : 'Logged into Admin CMS successfully', 'success');
      setPassword('');
      // Sync CMS form values
      setCmsForm({
        ...config,
        offersTitleEn: config.offersTitleEn || '',
        offersTitleAr: config.offersTitleAr || '',
        offersHeadingEn: config.offersHeadingEn || '',
        offersHeadingAr: config.offersHeadingAr || '',
        featuredTitleEn: config.featuredTitleEn || '',
        featuredTitleAr: config.featuredTitleAr || '',
        featuredHeadingEn: config.featuredHeadingEn || '',
        featuredHeadingAr: config.featuredHeadingAr || '',
        featuredDescEn: config.featuredDescEn || '',
        featuredDescAr: config.featuredDescAr || '',
        adminPassword: config.adminPassword || 'admin123'
      });
    } else {
      toast(
        lang === 'ar' 
          ? `رمز المرور غير صحيح! (الافتراضي هو admin123 ما لم تقم بتغييره)` 
          : `Invalid password! (Default is admin123 unless you customized it)`, 
        'error'
      );
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast(lang === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logged out of Admin Panel', 'success');
  };

  // --- CATEGORIES OPERATIONS ---
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catNameEn || !catNameAr) {
      toast('Both English and Arabic category names are required', 'error');
      return;
    }

    if (catEditingId) {
      // Edit
      const updated = categories.map(c => c.id === catEditingId ? { id: c.id, nameEn: catNameEn, nameAr: catNameAr } : c);
      onUpdateCategories(updated);
      toast('Category updated', 'success');
    } else {
      // Create slug id
      const slug = catNameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      // Avoid dupes
      if (categories.some(c => c.id === slug)) {
        toast('Category with this slug identity already exists', 'error');
        return;
      }
      onUpdateCategories([...categories, { id: slug, nameEn: catNameEn, nameAr: catNameAr }]);
      toast('New category created', 'success');
    }

    setCatEditingId(null);
    setCatNameEn('');
    setCatNameAr('');
  };

  const handleStartEditCategory = (cat: Category) => {
    setCatEditingId(cat.id);
    setCatNameEn(cat.nameEn);
    setCatNameAr(cat.nameAr);
  };

  const handleDeleteCategory = (id: string) => {
    // Check if products are attached to this category
    const count = products.filter(p => p.categoryId === id).length;
    if (count > 0) {
      toast(lang === 'ar' ? `لا يمكن حذف الفئة! يوجد ${count} وجبة مرتبطة بها حالياً` : `Cannot delete! There are ${count} food products linked to this category.`, 'error');
      return;
    }
    const updated = categories.filter(c => c.id !== id);
    onUpdateCategories(updated);
    toast('Category deleted', 'success');
  };

  // --- REVIEWS OPERATIONS ---
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.nameEn || !reviewForm.nameAr || !reviewForm.commentEn || !reviewForm.commentAr) {
      toast(lang === 'ar' ? 'الاسم والتعليق بكلا اللغتين حقول إجبارية!' : 'Name and Comment in both languages are required!', 'error');
      return;
    }

    if (editingReviewId) {
      // Edit Review
      const updated = reviews.map(r => r.id === editingReviewId ? { ...reviewForm, id: r.id } : r);
      onUpdateReviews(updated);
      toast(lang === 'ar' ? 'تم تعديل الرأي بنجاح' : 'Review updated successfully', 'success');
    } else {
      // Create new review
      const newId = 'rev-' + Date.now();
      const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150';
      const newReview: Review = {
        ...reviewForm,
        id: newId,
        avatar: reviewForm.avatar.trim() || defaultAvatar
      };
      onUpdateReviews([...reviews, newReview]);
      toast(lang === 'ar' ? 'تمت إضافة رأي العميل بنجاح' : 'New review added successfully', 'success');
    }

    // Reset Review form
    setEditingReviewId(null);
    setReviewForm({
      nameEn: '',
      nameAr: '',
      roleEn: '',
      roleAr: '',
      rating: 5,
      commentEn: '',
      commentAr: '',
      avatar: ''
    });
    setShowReviewForm(false);
  };

  const handleStartEditReview = (rev: Review) => {
    setEditingReviewId(rev.id);
    setReviewForm({
      nameEn: rev.nameEn,
      nameAr: rev.nameAr,
      roleEn: rev.roleEn,
      roleAr: rev.roleAr,
      rating: rev.rating,
      commentEn: rev.commentEn,
      commentAr: rev.commentAr,
      avatar: rev.avatar
    });
    setShowReviewForm(true);
  };

  const handleDeleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    onUpdateReviews(updated);
    toast(lang === 'ar' ? 'تم حذف رأي العميل بنجاح' : 'Review deleted successfully', 'success');
    setDeletingReviewId(null);
  };

  // --- PRODUCTS OPERATIONS ---
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.nameEn || !prodForm.nameAr || !prodForm.categoryId || !prodForm.image) {
      toast('All fields marked * are strictly mandatory to save a product', 'error');
      return;
    }

    if (prodEditingId) {
      // Update
      const updated = products.map(p => p.id === prodEditingId ? { ...p, ...prodForm } : p);
      onUpdateProducts(updated);
      toast('Product item updated successfully', 'success');
    } else {
      // Create new
      const nextId = 'prod-' + Date.now();
      const newProduct: Product = { id: nextId, ...prodForm };
      onUpdateProducts([...products, newProduct]);
      toast('New product added to menu database', 'success');
    }

    setShowProductForm(false);
    setProdEditingId(null);
    setProdForm({
      nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '',
      price: 0, categoryId: categories[0]?.id || '', image: '', isAvailable: true,
      isFeatured: false, isSpecialOffer: false, originalPrice: undefined,
      discountTagEn: '', discountTagAr: ''
    });
  };

  const handleStartAddProduct = () => {
    setProdEditingId(null);
    setProdForm({
      nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '',
      price: 15.00, categoryId: categories[0]?.id || '', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600', isAvailable: true,
      isFeatured: false, isSpecialOffer: false, originalPrice: undefined,
      discountTagEn: '', discountTagAr: ''
    });
    setShowProductForm(true);
  };

  const handleStartEditProduct = (p: Product) => {
    setProdEditingId(p.id);
    setProdForm({
      nameEn: p.nameEn, nameAr: p.nameAr,
      descriptionEn: p.descriptionEn, descriptionAr: p.descriptionAr,
      price: p.price, categoryId: p.categoryId, image: p.image,
      isAvailable: p.isAvailable, isFeatured: p.isFeatured,
      isSpecialOffer: p.isSpecialOffer, originalPrice: p.originalPrice,
      discountTagEn: p.discountTagEn || '', discountTagAr: p.discountTagAr || ''
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    onUpdateProducts(updated);
    toast('Product deleted from menu database', 'success');
  };

  // --- BRANCHES OPERATIONS ---
  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!branchForm.nameEn || !branchForm.nameAr || !branchForm.whatsappNumber || !branchForm.phoneNumber) {
      toast('Physical names, callback lines, and WhatsApp numbers are critical for receiving orders', 'error');
      return;
    }

    if (branchEditingId) {
      const updated = branches.map(b => b.id === branchEditingId ? { ...b, ...branchForm } : b);
      onUpdateBranches(updated);
      toast('Branch updated', 'success');
    } else {
      const nextId = 'branch-' + Date.now();
      const newBranch: Branch = { id: nextId, ...branchForm };
      onUpdateBranches([...branches, newBranch]);
      toast('Branch added', 'success');
    }

    setShowBranchForm(false);
    setBranchEditingId(null);
    setBranchForm({
      nameEn: '', nameAr: '', addressEn: '', addressAr: '',
      googleMapsUrl: '', workingHoursEn: '', workingHoursAr: '',
      whatsappNumber: '', phoneNumber: '', image: ''
    });
  };

  const handleStartAddBranch = () => {
    setBranchEditingId(null);
    setBranchForm({
      nameEn: '', nameAr: '', addressEn: '', addressAr: '',
      googleMapsUrl: 'https://maps.google.com/?q=Saudi+Arabia',
      workingHoursEn: '1:00 PM - 2:00 AM (Daily)',
      workingHoursAr: '١:٠٠ م - ٢:٠٠ ص (يومياً)',
      whatsappNumber: '9665', phoneNumber: '+966',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600'
    });
    setShowBranchForm(true);
  };

  const handleStartEditBranch = (b: Branch) => {
    setBranchEditingId(b.id);
    setBranchForm({
      nameEn: b.nameEn, nameAr: b.nameAr,
      addressEn: b.addressEn, addressAr: b.addressAr,
      googleMapsUrl: b.googleMapsUrl,
      workingHoursEn: b.workingHoursEn, workingHoursAr: b.workingHoursAr,
      whatsappNumber: b.whatsappNumber, phoneNumber: b.phoneNumber,
      image: b.image
    });
    setShowBranchForm(true);
  };

  const handleDeleteBranch = (id: string) => {
    if (branches.length <= 1) {
      toast(
        lang === 'ar'
          ? 'يجب الإبقاء على فرع نشط واحد على الأقل لتلقي وتوجيه طلبات ومبيعات المطعم!'
          : 'You must preserve at least one active branch location to route restaurant orders!',
        'error'
      );
      return;
    }
    const updated = branches.filter(b => b.id !== id);
    onUpdateBranches(updated);
    toast(
      lang === 'ar' ? 'تم حذف الفرع المختار بنجاح' : 'Branch deleted',
      'success'
    );
  };

  // --- FEEDBACKS & SUGGESTIONS OPERATIONS ---
  const handleToggleResolveMessage = (id: string) => {
    const updated = submissions.map(s => s.id === id ? { ...s, status: (s.status === 'resolved' ? 'pending' : 'resolved') as 'resolved' | 'pending' } : s);
    onUpdateSubmissions(updated);
    toast('Feedback item status toggled', 'success');
  };

  const handleDeleteMessage = (id: string) => {
    const updated = submissions.filter(s => s.id !== id);
    onUpdateSubmissions(updated);
    toast('Feedback deleted', 'success');
  };

  // Export complaints & suggestions to a downloadable JSON file
  const handleExportData = () => {
    const filterSub = submissions.filter(s => submissionFilter === 'all' || s.type === submissionFilter);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filterSub, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mr_broast_feedback_${submissionFilter}_export.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast('Customer submissions downloaded successfully as nested JSON!', 'success');
  };

  // --- CMS CONFIG SAVE ---
  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({ ...cmsForm });
    toast('Restaurant branding, home banner text, and configuration saved live!', 'success');
  };

  // Filter submissions
  const filteredSubmissions = submissions.filter(s => submissionFilter === 'all' || s.type === submissionFilter);

  // Gated Authentication view
  if (!isLoggedIn) {
    return (
      <section className="py-20 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 transition-colors duration-300">
        <div className="max-w-md w-full mx-4" id="admin-login-frame">
          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-8 rounded-3xl shadow-2xl relative overflow-hidden space-y-6">
            
            {/* Visual accent header */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-red-500 via-amber-500 to-red-600" />

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <KeyRound className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="text-2xl font-black text-zinc-900 dark:text-white leading-tight">
                {lang === 'ar' ? 'بوابة إدارة الموقع' : 'Restaurant CMS Gateway'}
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 font-semibold uppercase tracking-wider">
                {lang === 'ar' ? 'الرجاء إدخال رمز المرور السري للدخول' : 'Access restaurant administrative tools'}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block">
                  {lang === 'ar' ? 'الرمز السري الخاص بالمسؤول *' : 'Secure Administrator Code *'}
                </label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 w-4 h-4 text-zinc-400" />
                  <input
                    type="password"
                    required
                    id="admin-password-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-black text-center text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-zinc-400 tracking-widest"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="do-admin-login"
                className="w-full py-3 rounded-xl bg-red-500 hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-950 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg shadow-red-500/10 cursor-pointer flex items-center justify-center space-x-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تسجيل دخول المسؤول' : 'Secure Login Now'}</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-300" id="admin-main-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logged in admin controls header */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-6 rounded-3xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-10 h-10 bg-green-150 text-green-500 rounded-xl flex items-center justify-center">
              🍗
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-black text-zinc-900 dark:text-white">
                  {lang === 'ar' ? 'أهلاً بك، المسؤول' : 'Welcome, Restaurant Director'}
                </span>
                <span className="bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                  {lang === 'ar' ? 'نشط' : 'Active Admin'}
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-medium tracking-wide">
                {lang === 'ar' ? 'منظومة تخزين قاعدة بيانات الموقع: التخزين المحلي نشط حالياً (Local Storage)' : 'CMS Database Persistence: LocalStorage Enabled'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogout}
              id="admin-logout-btn"
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-red-500 hover:bg-red-50/10 transition-colors cursor-pointer text-xs font-bold uppercase flex items-center space-x-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Log Out'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Menu Panel */}
          <nav className="lg:col-span-3 space-y-2" id="cms-dashboard-sidebar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-3 ${
                activeTab === 'overview'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-amber-500" />
              <span>{lang === 'ar' ? 'نظرة عامة والتحليلات' : 'Analytics Overview'}</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-3 ${
                activeTab === 'products'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-900'
              }`}
            >
              <Package className="w-4 h-4 text-red-500" />
              <span>{lang === 'ar' ? 'إدارة المأكولات والوجبات' : 'Menu Items Manager'}</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-3 ${
                activeTab === 'categories'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-900'
              }`}
            >
              <FolderHeart className="w-4 h-4 text-red-500" />
              <span>{lang === 'ar' ? 'تصنيف الفئات' : 'Food Categories Manager'}</span>
            </button>

            <button
              onClick={() => setActiveTab('branches')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-3 ${
                activeTab === 'branches'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-900'
              }`}
            >
              <MapPin className="w-4 h-4 text-red-500" />
              <span>{lang === 'ar' ? 'إدارة الفروع' : 'Branch Hub Locations'}</span>
            </button>

            <button
              onClick={() => setActiveTab('cms')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-3 ${
                activeTab === 'cms'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-900'
              }`}
            >
              <Settings className="w-4 h-4 text-red-505" />
              <span>{lang === 'ar' ? 'إدارة محتوى الموقع وطابعها' : 'Branding & CMS settings'}</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-3 ${
                activeTab === 'messages'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-900'
              }`}
            >
              <Megaphone className="w-4 h-4 text-red-500" />
              <span>{lang === 'ar' ? 'الشكاوى والاقتراحات' : 'Feedback Inbox Box'}</span>
              {submissions.filter(s => s.status === 'pending').length > 0 && (
                <span className="bg-amber-500 text-zinc-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {submissions.filter(s => s.status === 'pending').length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-3 ${
                activeTab === 'reviews'
                  ? 'bg-red-500 text-white shadow-md'
                  : 'bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>{lang === 'ar' ? 'إدارة آراء العملاء' : 'Customer Reviews Manager'}</span>
              {reviews.length > 0 && (
                <span className="bg-amber-500 text-zinc-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {reviews.length}
                </span>
              )}
            </button>
          </nav>

          {/* Core admin form interface section container */}
          <main className="lg:col-span-9" id="cms-dashboard-content-screen">
            
            {/* OVERVIEW ANALYTICS TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6" id="overview-tab-view">
                <h3 className="text-xl font-black text-zinc-90 w-full text-zinc-850 dark:text-white pb-3 border-b border-zinc-200 dark:border-zinc-800">
                  {lang === 'ar' ? 'التحليلات والمؤشرات العامة' : 'Analytics & Performance Overview'}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-sm">
                    <span className="text-zinc-400 font-bold block text-xs uppercase tracking-wider">
                      {lang === 'ar' ? 'إجمالي الوجبات' : 'Total Products'}
                    </span>
                    <span className="text-3xl font-black text-red-500 block mt-2">{products.length}</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-sm">
                    <span className="text-zinc-400 font-bold block text-xs uppercase tracking-wider">
                      {lang === 'ar' ? 'إجمالي الفئات' : 'Total Categories'}
                    </span>
                    <span className="text-3xl font-black text-red-500 block mt-2">{categories.length}</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-sm">
                    <span className="text-zinc-400 font-bold block text-xs uppercase tracking-wider">
                      {lang === 'ar' ? 'الفروع النشطة' : 'Active Hubs'}
                    </span>
                    <span className="text-3xl font-black text-red-500 block mt-2">{branches.length}</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-sm">
                    <span className="text-zinc-400 font-bold block text-xs uppercase tracking-wider">
                      {lang === 'ar' ? 'الشكاوى والاقتراحات' : 'Feedback Inbox'}
                    </span>
                    <span className="text-3xl font-black text-red-500 block mt-2">{submissions.length}</span>
                  </div>
                  <div className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-900 shadow-sm col-span-2 md:col-span-1">
                    <span className="text-zinc-400 font-bold block text-xs uppercase tracking-wider">
                      {lang === 'ar' ? 'آراء وتقييمات العملاء' : 'Customer Reviews'}
                    </span>
                    <span className="text-3xl font-black text-amber-500 block mt-2">{reviews.length}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-900 space-y-3">
                  <h4 className="text-sm font-black uppercase text-zinc-900 dark:text-white">
                    {lang === 'ar' ? 'إرشادات الاستخدام المباشر والمساعدة' : 'Direct Guidance Hint'}
                  </h4>
                  <ul className="text-xs text-zinc-500 dark:text-zinc-400 list-disc list-inside space-y-1.5 leading-relaxed font-semibold">
                    <li>
                      {lang === 'ar' ? (
                        <>أن لوحة التحكم هذه تعمل محلياً، وتحفظ أي تعديل باللحظة عبر محرك التخزين المحلي للمتصفح <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.2 rounded">localStorage</code>.</>
                      ) : (
                        <>This CMS operates locally, preserving state immediately using the standard <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.2 rounded">localStorage</code> engine.</>
                      )}
                    </li>
                    <li>
                      {lang === 'ar' 
                        ? 'تستطيع بكل سهولة إضافة تصنيفات جديدة، تعديل تفاصيل ومكونات الوجبات، وتعديل أسعار الأطباق وتغيير تفاصيل فروع التواصل وخطوط الواتساب.' 
                        : 'Feel free to add new categories, edit the spicy chicken ingredients, adjust individual pricing models, or change branch contact WhatsApp lines.'}
                    </li>
                    <li>
                      {lang === 'ar' 
                        ? 'أي تعديل تحفظه هنا ينعكس فورا في صفحة الزائر الأمامية! جرّب تبديل التبويب للتأكد من ذلك.' 
                        : 'Any edits made here are instantly rendered across the visitor front-end page! Try opening the menu/branches sections to confirm.'}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* PRODUCT ITEMS FORMS MANAGER */}
            {activeTab === 'products' && (
              <div className="space-y-6" id="products-cms-control">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                    {lang === 'ar' ? 'إدارة مأكولات ومعروضات القائمة' : 'Restaurant Live Products'}
                  </h3>
                  {!showProductForm && (
                    <button
                      onClick={handleStartAddProduct}
                      id="cms-start-add-product"
                      className="px-4 py-2 bg-red-500 hover:bg-red-650 rounded-xl text-white font-extrabold text-xs tracking-wider uppercase transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      <span>{lang === 'ar' ? 'إضافة وجبة جديدة' : 'Add New Meal'}</span>
                    </button>
                  )}
                </div>

                {showProductForm ? (
                  /* Form block to add/edit products */
                  <form onSubmit={handleSaveProduct} className="bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-850 shadow-md space-y-6" id="product-crud-form">
                    <h4 className="text-sm font-black uppercase tracking-wider text-red-500 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                      {prodEditingId 
                        ? (lang === 'ar' ? 'تعديل تفاصيل الوجبة المعروضة' : 'Edit Product Item details')
                        : (lang === 'ar' ? 'إضافة وجبة براوستد جديدة للقائمة' : 'Build a new food listing')}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'اسم الوجبة (بالإنجليزي) *' : 'Product Name (English) *'}</label>
                        <input
                          type="text"
                          required
                          value={prodForm.nameEn}
                          onChange={(e) => setProdForm({ ...prodForm, nameEn: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="e.g. Garlic Loaded Crispy Burger"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'اسم الوجبة (بالعربي) *' : 'Product Name (Arabic) *'}</label>
                        <input
                          type="text"
                          required
                          value={prodForm.nameAr}
                          onChange={(e) => setProdForm({ ...prodForm, nameAr: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="مثال: برجر بالثوم المقرمش الفريد"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'الوصف التوضيحي (بالإنجليزي) *' : 'Description (English) *'}</label>
                        <textarea
                          required
                          rows={3}
                          value={prodForm.descriptionEn}
                          onChange={(e) => setProdForm({ ...prodForm, descriptionEn: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-100 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Provide crisp copy outlining juicy tenders or side fries..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'الوصف التوضيحي (بالعربي) *' : 'Description (Arabic) *'}</label>
                        <textarea
                          required
                          rows={3}
                          value={prodForm.descriptionAr}
                          onChange={(e) => setProdForm({ ...prodForm, descriptionAr: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-100 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="أكتب وصف مشهي مثل: دجاج مقرمش ذهبي مع صلصة حارة..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'سعر البيع (بالريال السعودي) *' : 'Standard Selling Price (SR) *'}</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={prodForm.price || ''}
                          onChange={(e) => setProdForm({ ...prodForm, price: parseFloat(e.target.value) || 0 })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="e.g. 36.00"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'التصنيف التابع للوجبة *' : 'Category Affiliation *'}</label>
                        <select
                          required
                          value={prodForm.categoryId}
                          onChange={(e) => setProdForm({ ...prodForm, categoryId: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-black text-zinc-700 dark:text-zinc-300 focus:outline-none"
                        >
                          <option value="">{lang === 'ar' ? '-- اختر فئة الطعام --' : '-- Choose Category --'}</option>
                          {categories.map(c => (
                            <option key={c.id} value={c.id}>{lang === 'ar' ? c.nameAr : c.nameEn}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'رابط ويب مباشر لصورة الوجبة *' : 'Photo Image Link URL *'}</label>
                        <input
                          type="url"
                          required
                          value={prodForm.image}
                          onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          placeholder="Copy Unsplash photo link url..."
                        />
                      </div>

                      {/* original price if special deal */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'السعر الأصلي (اختياري للشطب وإضافة خصم)' : 'Original Price (optional cross-out price)'}</label>
                        <input
                          type="number"
                          step="0.01"
                          value={prodForm.originalPrice || ''}
                          onChange={(e) => setProdForm({ ...prodForm, originalPrice: parseFloat(e.target.value) || undefined })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold"
                          placeholder="e.g., 42.00 (leave blank if no sale active)"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'شعار التميز والخصم (بالإنجليزي)' : 'Discount Tag (English)'}</label>
                        <input
                          type="text"
                          value={prodForm.discountTagEn || ''}
                          onChange={(e) => setProdForm({ ...prodForm, discountTagEn: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white"
                          placeholder="e.g. HOT VALUE"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'شعار التميز والخصم (بالعربي)' : 'Discount Tag (Arabic)'}</label>
                        <input
                          type="text"
                          value={prodForm.discountTagAr || ''}
                          onChange={(e) => setProdForm({ ...prodForm, discountTagAr: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white"
                          placeholder="مثال: عرض ناري"
                        />
                      </div>
                    </div>

                    {/* Boolean configuration flags */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center space-x-2 bg-zinc-50 dark:bg-zinc-900 p-3.5 rounded-xl">
                        <input
                          type="checkbox"
                          id="form-is-available"
                          checked={prodForm.isAvailable}
                          onChange={(e) => setProdForm({ ...prodForm, isAvailable: e.target.checked })}
                          className="w-4 h-4 text-red-500 cursor-pointer"
                        />
                        <label htmlFor="form-is-available" className="text-xs font-bold text-zinc-640 select-none cursor-pointer">
                          {lang === 'ar' ? 'متوفر بالمخزن وجاهز للطلب' : 'Available In Stock'}
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 bg-zinc-50 dark:bg-zinc-900 p-3.5 rounded-xl">
                        <input
                          type="checkbox"
                          id="form-is-featured"
                          checked={prodForm.isFeatured}
                          onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                          className="w-4 h-4 text-red-500 cursor-pointer"
                        />
                        <label htmlFor="form-is-featured" className="text-xs font-bold text-zinc-640 select-none cursor-pointer">
                          {lang === 'ar' ? 'وجبة موصى بها ومميزة' : 'Recommended Item'}
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 bg-zinc-50 dark:bg-zinc-900 p-3.5 rounded-xl">
                        <input
                          type="checkbox"
                          id="form-is-special-offer"
                          checked={prodForm.isSpecialOffer}
                          onChange={(e) => setProdForm({ ...prodForm, isSpecialOffer: e.target.checked })}
                          className="w-4 h-4 text-red-500 cursor-pointer"
                        />
                        <label htmlFor="form-is-special-offer" className="text-xs font-bold text-zinc-640 select-none cursor-pointer">
                          {lang === 'ar' ? 'تحديد كعرض خاص حارق' : 'Mark as Special Offer'}
                        </label>
                      </div>
                    </div>

                    {/* Buttons form triggers */}
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => { setShowProductForm(false); setProdEditingId(null); }}
                        className="px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 font-bold text-xs uppercase cursor-pointer"
                      >
                        {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        id="cms-save-product-btn"
                        className="px-6 py-2.5 rounded-xl bg-red-500 text-white font-extrabold text-xs uppercase cursor-pointer"
                      >
                        {prodEditingId 
                          ? (lang === 'ar' ? 'حفظ التحديث وبثه' : 'Update Listing') 
                          : (lang === 'ar' ? 'نشر وإدراج الوجبة الجديدة' : 'Publish Product')}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Live list of products in analytics table */
                  <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-3xl overflow-hidden shadow">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-zinc-50 dark:bg-zinc-900 font-black text-xs text-zinc-500 uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-850">
                            <th className="px-6 py-4">{lang === 'ar' ? 'الوجبة الغذائية' : 'Food Product'}</th>
                            <th className="px-6 py-4">{lang === 'ar' ? 'التصنيف' : 'Category'}</th>
                            <th className="px-6 py-4 text-right">{lang === 'ar' ? 'السعر' : 'Price'}</th>
                            <th className="px-6 py-4 text-center">{lang === 'ar' ? 'الحالة بالمخزن' : 'Status'}</th>
                            <th className="px-6 py-4 text-center">{lang === 'ar' ? 'موصى به' : 'Featured'}</th>
                            <th className="px-6 py-4 text-center">{lang === 'ar' ? 'عرض خاص' : 'Special'}</th>
                            <th className="px-6 py-4 text-center">{lang === 'ar' ? 'التحكم' : 'Controls'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850">
                          {products.map((p) => {
                            const cat = categories.find(c => c.id === p.categoryId);
                            return (
                              <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
                                <td className="px-6 py-4 flex items-center space-x-3">
                                  <img src={p.image} referrerPolicy="no-referrer" className="w-10 h-10 rounded-xl object-cover" />
                                  <div>
                                    <span className="font-extrabold text-zinc-800 dark:text-white block">{p.nameEn}</span>
                                    <span className="text-[10px] text-zinc-400 block font-bold font-mono">{p.nameAr}</span>
                                  </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-xs text-zinc-500">
                                  {cat ? (lang === 'ar' ? cat.nameAr : cat.nameEn) : p.categoryId}
                                </td>
                                <td className="px-6 py-4 text-right font-black font-mono text-red-500">
                                  {p.price.toFixed(2)} {lang === 'ar' ? 'ر.س' : 'SR'}
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                                    p.isAvailable ? 'bg-green-100 text-green-700 dark:bg-green-950/45 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-950/45 dark:text-red-400'
                                  }`}>
                                    {p.isAvailable ? (lang === 'ar' ? 'متوفر' : 'In Stock') : (lang === 'ar' ? 'نفذت الكمية' : 'Out of Stock')}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <span>{p.isFeatured ? '✅' : '❌'}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <span>{p.isSpecialOffer ? '🔥' : '➖'}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <div className="flex items-center justify-center space-x-1">
                                    <button
                                      onClick={() => handleStartEditProduct(p)}
                                      id={`cms-edit-product-${p.id}`}
                                      className="p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-650 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
                                      title={lang === 'ar' ? 'تعديل التفاصيل' : 'Edit details'}
                                    >
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </button>
                                    {deletingProductId === p.id ? (
                                      <div className="flex items-center space-x-1 rtl:space-x-reverse" id={`confirm-delete-container-${p.id}`}>
                                        <button
                                          onClick={() => {
                                            handleDeleteProduct(p.id);
                                            setDeletingProductId(null);
                                          }}
                                          className="px-2 py-1 text-[10px] font-black rounded-lg bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                                          title={lang === 'ar' ? 'تأكيد الحذف النهائي' : 'Confirm absolute deletion'}
                                        >
                                          {lang === 'ar' ? 'نعم' : 'Yes'}
                                        </button>
                                        <button
                                          onClick={() => setDeletingProductId(null)}
                                          className="px-2 py-1 text-[10px] font-bold rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                                        >
                                          {lang === 'ar' ? 'إلغاء' : 'No'}
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        onClick={() => setDeletingProductId(p.id)}
                                        id={`cms-delete-product-${p.id}`}
                                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/15 dark:hover:bg-red-950/30 text-red-450 hover:text-red-600 transition-colors cursor-pointer"
                                        title={lang === 'ar' ? 'حذف الوجبة' : 'Delete Product'}
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CATEGORIES FORMS TAB */}
            {activeTab === 'categories' && (
              <div className="space-y-6" id="categories-cms-control">
                <h3 className="text-xl font-black text-zinc-905 dark:text-white pb-3 border-b border-zinc-255 dark:border-zinc-855">
                  {lang === 'ar' ? 'تصنيف فئات المأكولات' : 'Custom Category Builder'}
                </h3>

                {/* Grid layout containing category editor and active category table */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Category Creator Card Form */}
                  <div className="md:col-span-5 bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-850 shadow-sm space-y-4 h-fit">
                    <h4 className="text-xs font-black uppercase text-red-500 tracking-wider">
                      {catEditingId ? (lang === 'ar' ? 'تعديل الفئة الغذائية المحددة' : 'Modifying Target Category') : (lang === 'ar' ? 'إنشاء فئة طعام جديدة' : 'Create Categories')}
                    </h4>

                    <form onSubmit={handleSaveCategory} className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-400 block">{lang === 'ar' ? 'اسم الفئة (بالإنجليزي) *' : 'Category Identifier (English) *'}</label>
                        <input
                          type="text"
                          required
                          value={catNameEn}
                          onChange={(e) => setCatNameEn(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-855 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white"
                          placeholder="e.g. Signature Burgers"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-zinc-400 block">{lang === 'ar' ? 'اسم الفئة (بالعربي) *' : 'Category Identifier (Arabic) *'}</label>
                        <input
                          type="text"
                          required
                          value={catNameAr}
                          onChange={(e) => setCatNameAr(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-855 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-900 dark:text-white"
                          placeholder="مثال: برجر مستر المميز"
                        />
                      </div>

                      <div className="flex space-x-2 pt-2">
                        {catEditingId && (
                          <button
                            type="button"
                            onClick={() => { setCatEditingId(null); setCatNameAr(''); setCatNameEn(''); }}
                            className="w-1/2 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-500 text-xs font-bold cursor-pointer"
                          >
                            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                          </button>
                        )}
                        <button
                          type="submit"
                          id="cms-save-cat-btn"
                          className="w-full py-2 rounded-xl bg-red-500 text-white font-extrabold text-xs uppercase cursor-pointer"
                        >
                          {catEditingId 
                            ? (lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes') 
                            : (lang === 'ar' ? 'إضافة وتثبيت التصنيف' : 'Install Category')}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Active Categories table list */}
                  <div className="md:col-span-7 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-3xl overflow-hidden shadow">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-900 font-extrabold text-[10px] text-zinc-500 uppercase border-b border-zinc-100 dark:border-zinc-855">
                          <th className="px-4 py-3 text-left">{lang === 'ar' ? 'اسم فئة الطعام (EN / AR)' : 'Category Name (EN / AR)'}</th>
                          <th className="px-4 py-3 text-center">{lang === 'ar' ? 'الوجبات المشمولة' : 'Assigned Meals'}</th>
                          <th className="px-4 py-3 text-center">{lang === 'ar' ? 'الخيارات' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 font-bold text-xs text-zinc-700 dark:text-zinc-300">
                        {categories.map(cat => {
                          const productCount = products.filter(p => p.categoryId === cat.id).length;
                          return (
                            <tr key={cat.id} className="hover:bg-zinc-50/20">
                              <td className="px-4 py-3.5">
                                <span className="block text-zinc-900 dark:text-white font-extrabold">{cat.nameEn}</span>
                                <span className="block text-[10px] text-zinc-400 font-mono italic">{cat.nameAr}</span>
                              </td>
                              <td className="px-4 py-3.5 text-center text-red-550 font-black">
                                {productCount}
                              </td>
                              <td className="px-4 py-3.5 text-center">
                                <div className="flex items-center justify-center space-x-1">
                                  <button
                                    onClick={() => handleStartEditCategory(cat)}
                                    id={`cms-edit-category-${cat.id}`}
                                    className="p-1 px-1.5 rounded bg-zinc-100 dark:bg-zinc-900 hover:text-red-500 cursor-pointer"
                                  >
                                    {lang === 'ar' ? 'تعديل' : 'Edit'}
                                  </button>
                                  {deletingCategoryId === cat.id ? (
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse" id={`confirm-delete-cat-container-${cat.id}`}>
                                      <button
                                        onClick={() => {
                                          handleDeleteCategory(cat.id);
                                          setDeletingCategoryId(null);
                                        }}
                                        className="px-2 py-0.5 text-[10px] font-black rounded bg-red-500 text-white cursor-pointer"
                                      >
                                        {lang === 'ar' ? 'تأكيد' : 'Confirm'}
                                      </button>
                                      <button
                                        onClick={() => setDeletingCategoryId(null)}
                                        className="px-2 py-0.5 text-[10px] font-bold rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-355 cursor-pointer"
                                      >
                                        {lang === 'ar' ? 'تراجع' : 'No'}
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => setDeletingCategoryId(cat.id)}
                                      id={`cms-delete-category-${cat.id}`}
                                      className="p-1 px-1.5 rounded bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-650 hover:text-red-655 font-bold cursor-pointer"
                                    >
                                      {lang === 'ar' ? 'حذف' : 'Remove'}
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* BRANCHES CMS LOCATIONS FORMS */}
            {activeTab === 'branches' && (
              <div className="space-y-6" id="branches-cms-control">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                    {lang === 'ar' ? 'إدارة فروع مطعم مستر بروستد' : 'Restaurant Hub Branches'}
                  </h3>
                  {!showBranchForm && (
                    <button
                      onClick={handleStartAddBranch}
                      id="cms-start-add-branch"
                      className="px-4 py-2 bg-red-500 hover:bg-red-655 rounded-xl text-white font-extrabold text-xs tracking-wider uppercase transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      <span>{lang === 'ar' ? 'إضافة فرع جديد' : 'Add New Hub Branch'}</span>
                    </button>
                  )}
                </div>

                {showBranchForm ? (
                  /* Create / Edit branch controls */
                  <form onSubmit={handleSaveBranch} className="bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-850 shadow-md space-y-6" id="branches-crud-form">
                    <h4 className="text-sm font-black uppercase text-red-505 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                      {branchEditingId 
                        ? (lang === 'ar' ? 'تعديل تفاصيل وبيانات الفرع المعين' : 'Modify physical branch attributes') 
                        : (lang === 'ar' ? 'تأسيس وإنشاء فرع جغرافي جديد' : 'Host a new branch presence')}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'اسم الفرع (بالإنجليزي) *' : 'Branch Name (English) *'}</label>
                        <input
                          type="text"
                          required
                          value={branchForm.nameEn}
                          onChange={(e) => setBranchForm({ ...branchForm, nameEn: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold animate-none"
                          placeholder="e.g. Riyadh - Al Rawdah"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'اسم الفرع (بالعربي) *' : 'Branch Name (Arabic) *'}</label>
                        <input
                          type="text"
                          required
                          value={branchForm.nameAr}
                          onChange={(e) => setBranchForm({ ...branchForm, nameAr: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold"
                          placeholder="مثال: الرياض - فرع الروضة"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'العنوان الجغرافي (بالإنجليزي) *' : 'Physical Address (English) *'}</label>
                        <input
                          type="text"
                          required
                          value={branchForm.addressEn}
                          onChange={(e) => setBranchForm({ ...branchForm, addressEn: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'العنوان الجغرافي (بالعربي) *' : 'Physical Address (Arabic) *'}</label>
                        <input
                          type="text"
                          required
                          value={branchForm.addressAr}
                          onChange={(e) => setBranchForm({ ...branchForm, addressAr: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'رابط مسار موقع الخريطة قوقل ماب *' : 'Google Maps Location Link *'}</label>
                        <input
                          type="url"
                          required
                          value={branchForm.googleMapsUrl}
                          onChange={(e) => setBranchForm({ ...branchForm, googleMapsUrl: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold"
                          placeholder="https://maps.google.com/?q=..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'رابط مباشر لصورة واجهة الفرع *' : 'Branch exterior photo link url *'}</label>
                        <input
                          type="url"
                          required
                          value={branchForm.image}
                          onChange={(e) => setBranchForm({ ...branchForm, image: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold"
                          placeholder="Copy Unsplash restaurant image link..."
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'أوقات العمل (بالإنجليزي) *' : 'Working Hours (English) *'}</label>
                        <input
                          type="text"
                          required
                          value={branchForm.workingHoursEn}
                          onChange={(e) => setBranchForm({ ...branchForm, workingHoursEn: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold"
                          placeholder="e.g. 12:00 PM - 2:00 AM"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'أوقات العمل (بالعربي) *' : 'Working Hours (Arabic) *'}</label>
                        <input
                          type="text"
                          required
                          value={branchForm.workingHoursAr}
                          onChange={(e) => setBranchForm({ ...branchForm, workingHoursAr: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold"
                          placeholder="مثال: ١٢:٠٠ م - ٢:٠٠ ص"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'رقم الواتساب لاستقبال الطلبات (مثل: 9665xxxxxxxx) *' : 'WhatsApp Number (e.g. 9665xxxxxxxx) *'}</label>
                        <input
                          type="text"
                          required
                          value={branchForm.whatsappNumber}
                          onChange={(e) => setBranchForm({ ...branchForm, whatsappNumber: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold"
                          placeholder="Country code included, NO + or spaces"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-zinc-400 block">{lang === 'ar' ? 'رقم الهاتف للاتصال المباشر والسريع *' : 'Direct Telephone Call Number *'}</label>
                        <input
                          type="text"
                          required
                          value={branchForm.phoneNumber}
                          onChange={(e) => setBranchForm({ ...branchForm, phoneNumber: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold"
                          placeholder="e.g. +966112223333"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => { setShowBranchForm(false); setBranchEditingId(null); }}
                        className="px-5 py-2.5 bg-zinc-100 dark:bg-zinc-905 text-zinc-630 text-xs font-bold uppercase rounded-xl cursor-pointer"
                      >
                        {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        id="cms-save-branch-btn"
                        className="px-6 py-2.5 bg-red-500 text-white font-extrabold text-xs uppercase rounded-xl cursor-pointer"
                      >
                        {branchEditingId 
                          ? (lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes') 
                          : (lang === 'ar' ? 'إدراج وتأسيس الفرع' : 'Install Active Branch Office')}
                      </button>
                    </div>
                  </form>
                ) : (
                  /* active branches mapping grid list */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="branches-admin-grid">
                    {branches.map(b => (
                      <div key={b.id} className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center space-x-3">
                          <img src={b.image} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                          <div>
                            <h4 className="font-extrabold text-base text-zinc-900 dark:text-white leading-tight">
                              {lang === 'ar' ? b.nameAr : b.nameEn}
                            </h4>
                            <span className="text-[10px] text-zinc-405 block font-bold mt-1 uppercase tracking-widest text-red-500">
                              WA: {b.whatsappNumber}
                            </span>
                          </div>
                        </div>

                        <div className="text-xs text-zinc-500 space-y-1 font-semibold leading-relaxed">
                          <p>📍 {lang === 'ar' ? b.addressAr : b.addressEn}</p>
                          <p>🕒 {lang === 'ar' ? b.workingHoursAr : b.workingHoursEn}</p>
                          <p>📞 {b.phoneNumber}</p>
                        </div>

                        {deletingBranchId === b.id ? (
                          <div className="flex items-center space-x-1.5 pt-3 border-t border-zinc-100 dark:border-zinc-900 justify-end w-full" id={`confirm-delete-branch-container-${b.id}`}>
                            <span className="text-[11px] font-bold text-red-500 mr-auto">
                              {lang === 'ar' ? 'حذف الفرع؟' : 'Confirm deletion?'}
                            </span>
                            <button
                              onClick={() => {
                                handleDeleteBranch(b.id);
                                setDeletingBranchId(null);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-extrabold text-xs cursor-pointer"
                            >
                              {lang === 'ar' ? 'نعم' : 'Yes'}
                            </button>
                            <button
                              onClick={() => setDeletingBranchId(null)}
                              className="px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs cursor-pointer"
                            >
                              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 rtl:space-x-reverse pt-3 border-t border-zinc-105 dark:border-zinc-900 w-full">
                            <button
                              onClick={() => handleStartEditBranch(b)}
                              id={`cms-edit-branch-${b.id}`}
                              className="w-1/2 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-black text-xs cursor-pointer transition-colors border border-zinc-200 dark:border-zinc-700"
                            >
                              {lang === 'ar' ? 'تعديل 📝' : 'Edit 📝'}
                            </button>
                            <button
                              onClick={() => setDeletingBranchId(b.id)}
                              id={`cms-delete-branch-${b.id}`}
                              className="w-1/2 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30 text-red-600 dark:text-red-400 font-black text-xs cursor-pointer transition-colors border border-red-100 dark:border-red-900/40"
                            >
                              {lang === 'ar' ? 'حذف 🗑️' : 'Remove 🗑️'}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PAGE CONTENT BRANDS CMS SETTINGS */}
            {activeTab === 'cms' && (
              <div className="space-y-6" id="branding-cms-control">
                <h3 className="text-xl font-black text-zinc-905 dark:text-white pb-3 border-b border-zinc-200 dark:border-zinc-800">
                  {lang === 'ar' ? 'إعدادات هوية المحتوى وشعاراتها' : 'Website Platform Branding'}
                </h3>

                <form onSubmit={handleSaveCMS} className="bg-white dark:bg-zinc-950 p-6 md:p-8 border border-zinc-200 dark:border-zinc-850 rounded-3xl shadow p-6 space-y-6" id="cms-branding-form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-455 block">{lang === 'ar' ? 'شعار المطعم (رمز إيموجي، نص، أو رابط صورة)' : 'Restaurant Logo (Emoji/Text/Image URL)'}</label>
                      <input
                        type="text"
                        value={cmsForm.logoUrl}
                        onChange={(e) => setCmsForm({ ...cmsForm, logoUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                        placeholder="🍗"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-455 block">{lang === 'ar' ? 'رقم الواتساب للزر العائم في الموقع للطلب السريع' : 'Instant Whatsapp Floating Button number'}</label>
                      <input
                        type="text"
                        value={cmsForm.whatsappFloatingNum}
                        onChange={(e) => setCmsForm({ ...cmsForm, whatsappFloatingNum: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                        placeholder="9665xxxxxxxx"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-455 block">{lang === 'ar' ? 'اسم المطعم (بالإنجليزي)' : 'Restaurant Name (English)'}</label>
                      <input
                        type="text"
                        value={cmsForm.nameEn}
                        onChange={(e) => setCmsForm({ ...cmsForm, nameEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-455 block">{lang === 'ar' ? 'اسم المطعم (بالعربي)' : 'Restaurant Name (Arabic)'}</label>
                      <input
                        type="text"
                        value={cmsForm.nameAr}
                        onChange={(e) => setCmsForm({ ...cmsForm, nameAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-455 block">{lang === 'ar' ? 'عنوان واجهة الموقع الترحيبية الهيرو (بالإنجليزي)' : 'Hero Section Display Heading (English)'}</label>
                      <input
                        type="text"
                        value={cmsForm.heroTitleEn}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroTitleEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-909 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-455 block">{lang === 'ar' ? 'عنوان واجهة الموقع الترحيبية الهيرو (بالعربي)' : 'Hero Section Display Heading (Arabic)'}</label>
                      <input
                        type="text"
                        value={cmsForm.heroTitleAr}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroTitleAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-909 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'العنوان الفرعي للبانر الترحيبي (بالإنجليزية)' : 'Hero Banner Subtitle (English)'}</label>
                      <textarea
                        rows={3}
                        value={cmsForm.heroSubtitleEn}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroSubtitleEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'العنوان الفرعي للبانر الترحيبي (بالعربية)' : 'Hero Banner Subtitle (Arabic)'}</label>
                      <textarea
                        rows={3}
                        value={cmsForm.heroSubtitleAr}
                        onChange={(e) => setCmsForm({ ...cmsForm, heroSubtitleAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'الرابط المباشر لصورة الخلفية/البانر الترويجي للهيرو (رابط URL)' : 'Hero background/promotional banner main photo link (URL)'}</label>
                      <input
                        type="url"
                        value={cmsForm.bannerUrl}
                        onChange={(e) => setCmsForm({ ...cmsForm, bannerUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-455 block">{lang === 'ar' ? 'نص ملخص ذيل الصفحة (بالإنجليزي)' : 'Footer Summary Text (English)'}</label>
                      <textarea
                        rows={3}
                        value={cmsForm.footerTextEn}
                        onChange={(e) => setCmsForm({ ...cmsForm, footerTextEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-805 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-455 block">{lang === 'ar' ? 'نص ملخص ذيل الصفحة (بالعربية)' : 'Footer Summary Text (Arabic)'}</label>
                      <textarea
                        rows={3}
                        value={cmsForm.footerTextAr}
                        onChange={(e) => setCmsForm({ ...cmsForm, footerTextAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-805 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'رابط صفحة الفيسبوك' : 'Facebook fan page url'}</label>
                      <input
                        type="url"
                        value={cmsForm.facebookUrl}
                        onChange={(e) => setCmsForm({ ...cmsForm, facebookUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'رابط حساب الانستغرام' : 'Instagram business handle URL'}</label>
                      <input
                        type="url"
                        value={cmsForm.instagramUrl}
                        onChange={(e) => setCmsForm({ ...cmsForm, instagramUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'رابط حساب تويتر (X)' : 'Twitter handle URL'}</label>
                      <input
                        type="url"
                        value={cmsForm.twitterUrl}
                        onChange={(e) => setCmsForm({ ...cmsForm, twitterUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold"
                      />
                    </div>

                    {/* Section: Hero Trust metrics & Featured card options */}
                    <div className="md:col-span-2 border-t border-zinc-150 dark:border-zinc-800 pt-6">
                      <h4 className="text-xs font-black text-amber-500 uppercase tracking-widest mb-2">
                        {lang === 'ar' ? 'مؤشرات الثقة للبانر الترحيبي (Hero Trust Metrics)' : 'Hero Banner Trust Metrics'}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-bold mb-4">
                        {lang === 'ar' 
                          ? 'قم بتعديل قيم وتسميات إحصائيات الثقة الثلاث المعروضة أسفل العنوان الترحيبي بالصفحة الرئيسية (مثل: 100% طازج يومياً، إلخ).' 
                          : 'Customize the three trust metric parameters shown directly under the main greeting title.'}
                      </p>
                    </div>

                    {/* Metric 1 */}
                    <div className="space-y-4 border border-zinc-100 dark:border-zinc-900/50 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-905/30">
                      <h5 className="text-xs font-black text-zinc-650 dark:text-zinc-300">
                        {lang === 'ar' ? 'المؤشر الأول (مثال: طازج يومياً)' : 'First Metric (e.g. Fresh Daily)'}
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'القيمة (En)' : 'Value (En)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric1ValueEn || ''}
                            placeholder="100%"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric1ValueEn: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'القيمة (Ar)' : 'Value (Ar)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric1ValueAr || ''}
                            placeholder="100%"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric1ValueAr: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'الوصف (En)' : 'Label (En)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric1LabelEn || ''}
                            placeholder="Fresh Daily"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric1LabelEn: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'الوصف (Ar)' : 'Label (Ar)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric1LabelAr || ''}
                            placeholder="طازج يومياً"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric1LabelAr: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="space-y-4 border border-zinc-100 dark:border-zinc-900/50 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-905/30">
                      <h5 className="text-xs font-black text-zinc-650 dark:text-zinc-300">
                        {lang === 'ar' ? 'المؤشر الثاني (مثال: بهارات سرّية)' : 'Second Metric (e.g. Secret Spices)'}
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'القيمة (En)' : 'Value (En)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric2ValueEn || ''}
                            placeholder="Secret"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric2ValueEn: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'القيمة (Ar)' : 'Value (Ar)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric2ValueAr || ''}
                             placeholder="سرّي"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric2ValueAr: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'الوصف (En)' : 'Label (En)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric2LabelEn || ''}
                            placeholder="Bespoke Recipe"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric2LabelEn: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'الوصف (Ar)' : 'Label (Ar)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric2LabelAr || ''}
                            placeholder="بهارات أصلية"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric2LabelAr: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="space-y-4 border border-zinc-100 dark:border-zinc-900/50 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-905/30 md:col-span-2">
                      <h5 className="text-xs font-black text-zinc-650 dark:text-zinc-300">
                        {lang === 'ar' ? 'المؤشر الثالث (مثال: تقييم ممتاز)' : 'Third Metric (e.g. Top Rating)'}
                      </h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'القيمة (En)' : 'Value (En)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric3ValueEn || ''}
                            placeholder="4.9 ★"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric3ValueEn: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'القيمة (Ar)' : 'Value (Ar)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric3ValueAr || ''}
                            placeholder="4.9 ★"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric3ValueAr: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'الوصف (En)' : 'Label (En)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric3LabelEn || ''}
                            placeholder="Top Rating"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric3LabelEn: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black text-zinc-400 block mb-1">{lang === 'ar' ? 'الوصف (Ar)' : 'Label (Ar)'}</label>
                          <input
                            type="text"
                            value={cmsForm.heroMetric3LabelAr || ''}
                            placeholder="تقييم ممتاز"
                            onChange={(e) => setCmsForm({ ...cmsForm, heroMetric3LabelAr: e.target.value })}
                            className="w-full px-2 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-lg text-xs font-bold text-zinc-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section: Hero Featured Product Promo Card */}
                    <div className="md:col-span-2 border-t border-zinc-150 dark:border-zinc-800 pt-6">
                      <h4 className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">
                        {lang === 'ar' ? 'البطاقة الترويجية المميزة المعروضة بجانب الهيرو' : 'Hero Featured Product Promo Card'}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-bold mb-4">
                        {lang === 'ar' 
                          ? 'قم بتعديل الوجبة المميزة وبطاقتها الترويجية المعروضة على يسار البانر الترحيبي بالصفحة الرئيسية للموقع.' 
                          : 'Customize the highlight product promo card displayed on the right-hand side of the main landing banner.'}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'الملصق/الوسم بالإنجليزية (مثال: Best Seller)' : 'Tag/Label (English)'}</label>
                      <input
                        type="text"
                        value={cmsForm.heroFeaturedTagEn || ''}
                        placeholder="Best Seller"
                        onChange={(e) => setCmsForm({ ...cmsForm, heroFeaturedTagEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'الملصق/الوسم بالعربية (مثال: الأكثر مبيعاً)' : 'Tag/Label (Arabic)'}</label>
                      <input
                        type="text"
                        value={cmsForm.heroFeaturedTagAr || ''}
                        placeholder="الأكثر مبيعاً"
                        onChange={(e) => setCmsForm({ ...cmsForm, heroFeaturedTagAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'اسم الوجبة بالإنجليزية' : 'Product Name (English)'}</label>
                      <input
                        type="text"
                        value={cmsForm.heroFeaturedNameEn || ''}
                        placeholder="Classic Golden Drumsticks"
                        onChange={(e) => setCmsForm({ ...cmsForm, heroFeaturedNameEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'اسم الوجبة بالعربية' : 'Product Name (Arabic)'}</label>
                      <input
                        type="text"
                        value={cmsForm.heroFeaturedNameAr || ''}
                        placeholder="بروستد كلاسيك مقرمش"
                        onChange={(e) => setCmsForm({ ...cmsForm, heroFeaturedNameAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'شرح الوجبة بالإنجليزية' : 'Product Description (English)'}</label>
                      <input
                        type="text"
                        value={cmsForm.heroFeaturedDescEn || ''}
                        placeholder="The exact heritage blend recipe that made us famous!"
                        onChange={(e) => setCmsForm({ ...cmsForm, heroFeaturedDescEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'شرح الوجبة بالعربية' : 'Product Description (Arabic)'}</label>
                      <input
                        type="text"
                        value={cmsForm.heroFeaturedDescAr || ''}
                        placeholder="الخلطة التي جعلتنا مشهورين!"
                        onChange={(e) => setCmsForm({ ...cmsForm, heroFeaturedDescAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'السعر بالرقم (مثال: 36.00)' : 'Price Value (e.g. 36.00)'}</label>
                      <input
                        type="text"
                        value={cmsForm.heroFeaturedPrice || ''}
                        placeholder="36.00"
                        onChange={(e) => setCmsForm({ ...cmsForm, heroFeaturedPrice: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'رابط صورة الوجبة (URL)' : 'Product Image Link (URL)'}</label>
                      <input
                        type="url"
                        value={cmsForm.heroFeaturedImageUrl || ''}
                        placeholder="https://images.unsplash.com/photo-..."
                        onChange={(e) => setCmsForm({ ...cmsForm, heroFeaturedImageUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-855 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    {/* Section: Special Offers & Best Sellers Copy Editing */}
                    <div className="md:col-span-2 border-t border-zinc-150 dark:border-zinc-800 pt-6">
                      <h4 className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">
                        {lang === 'ar' ? 'نصوص قسم العروض الخاصة والأكثر طلباً' : 'Special Offers & Featured Meals Headings'}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-bold mb-4">
                        {lang === 'ar' 
                          ? 'يمكنك هنا التحكم الكامل بالعناوين والنصوص الفرعية في الصفحة الرئيسية لقسم العروض وقسم الأكثر مبيعاً.' 
                          : 'Customize the main headers, subtitles, labels and tags displayed in the specials and popular seller menus.'}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'تصنيف قسم العروض (بالإنجليزي)' : 'Offers Section Tag/Label (English)'}</label>
                      <input
                        type="text"
                        value={cmsForm.offersTitleEn}
                        onChange={(e) => setCmsForm({ ...cmsForm, offersTitleEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'تصنيف قسم العروض (بالعربي)' : 'Offers Section Tag/Label (Arabic)'}</label>
                      <input
                        type="text"
                        value={cmsForm.offersTitleAr}
                        onChange={(e) => setCmsForm({ ...cmsForm, offersTitleAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'العنوان الرئيسي لقسم العروض (بالإنجليزي)' : 'Offers Section Main Heading (English)'}</label>
                      <input
                        type="text"
                        value={cmsForm.offersHeadingEn}
                        onChange={(e) => setCmsForm({ ...cmsForm, offersHeadingEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'العنوان الرئيسي لقسم العروض (بالعربي)' : 'Offers Section Main Heading (Arabic)'}</label>
                      <input
                        type="text"
                        value={cmsForm.offersHeadingAr}
                        onChange={(e) => setCmsForm({ ...cmsForm, offersHeadingAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'تصنيف قسم الأكثر طلباً (بالإنجليزي)' : 'Featured Section Tag/Label (English)'}</label>
                      <input
                        type="text"
                        value={cmsForm.featuredTitleEn}
                        onChange={(e) => setCmsForm({ ...cmsForm, featuredTitleEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'تصنيف قسم الأكثر طلباً (بالعربي)' : 'Featured Section Tag/Label (Arabic)'}</label>
                      <input
                        type="text"
                        value={cmsForm.featuredTitleAr}
                        onChange={(e) => setCmsForm({ ...cmsForm, featuredTitleAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'العنوان الرئيسي لقسم الأكثر طلباً (بالإنجليزي)' : 'Featured Section Main Heading (English)'}</label>
                      <input
                        type="text"
                        value={cmsForm.featuredHeadingEn}
                        onChange={(e) => setCmsForm({ ...cmsForm, featuredHeadingEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-805 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'العنوان الرئيسي لقسم الأكثر طلباً (بالعربي)' : 'Featured Section Main Heading (Arabic)'}</label>
                      <input
                        type="text"
                        value={cmsForm.featuredHeadingAr}
                        onChange={(e) => setCmsForm({ ...cmsForm, featuredHeadingAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-805 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'الوصف لقسم الأكثر طلباً (بالإنجليزي)' : 'Featured Section Description (English)'}</label>
                      <textarea
                        rows={2}
                        value={cmsForm.featuredDescEn}
                        onChange={(e) => setCmsForm({ ...cmsForm, featuredDescEn: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-805 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'الوصف لقسم الأكثر طلباً (بالعربي)' : 'Featured Section Description (Arabic)'}</label>
                      <textarea
                        rows={2}
                        value={cmsForm.featuredDescAr}
                        onChange={(e) => setCmsForm({ ...cmsForm, featuredDescAr: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-805 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                      />
                    </div>

                    {/* Section: Change Admin Password */}
                    <div className="md:col-span-2 border-t border-zinc-150 dark:border-zinc-850 pt-6">
                      <h4 className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">
                        {lang === 'ar' ? 'تعديل رمز مرور المسؤول' : 'Change CMS Admin Password'}
                      </h4>
                      <p className="text-[10px] text-zinc-400 font-bold mb-4">
                        {lang === 'ar' 
                          ? 'تعديل الرقم السري الافتراضي للمسؤول (الرقم السري الافتراضي للتجربة هو admin123).' 
                          : 'Customize the key required to enter this CMS panel. Default is admin123.'}
                      </p>
                    </div>

                    <div className="md:col-span-2 space-y-1.5 max-w-sm">
                      <label className="text-xs font-black text-zinc-450 block">{lang === 'ar' ? 'رمز المرور الجديد للمسؤول' : 'New Admin Password Key'}</label>
                      <input
                        type="text"
                        value={cmsForm.adminPassword || ''}
                        onChange={(e) => setCmsForm({ ...cmsForm, adminPassword: e.target.value })}
                        className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                        placeholder="admin123"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-zinc-100 dark:border-zinc-900">
                    <button
                      type="submit"
                      id="cms-save-branding-btn"
                      className="px-6 py-3 rounded-xl bg-red-500 text-white font-extrabold text-xs uppercase cursor-pointer transition-all shadow-md active:scale-95"
                    >
                      {lang === 'ar' ? 'حفظ ونشر تعديلات الهوية والمحتوى' : 'Publish New Branding Attributes'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* COMPLAINTS & SUGGESTIONS MESSAGES INBOX VIEW */}
            {activeTab === 'messages' && (
              <div className="space-y-6" id="messages-cms-control">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                    {lang === 'ar' ? 'صندوق الشكاوى والاقتراحات' : 'Customer Feedback Inbox Panel'}
                  </h3>
                  
                  {/* Export and Filter controls */}
                  <div className="flex items-center space-x-2">
                    <select
                      value={submissionFilter}
                      onChange={(e) => setSubmissionFilter(e.target.value as any)}
                      id="cms-submissions-filter"
                      className="px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-250 dark:border-zinc-850 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300"
                    >
                      <option value="all">{lang === 'ar' ? 'الكل' : 'All submissions'}</option>
                      <option value="complaint">{lang === 'ar' ? 'الشكاوى فقط' : 'Complaints only'}</option>
                      <option value="suggestion">{lang === 'ar' ? 'الاقتراحات فقط' : 'Suggestions only'}</option>
                    </select>

                    <button
                      onClick={handleExportData}
                      id="cms-export-submissions-btn"
                      className="px-3.5 py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                      title="Export submissions to downloadable format"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 mr-1" />
                      <span>{lang === 'ar' ? 'تصدير البيانات' : 'Export Data'}</span>
                    </button>
                  </div>
                </div>

                {filteredSubmissions.length === 0 ? (
                  /* Empty state inbox logs */
                  <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 rounded-3xl p-12 text-center max-w-sm mx-auto" id="cms-messages-empty">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4 animate-bounce" />
                    <h4 className="text-base font-black text-zinc-800 dark:text-white">
                      {lang === 'ar' ? 'صندوق الوارد فارغ ومتكامل!' : 'Inbox fully resolved and clear!'}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      {lang === 'ar' ? 'ممتاز! لا توجد بلاغات معلقة للمراجعة حالياً.' : 'There are no customer reports pending audit.'}
                    </p>
                  </div>
                ) : (
                  /* Cards display loop of complaints and suggests */
                  <div className="space-y-4" id="cms-messages-cards-list">
                    {filteredSubmissions.map((s) => {
                      const displayName = s.id === 'sub-comp-1' && lang === 'ar' ? 'أحمد السعيد' : s.id === 'sub-sugg-1' && lang === 'ar' ? 'سارة خالد' : s.name;
                      const displaySubject = s.id === 'sub-comp-1' && lang === 'ar' ? 'تأخر في التوصيل خلال ساعات الذروة' : s.id === 'sub-sugg-1' && lang === 'ar' ? 'إدراج وجبات طعام منخفضة السعرات (دايت)' : s.titleOrSubject;
                      const displayDetails = s.id === 'sub-comp-1' && lang === 'ar' ? 'لقد قمت بطلب وجبة بروستد 4 قطع أمس في تمام الساعة 9 مساءً واستغرق التوصيل أكثر من 50 دقيقة للوصول إلى فرع العليا. الدجاج كان مقرمشاً ولكن باردًا.' : s.id === 'sub-sugg-1' && lang === 'ar' ? 'سيكون من الرائع جداً لو قام مستر بروستد بتقديم خيارات دجاج صحية ومطهوة بالقلاية الهوائية بدون زيت، أو صلصة ثومية قليلة الدسم لمحبين وعشاق الأكل الصحي!' : s.details;

                      return (
                        <div
                          key={s.id}
                          id={`cms-message-card-${s.id}`}
                          className={`bg-white dark:bg-zinc-950 border rounded-2xl p-6 shadow-sm transition-all ${
                            s.status === 'resolved' 
                              ? 'border-green-300 dark:border-green-905 bg-green-50/5 dark:bg-green-950/5' 
                              : 'border-zinc-200 dark:border-zinc-850'
                          }`}
                        >
                          {/* Top Tag Header Area to guarantee NO overlapping on text */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-900 pb-3 mb-4">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                s.type === 'complaint' 
                                  ? 'bg-red-100 text-red-700 dark:bg-red-950/45 dark:text-red-400' 
                                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950/45 dark:text-amber-400'
                              }`}>
                                {s.type === 'complaint' 
                                  ? (lang === 'ar' ? 'شكوى ⚠️' : 'complaint ⚠️') 
                                  : (lang === 'ar' ? 'اقتراح ✨' : 'suggestion ✨')}
                              </span>
                              
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                s.status === 'resolved' 
                                  ? 'bg-green-100 text-green-700 dark:bg-green-950/45 dark:text-green-400' 
                                  : 'bg-zinc-100 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400'
                              }`}>
                                {s.status === 'resolved' 
                                  ? (lang === 'ar' ? 'محلولة ✓' : 'resolved ✓') 
                                  : (lang === 'ar' ? 'قيد المتابعة' : 'pending')}
                              </span>
                            </div>

                            <span className="text-xs text-zinc-400 font-bold">
                              {lang === 'ar' ? 'التاريخ: ' : 'Date: '} 
                              {s.date}
                            </span>
                          </div>

                          {/* Title Subject & Customer Contact details */}
                          <div className="space-y-2">
                            <h4 className="text-base font-extrabold text-zinc-900 dark:text-white">
                              {displaySubject}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-4 text-xs text-zinc-400 font-bold">
                              <span>
                                {lang === 'ar' ? 'المرسل: ' : 'By: '} 
                                <strong className="text-zinc-600 dark:text-zinc-300">{displayName}</strong>
                              </span>
                              <span>
                                {lang === 'ar' ? 'الهاتف: ' : 'Phone: '} 
                                <a href={`tel:${s.phoneNumber}`} className="text-red-500 hover:underline">{s.phoneNumber}</a>
                              </span>
                            </div>
                          </div>

                          {/* Details review content core text */}
                          <p className="mt-4 text-sm font-semibold text-zinc-700 dark:text-zinc-350 leading-relaxed bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl border border-zinc-100 dark:border-zinc-850">
                            {displayDetails}
                          </p>

                          {/* Action buttons triggers */}
                          <div className="mt-4 flex items-center justify-end space-x-2 rtl:space-x-reverse pt-4 border-t border-zinc-100 dark:border-zinc-900">
                            <button
                              onClick={() => handleToggleResolveMessage(s.id)}
                              id={`cms-toggle-resolve-${s.id}`}
                              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer border ${
                                s.status === 'resolved'
                                  ? 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-zinc-250 dark:border-zinc-700 shadow-sm'
                                  : 'bg-green-600 hover:bg-green-700 text-white border-green-650 shadow-md shadow-green-600/10'
                              }`}
                            >
                              {s.status === 'resolved' 
                                ? (lang === 'ar' ? 'تمييز كغير محلول ➕' : 'Mark as Unresolved ➕') 
                                : (lang === 'ar' ? 'تمييز كمحلول ✓' : 'Mark as Resolved ✓')}
                            </button>

                            <button
                              onClick={() => handleDeleteMessage(s.id)}
                              id={`cms-delete-message-${s.id}`}
                              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-500 text-xs font-bold uppercase cursor-pointer"
                            >
                              {lang === 'ar' ? 'حذف البلاغ' : 'Delete Report'}
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* REVIEWS TESTIMONIALS MANAGER VIEW */}
            {activeTab === 'reviews' && (
              <div className="space-y-6" id="reviews-cms-control">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3">
                  <div>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                      {lang === 'ar' ? 'إدارة آراء وتقييمات العملاء' : 'Customer Reviews & Testimonials'}
                    </h3>
                    <p className="text-xs text-zinc-500 font-bold mt-1">
                      {lang === 'ar' 
                        ? 'أضف، عدل، أو احذف آراء العملاء المعروضة بمنتصف الصفحة الرئيسية للموقع.'
                        : 'Manage customer experiences shown in the center of the landing page.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (showReviewForm) {
                        setEditingReviewId(null);
                        setReviewForm({
                          nameEn: '', nameAr: '', roleEn: '', roleAr: '',
                          rating: 5, commentEn: '', commentAr: '', avatar: ''
                        });
                        setShowReviewForm(false);
                      } else {
                        setShowReviewForm(true);
                      }
                    }}
                    id="toggle-add-review-btn"
                    className="px-4 py-2.5 rounded-xl bg-red-650 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer self-start sm:self-center"
                  >
                    {showReviewForm ? (
                      <>
                        <X className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'إغلاق النموذج' : 'Close Form'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'إضافة رأي جديد' : 'Add New Review'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Adding/Editing Review Form Section */}
                {showReviewForm && (
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm animate-fade-in" id="add-edit-review-form">
                    <h4 className="text-sm font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-1.5 pb-2 border-b border-zinc-200/50 dark:border-zinc-800/50">
                      <Edit2 className="w-4 h-4 text-red-500" />
                      {editingReviewId 
                        ? (lang === 'ar' ? 'تعديل التقييم المحدد' : 'Edit Selected Review') 
                        : (lang === 'ar' ? 'إضافة رأي عميل جديد' : 'Create New Customer Review')}
                    </h4>

                    <form onSubmit={handleSaveReview} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name Input Ar */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 block">
                            {lang === 'ar' ? 'الاسم بالكامل (بالعربية) *' : 'Full Name (Arabic) *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={reviewForm.nameAr}
                            onChange={(e) => setReviewForm({ ...reviewForm, nameAr: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                            placeholder="مثال: صالح العنزي"
                          />
                        </div>

                        {/* Name Input En */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 block">
                            {lang === 'ar' ? 'الاسم بالكامل (بالإنجليزية) *' : 'Full Name (English) *'}
                          </label>
                          <input
                            type="text"
                            required
                            value={reviewForm.nameEn}
                            onChange={(e) => setReviewForm({ ...reviewForm, nameEn: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                            placeholder="e.g. Saleh Al-Anazi"
                          />
                        </div>

                        {/* Role Input Ar */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 block">
                            {lang === 'ar' ? 'الوصف المهني / الصفة (بالعربية)' : 'Role / Title (Arabic)'}
                          </label>
                          <input
                            type="text"
                            value={reviewForm.roleAr}
                            onChange={(e) => setReviewForm({ ...reviewForm, roleAr: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                            placeholder="مثال: عميل دائم أو ذواق طعام"
                          />
                        </div>

                        {/* Role Input En */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 block">
                            {lang === 'ar' ? 'الوصف المهني / الصفة (بالإنجليزية)' : 'Role / Title (English)'}
                          </label>
                          <input
                            type="text"
                            value={reviewForm.roleEn}
                            onChange={(e) => setReviewForm({ ...reviewForm, roleEn: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                            placeholder="e.g. Regular Customer"
                          />
                        </div>

                        {/* Rating Selection */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 block">
                            {lang === 'ar' ? 'التقييم بالنجوم' : 'Rating Stars scale'}
                          </label>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse h-10">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  reviewForm.rating >= star 
                                    ? 'text-amber-500 hover:text-amber-600 bg-amber-50 dark:bg-amber-950/25' 
                                    : 'text-zinc-350 hover:text-zinc-450'
                                }`}
                              >
                                <Star className="w-6 h-6 fill-current" />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Avatar Picker / URL input */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 block">
                            {lang === 'ar' ? 'رابط الصورة الرمزية (الافتتاحية)' : 'Avatar Photo URL'}
                          </label>
                          <input
                            type="text"
                            value={reviewForm.avatar}
                            onChange={(e) => setReviewForm({ ...reviewForm, avatar: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                            placeholder="https://images.unsplash.com/..."
                          />
                          {/* Avatar Presets */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            <span className="text-[10px] text-zinc-400 font-extrabold flex items-center pr-1">
                              {lang === 'ar' ? 'قوالب سريعة: ' : 'Quick Presets: '}
                            </span>
                            <button
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150' })}
                              className="text-[10px] font-bold px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                            >
                              👨‍💼 {lang === 'ar' ? 'رجل 1' : 'Man 1'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' })}
                              className="text-[10px] font-bold px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                            >
                              👨 {lang === 'ar' ? 'رجل 2' : 'Man 2'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' })}
                              className="text-[10px] font-bold px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                            >
                              👩‍💼 {lang === 'ar' ? 'امرأة 1' : 'Woman 1'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' })}
                              className="text-[10px] font-bold px-2 py-0.5 bg-zinc-200 dark:bg-zinc-800 rounded hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                            >
                              👦 {lang === 'ar' ? 'رجل 3' : 'Man 3'}
                            </button>
                          </div>
                        </div>

                        {/* Comment Ar Input */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 block">
                            {lang === 'ar' ? 'التعليق المكتوب (بالعربية) *' : 'Comment/Opinion Text (Arabic) *'}
                          </label>
                          <textarea
                            required
                            rows={3}
                            value={reviewForm.commentAr}
                            onChange={(e) => setReviewForm({ ...reviewForm, commentAr: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                            placeholder="مثال: أفضل مطعم بروستد جربته بالرياض..."
                          />
                        </div>

                        {/* Comment En Input */}
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-xs font-black text-zinc-500 dark:text-zinc-400 block">
                            {lang === 'ar' ? 'التعليق المكتوب (بالإنجليزية) *' : 'Comment/Opinion Text (English) *'}
                          </label>
                          <textarea
                            required
                            rows={3}
                            value={reviewForm.commentEn}
                            onChange={(e) => setReviewForm({ ...reviewForm, commentEn: e.target.value })}
                            className="w-full px-3 py-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-xl text-sm font-bold text-zinc-900 dark:text-white"
                            placeholder="e.g. Best broast chicken joint in Riyadh..."
                          />
                        </div>

                      </div>

                      {/* Action buttons triggers */}
                      <div className="flex justify-end gap-2.5 pt-3 border-t border-zinc-200/50 dark:border-zinc-805/50">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingReviewId(null);
                            setReviewForm({
                              nameEn: '', nameAr: '', roleEn: '', roleAr: '',
                              rating: 5, commentEn: '', commentAr: '', avatar: ''
                            });
                            setShowReviewForm(false);
                          }}
                          className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-700 bg-zinc-200/50 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl cursor-pointer"
                        >
                          {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-black uppercase tracking-wider text-white bg-green-650 hover:bg-green-700 rounded-xl shadow-md cursor-pointer"
                        >
                          {editingReviewId 
                            ? (lang === 'ar' ? 'حفظ التحديثات ✓' : 'Save Updates ✓') 
                            : (lang === 'ar' ? 'إضافة التقييم الآن ✨' : 'Add Post Now ✨')}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Reviews List Cards display Grid */}
                {reviews.length === 0 ? (
                  <div className="bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-850 rounded-3xl p-12 text-center max-w-sm mx-auto">
                    <Star className="w-12 h-12 text-zinc-400 mx-auto mb-4 animate-bounce" />
                    <h4 className="text-base font-black text-zinc-800 dark:text-white">
                      {lang === 'ar' ? 'لا توجد آراء عملاء معروضة!' : 'No reviews active!'}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1">
                      {lang === 'ar' ? 'قم بإضافة آراء جديدة للعملاء ليتم عرضها في الصفحة الرئيسية مباشرة.' : 'Create customer reviews to highlight satisfaction on your homepage.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="cms-reviews-cards-list">
                    {reviews.map((r) => (
                      <div
                        key={r.id}
                        className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          {/* Upper row: Avatar, Info, Stars */}
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 shadow-sm shrink-0">
                              <img
                                src={r.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'}
                                alt={r.nameEn}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm font-black text-zinc-900 dark:text-white truncate">
                                {r.nameAr} <span className="text-xs font-medium text-zinc-450">({r.nameEn})</span>
                              </h4>
                              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-bold truncate">
                                {r.roleAr || 'عميل'} <span className="text-[10px] font-medium text-zinc-400">({r.roleEn || 'Client'})</span>
                              </p>
                              <div className="flex items-center text-amber-500 space-x-0.5 rtl:space-x-reverse mt-1">
                                {Array.from({ length: r.rating }).map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-current" />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Middle row: Comments block */}
                          <div className="mt-4 space-y-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-900 p-3.5 rounded-xl border border-zinc-150 dark:border-zinc-850">
                            <p className="leading-relaxed border-b border-zinc-200/40 dark:border-zinc-800/40 pb-2">
                              🇸🇦 {r.commentAr}
                            </p>
                            <p className="leading-relaxed pt-1 italic text-zinc-500">
                              🇬🇧 "{r.commentEn}"
                            </p>
                          </div>
                        </div>

                        {/* Bottom row: Edit, delete tools */}
                        <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-900 flex justify-end gap-2">
                          {deletingReviewId === r.id ? (
                            <div className="flex items-center gap-2 animate-pulse">
                              <span className="text-[10px] text-red-500 font-extrabold">{lang === 'ar' ? 'هل أنت متأكد؟' : 'Sure?'}</span>
                              <button
                                onClick={() => handleDeleteReview(r.id)}
                                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-black cursor-pointer"
                              >
                                {lang === 'ar' ? 'نعم، احذف' : 'Yes, Delete'}
                              </button>
                              <button
                                onClick={() => setDeletingReviewId(null)}
                                className="px-2.5 py-1 bg-zinc-200 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 rounded-lg text-[10px] font-black cursor-pointer"
                              >
                                {lang === 'ar' ? 'تراجع' : 'No'}
                              </button>
                            </div>
                          ) : (
                            <>
                              <button
                                onClick={() => handleStartEditReview(r)}
                                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-805 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-bold leading-none flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>{lang === 'ar' ? 'تعديل' : 'Edit'}</span>
                              </button>

                              <button
                                onClick={() => setDeletingReviewId(r.id)}
                                className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/20 text-red-500 text-xs font-bold leading-none flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>{lang === 'ar' ? 'حذف' : 'Delete'}</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </main>

        </div>

      </div>
    </section>
  );
}
