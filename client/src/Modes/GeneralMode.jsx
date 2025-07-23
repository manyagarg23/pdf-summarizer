import React, { useState } from 'react';
import FileUpload from '../Pages/FileUpload';
import Summary from '../Pages/Summary';
import Question from '../Pages/Question';
import TOC from '../Pages/TOC';
import FurtherReading from '../Pages/FurtherReading'; 
import RecentDoc from '../Pages/RecentDoc'; 
import axios from 'axios';
import Split from '@uiw/react-split';

export default function GeneralMode() {
  const [pdfText, setPdfText] = useState('');
  const [summary, setSummary] = useState('');
  const [toc, setToc] = useState('');
  const [quesArray, setQuesArray] = useState([]);
  const [fileId, setFileId] = useState('');
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [history, setHistory] = useState([]);

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setPdfText(res.data.extractedText);
      setFileId(res.data.id);
      // recommending articles
      try {
  const articlesRes = await axios.post("http://localhost:5000/recommend", {
    text: res.data.extractedText,
  });
  setRelatedArticles(articlesRes.data.articles);
} catch (err) {
  console.error("Recommendation fetch error", err);
}
//past docs history
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
    <div className="flex flex-col h-screen font-sans text-modern-charcoal bg-gray-50">

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Split
          mode="horizontal"
          style={{ height: '100%', width: '100%' }}
          min={180}
          max={400}
        >
          {/* Left Sidebar */}
          <div className="w-full max-w-[400px] min-w-[180px] bg-modern-grey p-4 flex flex-col gap-4 overflow-y-auto">
            <div className="bg-modern-cream p-4 rounded-xl shadow-sm">
              <FileUpload onFileUpload={handleFileUpload} />
            </div>

            {/* Past Docs Section*/}
            <RecentDoc history={history} />

            {/* Further Reading Section*/}
            <FurtherReading articles={relatedArticles} />
          </div>

          {/* Center PDF Viewer */}
          <div className="flex-1 p-6 bg-white overflow-y-auto">
            {pdfText ? (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-modern-charcoal flex items-center gap-2">
                  <span>📄</span> Extracted Text
                </h2>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-6">
                  <pre className="text-sm text-modern-charcoal whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {pdfText}
                  </pre>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div className="space-y-4">
                  <div className="text-6xl opacity-50">📄</div>
                  <p className="text-gray-500 text-lg">Upload a PDF to get started</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-full max-w-[700px] min-w-[180px] p-4 bg-modern-grey flex flex-col gap-4 overflow-y-auto">
            <button
              onClick={handleSummarize}
              className="text-white px-6 py-3 rounded-lg transition font-medium hover:opacity-90"
              style={{ backgroundColor: '#729598' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a7b7e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#729598'}
            >
              Generate Summary
            </button>

            <button
              onClick={handleTOC}
              className="text-white px-6 py-3 rounded-lg transition font-medium hover:opacity-90"
              style={{ backgroundColor: '#729598' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a7b7e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#729598'}
            >
              Generate TOC
            </button>

            {toc && (
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <TOC toc={toc} />
              </div>
            )}
            {summary && (
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <Summary summary={summary} />
              </div>
            )}
            {pdfText && (
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <Question handleQuestions={handleQuestions} />
              </div>
            )}

            {/* Q&A Section */}
            <div className="p-6 bg-modern-cream border-t border-gray-200 max-h-80 overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 text-modern-charcoal flex items-center gap-2">
                <span>🧠</span> Questions & Answers
              </h2>
              {quesArray.length === 0 ? (
                <p className="text-gray-500 italic">No questions available yet.</p>
              ) : (
                <div className="space-y-4">
                  {quesArray.map((qna, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="font-semibold text-modern-charcoal mb-2">
                        <span className="text-modern-blue">Q:</span> {qna.question}
                      </p>
                      <p className="text-gray-700 text-sm">
                        <span className="text-modern-brick font-semibold">A:</span> {qna.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Split>
      </div>
    </div>
  );
}
