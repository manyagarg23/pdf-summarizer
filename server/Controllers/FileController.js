const FileCollection = require("../models/FileModel");
const fs = require("fs");
const extractText = require("../services/pdfParser");
const summarizeCode = require("../services/summaryService");
const answerQuestion = require("../services/questionService");

// Save PDF and generate summary
async function saveFileInfo(req, res) {
  try {
    const filePath = req.file.path;
    const text = await extractText(filePath);
    const customSummary = await summarizeCode(text);

    const doc = new FileCollection({
      userId: "defaultUser",
      filename: req.file.originalname,
      pdfText: text,
      summary: customSummary,
      chatHistory: [],
    });

    const result = await doc.save();

    res.status(201).json({
      message: "File saved",
      id: result._id,
      extractedText: text,
    });
  } catch (error) {
    console.error("Error saving file info:", error);
    res.status(500).json({ error: "Failed to save file" });
  }
}

// Handle QnA
async function askQuestion(req, res) {
  try {
    // console.log("Received question:", req.body);
    const { question, fileId } = req.body;
    // console.log("File ID:", fileId);
    // console.log("Question:", question);

    if (!question || !fileId) {
      return res.status(400).json({ error: "Question and fileId must be provided" });
    }

    const file = await FileCollection.findById(fileId);
    if (!file) return res.status(404).json({ error: "File not found" });

    const contextText = `${file.summary}\n\n${file.pdfText}`;
    // console.log("Context text for question:", contextText);
    const answer = await answerQuestion(question, contextText);
    // console.log("Generated answer:", answer);

file.chatHistory.push(
  { role: 'user', message: question },
  { role: 'assistant', message: answer }
);
await file.save();

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Error answering question:", error);
    res.status(500).json({ error: "Failed to answer question" });
  }
}

module.exports = {
  saveFileInfo,
  askQuestion,
};
