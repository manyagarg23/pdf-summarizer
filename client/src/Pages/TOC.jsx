import React from 'react';

export default function TOC({ toc }) {
  // Try to split on patterns like "1. ", "2. ", etc.
  const tocItems = toc.split(/(?=\d+\.\s)/).filter(item => item.trim() !== '');

  return (
    <div style={{ marginTop: "30px", textAlign: "left", maxWidth: "700px", marginInline: "auto" }}>
      <h2>📑 Table of Contents</h2>
      <ol style={{ paddingLeft: "20px", lineHeight: "1.6", fontSize: "16px" }}>
        {tocItems.map((item, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            {item.trim()}
          </li>
        ))}
      </ol>
    </div>
  );
}
