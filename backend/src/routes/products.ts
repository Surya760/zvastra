import { Router, Request, Response } from 'express';
import { productService } from '../services/productService';

export const productRouter = Router({ mergeParams: true });

// Get all products for a specific store
productRouter.get('/', (req: Request, res: Response) => {
  const { storeId } = req.params;
  const products = productService.getProductsByStore(storeId);
  res.json({ success: true, products });
});

// Get single product
productRouter.get('/:productId', (req: Request, res: Response) => {
  const product = productService.getProductById(req.params.productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

// Create product in store
productRouter.post('/', (req: Request, res: Response) => {
  const { storeId } = req.params;
  const { title, description, price, compareAtPrice, stockQuantity, isFeatured, category, media, variants, externalPurchaseUrl, whatsappMessage } = req.body;

  if (!title || price === undefined) {
    return res.status(400).json({ success: false, message: 'Title and price are required' });
  }

  const newProduct = productService.createProduct(storeId, {
    title,
    description: description || '',
    price: Number(price),
    compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
    stockQuantity: Number(stockQuantity) || 0,
    isFeatured: Boolean(isFeatured),
    category: category || 'General',
    media: media || [],
    variants: variants || { sizes: [], colors: [] },
    externalPurchaseUrl: externalPurchaseUrl || '',
    whatsappMessage: whatsappMessage || `Hi! I would like to order ${title}`
  });

  res.status(201).json({ success: true, product: newProduct });
});

// Update product
productRouter.patch('/:productId', (req: Request, res: Response) => {
  const updated = productService.updateProduct(req.params.productId, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product: updated });
});

// Delete product
productRouter.delete('/:productId', (req: Request, res: Response) => {
  const success = productService.deleteProduct(req.params.productId);
  if (!success) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, message: 'Product deleted successfully' });
});
