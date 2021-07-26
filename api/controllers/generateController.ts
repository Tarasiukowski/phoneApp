import { Request, Response } from 'express';

import { getAllNumbers, getRandomNumbers } from '../utils';

export const generateController = {
  async randomNumbers(_: Request, res: Response) {
    const numbers = await getRandomNumbers();

    res.json({ numbers });
  },
  async allNumbers(req: Request, res: Response) {
    const { include, startWith } = req.body;

    const numbers = await getAllNumbers(startWith, include);

    res.json({ numbers });
  },
};
