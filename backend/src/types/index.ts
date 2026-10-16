export type TemplateId = 'classic-boutique' | 'video-reels' | 'minimal-catalog';

export interface ThemeConfig {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  fontFamily: string;
  logoUrl?: string;
  bannerUrl?: string;
  tagline: string;
  bio: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  instagramHandle?: string;
  facebookHandle?: string;
  customLinks?: { label: string; url: string }[];
}

export interface Template {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  previewImageUrl: string;
  recommendedFor: string[];
  defaultConfig: ThemeConfig;
}

export interface Store {
  id: string;
  userId: string;
  name: string;
  slug: string;
  category: string;
  templateId: TemplateId;
  themeConfig: ThemeConfig;
  status: 'active' | 'draft' | 'paused';
  createdAt: string;
  updatedAt: string;
  stats: {
    totalVisits: number;
    totalInquiries: number;
    totalProducts: number;
  };
}

export interface ProductMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  title?: string;
}

export interface Product {
  id: string;
  storeId: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  isFeatured: boolean;
  category: string;
  media: ProductMedia[];
  variants: {
    sizes: string[];
    colors: string[];
  };
  externalPurchaseUrl?: string;
  whatsappMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  id: string;
  storeId: string;
  productId?: string;
  productTitle?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  storeIds: string[];
  createdAt: string;
}
