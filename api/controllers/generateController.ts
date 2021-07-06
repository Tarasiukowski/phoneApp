import { Request, Response } from 'express';

import { getAllNumbers, getRandomNumbers } from '../utils';

class GenerateController {
  async randomNumbers(_: Request, res: Response) {
    const numbers = await getRandomNumbers();

    res.send({ numbers });
  }

  async allNumbers(req: Request, res: Response) {
    const { filter, lastNumber } = req.body;

    const numbers = await getAllNumbers(filter, lastNumber);

    res.send({ numbers });
  }
}

export const generateController = new GenerateController();
