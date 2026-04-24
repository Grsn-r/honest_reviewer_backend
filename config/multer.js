import multer from "multer";
import {v4 as uuidv4} from 'uuid';
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads'));
    },
    filename : (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const newName = `${uuidv4()}${ext}`;
        cb(null, newName)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('solo se permiten archivos de imagen'), false);
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
    }
})

export default upload;