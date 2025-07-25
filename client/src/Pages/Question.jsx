// Question Component

import React, { useState } from 'react';

function Question({ handleQuestions }) {
  const [question, setQuestion] = useState("");

  function handleChange(event) {
    setQuestion(event.target.value);
  }

  function handleSubmit() {
    if (question.trim() !== "") {
      handleQuestions(question);
      setQuestion("");
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-modern-charcoal mb-3">Ask a Question</h3>
      <div className="space-y-3">
        <input
          type="text"
          value={question}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question about the PDF..."
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-modern-charcoal focus:outline-none focus:ring-2 focus:ring-modern-blue focus:border-transparent"
        />
        <button
          onClick={handleSubmit}
          className="text-white px-6 py-3 rounded-lg transition font-medium hover:opacity-90"
              style={{ backgroundColor: '#729598' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a7b7e'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#729598'}
        >
          Submit Question
        </button>
      </div>
    </div>
  );
}

export default Question;