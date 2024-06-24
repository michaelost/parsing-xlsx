import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import { genericValidation } from '@/utils/files/validation/genericValidation';
import { FormattedData } from '@/utils/files/types';

export const fileValidation = (req: Request, res: Response, next: NextFunction) => {
  // generic validation
  const { invoicingMonth } = req.query
  const parsedFile = req.parsedFile
  console.log('parsedFile ', parsedFile)
  if (!invoicingMonth) {
    next(new HttpException(401, 'No Invoicing Month provided'));
  }

  if (!parsedFile.date) {
    next(new HttpException(401, 'Date is missing in the document'));
  }
  console.log('invoicingMonth ', invoicingMonth)

  try {

    const genericErrors = genericValidation(invoicingMonth as string, parsedFile as FormattedData)
    console.log('genericErrors ', genericErrors )
    if (genericErrors.length > 0) {
      next(new HttpException(422, genericErrors.join(' ')))
    }

  } catch(err) {
    console.log('err ', err)
  }

  next();
};
