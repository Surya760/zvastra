import { Store, TemplateId, ThemeConfig } from '../types';
import { initialStores, initialTemplates } from '../data/mockData';

let stores: Store[] = [...initialStores];

export const storeService = {
  getStoresByUser: (userId: string): Store[] => {
    return stores.filter((s) => s.userId === userId);
  },

  getStoreById: (id: string): Store | undefined => {
    return stores.find((s) => s.id === id);
  },

  getStoreBySlug: (slug: string): Store | undefined => {
    return stores.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
  },

  createStore: (userId: string, data: { name: string; slug: string; category: string; templateId: TemplateId }): Store => {
    const template = initialTemplates.find((t) => t.id === data.templateId) || initialTemplates[0];

    const newStore: Store = {
      id: `store-${Date.now()}`,
      userId,
      name: data.name,
      slug: data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      category: data.category,
      templateId: data.templateId,
      themeConfig: {
        ...template.defaultConfig,
        tagline: `${data.name} — Official Storefront`
      },
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stats: {
        totalVisits: 0,
        totalInquiries: 0,
        totalProducts: 0
      }
    };

    stores.unshift(newStore);
    return newStore;
  },

  updateStore: (id: string, updates: Partial<Pick<Store, 'name' | 'category' | 'templateId' | 'status'>> & { themeConfig?: Partial<ThemeConfig> }): Store | null => {
    const index = stores.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const existing = stores[index];

    // If template changed and no custom colors provided, optionally inherit template defaults
    let updatedTheme = existing.themeConfig;
    if (updates.templateId && updates.templateId !== existing.templateId) {
      const newTpl = initialTemplates.find((t) => t.id === updates.templateId);
      if (newTpl) {
        updatedTheme = {
          ...newTpl.defaultConfig,
          ...existing.themeConfig,
          fontFamily: newTpl.defaultConfig.fontFamily
        };
      }
    }

    if (updates.themeConfig) {
      updatedTheme = {
        ...updatedTheme,
        ...updates.themeConfig
      };
    }

    const updated: Store = {
      ...existing,
      ...updates,
      themeConfig: updatedTheme,
      updatedAt: new Date().toISOString()
    };

    stores[index] = updated;
    return updated;
  },

  incrementVisit: (slug: string): void => {
    const store = stores.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
    if (store) {
      store.stats.totalVisits += 1;
    }
  }
};
