import multer, { FileFilterCallback, diskStorage, memoryStorage } from 'multer';
import { Request } from 'express';
import { RESPONSE_STRING } from '../../common';

/**
 * Normal method that can store any type of file in local system and then upload it in database
*/ 
export function multerStorageManager(folderPath: string, fileType: string): multer.Multer {
    const storage = diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + `../../../assets/uploads/${folderPath}`);
        },
        filename: function (req, file, cb) {
            let ext = file.originalname.split('.').pop();
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + '.' + ext);
        },
    });

    const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
        // Accept image files only
        if (fileType === 'image') {
            if (
                !file.originalname.match(
                    /\.(jpg|jpeg|png|gif|pdf|mp4|mov|wmv|avi|avchd|flv|f4v|swf|mkv|webm|html5)$/i,
                )
            ) {
                return cb(new Error(RESPONSE_STRING.VALIDATION.PROFILE.IMAGE_TYPE_ERROR));
            }
        }
        cb(null, true);
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fieldSize: 2 * 1024 * 1024 },
    });
}

/**
 * Use buffer here to store any type of file in buffer storage so no need to store in local system 
*/
export function multerStorageManagerBuffer(): multer.Multer {
    const storage = memoryStorage(); // Use memory storage instead of disk storage

    const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
        if (
            !file.originalname.match(
                /\.(jpg|jpeg|png|gif|pdf|mp4|mov|wmv|avi|avchd|flv|f4v|swf|mkv|webm|html5|webp)$/i,
            )
        ) {
            return cb(new Error(RESPONSE_STRING.VALIDATION.PROFILE.IMAGE_TYPE_ERROR));
        }
        cb(null, true);
    };

    return multer({ storage, fileFilter });
}