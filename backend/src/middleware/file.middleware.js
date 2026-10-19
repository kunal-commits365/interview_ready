const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            return cb(null, true)
        }

        cb(new Error('Only PDF files are allowed'))
    }
})

module.exports  = upload
