// Pages/SummaryPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Summary({ pdfText, summary, setSummary }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/summary", { text: pdfText });
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Summary error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-modern-sage">📝 Summary Page</h1>

      {pdfText && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-lg font-semibold text-modern-charcoal mb-2">📄 Extracted Text</h2>
          <pre className="whitespace-pre-wrap text-sm">{pdfText}</pre>
          <button
            onClick={handleSummarize}
            className="mt-4 bg-modern-blue hover:bg-modern-charcoal text-white px-4 py-2 rounded"
          >
            Generate Summary
          </button>
        </div>
      )}

      {loading && <p className="mt-4">Loading...</p>}

      {summary && <Summary summary={summary} />}

      {summary && (
        <button
          onClick={() => navigate('/question')}
          className="mt-4 bg-modern-sage text-white px-4 py-2 rounded hover:bg-modern-charcoal"
        >
          Ask Questions →
        </button>
      )}
    </div>
  );
}

export default Summary;
