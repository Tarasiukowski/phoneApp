import { Request, Response } from 'express';

import { allNumbers, generateNumberContaining, unformat, randomNumbers } from '../utils';

class GenerateController {
  async randomNumbers(_: Request, res: Response) {
    const numbers = await randomNumbers();

    res.send(numbers);
  }

  async allNumbers(req: Request, res: Response) {
    const { lastNumber, filter } = req.body;

    if (filter) {
      const containNumbers = generateNumberContaining(
        filter,
        lastNumber ? unformat(lastNumber) : undefined,
      );

      res.send({ numbers: containNumbers, lastNumber });

      return;
    }

    const numbers = await allNumbers(lastNumber, 20);

    res.send({ numbers, lastNumber });
  }
}

export const generateController = new GenerateController();
