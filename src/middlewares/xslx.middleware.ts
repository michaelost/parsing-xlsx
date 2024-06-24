import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';
import XLSX from 'xlsx';
import { formatSheetData } from '@/utils/formatSheetData';

export const xlsxMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).send('File is required');
  }
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
    console.log('sheet ', sheet);

    req.parsedFile = formatSheetData(sheet);
    next();
  } catch (parseError) {
    console.error('Error parsing XLS file:', parseError);
    return res.status(500).send('Error parsing XLS file');
  }
};
