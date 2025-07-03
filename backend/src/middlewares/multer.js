// middlewares/multer.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads folder exists
const UPLOAD_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configure disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR); // Save files in /uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const uniqueName = `${name.replace(/\s+/g, '_')}_${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

// Optional: Restrict file types
// const fileFilter = (req, file, cb) => {
//   const allowed = /jpeg|jpg|png|gif/;
//   const extValid = allowed.test(path.extname(file.originalname).toLowerCase());
//   const mimeValid = allowed.test(file.mimetype);

//   if (extValid && mimeValid) cb(null, true);
//   else cb(new Error('Only image files (jpg, png, gif) are allowed!'));
// };

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
//   fileFilter
});

module.exports = upload;
