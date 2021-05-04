import { Request, Response } from 'express';

import { randomNumbers } from '../utils';
import { allNumbers } from '../utils/numbers';

class GenerateController {
  async randomNumbers(_: Request, res: Response) {
    const numbers = await randomNumbers();

    res.send(numbers);
  }

  async allNumbers(req: Request, res: Response) {
    const { filter, lastNumber } = req.body;

    const numbers = allNumbers(filter, lastNumber);

    res.send(numbers);
  }
}

export const generateController = new GenerateController();
