import fs from 'fs';
import path from 'path';
import { Canvas, Image, ImageData } from 'canvas';
import { loadImage } from 'canvas';
import * as faceapi from 'face-api.js';
import { uploadInCloudinary } from './cloudinary';
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
let modelsLoaded = false;
const loadModels = async () => {
  if (!modelsLoaded) {
    const modelPath = path.join(process.cwd(), 'models');
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    modelsLoaded = true;
  }
}
export const uploadProfileImage = async (formData, fieldName) => {
  const file = formData.get(fieldName);
  if (!file || !file.name) {
    return { success: false, message: "No file uploaded." };
  }
  const MAX_SIZE = 3 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { success: false, message: "File size exceeds 3MB limit." };
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  await loadModels();
  const img = await loadImage(buffer);
  const detections = await faceapi.detectAllFaces(img);
  if (detections.length === 0) {
    return { success: false, message: "No human face detected in uploaded image." };
  }
  if (process.env.USE_CLOUDINARY === 'true') {
    try {
      const result = await uploadInCloudinary(buffer, { folder: 'profiles' });
      return { success: true, url: result.secure_url };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return { success: false, message: "Cloud upload failed." };
    }
  } else {
    const filename = Date.now() + '-' + file.name.replace(/\s+/g, '');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    fs.mkdirSync(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
    return { success: true, url: `/uploads/${filename}` };
  }
}

export const uploadCertificateImage = async (formData, fieldName) => {
  const file = formData.get(fieldName);
  let filename = '';
  if (file && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    filename = Date.now() + '-' + file.name.replace(/\s+/g, '');
    const uploadDir = path.join(process.cwd(), 'public', 'certificate')
    fs.mkdirSync(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
  }
  return filename ? `/certificate/${filename}` : null;
}

export const uploadImage = async (formData, fieldName, foldername) => {
  const file = formData.get(fieldName)
  if (!file || !file.name) return null

  const MAX_SIZE = 2 * 1024 * 1024
  if (file.size > MAX_SIZE) {
    throw new Error('File size exceeds 2MB limit');
  }
  const buffer = Buffer.from(await file.arrayBuffer())

  if (process.env.USE_CLOUDINARY === 'true') {
    try {
      const result = await uploadInCloudinary(buffer, { folder: foldername })
      return result.secure_url
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      return null
    }
  } else {
    const filename = Date.now() + '-' + file.name.replace(/\s+/g, '')
    const uploadDir = path.join(process.cwd(), 'public', foldername)
    fs.mkdirSync(uploadDir, { recursive: true })
    const filepath = path.join(uploadDir, filename)
    fs.writeFileSync(filepath, buffer)
    return `/${foldername}/${filename}`
  }
}