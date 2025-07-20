
import React, { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

function FileUpload({ setPdfText, setFileId }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (files) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setPdfText(res.data.extractedText);
      setFileId(res.data.id);
      navigate("/summary"); 
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-modern-brick">📤 Upload PDF</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {loading && <LoadingSpinner />}
    </div>
  );
}

export default FileUpload;
