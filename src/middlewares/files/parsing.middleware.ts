import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';

import { formatSheetData } from '@/utils/files/formatting/formatSheetData';

export const parsingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.parsedFile = formatSheetData(req.parsedFile);
    next();
  } catch (parseError) {
    console.error('Error parsing file:', parseError);
    return res.status(500).send('Error parsing XLS file');
  }
};