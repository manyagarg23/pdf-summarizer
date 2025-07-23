const express = require("express");
const router = express.Router();
const tocService = require("../services/tocService");

router.post("/toc", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }
    const toc = await summarizeText(text);
    res.json({ toc });
  } catch (error) {
    console.error("Error generating TOC:", error);
    res.status(500).json({ error: "Failed to generate TOC" });
  }
});

module.exports = router;