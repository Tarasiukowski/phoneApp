import { Router } from 'express';
import { generateController } from '../controllers/generateController';

export const generateRouter = Router();

generateRouter
  .get('/randomNumbers', generateController.randomNumbers)
  .post('/allNumbers', generateController.allNumbers);
