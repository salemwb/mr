import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, MapPin, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { CartItem, Branch, Language } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  cartItems: CartItem[];
  onUpdateQty: (pId: string, diff: number) => void;
  onRemoveItem: (pId: string) => void;
  branches: Branch[];
  toast: (msg: string, type: 'success' | 'error') => void;
  selectedBranchId: string;
  setSelectedBranchId: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  lang,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  branches,
  toast,
  selectedBranchId,
  setSelectedBranchId
}: CartDrawerProps) {
  const [customerName, setCustomerName] = useState('');

  if (!isOpen) return null;

  // Compute Prices
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const vatRate = 0.15; // 15% Standard VAT
  const vatAmount = subtotal * vatRate;
  const totalAmount = subtotal + vatAmount;

  // Selected Branch details
  const selectedBranch = branches.find(b => b.id === selectedBranchId) || branches[0];

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast(lang === 'ar' ? 'السلة فارغة. يرجى إضافة وجبات أولاً!' : 'Cart is empty. Please select some delicious meals first!', 'error');
      return;
    }

    if (!selectedBranch) {
      toast(lang === 'ar' ? 'الرجاء اختيار الفرع الأقرب إليك' : 'Please select your preferred branch location', 'error');
      return;
    }

    // Format Whatsapp messaging string according to user specification
    const restaurantName = lang === 'ar' ? 'مستر بروستد' : 'Mr. Broast';
    const branchName = lang === 'ar' ? selectedBranch.nameAr : selectedBranch.nameEn;
    const nameLine = customerName.trim() ? `${lang === 'ar' ? 'اسم العميل' : 'Customer Name'}: ${customerName.trim()}` : '';

    let itemsDetails = '';
    cartItems.forEach((item) => {
      const pName = lang === 'ar' ? item.product.nameAr : item.product.nameEn;
      const priceCalc = (item.product.price * item.quantity).toFixed(2);
      itemsDetails += `• ${pName} x ${item.quantity} = ${priceCalc} SR\n`;
    });

    const arabicMsg = `*مطعم*: مستر بروستد ${restaurantName}\n\n*الفرع المختار*:\n[ ${branchName} ]\n\n*تفاصيل الطلب*:\n${itemsDetails}\n*المجموع الفرعي*: ${subtotal.toFixed(2)} SR\n*الضريبة (15%)*: ${vatAmount.toFixed(2)} SR\n*المجموع الإجمالي*: ${totalAmount.toFixed(2)} SR\n\n${nameLine}\n\nشكراً لكم.`;
    const englishMsg = `*Restaurant*: Mr. Broast ${restaurantName}\n\n*Selected Branch*:\n[ ${branchName} ]\n\n*Order Details*:\n${itemsDetails}\n*Subtotal*: ${subtotal.toFixed(2)} SR\n*VAT (15%)*: ${vatAmount.toFixed(2)} SR\n*Total Amount*: ${totalAmount.toFixed(2)} SR\n\n${nameLine}\n\nThank you.`;

    const finalMsg = lang === 'ar' ? arabicMsg : englishMsg;

    // Direct country code replacement URL encoding
    const waNumber = selectedBranch.whatsappNumber.replace('+', '');
    const encodedText = encodeURIComponent(finalMsg);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

    // Elegant redirect popup safeguard or iframe link trigger
    toast(lang === 'ar' ? 'جاري تحويلك وإصدار طلب الواتساب...' : 'Redirecting to WhatsApp for delivery confirmation...', 'success');
    
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-overlay">
      {/* Darkened backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
      />

      {/* sliding panel */}
      <div className={`absolute top-0 bottom-0 max-w-md w-full bg-white dark:bg-zinc-950 shadow-2xl flex flex-col transition-transform duration-300 ${
        lang === 'ar' ? 'left-0 border-r border-zinc-100 dark:border-zinc-900' : 'right-0 border-l border-zinc-100 dark:border-zinc-900'
      }`}>
        
        {/* Drawer Header */}
        <div className="h-20 px-6 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-black text-zinc-900 dark:text-white">
              {lang === 'ar' ? 'سلة الطلبات' : 'Your Shopping Cart'}
            </h2>
            <span className="bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-black px-2.5 py-0.5 rounded-full">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            id="close-cart-drawer"
            className="p-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850 text-zinc-500 hover:text-zinc-750 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Cart Items Container */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6" id="cart-drawer-items-list">
          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12" id="cart-empty-box">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center animate-pulse">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-black text-zinc-800 dark:text-white">
                  {lang === 'ar' ? 'سلتك فارغة تماماً' : 'Your Cart is Empty'}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium max-w-[240px]">
                  {lang === 'ar' 
                    ? 'اذهب إلى قائمة المأكولات وأضف بعض قطع البروست المقرمشة الذهبية!' 
                    : 'Browse our signature categories and load up on golden chicken, wraps, or french fries!'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-black text-xs tracking-wider uppercase cursor-pointer"
              >
                {lang === 'ar' ? 'تصفح القائمة الآن' : 'Start Browsing'}
              </button>
            </div>
          ) : (
            /* Cart Items loop */
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  id={`cart-item-${item.product.id}`}
                  className="flex items-center space-x-3.5 pb-4 border-b border-zinc-100 dark:border-zinc-900"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-zinc-100 border border-zinc-100 dark:border-zinc-905"
                  />

                  {/* Text Details */}
                  <div className="flex-grow min-w-0 pr-2">
                    <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white truncate">
                      {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                    </h4>
                    <span className="text-xs font-black text-red-500 block mt-0.5">
                      {item.product.price.toFixed(2)} SR
                    </span>
                    
                    {/* Quantity Adjustment buttons */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => onUpdateQty(item.product.id, -1)}
                        id={`qty-decrease-${item.product.id}`}
                        className="p-1 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-black text-xs text-zinc-805 dark:text-white w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, 1)}
                        id={`qty-increase-${item.product.id}`}
                        className="p-1 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    id={`cart-item-remove-${item.product.id}`}
                    className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ordering metadata form & Sticky footer summary (If cart contains items) */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-zinc-150 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950/50 space-y-4">
            
            {/* Input Name field */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-505 uppercase tracking-wider block">
                {lang === 'ar' ? 'الاسم الكامل للعميل (اختياري)' : 'Customer Full Name (Optional)'}
              </label>
              <div className="relative flex items-center">
                <User className="absolute left-3 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder={lang === 'ar' ? 'يرجى كتابة اسمك' : 'e.g. Abdullah S.'}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Select Nearest physical branch */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-505 uppercase tracking-wider block">
                {lang === 'ar' ? 'حدد الفرع المستلم أو المرسل للطلب *' : 'Select Fulfilling Branch *'}
              </label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 w-3.5 h-3.5 text-red-500" />
                <select
                  required
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-black text-zinc-750 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>
                      {lang === 'ar' ? b.nameAr : b.nameEn}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium px-1">
                {lang === 'ar' 
                  ? `سيتم إرسال طلبك مباشرة على واتساب هذا الفرع: ${selectedBranch?.whatsappNumber}` 
                  : `Your draft message routes straight to: ${selectedBranch?.whatsappNumber}`}
              </p>
            </div>

            {/* Financial Invoice Breakdown */}
            <div className="space-y-2 pt-3 border-t border-zinc-200 dark:border-zinc-900 text-xs text-zinc-600 dark:text-zinc-400 font-bold">
              <div className="flex items-center justify-between">
                <span>{lang === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
                <span className="font-mono">{subtotal.toFixed(2)} SR</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-zinc-500">
                <span>{lang === 'ar' ? 'الضريبة المضافة (١٥٪)' : 'VAT Standard (15%)'}</span>
                <span className="font-mono">{vatAmount.toFixed(2)} SR</span>
              </div>
              <div className="flex items-center justify-between text-sm text-zinc-900 dark:text-white font-extrabold pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                <span>{lang === 'ar' ? 'المجموع الإجمالي' : 'Total Amount'}</span>
                <span className="font-mono text-lg text-red-500">{totalAmount.toFixed(2)} SR</span>
              </div>
            </div>

            {/* Complete Checkout with WhatsApp redirect */}
            <button
              onClick={handleCheckout}
              id="complete-order-checkout"
              className="w-full py-4 rounded-xl bg-red-500 hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-950 text-white font-black text-sm tracking-wider uppercase shadow-xl shadow-red-500/10 cursor-pointer flex items-center justify-center space-x-2 animate-bounce"
            >
              <Send className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إرسال الطلب عبر الواتساب' : 'Complete Whatsapp Order'}</span>
              {lang === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
