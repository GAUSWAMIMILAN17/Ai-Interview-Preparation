// import multer from "multer";
// import path from "path";

// // Configure Storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },

//     filename: (req, file, cb) => {
//         // Get file extension (.png, .jpg, etc.)
//         const ext = path.extname(file.originalname);

//         // Remove extension from original filename
//         const fileName = path.basename(file.originalname, ext);

//         // Clean filename
//         const cleanFileName = fileName
//             .replace(/\s+/g, "-")          // Replace spaces with "-"
//             .replace(/[^a-zA-Z0-9-_]/g, ""); // Remove special characters

//         // Final filename
//         cb(null, `${Date.now()}-${cleanFileName}${ext}`);
//     },
// });

// // File Filter
// const fileFilter = (req, file, cb) => {
//     const allowedTypes = [
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//     ];

//     if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(
//             new Error("Only .jpeg, .jpg and .png files are allowed"),
//             false
//         );
//     }
// };

// // Multer Upload
// const upload = multer({
//     storage,
//     fileFilter,
// });

// export default upload;


import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg and .png files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

export default upload;