import { Product, ProductMedia, Inquiry } from '../types';
import { initialProducts, initialInquiries } from '../data/mockData';

let products: Product[] = [...initialProducts];
let inquiries: Inquiry[] = [...initialInquiries];

export const productService = {
  getProductsByStore: (storeId: string): Product[] => {
    return products.filter((p) => p.storeId === storeId);
  },

  getProductById: (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  },

  createProduct: (storeId: string, data: Omit<Product, 'id' | 'storeId' | 'createdAt' | 'updatedAt'>): Product => {
    const newProduct: Product = {
      ...data,
      id: `prod-${Date.now()}`,
      storeId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.unshift(newProduct);
    return newProduct;
  },

  updateProduct: (id: string, updates: Partial<Omit<Product, 'id' | 'storeId' | 'createdAt'>>): Product | null => {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated: Product = {
      ...products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    products[index] = updated;
    return updated;
  },

  deleteProduct: (id: string): boolean => {
    const prevLength = products.length;
    products = products.filter((p) => p.id !== id);
    return products.length < prevLength;
  },

  getInquiriesByStore: (storeId: string): Inquiry[] => {
    return inquiries.filter((inq) => inq.storeId === storeId);
  },

  createInquiry: (storeId: string, data: Omit<Inquiry, 'id' | 'storeId' | 'status' | 'createdAt'>): Inquiry => {
    const newInq: Inquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      storeId,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    inquiries.unshift(newInq);
    return newInq;
  },

  updateInquiryStatus: (inquiryId: string, status: 'new' | 'contacted' | 'resolved'): Inquiry | null => {
    const inq = inquiries.find((i) => i.id === inquiryId);
    if (!inq) return null;
    inq.status = status;
    return inq;
  }
};
