import { Router, Request, Response } from 'express';
import { initialUsers } from '../data/mockData';

export const authRouter = Router();

authRouter.post('/login', (req: Request, res: Response) => {
  const { email } = req.body;
  const user = initialUsers.find((u) => u.email.toLowerCase() === (email || '').toLowerCase()) || initialUsers[0];

  res.json({
    success: true,
    token: `jwt-token-${user.id}-${Date.now()}`,
    user
  });
});

authRouter.get('/me', (req: Request, res: Response) => {
  res.json({
    success: true,
    user: initialUsers[0]
  });
});
