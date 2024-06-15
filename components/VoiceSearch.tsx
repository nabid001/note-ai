// src/VoiceSearch.js
import React, { useState, useEffect } from "react";

const VoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const interimTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      setTranscript(interimTranscript);
    };

    recognition.onerror = (event) => {
      setError(event.error);
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening]);

  return (
    <div>
      <button onClick={() => setIsListening((prevState) => !prevState)}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>{transcript}</p>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default VoiceSearch;
