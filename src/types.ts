export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
}

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  categoryId: string;
  image: string;
  isAvailable: boolean;
  isFeatured: boolean;
  isSpecialOffer: boolean;
  originalPrice?: number; // For crossed out prices in special offers
  discountTagEn?: string;
  discountTagAr?: string;
}

export interface Branch {
  id: string;
  nameEn: string;
  nameAr: string;
  addressEn: string;
  addressAr: string;
  googleMapsUrl: string;
  workingHoursEn: string;
  workingHoursAr: string;
  whatsappNumber: string; // Used for order generation & chat
  phoneNumber: string; // Used for direct calling
  image: string;
}

export interface Submission {
  id: string;
  type: 'complaint' | 'suggestion';
  name: string;
  phoneNumber: string;
  titleOrSubject: string;
  details: string;
  date: string;
  status: 'pending' | 'resolved';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  rating: number;
  commentEn: string;
  commentAr: string;
  avatar: string;
}

export interface RestaurantConfig {
  logoUrl: string;
  nameEn: string;
  nameAr: string;
  heroTitleEn: string;
  heroTitleAr: string;
  heroSubtitleEn: string;
  heroSubtitleAr: string;
  bannerUrl: string;
  footerTextEn: string;
  footerTextAr: string;
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  whatsappFloatingNum: string;
  offersTitleEn?: string;
  offersTitleAr?: string;
  offersHeadingEn?: string;
  offersHeadingAr?: string;
  featuredTitleEn?: string;
  featuredTitleAr?: string;
  featuredHeadingEn?: string;
  featuredHeadingAr?: string;
  featuredDescEn?: string;
  featuredDescAr?: string;
  adminPassword?: string;
  
  // Hero Section Metrics Customization
  heroMetric1ValueEn?: string;
  heroMetric1ValueAr?: string;
  heroMetric1LabelEn?: string;
  heroMetric1LabelAr?: string;
  heroMetric2ValueEn?: string;
  heroMetric2ValueAr?: string;
  heroMetric2LabelEn?: string;
  heroMetric2LabelAr?: string;
  heroMetric3ValueEn?: string;
  heroMetric3ValueAr?: string;
  heroMetric3LabelEn?: string;
  heroMetric3LabelAr?: string;

  // Hero Section Featured Card Customization
  heroFeaturedTagEn?: string;
  heroFeaturedTagAr?: string;
  heroFeaturedNameEn?: string;
  heroFeaturedNameAr?: string;
  heroFeaturedDescEn?: string;
  heroFeaturedDescAr?: string;
  heroFeaturedPrice?: string;
  heroFeaturedImageUrl?: string;
}
