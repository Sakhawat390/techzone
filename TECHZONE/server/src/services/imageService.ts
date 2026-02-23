import { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadImage = upload.single('image');

export const handleImageUpload = async (req: Request, res: Response) => {
  try {
    if (!(req as any).file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const streamUpload = (file: any) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error: any, result: any) => {
          if (error) return reject(error);
          resolve(result);
        });
        file.stream.pipe(stream);
      });
    };

    const result: any = await streamUpload((req as any).file);
    res.status(200).json({ message: 'Image uploaded successfully', url: result.secure_url });
  } catch (error) {
    const err = error as any;
    res.status(500).json({ message: 'An error occurred', error: err?.message || err });
  }
};