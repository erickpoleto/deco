const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const path = require('path')
const crypto = require('crypto')

const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                
                if(err) cb(err);

                file.key = `${hash.toString("hex")}-${file.originalname}`

                cb(null, file.key);
            })
        },
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'imageerick',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {

                if(err) cb(err);
                const fileName = `${hash.toString("hex")}-${file.originalname}`
                cb(null, fileName);
            })
        }
    })
}

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),

    storage: storageTypes['s3'],

    limits: {
        fileSize: 3 * 1024 * 1024, 
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
        ];
        if(allowedMimes.includes(file.mimetype)){
            cb(null, true);
        } else {
            cb(new Error("invalid file type."));
        }
    },
};