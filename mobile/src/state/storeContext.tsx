import React, { createContext, useContext, useState, useEffect } from 'react';
import { Store, Template, Product, Inquiry, TemplateId } from '../types';
import { apiService } from '../services/api';

const defaultStores: Store[] = [
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
        { label: 'Book a Virtual Video Consultation', url: 'https://wa.me/919876543210' }
      ]
    },
    status: 'active',
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: new Date().toISOString(),
    stats: {
      totalVisits: 3840,
      totalInquiries: 142,
      totalProducts: 3
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
      totalProducts: 2
    }
  }
];

const defaultTemplates: Template[] = [
  {
    id: 'classic-boutique',
    name: 'Classic Boutique Glamour',
    tagline: 'Refined editorial layout with hero banners and rich product galleries',
    description: 'Perfect for designer ethnic fashion houses, couture lehengas, sarees, and bridal collections.',
    previewImageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    recommendedFor: ['Bridal Wear', 'Couture Saree', 'Ethnic Gowns'],
    defaultConfig: {
      primaryColor: '#800020',
      accentColor: '#D4AF37',
      backgroundColor: '#FAF7F2',
      fontFamily: 'Playfair Display, serif',
      tagline: 'Handcrafted Heritage & Royal Elegance',
      bio: 'Exquisite handcrafted bridal lehengas, authentic banarasi silks, and designer sarees.',
      contactEmail: 'contact@ananyaboutique.com',
      contactPhone: '+91 98765 43210',
      whatsappNumber: '+919876543210',
      instagramHandle: '@ananyaboutique',
      customLinks: []
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
      bio: 'Experience our trending drape reels, festival ready-to-wear kurta sets, and statement jewellery.',
      contactEmail: 'orders@reelsfashion.com',
      contactPhone: '+91 91234 56789',
      whatsappNumber: '+919123456789',
      instagramHandle: '@reelsfashion_in',
      customLinks: []
    }
  },
  {
    id: 'minimal-catalog',
    name: 'Minimalist Clean Catalog',
    tagline: 'High-speed, minimalist product catalog optimized for direct WhatsApp conversion',
    description: 'Ultra-fast loading, distraction-free grid optimized for quick mobile browsing and WhatsApp ordering.',
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
      customLinks: []
    }
  }
];

const defaultProducts: Product[] = [
  {
    id: 'prod-1',
    storeId: 'store-1',
    title: 'Crimson Velvet Bridal Lehenga with Zardozi Embroidery',
    description: 'Regal crimson silk velvet lehenga handcrafted with intricate gold zardozi, dabka, and pearl work.',
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
      }
    ],
    variants: {
      sizes: ['S', 'M', 'L', 'Custom Stitching'],
      colors: ['Royal Crimson', 'Deep Maroon']
    },
    externalPurchaseUrl: 'https://ananyacouture.zvastra.com/checkout/prod-1',
    whatsappMessage: 'Hi Ananya Couture! I am interested in the Crimson Velvet Bridal Lehenga.',
    createdAt: '2026-02-15T12:00:00Z',
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prod-2',
    storeId: 'store-1',
    title: 'Royal Kanjivaram Pure Silk Saree in Emerald & Gold',
    description: 'Woven with pure mulberry silk and certified 2-gram gold zari threads. Temple border motifs.',
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
      }
    ],
    variants: {
      sizes: ['Free Size (6.3m with blouse)'],
      colors: ['Emerald & Gold', 'Ruby Pink & Gold']
    },
    externalPurchaseUrl: 'https://ananyacouture.zvastra.com/checkout/prod-2',
    whatsappMessage: 'Hi! Inquiring about the Emerald Kanjivaram Silk Saree.',
    createdAt: '2026-02-18T14:00:00Z',
    updatedAt: new Date().toISOString()
  }
];

const defaultInquiries: Inquiry[] = [
  {
    id: 'inq-1',
    storeId: 'store-1',
    productTitle: 'Crimson Velvet Bridal Lehenga with Zardozi Embroidery',
    customerName: 'Priya Mehra',
    customerPhone: '+91 98201 12345',
    message: 'Can this lehenga be custom stitched and delivered to Delhi within 4 weeks?',
    status: 'new',
    createdAt: '2026-10-15T09:30:00Z'
  },
  {
    id: 'inq-2',
    storeId: 'store-1',
    productTitle: 'Royal Kanjivaram Pure Silk Saree in Emerald & Gold',
    customerName: 'Meenakshi Iyer',
    customerPhone: '+91 94440 98765',
    message: 'Does this saree come with the Silk Mark certification tag?',
    status: 'contacted',
    createdAt: '2026-10-14T16:15:00Z'
  }
];

interface StoreContextType {
  stores: Store[];
  currentStore: Store;
  setCurrentStore: (store: Store) => void;
  templates: Template[];
  selectTemplate: (templateId: TemplateId) => Promise<void>;
  updateThemeConfig: (updates: Partial<Store['themeConfig']>) => Promise<void>;
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'storeId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (productId: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  inquiries: Inquiry[];
  createNewStore: (data: { name: string; slug: string; category: string; templateId: TemplateId }) => Promise<void>;
  isLoading: boolean;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stores, setStores] = useState<Store[]>(defaultStores);
  const [currentStore, setCurrentStore] = useState<Store>(defaultStores[0]);
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [inquiries, setInquiries] = useState<Inquiry[]>(defaultInquiries);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync with API on mount if available
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      const apiStores = await apiService.getStores();
      if (apiStores.length > 0) {
        setStores(apiStores);
        setCurrentStore(apiStores[0]);
      }
      const apiTemplates = await apiService.getTemplates();
      if (apiTemplates.length > 0) {
        setTemplates(apiTemplates);
      }
      setIsLoading(false);
    };
    initData();
  }, []);

  // Fetch products & inquiries whenever currentStore changes
  useEffect(() => {
    const fetchStoreData = async () => {
      if (!currentStore) return;
      const apiProducts = await apiService.getProducts(currentStore.id);
      if (apiProducts.length > 0) {
        setProducts(apiProducts);
      } else {
        setProducts(defaultProducts.filter((p) => p.storeId === currentStore.id));
      }

      const apiInquiries = await apiService.getInquiries(currentStore.id);
      if (apiInquiries.length > 0) {
        setInquiries(apiInquiries);
      } else {
        setInquiries(defaultInquiries.filter((i) => i.storeId === currentStore.id));
      }
    };
    fetchStoreData();
  }, [currentStore?.id]);

  const selectTemplate = async (templateId: TemplateId) => {
    const selectedTpl = templates.find((t) => t.id === templateId);
    if (!selectedTpl || !currentStore) return;

    const updatedStore: Store = {
      ...currentStore,
      templateId,
      themeConfig: {
        ...selectedTpl.defaultConfig,
        ...currentStore.themeConfig,
        primaryColor: selectedTpl.defaultConfig.primaryColor,
        accentColor: selectedTpl.defaultConfig.accentColor,
        backgroundColor: selectedTpl.defaultConfig.backgroundColor,
        fontFamily: selectedTpl.defaultConfig.fontFamily
      }
    };

    setCurrentStore(updatedStore);
    setStores((prev) => prev.map((s) => (s.id === updatedStore.id ? updatedStore : s)));
    await apiService.updateStore(currentStore.id, { templateId, themeConfig: updatedStore.themeConfig });
  };

  const updateThemeConfig = async (updates: Partial<Store['themeConfig']>) => {
    if (!currentStore) return;
    const updatedStore: Store = {
      ...currentStore,
      themeConfig: {
        ...currentStore.themeConfig,
        ...updates
      }
    };

    setCurrentStore(updatedStore);
    setStores((prev) => prev.map((s) => (s.id === updatedStore.id ? updatedStore : s)));
    await apiService.updateStore(currentStore.id, { themeConfig: updatedStore.themeConfig });
  };

  const addProduct = async (data: Omit<Product, 'id' | 'storeId' | 'createdAt' | 'updatedAt'>) => {
    if (!currentStore) return;
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      storeId: currentStore.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProducts((prev) => [newProduct, ...prev]);
    setCurrentStore((prev) => ({
      ...prev,
      stats: { ...prev.stats, totalProducts: prev.stats.totalProducts + 1 }
    }));

    await apiService.createProduct(currentStore.id, newProduct);
  };

  const updateProduct = async (productId: string, updates: Partial<Product>) => {
    if (!currentStore) return;
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, ...updates } : p)));
    await apiService.updateProduct(currentStore.id, productId, updates);
  };

  const deleteProduct = async (productId: string) => {
    if (!currentStore) return;
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    await apiService.deleteProduct(currentStore.id, productId);
  };

  const createNewStore = async (data: { name: string; slug: string; category: string; templateId: TemplateId }) => {
    const tpl = templates.find((t) => t.id === data.templateId) || templates[0];
    const newStore: Store = {
      id: `store-${Date.now()}`,
      userId: 'user-1',
      name: data.name,
      slug: data.slug,
      category: data.category,
      templateId: data.templateId,
      themeConfig: { ...tpl.defaultConfig },
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stats: { totalVisits: 0, totalInquiries: 0, totalProducts: 0 }
    };

    setStores((prev) => [newStore, ...prev]);
    setCurrentStore(newStore);
    await apiService.createStore(data);
  };

  return (
    <StoreContext.Provider
      value={{
        stores,
        currentStore,
        setCurrentStore,
        templates,
        selectTemplate,
        updateThemeConfig,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        inquiries,
        createNewStore,
        isLoading
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
