import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import XLSX from 'xlsx';

export const xlsxMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).send('File is required');
  }
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
    req.parsedFile = sheet;
    next();
  } catch (parseError) {
    //    console.error('Error parsing XLS file:', parseError.mesasge);
    //    console.error('Error parsing XLS file: message', parseError.message);
    console.log(parseError.message);
    next(new HttpException(422, parseError.message || 'Error parsing XLS file'));
  }
};
