import { Category, Product, Branch, RestaurantConfig, Submission, Review } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'broast-chicken', nameEn: 'Broast Chicken', nameAr: 'دجاج بروستد' },
  { id: 'burgers', nameEn: 'Burgers', nameAr: 'برجر' },
  { id: 'sandwiches', nameEn: 'Sandwiches', nameAr: 'سندوتشات' },
  { id: 'meals', nameEn: 'Meals', nameAr: 'وجبات' },
  { id: 'appetizers', nameEn: 'Appetizers & Sides', nameAr: 'مقبلات وجوانب' },
  { id: 'sauces', nameEn: 'Premium Sauces', nameAr: 'صلصات مميزة' },
  { id: 'drinks', nameEn: 'Drinks', nameAr: 'مشروبات' },
  { id: 'desserts', nameEn: 'Desserts', nameAr: 'حلويات' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'broast-classic-4',
    nameEn: 'Mr. Broast Classic (4 Pcs)',
    nameAr: 'بروستد مستر كلاسيك (٤ قطع)',
    descriptionEn: '4 pieces of golden crispy broasted chicken, served with French fries, signature garlic sauce, bun bread, and Pepsi.',
    descriptionAr: '٤ قطع من الدجاج البروستد المقرمش الذهبي، يقدم مع البطاطس المقلية، ثومية مستر المميزة، خبز كيزر، وبيبسي.',
    price: 36.00,
    categoryId: 'broast-chicken',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: true,
    isSpecialOffer: false
  },
  {
    id: 'broast-spicy-4',
    nameEn: 'Spicy Broast Chicken (4 Pcs)',
    nameAr: 'بروستد حراق سبايسي (٤ قطع)',
    descriptionEn: '4 pieces of fiery hot crispy broasted chicken, served with spicy fries, dynamic chili garlic paste, coleslaw, and bun.',
    descriptionAr: '٤ قطع من دجاج البروستد الحار المقرمش الملتهب، يقدم مع بطاطس حارة، ثومية حارة، كول سلو، وخبز كيزر.',
    price: 38.00,
    categoryId: 'broast-chicken',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: true,
    isSpecialOffer: true,
    originalPrice: 42.00,
    discountTagEn: 'HOT OFFER',
    discountTagAr: 'عرض ساخن'
  },
  {
    id: 'broast-family-8',
    nameEn: 'Family Broast Pack (8 Pcs)',
    nameAr: 'وجبة العائلة بروستد (٨ قطع)',
    descriptionEn: '8 premium crispy chicken pieces, large golden fries, 3 bun breads, 2 fresh garlic sauces, 1 coleslaw salad, and 1.25L drink.',
    descriptionAr: '٨ قطع دجاج بروستد مقرمش فاخر، بطاطس عائلية، ٣ خبز كيزر، ٢ ثومية طازجة، ١ كول سلو، ومشروب عائلي ١.٢٥ لتر.',
    price: 68.00,
    categoryId: 'broast-chicken',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  },
  {
    id: 'burger-crispy-fillet',
    nameEn: 'Special Broasted Fillet Burger',
    nameAr: 'برجر فيليه بروستد مميز',
    descriptionEn: 'Crispy fried chicken breast fillet, melted cheddar cheese, shredded lettuce, loaded with our secret house sauce on toasted brioche.',
    descriptionAr: 'صدر دجاج فيليه مقلي مقرمش، جبنة شيدر ذائبة، خس مبشور، مع صلصة البيت السرية على خبز بريوش محمص.',
    price: 24.00,
    categoryId: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: true,
    isSpecialOffer: false
  },
  {
    id: 'burger-royal-beef',
    nameEn: 'Real Beef Royal Burger',
    nameAr: 'برجر لحم رويال الأصلي',
    descriptionEn: 'Grilled premium Angus beef patty, Swiss cheese, caramelized sweet onions, smoked BBQ mayo, pickle slices, toasted brioche.',
    descriptionAr: 'شريحة لحم أنجوس مشوي فاخر، جبن سويسري، بصل مكرمل حلو، مايونيز باربكيو مدخن، شرائح مخلل، خبز بريوش.',
    price: 28.00,
    categoryId: 'burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: true,
    originalPrice: 32.00,
    discountTagEn: 'SAVE 12%',
    discountTagAr: 'وفر ١٢٪'
  },
  {
    id: 'burger-volcano-zinger',
    nameEn: 'Spicy Volcano Zinger',
    nameAr: 'سبايسي زinger البركان',
    descriptionEn: 'Super hot crispy double chicken breast fillet with fire glaze, jalapeños, warm cheddar cheese sauce, crisp leaf lettuce.',
    descriptionAr: 'صدر دجاج مقرمش مزدوج حار جداً متبل بخلطة البركان، مع قطع هالابينو، صلصة جبنة شيدر دافئة، وخس مقرمش.',
    price: 31.00,
    categoryId: 'burgers',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: true,
    isSpecialOffer: false
  },
  {
    id: 'wrap-classic-tortilla',
    nameEn: 'Classic Crispy Tortilla Wrap',
    nameAr: 'لفافة تورتيلا مقرمشة كلاسيك',
    descriptionEn: 'Golden crispy chicken strips wrapped in a soft warm tortilla with fresh lettuce, diced tomato, and creamy garlic yogurt sauce.',
    descriptionAr: 'شرائح الدجاج المقرمشة الذهبية ملفوفة بخبز تورتيلا دافئ وناعم، مع الخس الطازج، مكعبات الطماطم، وصلصة الثوم بالزبادي.',
    price: 18.00,
    categoryId: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  },
  {
    id: 'shawarma-broast-roll',
    nameEn: 'Broast Shawarma Roll',
    nameAr: 'رول شاورما بروستد العربي',
    descriptionEn: 'Diced savory crispy chicken with dynamic garlic white paste, pickles, wrapped in authentic Lebanese flatbread toasted on the grill.',
    descriptionAr: 'قطع الدجاج البروستد المفروم اللذيذ مع معجون الثوم الأبيض، المخلل، ملفوف بالخبز اللبناني الأصيل المحمص على الجريل.',
    price: 16.00,
    categoryId: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  },
  {
    id: 'meal-crispy-tenders',
    nameEn: 'Premium Crispy Tenders (5 Pcs)',
    nameAr: 'وجبة ستربس مقرمش فاخر (٥ قطع)',
    descriptionEn: '5 large boneless premium crispy white-meat tenders, fries, coleslaw, bun bread, honey mustard sauce and extra garlic clip.',
    descriptionAr: '٥ قطع ستربس دجاج مقرمش كبير بدون دهن، بطاطس، كول سلو، خبز كيزر، صلصة خردل بالعسل وصلصة ثوم إضافية.',
    price: 32.00,
    categoryId: 'meals',
    image: 'https://images.unsplash.com/photo-1562967914-01dee72a7ed2?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: true,
    isSpecialOffer: false
  },
  {
    id: 'meal-kids-box',
    nameEn: 'Kids Happy Broast Box',
    nameAr: 'صندوق أطفال هابي بروستد',
    descriptionEn: '2 golden premium chicken tenders, small fries, safe activity toy, and fresh orange juice package.',
    descriptionAr: 'قطعتان من ستربس الدجاج الذهبي الفاخر، بطاطس صغيرة، لعبة أطفال آمنة، وعبوة عصير برتقال طبيعي طازج.',
    price: 20.00,
    categoryId: 'meals',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  },
  {
    id: 'side-golden-fries',
    nameEn: 'Signature Golden French Fries',
    nameAr: 'بطاطس مقلية ذهبية فاخرة',
    descriptionEn: 'Fresh hand-cut potatoes, double-fried to perfection. Crunchy, gold on the outside, fluffy inside with special seasoning.',
    descriptionAr: 'بطاطس طازجة ومقطعة يدوياً، مقلية على مرحلتين للحصول على قرمشة مثالية. مقرمشة وذهبية من الخارج، طرية من الداخل.',
    price: 9.00,
    categoryId: 'appetizers',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  },
  {
    id: 'side-curli-fries',
    nameEn: 'Crazy Cheddar Curly Fries',
    nameAr: 'كيرلي فرايز بصلصة الجبن',
    descriptionEn: 'A high heap of spiral curly seasoned potatoes topped with warm premium melted cheddar cheese sauce.',
    descriptionAr: 'تلة مرتفعة من بطاطس كيرلي الملتوية والمتبلة تعلوها صلصة جبنة الشيدر الفاخرة الدافئة الذائبة.',
    price: 15.00,
    categoryId: 'appetizers',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: true,
    originalPrice: 18.00,
    discountTagEn: 'CHEESY DEAL',
    discountTagAr: 'عرض الجبنة اللذيذة'
  },
  {
    id: 'side-coleslaw',
    nameEn: 'Sweet Coleslaw Salad',
    nameAr: 'سلطة كول سلو حلوة وطازجة',
    descriptionEn: 'Shredded clean cabbage and sweet carrots in our traditional creamy premium mayonnaise dressing.',
    descriptionAr: 'ملفوف مبشور نظيف وجزر حلو في تتبيلة المايونيز الكريمية التقليدية المميزة لدينا.',
    price: 7.00,
    categoryId: 'appetizers',
    image: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  },
  {
    id: 'sauce-garlic',
    nameEn: 'Legendary Garlic Paste (Original)',
    nameAr: 'كريم الثومية الأسطوري (الأصلي)',
    descriptionEn: 'Freshly whipped natural garlic cloves, lemon juice, first-press vegetable oil, seasoned to perfection.',
    descriptionAr: 'فصوص ثوم طبيعية مخفوقة طازجة، عصير ليمون، زيت نباتي، متبلة ومخفوقة بعناية للحصول على قوام كريمي.',
    price: 2.00,
    categoryId: 'sauces',
    image: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  },
  {
    id: 'sauce-spicy',
    nameEn: 'Spicy Fire Dip',
    nameAr: 'صوص النار الثومية الحارة',
    descriptionEn: 'Our freshly whipped garlic paste infused with premium red cayenne chili oil, dynamic, and full of kick.',
    descriptionAr: 'معجون الثوم المخفوق الطازج مضاف إليه زيت فلفل الكايين الأحمر الفاخر، حراق ومليء بالنشاط والحرارة.',
    price: 2.00,
    categoryId: 'sauces',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  },
  {
    id: 'drink-pepsi',
    nameEn: 'Chilled Pepsi Cola',
    nameAr: 'بيبسي كولا مثلج',
    descriptionEn: 'Ice cold carbonated cola, served in 330ml can to perfectly wash down your crispy broast.',
    descriptionAr: 'مشروب كولا غازي مثلج ومبرد، يقدم في علبة ٣٣٠ مل لتكمل بها متعة البروستد المقرمش.',
    price: 5.00,
    categoryId: 'drinks',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  },
  {
    id: 'drink-orange',
    nameEn: 'Fresh Squeezed Orange Juice',
    nameAr: 'عصير برتقال طبيعي معصور طازج',
    descriptionEn: '100% natural, freshly squeezed oranges, packed with pulpy vitamin goodness, made on order.',
    descriptionAr: 'عصير برتقال طبيعي معصور طازج ١٠٠٪، غني بالفيتامينات والنكهة الطبيعية اللذيذة، يعصر عند الطلب.',
    price: 11.00,
    categoryId: 'drinks',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  },
  {
    id: 'dessert-lava-cake',
    nameEn: 'Choco Melt Lava Cake',
    nameAr: 'كعكة الحمم الشوكولاتة الذائبة',
    descriptionEn: 'Fluffy baked chocolate dessert cake with a deep warm liquid cacao river spilling when cut. Premium indulgence.',
    descriptionAr: 'كعكة شوكولاتة هشة وداكنة مخبوزة بعناية، يتدفق من داخلها نهر من كاكاو الشوكولاتة الذائبة الدافئة عند قطعها.',
    price: 15.00,
    categoryId: 'desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    isAvailable: true,
    isFeatured: false,
    isSpecialOffer: false
  }
];

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'branch-olaya',
    nameEn: 'Riyadh - Al Olaya Branch',
    nameAr: 'الرياض - فرع العليا',
    addressEn: 'Olaya District, Olaya Street, Riyadh, Saudi Arabia',
    addressAr: 'حي العليا، شارع العليا العام، الرياض، المملكة العربية السعودية',
    googleMapsUrl: 'https://maps.google.com/?q=24.7115,46.6744',
    workingHoursEn: '12:00 PM - 2:00 AM (Daily)',
    workingHoursAr: '١٢:٠٠ ظهراً - ٢:٠٠ صباحاً (يومياً)',
    whatsappNumber: '966507238491',
    phoneNumber: '+966112223333',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'branch-hamra',
    nameEn: 'Jeddah - Al Hamra Branch',
    nameAr: 'جدة - فرع الحمراء',
    addressEn: 'Palestine Street, near Al-Hamra Corniche, Jeddah, Saudi Arabia',
    addressAr: 'شارع فلسطين، بالقرب من كورنيش الحمراء، جدة، المملكة العربية السعودية',
    googleMapsUrl: 'https://maps.google.com/?q=21.5168,39.1558',
    workingHoursEn: '1:00 PM - 3:00 AM (Daily)',
    workingHoursAr: '١:٠٠ ظهراً - ٣:٠٠ صباحاً (يومياً)',
    whatsappNumber: '966507238492',
    phoneNumber: '+966124445555',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
  }
];

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-comp-1',
    type: 'complaint',
    name: 'Ahmad Al-Saeed',
    phoneNumber: '+966501234567',
    titleOrSubject: 'Late delivery during peak hours',
    details: 'I ordered the Class 4 Pcs meal yesterday at 9 PM and it took over 50 minutes to arrive in Olaya. The chicken was crispy but cold.',
    date: '2026-06-05',
    status: 'resolved'
  },
  {
    id: 'sub-sugg-1',
    type: 'suggestion',
    name: 'Sarah Khaled',
    phoneNumber: '+966509876543',
    titleOrSubject: 'Introduce Diet Combo Meals',
    details: 'It would be amazing if Mr. Broast introduces lighter, zero-oil air-fryed chicken options or low-fat garlic sauce versions for health enthusiasts!',
    date: '2026-06-06',
    status: 'pending'
  }
];

export const DEFAULT_CONFIG: RestaurantConfig = {
  logoUrl: '🍗',
  nameEn: 'Mr. Broast',
  nameAr: 'مستر بروستد',
  heroTitleEn: 'Legendary Crispy Golden Broast',
  heroTitleAr: 'مذاق البروستد الذهبي المقرمش الأسطوري',
  heroSubtitleEn: 'Crafted with passion using our high-secret herb recipe. Perfectly crispy on the outside, incredibly juicy and hot on the inside.',
  heroSubtitleAr: 'صُنع بحب وشغف باستخدام تتبيلة الأعشاب السرية الفاخرة الخاصة بنا. مقرمش ومذهب تماماً من الخارج، طري وعصاري من الداخل.',
  bannerUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=1200',
  footerTextEn: 'Mr. Broast is your ultimate go-to destination for mouthwatering, crispy golden chicken, burgers, and secret whipped garlic sauces. Freshly made with standard safety ingredients.',
  footerTextAr: 'مستر بروستد هو وجهتك النهائية لتناول الدجاج الذهبي المقرمش الشهي، البرجر اللذيذ، وصلصة الثومية المخفوقة السرية الخاصة بنا. منتجات طازجة ومعدّة بمعايير سلامة عالمية.',
  facebookUrl: 'https://facebook.com/mrbroast',
  instagramUrl: 'https://instagram.com/mrbroast',
  twitterUrl: 'https://twitter.com/mrbroast',
  whatsappFloatingNum: '966507238491',
  offersTitleEn: 'Hot Limited Offers',
  offersTitleAr: 'عروض ساخنة لفترة محدودة',
  offersHeadingEn: 'Save Big With Mr. Broast Deals 🔥',
  offersHeadingAr: 'وفر مع عروض مستر بروستد 🔥',
  featuredTitleEn: 'Customer Favorites',
  featuredTitleAr: 'الخيارات المفضلة للجميع',
  featuredHeadingEn: 'Our Legendary Featured Meals 👑',
  featuredHeadingAr: 'الأكثر طلبًا ومبيعًا لدينا 👑',
  featuredDescEn: 'Hand-picked fast food selections that our guests order day in, day out.',
  featuredDescAr: 'مجموعة منتقاة بعناية من أفضل المأكولات التي يفضلها عملاؤنا الكرام دائماً.',
  adminPassword: 'admin123',

  // Default Hero Metrics values & labels
  heroMetric1ValueEn: '100%',
  heroMetric1ValueAr: '100%',
  heroMetric1LabelEn: 'Fresh Daily',
  heroMetric1LabelAr: 'طازج يومياً',
  heroMetric2ValueEn: 'Secret',
  heroMetric2ValueAr: 'سرّي',
  heroMetric2LabelEn: 'Bespoke Recipe',
  heroMetric2LabelAr: 'بهارات أصلية',
  heroMetric3ValueEn: '4.9 ★',
  heroMetric3ValueAr: '4.9 ★',
  heroMetric3LabelEn: 'Top Rating',
  heroMetric3LabelAr: 'تقييم ممتاز',

  // Default Hero Featured Card configuration
  heroFeaturedTagEn: 'Best Seller',
  heroFeaturedTagAr: 'الأكثر مبيعاً',
  heroFeaturedNameEn: 'Classic Golden Drumsticks',
  heroFeaturedNameAr: 'بروستد كلاسيك مقرمش',
  heroFeaturedDescEn: 'The exact heritage blend recipe that made us famous!',
  heroFeaturedDescAr: 'الخلطة التي جعلتنا مشهورين!',
  heroFeaturedPrice: '36.00',
  heroFeaturedImageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=600'
};

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    nameEn: 'Mohammed Al-Enazi',
    nameAr: 'محمد العنزي',
    roleEn: 'Local Guide',
    roleAr: 'مرشد محلي',
    rating: 5,
    commentEn: 'Hands down the best broast in Riyadh! Exceptionally crispy skin, zero excess oil, and that garlic sauce is straight out of heaven. Delivery was surprisingly fast!',
    commentAr: 'بدون مبالغة أفضل بروستد في الرياض! القشرة مقرمشة بشكل استثنائي وبدون أي زيت زائد، والثومية خرافية ولذيذة جداً. والتوصيل سريع ومميز!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-2',
    nameEn: 'Sarah Thompson',
    nameAr: 'سارة تومبسون',
    roleEn: 'Food Critic',
    roleAr: 'ناقدة طعام',
    rating: 5,
    commentEn: 'Mr. Broast has nailed the crispy fillet burger. The burger bun stays perfectly pillowy, and the chicken inside is incredibly thick and juicy. Light-years ahead of major chains.',
    commentAr: 'مستر بروستد أتقن برجر الفيليه المقرمش بشكل لا يصدق. الخبز يظل طرياً وهشاً، والدجاج من الداخل سميك وغني بالعصارة. أفضل بكثير من السلاسل العالمية الكبرى.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'rev-3',
    nameEn: 'Fahad Al-Harbi',
    nameAr: 'فهد الحربي',
    roleEn: 'Verified Customer',
    roleAr: 'عميل موثق',
    rating: 5,
    commentEn: 'The family pack offers incredible value. The chicken is clean and white from the inside, meaning it is fresh and cooked with high care. Highly recommended for families.',
    commentAr: 'وجبة العائلة تقدم قيمة ممتازة مقابل السعر. الدجاج نظيف وأبيض من الداخل مما يدل على نضارته وجودة طهيه. أنصح به بشدة لكل العائلات.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  }
];
