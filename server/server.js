require("dotenv").config();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const extractText = require("./services/pdfParser"); 
const summarizeText = require("./services/summaryService"); 
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/upload");
const summaryRoutes = require("./routes/summary");
const questionRoutes = require("./routes/question");
const tocRoutes = require("./routes/toc");
const recRoutes = require("./routes/recommend");
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json());

app.use("/", uploadRoutes);
app.use("/", summaryRoutes);
app.use("/", questionRoutes);
app.use("/", tocRoutes);
app.use("/", recRoutes);

app.use(express.urlencoded({ extended: true }));

const uri = process.env.DATABASE_URL;

const clientOptions = { 
  serverApi: { 
    version: '1', 
    strict: true, 
    deprecationErrors: true 
  } 
};

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


app.get("/", (req, res) => {
  res.send("PDF Summarizer Backend is Running!");
});

app.get("/upload", (req, res) => {
  res.send("Upload route is live! But use POST to upload files.");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
