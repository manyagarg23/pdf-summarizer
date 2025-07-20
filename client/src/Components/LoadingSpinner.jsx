import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center my-6">
  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-modern-blue"></div>
  <p className="ml-4 text-modern-charcoal">Processing...</p>
</div>
  );
}
