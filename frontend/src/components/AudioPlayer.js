import React, { useState } from "react";

const AudioPlayer = () => {
  const [selectedAudio, setSelectedAudio] = useState("");

  const audioList = [
    { name: "Classroom Language", path: "/audio/grade1/ClassrmLang.mpeg" },
    { name: "Counting Numbers", path: "/audio/grade1/CountNo.mpeg" },
    { name: "Days of Week", path: "/audio/grade1/DaysOfWeek.mpeg" },
  ];

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>🎧 Grade 1 Audio Lessons</h2>

      <select
        onChange={(e) => setSelectedAudio(e.target.value)}
        style={{ marginTop: "20px", padding: "8px", borderRadius: "8px" }}
      >
        <option value="">-- Select a Lesson --</option>
        {audioList.map((audio, index) => (
          <option key={index} value={audio.path}>
            {audio.name}
          </option>
        ))}
      </select>

      {selectedAudio && (
        <div style={{ marginTop: "30px" }}>
          <audio controls style={{ width: "320px" }}>
            <source src={selectedAudio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
