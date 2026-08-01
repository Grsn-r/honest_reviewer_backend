import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (buffer, folder = 'honest-reviewer') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [
          {
            width: 500,
            height: 500,
            crop: 'limit',
          },
          {
            quality: 'auto',
            fetch_format: 'auto',
          },
        ],
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      }
    );

    stream.end(buffer);
  });
};

export default uploadToCloudinary;