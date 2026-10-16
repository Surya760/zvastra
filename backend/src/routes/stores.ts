import { Router, Request, Response } from 'express';
import { storeService } from '../services/storeService';
import { productService } from '../services/productService';

export const storeRouter = Router();

// List all stores for current user
storeRouter.get('/', (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || 'user-1';
  const stores = storeService.getStoresByUser(userId);
  res.json({ success: true, stores });
});

// Get store by ID
storeRouter.get('/:id', (req: Request, res: Response) => {
  const store = storeService.getStoreById(req.params.id);
  if (!store) {
    return res.status(404).json({ success: false, message: 'Store not found' });
  }
  res.json({ success: true, store });
});

// Get public store by slug (Used by the web storefront)
storeRouter.get('/by-slug/:slug', (req: Request, res: Response) => {
  const store = storeService.getStoreBySlug(req.params.slug);
  if (!store) {
    return res.status(404).json({ success: false, message: 'Store not found' });
  }
  // Track page visit
  storeService.incrementVisit(store.slug);
  const products = productService.getProductsByStore(store.id);

  res.json({
    success: true,
    store,
    products
  });
});

// Create new store
storeRouter.post('/', (req: Request, res: Response) => {
  const { name, slug, category, templateId, userId } = req.body;
  if (!name || !slug) {
    return res.status(400).json({ success: false, message: 'Store name and slug are required' });
  }

  const existing = storeService.getStoreBySlug(slug);
  if (existing) {
    return res.status(400).json({ success: false, message: 'This store slug is already taken' });
  }

  const newStore = storeService.createStore(userId || 'user-1', {
    name,
    slug,
    category: category || 'General Boutique',
    templateId: templateId || 'classic-boutique'
  });

  res.status(201).json({ success: true, store: newStore });
});

// Update store details / theme configuration / template
storeRouter.patch('/:id', (req: Request, res: Response) => {
  const updated = storeService.updateStore(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Store not found' });
  }
  res.json({ success: true, store: updated });
});
