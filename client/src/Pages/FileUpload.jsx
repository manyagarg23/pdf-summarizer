// FileUpload Component

import React, { useState } from 'react';

function FileUpload({ onFileUpload }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    onFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    onFileUpload(files);
  };

  return (
    <div
      className={`border-4 border-dashed rounded-2xl p-6 w-full transition-all duration-300 ${
        isDragging ? 'border-modern-blue bg-blue-50 shadow-lg scale-105' : 'border-gray-300 bg-white'
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-center space-y-4">
        <p className="text-4xl">📄</p>
        <p className="text-md font-medium text-modern-charcoal">Drag & drop your PDF here</p>
        <p className="text-sm text-gray-500">or</p>
<label 
  className="inline-block cursor-pointer text-white px-4 py-2 rounded-lg transition hover:opacity-90"
  style={{
    backgroundColor: '#729598'
  }}
  onMouseEnter={(e) => e.target.style.backgroundColor = '#5a7b7e'}
  onMouseLeave={(e) => e.target.style.backgroundColor = '#729598'}
>
  Choose File
  <input type="file" accept="application/pdf" onChange={handleFileSelect} className="hidden" />
</label>
      </div>
    </div>
  );
}

export default FileUpload;