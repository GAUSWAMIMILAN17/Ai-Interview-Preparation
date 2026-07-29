import cloudinary from "../config/cloudinary.js";
// console.log(cloudinary.config());
import streamifier from "streamifier";

const uploadToCloudinary = (fileBuffer, folder = "profile-images") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export default uploadToCloudinary;