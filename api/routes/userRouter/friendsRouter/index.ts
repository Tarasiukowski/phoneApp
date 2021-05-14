import { Router } from 'express';

export const friendsRouter = Router();

friendsRouter.post('/get', (req, res) => {
  res.send({ ok: 's' });
});
