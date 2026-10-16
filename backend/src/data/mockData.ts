import { Template, Store, Product, Inquiry, User } from '../types';

export const initialTemplates: Template[] = [
  {
    id: 'classic-boutique',
    name: 'Classic Boutique Glamour',
    tagline: 'Refined editorial layout with hero banners and rich product galleries',
    description: 'Perfect for designer ethnic fashion houses, couture lehengas, sarees, and bridal collections.',
    previewImageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    recommendedFor: ['Bridal Wear', 'Couture Saree', 'Ethnic Gowns'],
    defaultConfig: {
      primaryColor: '#800020', // Burgundy
      accentColor: '#D4AF37',  // Gold
      backgroundColor: '#FAF7F2',
      fontFamily: 'Playfair Display, serif',
      tagline: 'Handcrafted Heritage & Royal Elegance',
      bio: 'Exquisite handcrafted bridal lehengas, authentic banarasi silks, and designer sarees crafted by master weavers.',
      contactEmail: 'contact@ananyaboutique.com',
      contactPhone: '+91 98765 43210',
      whatsappNumber: '+919876543210',
      instagramHandle: '@ananyaboutique',
      customLinks: [
        { label: 'Book a Virtual Video Consultation', url: 'https://wa.me/919876543210?text=Hi%2C+I+want+a+video+consultation' },
        { label: 'Custom Sizing & Bridal Alterations', url: 'https://ananya.zvastra.com/bridal-guide' }
      ]
    }
  },
  {
    id: 'video-reels',
    name: 'Video Reels & Live Showroom',
    tagline: 'Instagram-style vertical reel showcase for modern viral brands',
    description: 'Designed for brands that sell through video demos, fabric swish reels, and styling guides.',
    previewImageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    recommendedFor: ['Indo-Western Fusion', 'Jewellery', 'Festive Ready-to-Wear'],
    defaultConfig: {
      primaryColor: '#0F172A',
      accentColor: '#F43F5E',
      backgroundColor: '#090D16',
      fontFamily: 'Inter, sans-serif',
      tagline: 'Watch, Style & Shop in Seconds',
      bio: 'Experience our trending drape reels, festival ready-to-wear kurta sets, and designer statement jewellery.',
      contactEmail: 'orders@reelsfashion.com',
      contactPhone: '+91 91234 56789',
      whatsappNumber: '+919123456789',
      instagramHandle: '@reelsfashion_in',
      customLinks: [
        { label: 'Trending on Instagram', url: 'https://instagram.com/reelsfashion_in' },
        { label: 'Express 48h Delivery Items', url: 'https://reelsfashion.zvastra.com/express' }
      ]
    }
  },
  {
    id: 'minimal-catalog',
    name: 'Minimalist Clean Catalog',
    tagline: 'High-speed, minimalist product catalog optimized for direct WhatsApp conversion',
    description: 'Ultra-fast loading, distraction-free grid optimized for quick mobile browsing and direct WhatsApp ordering.',
    previewImageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    recommendedFor: ['Daily Ethnic Wear', 'Kurtis & Dupattas', 'Handmade Decor'],
    defaultConfig: {
      primaryColor: '#1E293B',
      accentColor: '#0D9488',
      backgroundColor: '#FFFFFF',
      fontFamily: 'System-UI, sans-serif',
      tagline: 'Everyday Comfort Meets Timeless Elegance',
      bio: 'Pure breathable cotton kurtis, hand-block printed dupattas, and artisanal everyday luxury.',
      contactEmail: 'care@minimalethnic.com',
      contactPhone: '+91 99887 76655',
      whatsappNumber: '+919988776655',
      instagramHandle: '@minimal_ethnic',
      customLinks: [
        { label: 'View Latest Lookbook (PDF)', url: 'https://minimal.zvastra.com/catalog.pdf' }
      ]
    }
  }
];

export const initialUsers: User[] = [
  {
    id: 'user-1',
    email: 'creator@zvastra.com',
    name: 'Ananya Sharma',
    phone: '+91 98765 43210',
    storeIds: ['store-1', 'store-2'],
    createdAt: new Date().toISOString()
  }
];

export const initialStores: Store[] = [
  {
    id: 'store-1',
    userId: 'user-1',
    name: 'Ananya Heritage Couture',
    slug: 'ananya-couture',
    category: 'Ethnic & Bridal Fashion',
    templateId: 'classic-boutique',
    themeConfig: {
      primaryColor: '#800020',
      accentColor: '#D4AF37',
      backgroundColor: '#FAF7F2',
      fontFamily: 'Playfair Display, serif',
      logoUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=200&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=80',
      tagline: 'Handcrafted Heritage & Royal Elegance',
      bio: 'Curated royal lehengas, pure kanchipuram silks, and hand-embroidered festive couture.',
      contactEmail: 'contact@ananyaboutique.com',
      contactPhone: '+91 98765 43210',
      whatsappNumber: '+919876543210',
      instagramHandle: '@ananyacouture',
      customLinks: [
        { label: 'Book a Virtual Video Consultation', url: 'https://wa.me/919876543210?text=Hi%2C+I+want+a+video+consultation' }
      ]
    },
    status: 'active',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: new Date().toISOString(),
    stats: {
      totalVisits: 3840,
      totalInquiries: 142,
      totalProducts: 4
    }
  },
  {
    id: 'store-2',
    userId: 'user-1',
    name: 'Ananya Studio Reels',
    slug: 'ananya-reels',
    category: 'Indo-Western & Jewellery',
    templateId: 'video-reels',
    themeConfig: {
      primaryColor: '#0F172A',
      accentColor: '#F43F5E',
      backgroundColor: '#090D16',
      fontFamily: 'Inter, sans-serif',
      logoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1400&q=80',
      tagline: 'Trending Fashion Drapes in Motion',
      bio: 'Watch live video reels of our viral festive fusion collections and handcrafted kundan jewellery.',
      contactEmail: 'reels@ananyaboutique.com',
      contactPhone: '+91 91234 56789',
      whatsappNumber: '+919123456789',
      instagramHandle: '@ananyareels',
      customLinks: []
    },
    status: 'active',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: new Date().toISOString(),
    stats: {
      totalVisits: 8920,
      totalInquiries: 385,
      totalProducts: 3
    }
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    storeId: 'store-1',
    title: 'Crimson Velvet Bridal Lehenga with Zardozi Embroidery',
    description: 'Regal crimson silk velvet lehenga handcrafted with intricate gold zardozi, dabka, and pearl work. Includes heavy embroidered blouse and dual net dupattas.',
    price: 68500,
    compareAtPrice: 85000,
    stockQuantity: 5,
    isFeatured: true,
    category: 'Bridal Lehengas',
    media: [
      {
        id: 'med-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
        title: 'Full Bridal Look'
      },
      {
        id: 'med-2',
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-model-posing-in-an-autumn-outfit-39879-large.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        title: 'Embroidery Detail & Swish Demo'
      },
      {
        id: 'med-3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80',
        title: 'Blouse Back & Tassels'
      }
    ],
    variants: {
      sizes: ['S', 'M', 'L', 'Custom Stitching'],
      colors: ['Royal Crimson', 'Deep Maroon', 'Emerald Green']
    },
    externalPurchaseUrl: 'https://ananyacouture.zvastra.com/checkout/prod-1',
    whatsappMessage: 'Hi Ananya Couture! I am interested in the Crimson Velvet Bridal Lehenga (Prod-1). Is it available in size M?',
    createdAt: '2026-02-15T12:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-2',
    storeId: 'store-1',
    title: 'Royal Kanjivaram Pure Silk Saree in Emerald & Gold',
    description: 'Woven with pure mulberry silk and certified 2-gram gold zari threads. Featuring traditional temple border motifs and rich pallu.',
    price: 32000,
    compareAtPrice: 38000,
    stockQuantity: 8,
    isFeatured: true,
    category: 'Silk Sarees',
    media: [
      {
        id: 'med-4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        title: 'Draped Pallu'
      },
      {
        id: 'med-5',
        type: 'video',
        url: 'https://assets.mixkit.co/videos/preview/mixkit-woman-turning-in-a-red-dress-41584-large.mp4',
        thumbnailUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
        title: 'Silk Sheen Video'
      }
    ],
    variants: {
      sizes: ['Free Size (6.3m with blouse piece)'],
      colors: ['Emerald & Gold', 'Ruby Pink & Gold']
    },
    externalPurchaseUrl: 'https://ananyacouture.zvastra.com/checkout/prod-2',
    whatsappMessage: 'Hi Ananya Couture! I would like to inquire about the Emerald Kanjivaram Silk Saree.',
    createdAt: '2026-02-18T14:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-3',
    storeId: 'store-1',
    title: 'Handcrafted Polki & Emerald Choker Necklace Set',
    description: 'Artisanal 22k gold plated brass choker adorned with uncut polki stones, green hydro emerald drops, and matching chandbali earrings.',
    price: 18500,
    compareAtPrice: 22000,
    stockQuantity: 12,
    isFeatured: false,
    category: 'Heritage Jewellery',
    media: [
      {
        id: 'med-6',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
        title: 'Choker & Earrings Set'
      }
    ],
    variants: {
      sizes: ['Adjustable Dori'],
      colors: ['Emerald Green', 'Ruby Pink', 'Pearl White']
    },
    externalPurchaseUrl: 'https://ananyacouture.zvastra.com/checkout/prod-3',
    whatsappMessage: 'Hi, I want to order the Polki & Emerald Choker Set.',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: new Date().toISOString()
  }
];

export const initialInquiries: Inquiry[] = [
  {
    id: 'inq-1',
    storeId: 'store-1',
    productId: 'prod-1',
    productTitle: 'Crimson Velvet Bridal Lehenga with Zardozi Embroidery',
    customerName: 'Priya Mehra',
    customerPhone: '+91 98201 12345',
    customerEmail: 'priya.mehra@example.com',
    message: 'Hello, my wedding is on November 25th. Can this lehenga be custom stitched and delivered to Delhi within 4 weeks?',
    status: 'new',
    createdAt: '2026-10-15T09:30:00Z'
  },
  {
    id: 'inq-2',
    storeId: 'store-1',
    productId: 'prod-2',
    productTitle: 'Royal Kanjivaram Pure Silk Saree in Emerald & Gold',
    customerName: 'Meenakshi Iyer',
    customerPhone: '+91 94440 98765',
    customerEmail: 'meenakshi.iyer@example.com',
    message: 'Does this saree come with the Silk Mark certification tag?',
    status: 'contacted',
    createdAt: '2026-10-14T16:15:00Z'
  }
];
