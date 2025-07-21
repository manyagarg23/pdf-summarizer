// Pages/QuestionPage.jsx
import React, { useState } from "react";

function Question({ handleQuestions }) {
  const [question, setQuestion] = useState("");

  function handleChange(event) {
    setQuestion(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (question.trim() !== "") {
      handleQuestions(question);
      setQuestion("");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      <input
        type="text"
        value={question}
        onChange={handleChange}
        placeholder="Ask a question about the PDF"
        style={{ padding: "10px", width: "60%", fontSize: "14px", borderRadius: "4px" }}
      />
      <button
        type="submit"
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default Question;