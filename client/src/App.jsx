import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import FileUploadPage from './Pages/FileUpload';
import SummaryPage from './Pages/Summary';
import QuestionPage from './Pages/Question';
import SignUp from './Components/SignUp';
import './App.css';

function App() {
  const [pdfText, setPdfText] = useState('');
  const [summary, setSummary] = useState('');
  const [quesArray, setQuesArray] = useState([]);
  const [fileId, setFileId] = useState('');

  return (
    <div className="min-h-screen bg-modern-cream text-modern-charcoal font-sans">
      <Router>
        <NavBar />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/upload" element={
              <FileUploadPage
                setPdfText={setPdfText}
                setFileId={setFileId}
              />
            } />
            <Route path="/summary" element={
              <SummaryPage
                pdfText={pdfText}
                setSummary={setSummary}
                summary={summary}
              />
            } />
            <Route path="/question" element={
              <QuestionPage
                fileId={fileId}
                quesArray={quesArray}
                setQuesArray={setQuesArray}
              />
            } />
            {/* <Route path="*" element={<Navigate to="/upload" replace />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
