"use client";

import React, { useState } from "react";

const Voice = () => {
  const [text, setText] = useState<string>();
  const handleRecord = async () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.onresult = async (event: any) => {
      console.log(event);
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.start();
  };
  return (
    <div>
      <p>Spoken Text: {text}</p>
      <button onClick={() => handleRecord()}>Start</button>
    </div>
  );
};

export default Voice;
