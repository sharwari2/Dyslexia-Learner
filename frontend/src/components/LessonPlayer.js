import React, { useState, useEffect } from 'react';
import API from '../api';

export default function LessonPlayer({ lesson, user, onClose }) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rate, setRate] = useState(0.9);

  useEffect(() => {
    return () => stopSpeak();
  }, []);

  function speak(text) {
    if (!('speechSynthesis' in window)) return alert('TTS not supported in this browser');
    stopSpeak();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    u.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(u);
  }

  function stopSpeak() {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  async function markComplete() {
    if (!user) return alert('Please login to save progress');
    try {
      await API('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userRole: user.role,
          lesson: lesson._id,
          completed: true,
          score: 100
        })
      });
      alert('Progress saved');
    } catch (err) {
      alert('Could not save progress');
    }
  }

  return (
    <div className="card" style={{ marginTop: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h4>{lesson.title}</h4>
        <div>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
      
      {/* Lesson Content */}
      <p style={{ fontSize: 20, marginBottom: 20 }}>{lesson.textContent}</p>
      
      {/* Audio Player Section - RIGHT BELOW CONTENT */}
      {lesson.audioUrl && (
        <div style={{
          background: '#d4edda',
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          border: '2px solid #28a745'
        }}>
          <strong style={{ color: '#155724', fontSize: '1.1em' }}>🎵 Listen to Audio:</strong>
          <audio 
            controls 
            src={lesson.audioUrl} 
            style={{ width: '100%', marginTop: 10 }}
          ></audio>
        </div>
      )}
      
      {/* Text-to-Speech Controls */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
        <button className="btn" onClick={() => speak(lesson.textContent)}>
          {isSpeaking ? 'Speaking...' : 'Read Aloud'}
        </button>
        <button className="btn" style={{ background: '#6b7bff' }} onClick={stopSpeak}>
          Stop
        </button>
        
        {/* Speed Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 20 }}>
          <label className="small">Speed:</label>
          <input
            type="range"
            min="0.6"
            max="1.4"
            step="0.1"
            value={rate}
            onChange={e => setRate(Number(e.target.value))}
            style={{ width: 150 }}
          />
          <span className="small">{rate.toFixed(1)}x</span>
        </div>
      </div>
      
      {/* Mark Complete Button */}
      <div style={{ marginTop: 12 }}>
        <button className="btn" onClick={markComplete}>Mark Complete</button>
      </div>
    </div>
  );
}
