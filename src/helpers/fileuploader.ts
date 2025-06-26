/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Request } from 'express';
import fs from 'fs';
import multer from 'multer';

export const uploadFile = () => {
  const allowedFileTypesForImages = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
    'image/svg+xml',
  ];
   
  // Storage
  const storage = multer.diskStorage({
    destination: function (_req, file, cb) {
      let uploadPath = '';
      console.log(file)
      if (file.fieldname === 'profile_image') {
        uploadPath = 'uploads/profile_image';
      } else if (file.fieldname === 'food_images') {
        uploadPath = 'uploads/food_images';
      } else if (file.fieldname === 'cv') {
        uploadPath = 'uploads/cv';
      } else {
        uploadPath = 'uploads';
      }

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      // ✅ Don't check file type here — leave it to fileFilter
      cb(null, uploadPath);
    },

    filename: function (_req, file, cb) {
      const name = Date.now() + '-' + file.originalname;
      cb(null, name);
    },
  });

  // File filter
  const fileFilter = (_req: Request, file: any, cb: any) => {
    const allowedFieldnames = ['profile_image', 'food_images', 'cv'];

    if (!file.fieldname) {
      return cb(null, true);
    }

    if (!allowedFieldnames.includes(file.fieldname)) {
      return cb(new Error('Invalid fieldname'));
    }

    if (file.fieldname === 'cv') {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('CV must be a PDF file'));
      }
    } else {
      if (allowedFileTypesForImages.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed for this field'));
      }
    }
  };

  // Upload handler
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
  }).fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'food_images', maxCount: 10 },
    { name: 'cv', maxCount: 1 },
  ]);

  return upload;
};
