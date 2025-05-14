// uploadimage.js
import fs from 'fs';
import path from 'path';
import { Canvas, Image, ImageData } from 'canvas';
import { loadImage } from 'canvas';
import * as faceapi from 'face-api.js';
// import * as tf from '@tensorflow/tfjs';

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

let modelsLoaded = false;
const loadModels = async () => {
  if (!modelsLoaded) {
    const modelPath = path.join(process.cwd(), 'models'); // Put all model files here
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
    modelsLoaded = true;
  }
};

export const uploadProfileImage = async (formData, fieldName) => {
  const file = formData.get(fieldName);
  let filename = '';

  if (file && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    filename = Date.now() + '-' + file.name.replace(/\s+/g, '');
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    fs.mkdirSync(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    // Load models and check for face
    await loadModels();
    const image = await loadImage(filepath);
    const detections = await faceapi.detectAllFaces(image);

    if (detections.length === 0) {
      // Delete image if no face found
      fs.unlinkSync(filepath);
      return { success: false, message: "No human face detected in uploaded image." };
    }
  }

  return filename ? `/uploads/${filename}` : '';
}
export const uploadCertificateImage = async (formData, fieldName, defaultPath) => {
  const file = formData.get(fieldName);
  let filename = '';
  const defaultImgPath = defaultPath

  if (file && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    filename = Date.now() + '-' + file.name.replace(/\s+/g, '');
    const uploadDir = path.join(process.cwd(), 'public', 'certificate')
    fs.mkdirSync(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
  }
  return filename ? `/uploads/${filename}` : defaultImgPath;
}

export const ImageofFood = async (formData, fieldName, defaultPath) => {
  const file = formData.get(fieldName);
  let filename = '';
  const defaultImgPath = defaultPath

  if (file && file.name) {
    const buffer = Buffer.from(await file.arrayBuffer());
    filename = Date.now() + '-' + file.name.replace(/\s+/g, '');
    const uploadDir = path.join(process.cwd(), 'public', 'foods');
    fs.mkdirSync(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);
  }
  return filename ? `/uploads/${filename}` : defaultImgPath;
}