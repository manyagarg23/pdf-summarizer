// Pages/Summary.jsx
import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export default function Summary({ summary }) {
  return (
    <div style={{ marginTop: "30px", maxWidth: "700px", marginInline: "auto", textAlign: "left" }}>
      <h2>📝 Summary</h2>
      <p style={{
        background: "#ecfccb",
        padding: "15px",
        borderRadius: "8px",
        fontSize: "16px",
        color: "#365314",
        lineHeight: "1.6"
      }}>
        {summary}
      </p>
    </div>
  );
}