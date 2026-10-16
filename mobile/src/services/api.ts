import { Store, Template, Product, Inquiry } from '../types';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export const apiService = {
  // Stores
  getStores: async (userId: string = 'user-1'): Promise<Store[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/stores?userId=${userId}`);
      const data = await res.json();
      if (data.success) return data.stores;
    } catch (e) {
      console.warn('API unavailable, falling back to local state', e);
    }
    return [];
  },

  createStore: async (storeData: { name: string; slug: string; category: string; templateId: string }): Promise<Store | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/stores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeData)
      });
      const data = await res.json();
      if (data.success) return data.store;
    } catch (e) {
      console.warn('Failed to create store via API', e);
    }
    return null;
  },

  updateStore: async (storeId: string, updates: any): Promise<Store | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/stores/${storeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) return data.store;
    } catch (e) {
      console.warn('Failed to update store via API', e);
    }
    return null;
  },

  // Templates
  getTemplates: async (): Promise<Template[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/templates`);
      const data = await res.json();
      if (data.success) return data.templates;
    } catch (e) {
      console.warn('Failed to fetch templates from API', e);
    }
    return [];
  },

  // Products
  getProducts: async (storeId: string): Promise<Product[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/stores/${storeId}/products`);
      const data = await res.json();
      if (data.success) return data.products;
    } catch (e) {
      console.warn('Failed to fetch products from API', e);
    }
    return [];
  },

  createProduct: async (storeId: string, product: any): Promise<Product | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/stores/${storeId}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      const data = await res.json();
      if (data.success) return data.product;
    } catch (e) {
      console.warn('Failed to create product via API', e);
    }
    return null;
  },

  updateProduct: async (storeId: string, productId: string, updates: any): Promise<Product | null> => {
    try {
      const res = await fetch(`${API_BASE_URL}/stores/${storeId}/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) return data.product;
    } catch (e) {
      console.warn('Failed to update product via API', e);
    }
    return null;
  },

  deleteProduct: async (storeId: string, productId: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/stores/${storeId}/products/${productId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      return Boolean(data.success);
    } catch (e) {
      console.warn('Failed to delete product via API', e);
    }
    return false;
  },

  // Inquiries
  getInquiries: async (storeId: string): Promise<Inquiry[]> => {
    try {
      const res = await fetch(`${API_BASE_URL}/stores/${storeId}/inquiries`);
      const data = await res.json();
      if (data.success) return data.inquiries;
    } catch (e) {
      console.warn('Failed to fetch inquiries from API', e);
    }
    return [];
  }
};
