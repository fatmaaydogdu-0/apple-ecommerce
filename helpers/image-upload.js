const multer = require("multer");
const path = require("path");

// resim yükleme 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/images/');
    },
    filename: function(req, file, cb) {
        cb(null, path.parse(file.originalname).name + "-" + Date.now() + path.extname(file.originalname));
    }
});

// multer yükleme
const upload = multer({
    storage: storage
});

module.exports.upload = upload;