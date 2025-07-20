// Pages/QuestionPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Question({ fileId, quesArray, setQuesArray }) {
  const [loading, setLoading] = useState(false);

  const handleQuestions = async (questionText) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/question", {
        question: questionText,
        fileId,
      });
      setQuesArray(prev => [...prev, { question: questionText, answer: res.data.answer }]);
    } catch (err) {
      console.error("Question error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-modern-brick mb-4">❓ Q&A</h1>
      <Question handleQuestions={handleQuestions} />
      {loading && <p>Loading answer...</p>}
      {quesArray.length > 0 && (
        <div className="bg-white p-4 rounded shadow mt-4">
          <ul className="space-y-3 text-sm">
            {quesArray.map((qna, idx) => (
              <li key={idx} className="border-b pb-2">
                <strong className="text-modern-brick">Q:</strong> {qna.question}<br />
                <strong className="text-modern-blue">A:</strong> {qna.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Question;
