const express = require("express");
const router = express.Router();
const multer = require("multer");
const { saveFileInfo } = require("../controllers/FileController");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), saveFileInfo);

module.exports = router;