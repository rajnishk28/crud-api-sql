const { uploadSingleFile, uploadMultipleFiles,getFilesByUserId } = require("../controllers/fileUpload.controller");
const multer = require('multer');
const router = require("express").Router();
const {checkAuth} =require("../middleware/authMiddleware")
const upload = multer({ dest: 'uploads/' });


router.post("/uploadSingle",checkAuth,upload.single("file"),uploadSingleFile);
// Get files by userId
router.get("/userFiles", checkAuth, getFilesByUserId);





module.exports = router;