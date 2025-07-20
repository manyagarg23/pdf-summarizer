const express = require("express");
const router = express.Router();
const { askQuestion } = require("../controllers/FileController");


router.post("/question", askQuestion);

module.exports = router;