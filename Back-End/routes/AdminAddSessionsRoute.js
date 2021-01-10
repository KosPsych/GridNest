module.exports = (app) => {
    const Add_Sessions = require('../controllers/AdminAddSessionsController')
    const verifyToken = require('../controllers/VerifyTokenController')
    const multer = require('multer')
    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './upload_folder')
        },
        filename: function (req, file, cb) {
            cb(null, "upload_file.csv")
        }
        })
        
    let upload = multer({ storage: storage }) 
    app.post('/evcharge/api/admin/system/sessionsupd',[ verifyToken,upload.single('file')], Add_Sessions)
}


