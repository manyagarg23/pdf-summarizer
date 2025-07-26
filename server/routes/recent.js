// routes/files.js (or wherever your routes are defined)
const express = require("express");
const router = express.Router();
const FileCollection = require("../models/FileModel");
const UserCollection = require("../models/UserModel");

router.get("/recent", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const user = await UserCollection.findOne({ emailID: email });
    // console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // console.log("Fetching recent documents for user:", user.emailID);
    const recentDocs = await FileCollection.find({ userId: user.emailID })
      .sort({ uploadDate: -1 })
      .limit(3); // Adjust limit if needed

    // console.log("Recent documents fetched:", recentDocs);
      res.json(recentDocs);

  } catch (err) {
    console.error("Failed to fetch recent documents:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
