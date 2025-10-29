import React, { useEffect, useState, useRef } from 'react';
import API from '../api';
import LessonPlayer from './LessonPlayer';
import { useNavigate } from 'react-router-dom';

export default function DyslexiaHome({ user }) {
  const [lessons, setLessons] = useState([]);
  const [grade, setGrade] = useState(1);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const lessonPlayerRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    fetchLessons(grade);
  }, [grade]);

  useEffect(() => {
    // Scroll to lesson player when opened
    if (selected && lessonPlayerRef.current) {
      lessonPlayerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selected]);

  async function fetchLessons(g) {
    try {
      setLoading(true);
      const data = await API(`/api/lessons?challenge=dyslexia&grade=${g}`);
      setLessons(data);
    } catch (err) {
      alert('Could not load lessons');
    } finally {
      setLoading(false);
    }
  }

  function getGradeColor(grade) {
    const colors = {
      1: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
      2: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      3: 'linear-gradient(135deg, #fab1a0 0%, #ff7675 100%)'
    };
    return colors[grade] || colors[1];
  }

  function getGradeEmoji(grade) {
    const emojis = { 1: '🌟', 2: '⭐', 3: '✨' };
    return emojis[grade] || '📚';
  }

  return (
    <div className="card" style={{ marginTop: 20 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 30,
        borderRadius: 20,
        color: 'white',
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <div style={{ fontSize: '3.5em' }}>📚</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '2.5em' }}>Dyslexia Learning — Grade {grade}</h3>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '1.1em' }}>
              Learn at your own pace with audio support!
            </p>
          </div>
        </div>
        <div>
          <label style={{ color: 'white', marginRight: 10, fontSize: '1.1em' }}>Grade:</label>
          <select 
            value={grade} 
            onChange={e => setGrade(Number(e.target.value))}
            style={{ padding: '10px 20px', fontSize: '1.1em', borderRadius: 10 }}
          >
            <option value={1}>Grade 1</option>
            <option value={2}>Grade 2</option>
            <option value={3}>Grade 3</option>
          </select>
        </div>
      </div>

      {/* Show Lesson Player at Top if Selected */}
      {selected && (
        <div ref={lessonPlayerRef}>
          <LessonPlayer
            lesson={selected}
            user={user}
            onClose={() => setSelected(null)}
          />
        </div>
      )}

      {/* Only Show Lessons List if No Lesson is Selected */}
      {!selected && (
        <>
          <p className="small" style={{ fontSize: '1.1em', marginBottom: 20 }}>
            Each lesson has dyslexia-friendly text and audio. Use the Read Aloud button for text-to-speech.
          </p>

          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <div style={{ fontSize: '4em' }}>📚</div>
              <p style={{ fontSize: '1.3em', color: '#667eea', marginTop: 15 }}>Loading lessons...</p>
            </div>
          )}

          {/* Lessons List */}
          {!loading && lessons.map(lesson => (
            <div
              key={lesson._id}
              className="lesson"
              style={{
                padding: 20,
                marginBottom: 15,
                background: 'white',
                borderRadius: 20,
                border: '3px solid #e0e7ff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 15 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: '1.5em' }}>{getGradeEmoji(lesson.grade)}</span>
                    <strong style={{ fontSize: '1.4em', color: '#667eea' }}>
                      {lesson.title}
                    </strong>
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                    <span style={{
                      background: getGradeColor(lesson.grade),
                      color: 'white',
                      padding: '6px 15px',
                      borderRadius: 50,
                      fontSize: '0.9em',
                      fontWeight: 'bold'
                    }}>
                      Grade {lesson.grade}
                    </span>

                    {lesson.subject && (
                      <span style={{
                        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                        color: 'white',
                        padding: '6px 15px',
                        borderRadius: 50,
                        fontSize: '0.9em',
                        fontWeight: 'bold'
                      }}>
                        📚 {lesson.subject}
                      </span>
                    )}

                    {lesson.audioUrl && (
                      <span style={{
                        background: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
                        color: 'white',
                        padding: '6px 15px',
                        borderRadius: 50,
                        fontSize: '0.9em',
                        fontWeight: 'bold'
                      }}>
                        🎵 Audio Available
                      </span>
                    )}
                  </div>

                  <p style={{
                    fontSize: '1.05em',
                    color: '#6b7280',
                    lineHeight: 1.7,
                    marginBottom: 0
                  }}>
                    {lesson.textContent.substring(0, 150)}...
                  </p>
                </div>

                <button
                  className="btn"
                  onClick={() => setSelected(lesson)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '15px 30px',
                    fontSize: '1.1em',
                    whiteSpace: 'nowrap'
                  }}
                >
                  📖 Open
                </button>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {!loading && lessons.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: 60,
              background: 'linear-gradient(135deg, #f8f9ff 0%, #e0e7ff 100%)',
              borderRadius: 20,
              border: '3px dashed #667eea'
            }}>
              <div style={{ fontSize: '5em', marginBottom: 20 }}>📚</div>
              <h3 style={{ color: '#667eea', fontSize: '2em', marginBottom: 10 }}>
                No lessons found for Grade {grade}
              </h3>
              <p style={{ fontSize: '1.2em', color: '#6b7280' }}>
                Teachers haven't created any lessons for this grade yet.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}