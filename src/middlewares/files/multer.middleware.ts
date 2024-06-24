import multer from 'multer';
import { HttpException } from '@/exceptions/httpException';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

export function multerMiddleware() {
  return (req, res, next) => {
    return upload(req, res, err => {
      if (err) {
        next(new HttpException(500, err.message));
      } else {
        if (!req.file) {
          next(new HttpException(400, 'No file uploaded!'));
        }
      }
      next();
    });
  };
}
