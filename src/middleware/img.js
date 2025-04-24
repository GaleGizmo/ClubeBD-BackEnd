const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

if (!process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET) {
throw new Error('Faltan las credenciales de Cloudinary en las variables de entorno');
}
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Verificación del tipo MIME manual adicional (opcional)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Formato de imagen no permitido');
      error.statusCode = 400;
      throw error;
    }

    return {
      folder: 'comics',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [
        { width: 600, crop: 'limit' },
        { quality: 'auto', fetch_format: 'auto' }
      ]
    };
  },
});
function handleUploadErrors(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: `Error al subir la imagen: ${err.message}` });
  } else if (err) {
    return res.status(err.statusCode || 500).json({ error: err.message || 'Error interno' });
  }
  next();
}

const upload = multer({ storage: storage });
module.exports = {
  upload,
  handleUploadErrors,
};