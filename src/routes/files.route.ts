import { Router } from 'express';
import { FileController } from '@controllers/files.controller';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidateFileUploadMiddleware, fileValidation } from '@/middlewares/files/fileValidation.middleware';
import { multerMiddleware } from '@/middlewares/files/multer.middleware';
import { xlsxMiddleware } from '@/middlewares/files/xslx.middleware';
import { parsingMiddleware } from '@/middlewares/files/parsing.middleware';

export class FileRoute implements Routes {
  public path = '/files';
  public router = Router();
  public file = new FileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, multerMiddleware(), xlsxMiddleware, parsingMiddleware, fileValidation, /*ValidateFileUploadMiddleware({}), */ this.file.parseFile);
  }
}
