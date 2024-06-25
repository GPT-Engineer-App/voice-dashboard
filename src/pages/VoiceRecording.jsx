import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

const VoiceRecording = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    document.body.classList.add("bg-background", "text-foreground");
    return () => {
      document.body.classList.remove("bg-background", "text-foreground");
    };
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      const audioBlob = new Blob([event.data], { type: "audio/wav" });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Voice Recording</h1>
      <div className="flex items-center space-x-4 mb-4">
        {recording ? (
          <Button onClick={stopRecording}>Stop Recording</Button>
        ) : (
          <Button onClick={startRecording}>Start Recording</Button>
        )}
      </div>
      {audioURL && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Recorded Audio:</h2>
          <audio ref={audioRef} controls src={audioURL} />
        </div>
      )}
    </div>
  );
};

export default VoiceRecording;