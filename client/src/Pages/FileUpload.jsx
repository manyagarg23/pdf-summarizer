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
    <div className="flex items-center justify-center bg-gray-100 px-4 py-8">
      <div
        className={`border-4 border-dashed rounded-2xl p-10 w-full max-w-xl bg-white transition-all duration-300 ${
          isDragging ? 'border-blue-500 bg-blue-50 shadow-lg scale-105' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="text-center space-y-4">
          <p className="text-5xl">📄</p>
          <p className="text-lg font-medium text-gray-700">Drag & drop your PDF here</p>
          <p className="text-sm text-gray-500">or</p>
          <label className="inline-block cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Choose File
            <input type="file" accept="application/pdf" onChange={handleFileSelect} hidden />
          </label>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
