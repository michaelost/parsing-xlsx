import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { genericValidation } from '@/utils/files/validation/genericValidation';
import { FormattedData } from '@/utils/files/types';
import { processFile } from '@/utils/files/processing/processFile';

export const fileProcessing = (req: Request, res: Response, next: NextFunction) => {
  // generic validation
  const { invoicingMonth } = req.query;
  const parsedFile = req.parsedFile;

  try {
    req.processedFile = processFile(parsedFile as FormattedData, invoicingMonth as string);
  } catch (err) {
    next(new HttpException(422, err.message));
  }

  next();
};
