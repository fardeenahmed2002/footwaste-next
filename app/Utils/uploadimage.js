import fs from 'fs';
import path from 'path';

export const uploadImage = async (formData, fieldName, defaultPath) => {
    const file = formData.get(fieldName);
    let filename = '';
    const defaultImgPath = defaultPath

    if (file && file.name) {
        const buffer = Buffer.from(await file.arrayBuffer());
        filename = Date.now() + '-' + file.name.replace(/\s+/g, '');
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        fs.mkdirSync(uploadDir, { recursive: true });
        const filepath = path.join(uploadDir, filename);
        fs.writeFileSync(filepath, buffer);
    }
    return filename ? `/uploads/${filename}` : defaultImgPath;
};
