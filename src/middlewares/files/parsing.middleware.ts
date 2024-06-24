import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { Sheet } from '@/utils/files/types';

import { formatSheetData } from '@/utils/files/formatting/formatSheetData';

export const parsingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.parsedFile = formatSheetData(req.parsedFile as Sheet);
    next();
  } catch (parseError) {
    next(new HttpException(422, parseError.message));
  }
};