import React from 'react';

// TOC Component
function TOC({ toc }) {
  const tocItems = toc.split(/(?=\d+\.\s)/).filter(item => item.trim() !== '');

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-modern-charcoal flex items-center gap-2">
        <span>📑</span> Table of Contents
      </h3>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-h-64 overflow-y-auto">
        <ol className="space-y-2 text-sm text-blue-800">
          {tocItems.map((item, index) => (
            <li key={index} className="leading-relaxed">
              {item.trim()}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default TOC;
