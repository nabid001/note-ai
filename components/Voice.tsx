"use client";
import React, { useState } from "react";

const Voice = () => {
  const [text, setText] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleRecord = async () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Enable continuous listening
    recognition.interimResults = true; // Allow interim results

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript.trim();
        setText(transcript);

        if (event.results[i].isFinal) {
          if (transcript.toLowerCase().startsWith("question")) {
            const question = transcript.replace(/^question\s*/i, "") + "?";
            setQuestions((prev) => [...prev, question]);
          } else if (transcript.toLowerCase().startsWith("answer")) {
            const answer = transcript.replace(/^answer\s*/i, "");
            setAnswers((prev) => [...prev, answer]);
          } else if (
            transcript.toLowerCase() === "ok" ||
            transcript.toLowerCase() === "done"
          ) {
            recognition.stop();
            break;
          }
        }
      }
    };

    recognition.start();
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteAnswer = (index: number) => {
    setAnswers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <button onClick={() => handleRecord()}>Start</button>
      <div>
        <h2>Questions</h2>
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              {question}{" "}
              <button onClick={() => handleDeleteQuestion(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Answers</h2>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              {answer}{" "}
              <button onClick={() => handleDeleteAnswer(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Voice;
