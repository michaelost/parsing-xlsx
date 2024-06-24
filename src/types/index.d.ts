import { Request } from 'express';
import { File as MulterFile } from 'multer';
import { ProcessedFile } from '@/utils/files/processing/processFile';
import { FormattedData } from '@/utils/files/types';
import { Sheet } from '@/utils/files/types';

declare global {
  namespace Express {
    interface Request {
      file?: MulterFile;
      parsedFile?: FormattedData | Sheet;
      processedFile?: ProcessedFile;
    }
  }
}
