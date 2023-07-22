const multer = require("multer");
const path = require("path");
const slugify = require("slugify");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = file.originalname.replace(
      path.extname(file.originalname),
      ""
    );
    const fileName =
      slugify(originalName, { lower: true, strict: true }) + "-" + uniqueSuffix;
    cb(null, fileName + path.extname(file.originalname)); // Set a unique filename for the uploaded file
  },
});

// Define the file filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

// Custom middleware function to handle file upload and validation
const multerUpload = (fieldName) => (req, res, next) => {
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5, // 5MB file size limit
    },
    fileFilter: fileFilter,
  }).single(fieldName);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during upload
      return res
        .status(400)
        .json({ message: "File upload error.", error: err.message });
    } else if (err) {
      // An unknown error occurred during upload
      return res
        .status(400)
        .json({ message: "File upload error.", error: err.message });
    }

    // Check if no files were uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded." });
    }

    next();
  });
};

module.exports = { multerUpload };
