"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

const Voice = () => {
  const [text, setText] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleRecord = async () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.onresult = async (event: SpeechRecognitionEvent) => {
      console.log(event);
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      if (transcript.toLowerCase().startsWith("question")) {
        const question = transcript.replace(/^question\s*/i, "") + "?";
        setQuestions((prev) => [...prev, question]);
      } else {
        setAnswers((prev) => [...prev, transcript]);
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
      <Button variant={"outline"} onClick={() => handleRecord()}>
        Start
      </Button>
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
