import { Router } from 'express';
import { FileController } from '@controllers/files.controller';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidateFileUploadMiddleware } from '@middlewares/fileValidation.middleware';
import { multerMiddleware } from '@/middlewares/multerMiddleware.middleware';
import { xlsxMiddleware } from '@/middlewares/xslx.middleware';

export class FileRoute implements Routes {
  public path = '/files';
  public router = Router();
  public file = new FileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, multerMiddleware(), xlsxMiddleware, /*ValidateFileUploadMiddleware({}), */ this.file.parseFile);
  }
}
