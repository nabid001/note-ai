"use client";
import React, { useState, useRef } from "react";
import { Button } from "./ui/button";

const Voice = () => {
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState<string>();
  const [answers, setAnswers] = useState<string>();

  const handleRecord = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      if (transcript.toLowerCase().startsWith("question")) {
        const question = transcript.replace(/^question\s*/i, "").trim() + "?";
        // setQuestions((prev) => [...prev, question]);
        setQuestions(question);
      } else {
        const answer = transcript.replace(/^answer\s*/i, "") + ".";
        // setAnswers((prev) => [...prev, answer]);
        setAnswers(answer);
      }
    };

    recognition.start();
  };

  const handleClear = () => {
    setQuestions("");
    setAnswers("");
  };

  return (
    <>
      <div className="flex gap-3">
        <Button variant="outline" onClick={handleRecord}>
          Start
        </Button>
        <Button variant="destructive" onClick={handleClear}>
          Clear
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <h2>QA Pairs</h2>
        {questions && <b>Q: {questions}</b>}
        {answers && <b>A: {answers}</b>}
      </div>
    </>
  );
};

export default Voice;
