import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { FormattedData } from '@/utils/files/types';
import { processFile } from '@/utils/files/processing/processFile';

export const fileProcessing = (req: Request, res: Response, next: NextFunction) => {
  const { invoicingMonth } = req.query;
  const parsedFile = req.parsedFile;
  try {
    req.processedFile = processFile(parsedFile as FormattedData, invoicingMonth as string);
  } catch (err) {
    next(new HttpException(422, err.message));
  }
  next();
};
