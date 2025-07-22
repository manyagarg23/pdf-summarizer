import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import FileUpload from './Pages/FileUpload';
import Summary from './Pages/Summary';
import Question from './Pages/Question';
import TOC from './Pages/TOC';
import SignUp from './Components/SignUp';
import './App.css';
import axios from 'axios';

function App() {
  const [pdfText, setPdfText] = useState('');
  const [summary, setSummary] = useState('');
  const [toc, setToc] = useState('');
  const [quesArray, setQuesArray] = useState([]);
  const [fileId, setFileId] = useState('');

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setPdfText(res.data.extractedText);
      setFileId(res.data.id); // Save this in a new state
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  const handleSummarize = async () => {
    try {
      const res = await axios.post("http://localhost:5000/summary", { text: pdfText });
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Summary error", err);
    }
  };

   const handleTOC = async () => {
    try {
      const res = await axios.post("http://localhost:5000/toc", { text: pdfText });
      setToc(res.data.toc);
    } catch (err) {
      console.error("TOC error", err);
    }
  };

  const handleQuestions = async (questionText) => {
    try {
      const res = await axios.post("http://localhost:5000/question", {
        question: questionText,
        fileId,
    });
      setQuesArray(prev => [...prev, { question: questionText, answer: res.data.answer }]);
    } catch (err) {
      console.error("Question error", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1 style={{ color: "#4f46e5" }}>📚 PDF Summarizer</h1>
      <FileUpload onFileUpload={handleFileUpload} />

      {pdfText && (
        <>
          <div style={{ marginTop: "30px", textAlign: "left", maxWidth: "700px", marginInline: "auto" }}>
            <h2>📄 Extracted Text</h2>
            <pre style={{
              whiteSpace: "pre-wrap",
              background: "#f1f5f9",
              padding: "20px",
              borderRadius: "8px",
              fontSize: "14px",
              color: "#111827",
              lineHeight: "1.5"
            }}>
              {pdfText}
            </pre>
          </div>
          <button
            onClick={handleSummarize}
            style={{
              marginTop: "20px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Generate Summary
          </button>

          <button onClick={handleTOC} style={{
              marginTop: "20px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
            Generate TOC
          </button>
        </>
      )}

      {summary && <Summary summary={summary} />}
      {pdfText && <Question handleQuestions={handleQuestions} />}
      
      {quesArray.length > 0 && (
        <div style={{ marginTop: "30px", textAlign: "left", maxWidth: "700px", marginInline: "auto" }}>
          <h2>🧠 Q&A</h2>
          <ul>
            {quesArray.map((qna, index) => (
              <li key={index} style={{ marginBottom: "15px" }}>
                <strong>Q:</strong> {qna.question}<br />
                <strong>A:</strong> {qna.answer}
              </li>
            ))}
          </ul>
        </div>
      )}

      {toc && <TOC toc={toc} />}

    </div>
  );
}

export default App;