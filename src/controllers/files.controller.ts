import { NextFunction, Request, Response } from 'express';

export class FileController {
  public parseFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(201).json({ data: req.processedFile, message: 'parsedFile' });
    } catch (error) {
      next(error);
    }
  };
}
