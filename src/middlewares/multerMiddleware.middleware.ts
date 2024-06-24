import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/httpException';

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('file');

export function multerMiddleware() {
  return (req, res, next) => {
    return upload(req, res, err => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        if (!req.file) {
          res.status(400).json({ message: 'No file uploaded!' });
        }
      }
      next();
    });
  };
}