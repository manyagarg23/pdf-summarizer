const express = require("express");
const router = express.Router();
const generateRecs = require("../services/recommendService");

router.post("/recommend", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }
    const rec = await generateRecs(text);
    res.json({ articles: rec });
  } catch (error) {
    console.error("Error generating Recommendations:", error);
    res.status(500).json({ error: "Failed to generate Recommendations" });
  }
});

module.exports = router;