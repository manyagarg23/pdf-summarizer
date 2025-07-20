const mongoose = require("mongoose");

const fileStorage = {
    userId: { type: String, required: true, index: true },
    filename: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    pdfText: { type: String, required: true },
    summary: { type: String, required: true },
    chatHistory: [
        {
            role: { type: String, enum: ["user", "assistant"], required: true },
            message: { type: String, required: true }
        }
    ]
};

const schemaOptions = {
    versionKey: false // to avoid __v field in table
};

const schema = new mongoose.Schema(fileStorage, schemaOptions);
const FileCollection = mongoose.model("FileCollection", schema);

module.exports = FileCollection;
