import { Router, Request, Response } from 'express';
import { initialTemplates } from '../data/mockData';

export const templateRouter = Router();

// Get all available website templates
templateRouter.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    templates: initialTemplates
  });
});

// Get single template details
templateRouter.get('/:id', (req: Request, res: Response) => {
  const template = initialTemplates.find((t) => t.id === req.params.id);
  if (!template) {
    return res.status(404).json({ success: false, message: 'Template not found' });
  }
  res.json({ success: true, template });
});
