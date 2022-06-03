const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, path.join(__dirname + "/../uploads/"));
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const multerSetup = multer({ storage: diskStorage });

module.exports = { multerSetup };
