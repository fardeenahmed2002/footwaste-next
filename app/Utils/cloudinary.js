import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadInCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })
    stream.end(buffer)
  })
}

export const deleteImageByUrl = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })
  })
}

export const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl.includes('/upload/')) {
      throw new Error('Invalid Cloudinary URL')
    }
    const parts = imageUrl.split('/')
    const filename = parts.pop().split('.')[0]
    const folder = parts.pop()                      
    const publicId = `${folder}/${filename}`

    return await deleteImageByUrl(publicId)
  } catch (error) {
    return { success: false, message: 'Failed to extract publicId', error: error.message }
  }
}