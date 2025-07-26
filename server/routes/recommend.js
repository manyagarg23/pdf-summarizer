// const express = require("express");
// const router = express.Router();
// const generateRecs = require("../services/recommendService");

// router.post("/recommend", async (req, res) => {
//   try {
//     const { text } = req.body;
//     if (!text) {
//       return res.status(400).json({ error: "No text provided" });
//     }
//     const rec = await generateRecs(text);
//     res.json({ articles: rec });
//   } catch (error) {
//     console.error("Error generating Recommendations:", error);
//     res.status(500).json({ error: "Failed to generate Recommendations" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const generateRecs = require("../services/recommendService");

router.post("/recommend", async (req, res) => {
  try {
    const { text } = req.body;
    const articles = await generateRecs(text);
    console.log("Generated recommendations:", articles);
    if (!articles || articles.length === 0) {
      return res.status(404).json({ error: "No recommendations found" });
    }
    res.json({ articles }); // always returns { articles: [...] }
  } catch (err) {
    console.error("Error in /recommend:", err);
    res.status(500).json({ error: "Failed to generate recommendations", details: err.message });
  }
});

module.exports = router;
