// Mr. Broast Menu App Javascript Logic
document.addEventListener("DOMContentLoaded", () => {
    
    // Branches Configuration
    const BRANCHES = [
        {
            id: "ranona",
            nameAr: "فرع الرانوناء",
            nameEn: "Al-Ranona Branch",
            phone: "966554892727",
            displayPhone: "0554892727"
        },
        {
            id: "raya",
            nameAr: "فرع حي الراية",
            nameEn: "Al-Raya Branch",
            phone: "966554892626",
            displayPhone: "0554892626"
        },
        {
            id: "haritha",
            nameAr: "فرع حي بني حارثة (الكويتيه)",
            nameEn: "Bani Haritha Branch",
            phone: "966554892026",
            displayPhone: "0554892026"
        }
    ];

    const COMPLAINTS_WA = "966533485718";

    // Categories
    const CATEGORIES = [
        { id: "broast", icon: "🍗", ar: "البروست", en: "Broast" },
        { id: "musahhab", icon: "🍖", ar: "المسحب والاستربس", en: "Musahhab & Strips" },
        { id: "burger", icon: "🍔", ar: "البرجر", en: "Burgers" },
        { id: "shrimp", icon: "🍤", ar: "الجمبري", en: "Shrimp" },
        { id: "meals", icon: "🍱", ar: "الوجبات الاقتصادية والأطفال", en: "Combo & Kids Meals" },
        { id: "potatoes", icon: "🍟", ar: "البطاطس", en: "Potatoes" },
        { id: "appetizers", icon: "🥗", ar: "المقبلات والخبز", en: "Appetizers & Bread" },
        { id: "drinks", icon: "🥤", ar: "المشروبات", en: "Drinks" },
        { id: "addons", icon: "🧄", ar: "الإضافات والصوصات", en: "Sauces & Extras" }
    ];

    // Menu Items
    const MENU_ITEMS = [
        // Broast Category
        {
            id: "b1",
            category: "broast",
            nameAr: "ربع بروست (صدر)",
            nameEn: "Quarter Broast (Breast)",
            price: 11,
            cal: 220,
            descAr: "قطعتين دجاج بروستد طازج (صدر) مع بطاطس، ثوم وخبز",
            descEn: "2 pieces of fresh broasted chicken (breast) with fries, garlic sauce, and bun",
            emoji: "🍗",
            hasSpicy: true,
            hasThighBreast: false
        },
        {
            id: "b2",
            category: "broast",
            nameAr: "ربع بروست (فخذ)",
            nameEn: "Quarter Broast (Thigh)",
            price: 10,
            cal: 200,
            descAr: "قطعتين دجاج بروستد طازج (فخذ) مع بطاطس، ثوم وخبز",
            descEn: "2 pieces of fresh broasted chicken (thigh) with fries, garlic sauce, and bun",
            emoji: "🍗",
            hasSpicy: true,
            hasThighBreast: false
        },
        {
            id: "b3",
            category: "broast",
            nameAr: "نصف بروست (٤ قطع)",
            nameEn: "Half Broast (4 Pieces)",
            price: 19,
            cal: 694,
            descAr: "٤ قطع دجاج بروستد طازج ومقرمش مع بطاطس، ثوم وخبز",
            descEn: "4 pieces of fresh crispy broasted chicken with fries, garlic sauce, and bun",
            emoji: "🍗",
            hasSpicy: true,
            hasThighBreast: false
        },
        {
            id: "b4",
            category: "broast",
            nameAr: "حبة بروست (٨ قطع)",
            nameEn: "Whole Broast (8 Pieces)",
            price: 38,
            cal: 1388,
            descAr: "٨ قطع دجاج بروستد طازج ومقرمش مع بطاطس، ثوم وخبز",
            descEn: "8 pieces of fresh crispy broasted chicken with fries, garlic sauce, and bun",
            emoji: "🍗",
            hasSpicy: true,
            hasThighBreast: false
        },
        // Musahhab & Strips
        {
            id: "m1",
            category: "musahhab",
            nameAr: "مسحب ٥ قطع",
            nameEn: "Chicken Musahhab (5 Pieces)",
            price: 12,
            cal: 362,
            descAr: "٥ قطع من صدور الدجاج المسحبة المقرمشة مع البطاطس والثوم والخبز",
            descEn: "5 pieces of crispy boneless chicken breast with fries, garlic sauce, and bun",
            emoji: "🍖",
            hasSpicy: true
        },
        {
            id: "m2",
            category: "musahhab",
            nameAr: "مسحب ١٠ قطع",
            nameEn: "Chicken Musahhab (10 Pieces)",
            price: 17,
            cal: 583,
            descAr: "١٠ قطع من صدور الدجاج المسحبة المقرمشة مع البطاطس والثوم والخبز",
            descEn: "10 pieces of crispy boneless chicken breast with fries, garlic sauce, and bun",
            emoji: "🍖",
            hasSpicy: true
        },
        {
            id: "m3",
            category: "musahhab",
            nameAr: "استربس ٥ قطع",
            nameEn: "Chicken Strips (5 Pieces)",
            price: 15,
            cal: 229,
            descAr: "٥ قطع أصابع دجاج استربس مقلية ومقرمشة مع البطاطس والثوم والخبز",
            descEn: "5 pieces of crispy fried chicken tenders with fries, garlic sauce, and bun",
            emoji: "🍗",
            hasSpicy: true
        },
        {
            id: "m4",
            category: "musahhab",
            nameAr: "نقيت ١٠ قطع",
            nameEn: "Chicken Nuggets (10 Pieces)",
            price: 17,
            cal: 463,
            descAr: "١٠ قطع ناجتس دجاج ذهبية مقرمشة تقدم مع البطاطس والصلصة",
            descEn: "10 pieces of golden crispy chicken nuggets served with fries and sauce",
            emoji: "🍘",
            hasSpicy: true
        },
        // Burgers
        {
            id: "bu1",
            category: "burger",
            nameAr: "زنجر دبل برجر",
            nameEn: "Zinger Double Burger",
            price: 15,
            cal: 842,
            descAr: "شريحتين من صدر الدجاج المقرمش الحار مع الخس والجبنة في خبز البرجر",
            descEn: "Two crispy spicy chicken breast fillets with lettuce and cheese in a bun",
            emoji: "🍔",
            hasSpicy: true
        },
        {
            id: "bu2",
            category: "burger",
            nameAr: "زنجر برجر",
            nameEn: "Zinger Burger",
            price: 10,
            cal: 463,
            descAr: "شريحة صدر دجاج مقرمشة مع الخس والصلصة اللذيذة",
            descEn: "Crispy chicken breast fillet with lettuce and delicious burger sauce",
            emoji: "🍔",
            hasSpicy: true
        },
        {
            id: "bu3",
            category: "burger",
            nameAr: "برجر مسحب",
            nameEn: "Musahhab Burger",
            price: 9,
            cal: 541,
            descAr: "قطع مسحب دجاج مقرمش مع الجبن والخس والصلصة الخاصة",
            descEn: "Crispy chicken musahhab pieces with cheese, lettuce, and special sauce",
            emoji: "🍔",
            hasSpicy: true
        },
        {
            id: "bu4",
            category: "burger",
            nameAr: "وجبة زنجر",
            nameEn: "Zinger Burger Meal",
            price: 15,
            cal: 661,
            descAr: "ساندوتش برجر زنجر مقرمش يقدم مع البطاطس المقلية والمشروب",
            descEn: "Crispy zinger burger sandwich served with french fries and a drink",
            emoji: "🍔",
            hasSpicy: true
        },
        // Shrimps
        {
            id: "s1",
            category: "shrimp",
            nameAr: "جمبري ٦ قطع",
            nameEn: "Fried Shrimp (6 Pieces)",
            price: 15,
            cal: 304,
            descAr: "٦ قطع جمبري جامبو مقلي ومقرمش يقدم مع البطاطس وصلصة الكوكتيل",
            descEn: "6 pieces of crispy fried jumbo shrimp served with fries and cocktail sauce",
            emoji: "🍤",
            hasSpicy: true
        },
        {
            id: "s2",
            category: "shrimp",
            nameAr: "جمبري ١٠ قطع",
            nameEn: "Fried Shrimp (10 Pieces)",
            price: 22,
            cal: 502,
            descAr: "١٠ قطع جمبري جامبو مقلي ومقرمش يقدم مع البطاطس وصلصة الكوكتيل",
            descEn: "10 pieces of crispy fried jumbo shrimp served with fries and cocktail sauce",
            emoji: "🍤",
            hasSpicy: true
        },
        // Combo & Kids Meals
        {
            id: "me1",
            category: "meals",
            nameAr: "الوجبة الاقتصادية",
            nameEn: "Economic Combo Meal",
            price: 20,
            cal: 1065,
            descAr: "وجبة مشبعة تحتوي على ربع بروست + برجر زنجر + عصير توت",
            descEn: "Filling combo meal with 1/4 broast + zinger burger + berry juice",
            emoji: "🍱"
        },
        {
            id: "me2",
            category: "meals",
            nameAr: "وجبة الأطفال (توني جت)",
            nameEn: "Kids Meal (Tony Jet)",
            price: 12,
            cal: 323,
            descAr: "٤ قطع ناجتس دجاج مقرمشة مع البطاطس، عصير ولعبة أطفال لطيفة",
            descEn: "4 pieces of crispy chicken nuggets with fries, juice, and a fun kids toy",
            emoji: "👶"
        },
        // Potatoes
        {
            id: "p1",
            category: "potatoes",
            nameAr: "تشكن فرايز",
            nameEn: "Chicken Fries",
            price: 18,
            cal: 220,
            descAr: "بطاطس مقلية ذهبية مغطاة بقطع الدجاج المقرمشة وصلصة الجبن الغنية",
            descEn: "Golden french fries topped with crispy chicken chunks and rich cheese sauce",
            emoji: "🍟"
        },
        {
            id: "p2",
            category: "potatoes",
            nameAr: "بطاطس كبير",
            nameEn: "Fries (Large)",
            price: 10,
            cal: 484,
            descAr: "بطاطس مقلية مقرمشة بحجم كبير متبلة ببهاراتنا الخاصة",
            descEn: "Large portion of crispy golden fries seasoned with our special spices",
            emoji: "🍟"
        },
        {
            id: "p3",
            category: "potatoes",
            nameAr: "بطاطس صغير",
            nameEn: "Fries (Small)",
            price: 6,
            cal: 234,
            descAr: "بطاطس مقلية مقرمشة بحجم صغير ومملحة بعناية",
            descEn: "Small portion of crispy golden fries, salted to perfection",
            emoji: "🍟"
        },
        // Appetizers
        {
            id: "a1",
            category: "appetizers",
            nameAr: "سلطة ملفوف",
            nameEn: "Coleslaw Salad",
            price: 4,
            cal: 258,
            descAr: "سلطة الملفوف والجزر الطازجة بصلصتنا الكريمية الخاصة",
            descEn: "Fresh shredded cabbage and carrots in our signature sweet creamy dressing",
            emoji: "🥗"
        },
        {
            id: "a2",
            category: "appetizers",
            nameAr: "حمص",
            nameEn: "Hummus",
            price: 4,
            cal: 121,
            descAr: "حمص كريمي ناعم محضر على الطريقة التقليدية مع زيت زيتون",
            descEn: "Smooth creamy hummus prepared in traditional style with olive oil",
            emoji: "🫘"
        },
        {
            id: "a3",
            category: "appetizers",
            nameAr: "خبز صامولي (حبتين)",
            nameEn: "Samoli Bun (2 Pcs)",
            price: 1,
            cal: 102,
            descAr: "حبتين خبز صامولي طازج وساخن يخبز يومياً",
            descEn: "Two fresh warm Samoli buns baked daily",
            emoji: "🥖"
        },
        // Drinks
        {
            id: "d1",
            category: "drinks",
            nameAr: "عصير توت",
            nameEn: "Berry Juice (Sunquick)",
            price: 3,
            cal: 48,
            descAr: "عصير التوت البارد والمنعش الخاص بمستر بروست",
            descEn: "Cold and refreshing signature berry juice by Mr. Broast",
            emoji: "🫐"
        },
        {
            id: "d2",
            category: "drinks",
            nameAr: "بيبسي / بيبسي دايت",
            nameEn: "Pepsi / Diet Pepsi",
            price: 3,
            cal: 140,
            descAr: "مشروب غازي بارد ومنعش في عبوة معدنية",
            descEn: "Chilled and refreshing carbonated beverage in a can",
            emoji: "🥤"
        },
        {
            id: "d3",
            category: "drinks",
            nameAr: "مياه معدنية صغيرة",
            nameEn: "Mineral Water (Small)",
            price: 0.5,
            cal: 0,
            descAr: "مياه شرب نقية مبردة زجاجة صغيرة",
            descEn: "Pure bottled mineral water, chilled small size",
            emoji: "💧"
        },
        {
            id: "d4",
            category: "drinks",
            nameAr: "مياه معدنية كبيرة",
            nameEn: "Mineral Water (Large)",
            price: 1,
            cal: 0,
            descAr: "مياه شرب نقية مبردة زجاجة كبيرة",
            descEn: "Pure bottled mineral water, chilled large size",
            emoji: "💧"
        },
        // Addons
        {
            id: "ad1",
            category: "addons",
            nameAr: "ثوم بارد",
            nameEn: "Garlic Sauce (Regular)",
            price: 1,
            cal: 146,
            descAr: "صلصة الثوم الكريمية الشهيرة الخاصة بنا",
            descEn: "Our famous signature creamy garlic paste",
            emoji: "🧄"
        },
        {
            id: "ad2",
            category: "addons",
            nameAr: "ثوم حار",
            nameEn: "Garlic Sauce (Spicy)",
            price: 1,
            cal: 234,
            descAr: "صلصة ثوم كريمية ممزوجة بلمسة شطة حارة",
            descEn: "Creamy garlic paste blended with a kick of hot chili",
            emoji: "🌶️"
        },
        {
            id: "ad3",
            category: "addons",
            nameAr: "ثوم دبل حار",
            nameEn: "Garlic Sauce (Double Spicy)",
            price: 1,
            cal: 254,
            descAr: "صلصة ثوم حارة بنكهة قوية جداً لعشاق الفلفل",
            descEn: "Intense double spicy garlic paste for chili lovers",
            emoji: "🔥"
        },
        {
            id: "ad4",
            category: "addons",
            nameAr: "صلصة الجبن",
            nameEn: "Cheese Sauce",
            price: 2,
            cal: 187,
            descAr: "صلصة جبنة الشيدر السائلة والدافئة الغنية",
            descEn: "Warm, rich, and liquid cheddar cheese dipping sauce",
            emoji: "🧀"
        },
        {
            id: "ad5",
            category: "addons",
            nameAr: "صلصة باربيكيو",
            nameEn: "BBQ Sauce",
            price: 2,
            cal: 172,
            descAr: "صلصة الباربيكيو المدخنة ذات المذاق الحلو والعميق",
            descEn: "Smoky barbecue sauce with a sweet, deep flavor profile",
            emoji: "🫙"
        },
        {
            id: "ad6",
            category: "addons",
            nameAr: "خردل بالعسل",
            nameEn: "Honey Mustard Sauce",
            price: 2,
            cal: 107,
            descAr: "مزيج متناغم من الخردل والعسل الطبيعي والبهارات",
            descEn: "A harmonious blend of mustard, natural honey, and mild spices",
            emoji: "🌭"
        }
    ];

    // State Variables
    let currentLang = "ar"; // "ar" or "en"
    let selectedBranchIdx = 0;
    let cart = []; // Cart items: { key, id, nameAr, nameEn, price, qty, emoji }
    let activeCategory = "broast";

    // Modifiers options selection memory (to avoid resetting when adding items)
    // Key format: itemId -> { spicy: boolean, thighBreast: string }
    let cardCustomizations = {};

    // UI Cache Elements
    const htmlTag = document.documentElement;
    const langBtn = document.getElementById("lang-switch");
    const toast = document.getElementById("toast");
    const categoryTabsContainer = document.getElementById("category-tabs");
    const menuSectionsWrapper = document.getElementById("menu-sections-wrapper");
    
    // Cart Elements
    const cartToggleBtn = document.getElementById("cart-toggle-btn");
    const floatingCartBtn = document.getElementById("floating-cart-btn");
    const drawerBackdrop = document.getElementById("drawer-backdrop");
    const cartDrawer = document.getElementById("cart-drawer");
    const drawerCloseBtn = document.getElementById("drawer-close-btn");
    const drawerContent = document.getElementById("drawer-content");
    const drawerFooter = document.getElementById("drawer-footer");
    
    const cartBadgeNav = document.getElementById("cart-badge-nav");
    const cartBadgeFloat = document.getElementById("cart-badge-float");
    const cartCountDrawer = document.getElementById("cart-count-drawer");
    const cartBranchDisplay = document.getElementById("cart-branch-display");
    const cartTotalPrice = document.getElementById("cart-total-price");
    
    const clearCartBtn = document.getElementById("clear-cart-btn");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Form Elements
    const tabComplaintBtn = document.getElementById("tab-btn-complaint");
    const tabSuggestionBtn = document.getElementById("tab-btn-suggestion");
    const feedbackForm = document.getElementById("feedback-form");
    const fbName = document.getElementById("fb-name");
    const fbPhone = document.getElementById("fb-phone");
    const fbBranch = document.getElementById("fb-branch");
    const fbMessage = document.getElementById("fb-message");
    let currentFeedbackTab = "complaint"; // or "suggestion"

    // Toast Timer reference
    let toastTimer = null;

    // Toast Functionality
    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.add("show");
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    };

    // Toggle Language
    const toggleLanguage = () => {
        if (currentLang === "ar") {
            currentLang = "en";
            htmlTag.classList.add("lang-mode-en");
            htmlTag.setAttribute("dir", "ltr");
            htmlTag.setAttribute("lang", "en");
            langBtn.textContent = "🌐 العربية";
            showToast("Switched to English!");
        } else {
            currentLang = "ar";
            htmlTag.classList.remove("lang-mode-en");
            htmlTag.setAttribute("dir", "rtl");
            htmlTag.setAttribute("lang", "ar");
            langBtn.textContent = "🌐 English";
            showToast("تم التحويل للغة العربية!");
        }
        renderCategoryTabs();
        renderMenuCards();
        updateCartDisplay();
    };
    langBtn.addEventListener("click", toggleLanguage);

    // Initial branch selection setup
    const setupBranchSelector = () => {
        const branchBtns = document.querySelectorAll(".branch-btn");
        branchBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                branchBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                selectedBranchIdx = parseInt(btn.getAttribute("data-branch"));
                const activeBranch = BRANCHES[selectedBranchIdx];
                const msg = currentLang === "ar" 
                    ? `📍 تم اختيار: ${activeBranch.nameAr}`
                    : `📍 Selected: ${activeBranch.nameEn}`;
                showToast(msg);
                updateCartDisplay();
            });
        });
    };

    // Initialize Card Customization Memory
    const initCardCustomizations = () => {
        MENU_ITEMS.forEach(item => {
            cardCustomizations[item.id] = {
                spicy: item.hasSpicy ? false : null,
                thighBreast: item.hasThighBreast ? "thigh" : null
            };
        });
    };

    // Rendering sticky category tabs
    const renderCategoryTabs = () => {
        categoryTabsContainer.innerHTML = "";
        CATEGORIES.forEach(cat => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = `tab-btn ${activeCategory === cat.id ? "active" : ""}`;
            btn.innerHTML = `${cat.icon} <span class="lang-ar">${cat.ar}</span><span class="lang-en">${cat.en}</span>`;
            
            btn.addEventListener("click", () => {
                document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                activeCategory = cat.id;
                
                const section = document.getElementById(`cat-sec-${cat.id}`);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            });
            categoryTabsContainer.appendChild(btn);
        });
    };

    // Render Menu Cards by Category
    const renderMenuCards = () => {
        menuSectionsWrapper.innerHTML = "";

        CATEGORIES.forEach(category => {
            const items = MENU_ITEMS.filter(item => item.category === category.id);
            if (items.length === 0) return;

            // Section elements
            const section = document.createElement("section");
            section.id = `cat-sec-${category.id}`;
            section.className = "menu-section";

            // Title bar
            const titleBar = document.createElement("div");
            titleBar.className = "category-title-bar";
            titleBar.innerHTML = `
                <span>${category.icon} ${currentLang === "ar" ? category.ar : category.en}</span>
                <div class="line"></div>
            `;
            section.appendChild(titleBar);

            // Grid wrapper
            const grid = document.createElement("div");
            grid.className = "menu-grid";

            items.forEach(item => {
                const card = document.createElement("div");
                card.className = "menu-card animate-fade-up";

                // Image/Emoji area
                const cardImage = document.createElement("div");
                cardImage.className = "menu-card-image";
                cardImage.innerHTML = item.emoji;

                if (item.hasSpicy) {
                    const badge = document.createElement("div");
                    badge.className = "card-badge-spicy";
                    badge.textContent = currentLang === "ar" ? "عادي / حراق" : "Normal / Spicy";
                    cardImage.appendChild(badge);
                }

                if (item.cal > 0) {
                    const badgeCal = document.createElement("div");
                    badgeCal.className = "card-badge-cal";
                    badgeCal.textContent = `🔥 ${item.cal} ${currentLang === "ar" ? "سعرة" : "Cal"}`;
                    cardImage.appendChild(badgeCal);
                }
                card.appendChild(cardImage);

                // Info Area
                const cardInfo = document.createElement("div");
                cardInfo.className = "menu-card-info";
                cardInfo.innerHTML = `
                    <h3>${currentLang === "ar" ? item.nameAr : item.nameEn}</h3>
                    <p>${currentLang === "ar" ? item.descAr : item.descEn}</p>
                `;

                // Modifiers (Normal/Spicy or Thigh/Breast toggles)
                if (item.hasSpicy || item.hasThighBreast) {
                    const modContainer = document.createElement("div");
                    modContainer.className = "card-modifiers";

                    // Spicy Modifier
                    if (item.hasSpicy) {
                        const opt = cardCustomizations[item.id];
                        const row = document.createElement("div");
                        row.className = "modifier-row";
                        row.innerHTML = `
                            <span class="modifier-label">${currentLang === "ar" ? "النكهة:" : "Flavor:"}</span>
                            <div class="modifier-options">
                                <button type="button" class="mod-btn ${opt.spicy === false ? "active" : ""}" data-item="${item.id}" data-type="spicy" data-val="normal">${currentLang === "ar" ? "عادي" : "Normal"}</button>
                                <button type="button" class="mod-btn ${opt.spicy === true ? "active" : ""}" data-item="${item.id}" data-type="spicy" data-val="spicy">🌶️ ${currentLang === "ar" ? "حراق" : "Spicy"}</button>
                            </div>
                        `;
                        modContainer.appendChild(row);
                    }

                    // Thigh / Breast Modifier
                    if (item.hasThighBreast) {
                        const opt = cardCustomizations[item.id];
                        const row = document.createElement("div");
                        row.className = "modifier-row";
                        row.innerHTML = `
                            <span class="modifier-label">${currentLang === "ar" ? "القطعة:" : "Cut:"}</span>
                            <div class="modifier-options">
                                <button type="button" class="mod-btn ${opt.thighBreast === "thigh" ? "active" : ""}" data-item="${item.id}" data-type="thighBreast" data-val="thigh">${currentLang === "ar" ? "فخذ" : "Thigh"}</button>
                                <button type="button" class="mod-btn ${opt.thighBreast === "breast" ? "active" : ""}" data-item="${item.id}" data-type="thighBreast" data-val="breast">${currentLang === "ar" ? "صدر" : "Breast"}</button>
                            </div>
                        `;
                        modContainer.appendChild(row);
                    }

                    cardInfo.appendChild(modContainer);
                }

                // Price and Add button area
                const cardFooter = document.createElement("div");
                cardFooter.className = "menu-card-footer";
                cardFooter.innerHTML = `
                    <div class="card-price">
                        ${item.price.toFixed(1)} <small>${currentLang === "ar" ? "ر.س" : "SR"}</small>
                    </div>
                `;

                const addBtn = document.createElement("button");
                addBtn.type = "button";
                addBtn.className = "btn btn-primary";
                addBtn.innerHTML = `🛒 <span class="lang-ar">أضف للسلة</span><span class="lang-en">Add to Cart</span>`;
                addBtn.addEventListener("click", () => addToCart(item));

                cardFooter.appendChild(addBtn);
                cardInfo.appendChild(cardFooter);
                card.appendChild(cardInfo);
                grid.appendChild(card);
            });

            section.appendChild(grid);
            menuSectionsWrapper.appendChild(section);
        });

        // Add event listener to dynamically created modifier buttons
        document.querySelectorAll(".mod-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const itemId = btn.getAttribute("data-item");
                const type = btn.getAttribute("data-type");
                const val = btn.getAttribute("data-val");

                if (type === "spicy") {
                    cardCustomizations[itemId].spicy = (val === "spicy");
                } else if (type === "thighBreast") {
                    cardCustomizations[itemId].thighBreast = val;
                }

                // Render again to reflect active states
                renderMenuCards();
            });
        });
    };

    // Add Item to Shopping Cart
    const addToCart = (item) => {
        const custom = cardCustomizations[item.id] || {};
        
        let tagsAr = [];
        let tagsEn = [];

        if (custom.spicy !== null && custom.spicy !== undefined) {
            tagsAr.push(custom.spicy ? "حراق" : "عادي");
            tagsEn.push(custom.spicy ? "Spicy" : "Normal");
        }
        if (custom.thighBreast !== null && custom.thighBreast !== undefined) {
            tagsAr.push(custom.thighBreast === "breast" ? "صدر" : "فخذ");
            tagsEn.push(custom.thighBreast === "breast" ? "Breast" : "Thigh");
        }

        const suffixAr = tagsAr.length > 0 ? ` (${tagsAr.join(" - ")})` : "";
        const suffixEn = tagsEn.length > 0 ? ` (${tagsEn.join(" - ")})` : "";

        const finalNameAr = `${item.nameAr}${suffixAr}`;
        const finalNameEn = `${item.nameEn}${suffixEn}`;
        const cartKey = `${item.id}-${custom.spicy}-${custom.thighBreast}`;

        const existing = cart.find(i => i.key === cartKey);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({
                key: cartKey,
                id: item.id,
                nameAr: finalNameAr,
                nameEn: finalNameEn,
                price: item.price,
                qty: 1,
                emoji: item.emoji
            });
        }

        const toastMsg = currentLang === "ar"
            ? `✅ تمت إضافة: ${finalNameAr}`
            : `✅ Added: ${finalNameEn}`;
        showToast(toastMsg);
        updateCartDisplay();
    };

    // Modify quantity of item inside drawer
    const changeItemQty = (key, delta) => {
        const item = cart.find(i => i.key === key);
        if (!item) return;

        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.key !== key);
        }
        updateCartDisplay();
    };

    // Update Shopping Cart drawer DOM elements
    const updateCartDisplay = () => {
        const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
        const totalPrice = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

        // Update badges
        cartBadgeNav.textContent = totalQty;
        cartBadgeFloat.textContent = totalQty;
        cartCountDrawer.textContent = totalQty;

        // Floating Cart Visibility
        if (totalQty > 0) {
            floatingCartBtn.style.display = "flex";
        } else {
            floatingCartBtn.style.display = "none";
        }

        // Selected branch display inside cart footer
        const activeBranch = BRANCHES[selectedBranchIdx];
        cartBranchDisplay.textContent = currentLang === "ar" ? activeBranch.nameAr : activeBranch.nameEn;

        // Total price
        cartTotalPrice.textContent = totalPrice.toFixed(2);

        // Render cart items
        if (cart.length === 0) {
            drawerContent.innerHTML = `
                <div class="empty-cart-state">
                    <div class="icon">🛒</div>
                    <p class="lang-ar">سلتك فارغة حالياً. أضف بعض الوجبات اللذيذة!</p>
                    <p class="lang-en">Your cart is empty. Add some delicious meals!</p>
                </div>
            `;
            drawerFooter.style.display = "none";
        } else {
            drawerFooter.style.display = "block";
            drawerContent.innerHTML = "";

            const cartList = document.createElement("div");
            cartList.className = "cart-list";

            cart.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";
                itemDiv.innerHTML = `
                    <div class="cart-item-emoji">${item.emoji}</div>
                    <div class="cart-item-details">
                        <h4>${currentLang === "ar" ? item.nameAr : item.nameEn}</h4>
                        <span>${item.price.toFixed(1)} ${currentLang === "ar" ? "ر.س" : "SR"}</span>
                    </div>
                `;

                // Quantity controls
                const qtyDiv = document.createElement("div");
                qtyDiv.className = "qty-control";

                const minusBtn = document.createElement("button");
                minusBtn.type = "button";
                minusBtn.className = "qty-btn";
                minusBtn.textContent = "−";
                minusBtn.addEventListener("click", () => changeItemQty(item.key, -1));

                const valSpan = document.createElement("span");
                valSpan.className = "qty-value";
                valSpan.textContent = item.qty;

                const plusBtn = document.createElement("button");
                plusBtn.type = "button";
                plusBtn.className = "qty-btn";
                plusBtn.textContent = "+";
                plusBtn.addEventListener("click", () => changeItemQty(item.key, 1));

                qtyDiv.appendChild(minusBtn);
                qtyDiv.appendChild(valSpan);
                qtyDiv.appendChild(plusBtn);

                itemDiv.appendChild(qtyDiv);
                cartList.appendChild(itemDiv);
            });

            drawerContent.appendChild(cartList);
        }
    };

    // Toggle Drawer Open State
    const toggleDrawer = (open) => {
        if (open) {
            drawerBackdrop.classList.add("active");
            cartDrawer.style.transform = "translateX(0)";
        } else {
            drawerBackdrop.classList.remove("active");
            // Standard CSS variables slide it back out based on dir
            if (currentLang === "ar") {
                cartDrawer.style.transform = "translateX(-100%)";
            } else {
                cartDrawer.style.transform = "translateX(100%)";
            }
        }
    };

    // Drawer Event Listeners
    cartToggleBtn.addEventListener("click", () => toggleDrawer(true));
    floatingCartBtn.addEventListener("click", () => toggleDrawer(true));
    drawerCloseBtn.addEventListener("click", () => toggleDrawer(false));
    drawerBackdrop.addEventListener("click", () => toggleDrawer(false));

    // Clear Cart Click
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        showToast(currentLang === "ar" ? "تم تفريغ السلة" : "Cart cleared");
        updateCartDisplay();
        toggleDrawer(false);
    });

    // Checkout Send Order via Whatsapp
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) return;
        const branch = BRANCHES[selectedBranchIdx];
        const totalPrice = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

        let text = currentLang === "ar"
            ? `*فاتورة طلب جديدة من المنيو الإلكتروني* 🍗\n*الفرع المختبر:* ${branch.nameAr}\n-----------------------------\n`
            : `*New Order from E-Menu* 🍗\n*Branch Selected:* ${branch.nameEn}\n-----------------------------\n`;

        cart.forEach(item => {
            const itemName = currentLang === "ar" ? item.nameAr : item.nameEn;
            text += `• ${itemName}  x${item.qty}  -->  ${(item.price * item.qty).toFixed(1)} ${currentLang === "ar" ? "ريال" : "SR"}\n`;
        });

        text += `-----------------------------\n`;
        text += currentLang === "ar"
            ? `*💰 المجموع الكلي: ${totalPrice.toFixed(1)} ريال سعودي*`
            : `*💰 Total Amount: ${totalPrice.toFixed(1)} SR*`;

        text += currentLang === "ar"
            ? `\n\n_تم الطلب عبر موقع المنيو التفاعلي لمستر بروست_`
            : `\n\n_Ordered via Mr. Broast Interactive Menu_`;

        const waUrl = `https://wa.me/${branch.phone}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, "_blank");
    });

    // Complaints & Suggestions Tab Selector
    const switchFeedbackTab = (tab) => {
        currentFeedbackTab = tab;
        if (tab === "complaint") {
            tabComplaintBtn.classList.add("active");
            tabSuggestionBtn.classList.remove("active");
        } else {
            tabComplaintBtn.classList.remove("active");
            tabSuggestionBtn.classList.add("active");
        }
    };
    tabComplaintBtn.addEventListener("click", () => switchFeedbackTab("complaint"));
    tabSuggestionBtn.addEventListener("click", () => switchFeedbackTab("suggestion"));

    // Feedback Form Submission
    feedbackForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = fbName.value.trim();
        const phone = fbPhone.value.trim();
        const targetBranch = fbBranch.value;
        const msg = fbMessage.value.trim();

        if (!name || !msg) {
            showToast(currentLang === "ar" ? "الرجاء تعبئة الحقول الإجبارية!" : "Please fill out required fields!");
            return;
        }

        const typeTitle = currentFeedbackTab === "complaint"
            ? (currentLang === "ar" ? "⚠️ شكوى جديدة" : "⚠️ New Complaint")
            : (currentLang === "ar" ? "💡 اقتراح جديد" : "💡 New Suggestion");

        let text = `*${typeTitle}*\n`;
        text += `-------------------------\n`;
        text += currentLang === "ar" ? `*المرسل:* ${name}\n` : `*Sender:* ${name}\n`;
        if (phone) {
            text += currentLang === "ar" ? `*الجوال:* ${phone}\n` : `*Phone:* ${phone}\n`;
        }
        text += currentLang === "ar" ? `*الفرع المعني:* ${targetBranch}\n` : `*Target Branch:* ${targetBranch}\n`;
        text += `-------------------------\n`;
        text += `*الرسالة:*\n${msg}`;

        const waUrl = `https://wa.me/${COMPLAINTS_WA}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, "_blank");

        // Reset message field
        fbMessage.value = "";
        showToast(currentLang === "ar" ? "جاري توجيهك إلى واتساب الشكاوى..." : "Redirecting to complaints WhatsApp...");
    });

    // Run Initializations
    setupBranchSelector();
    initCardCustomizations();
    renderCategoryTabs();
    renderMenuCards();
    updateCartDisplay();
});
