import { Router, Request, Response } from 'express';
import { productService } from '../services/productService';

export const inquiryRouter = Router({ mergeParams: true });

// List inquiries for a store
inquiryRouter.get('/', (req: Request, res: Response) => {
  const { storeId } = req.params;
  const inquiries = productService.getInquiriesByStore(storeId);
  res.json({ success: true, inquiries });
});

// Post a new customer inquiry (from web storefront)
inquiryRouter.post('/', (req: Request, res: Response) => {
  const { storeId } = req.params;
  const { customerName, customerPhone, customerEmail, message, productId, productTitle } = req.body;

  if (!customerName || !customerPhone || !message) {
    return res.status(400).json({ success: false, message: 'Name, phone and message are required' });
  }

  const newInq = productService.createInquiry(storeId, {
    customerName,
    customerPhone,
    customerEmail,
    message,
    productId,
    productTitle
  });

  res.status(201).json({ success: true, inquiry: newInq });
});

// Update inquiry status (from mobile app)
inquiryRouter.patch('/:inquiryId', (req: Request, res: Response) => {
  const { inquiryId } = req.params;
  const { status } = req.body;

  const updated = productService.updateInquiryStatus(inquiryId, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Inquiry not found' });
  }

  res.json({ success: true, inquiry: updated });
});
