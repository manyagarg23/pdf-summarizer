// Summary Component

import React from 'react';

function Summary({ summary }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-modern-charcoal flex items-center gap-2">
        <span>📝</span> Summary
      </h3>
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <p className="text-green-800 text-sm leading-relaxed">
          {summary}
        </p>
      </div>
    </div>
  );
}
export default Summary;