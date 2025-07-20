const fs = require('fs');
const pdfParse = require('pdf-parse');

const extractText = async (pdfFile) => {
    const dataBuffer = fs.readFileSync(pdfFile);
    const data = await pdfParse(dataBuffer);
    console.log("Extracted text from PDF:", data.text);
    return data.text;
};

module.exports = extractText;