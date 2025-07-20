const express = require("express");
const router = express.Router();
const summarizeText = require("../services/summaryService");

router.post("/summary", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No text provided for summarization" });
    }
    const summary = await summarizeText(text);
    res.json({ summary });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

module.exports = router;