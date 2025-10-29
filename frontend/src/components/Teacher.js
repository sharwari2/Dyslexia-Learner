import React, { useState, useEffect } from 'react';
import API from '../api';

export default function Teacher({ user }) {
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({
    title: '',
    textContent: '',
    grade: 1,
    subject: '',
    audioUrl: '',
    unit: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLessons();
  }, []);

  async function fetchLessons() {
    try {
      const data = await API('/api/lessons');
      setLessons(data);
    } catch (err) {
      console.error('Error fetching lessons:', err);
    }
  }

  async function createLesson(e) {
    e.preventDefault();
    if (!newLesson.title || !newLesson.textContent) {
      return alert('Please fill in title and content');
    }

    setLoading(true);
    try {
      await API('/api/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLesson)
      });
      
      alert('🎉 Lesson created successfully!');
      setNewLesson({
        title: '',
        textContent: '',
        grade: 1,
        subject: '',
        audioUrl: ''
      });
      fetchLessons();
    } catch (err) {
      alert('❌ Error creating lesson: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteLesson(id) {
    if (!window.confirm('🗑️ Are you sure you want to delete this lesson?')) return;
    
    try {
      await API(`/api/lessons/${id}`, { method: 'DELETE' });
      alert('✅ Lesson deleted');
      fetchLessons();
    } catch (err) {
      alert('❌ Error deleting lesson');
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
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <div style={{ fontSize: '4em', marginBottom: 10 }}>👨‍🏫</div>
        <h3 style={{ color: '#667eea', fontSize: '2.5em', margin: 0 }}>
          Teacher Dashboard
        </h3>
        <p className="small" style={{ fontSize: '1.2em', color: '#6b7280', marginTop: 10 }}>
          Create amazing lessons with audio for your students! 🎵
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 15, 
        marginBottom: 30 
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: 20,
          borderRadius: 15,
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
        }}>
          <div style={{ fontSize: '2.5em' }}>📚</div>
          <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{lessons.length}</div>
          <div style={{ fontSize: '1em', opacity: 0.9 }}>Total Lessons</div>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
          padding: 20,
          borderRadius: 15,
          color: '#d63031',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(253, 203, 110, 0.3)'
        }}>
          <div style={{ fontSize: '2.5em' }}>🌟</div>
          <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
            {lessons.filter(l => l.grade === 1).length}
          </div>
          <div style={{ fontSize: '1em', opacity: 0.9 }}>Grade 1 Lessons</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
          padding: 20,
          borderRadius: 15,
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(116, 185, 255, 0.3)'
        }}>
          <div style={{ fontSize: '2.5em' }}>⭐</div>
          <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
            {lessons.filter(l => l.grade === 2).length}
          </div>
          <div style={{ fontSize: '1em', opacity: 0.9 }}>Grade 2 Lessons</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fab1a0 0%, #ff7675 100%)',
          padding: 20,
          borderRadius: 15,
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 8px 20px rgba(255, 118, 117, 0.3)'
        }}>
          <div style={{ fontSize: '2.5em' }}>✨</div>
          <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
            {lessons.filter(l => l.grade === 3).length}
          </div>
          <div style={{ fontSize: '1em', opacity: 0.9 }}>Grade 3 Lessons</div>
        </div>
      </div>
      
      {/* Create Lesson Form */}
      <div style={{ 
        marginTop: 20, 
        padding: 25, 
        background: 'linear-gradient(135deg, #f8f9ff 0%, #e0e7ff 100%)', 
        borderRadius: 20,
        border: '3px solid #667eea',
        boxShadow: '0 8px 30px rgba(102, 126, 234, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: '2em' }}>✨</span>
          <h4 style={{ color: '#667eea', margin: 0, fontSize: '1.8em' }}>Create New Lesson</h4>
        </div>
        
        <form onSubmit={createLesson} style={{ display: 'grid', gap: 18 }}>
          <div>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              marginBottom: 8, 
              fontWeight: 'bold',
              color: '#667eea',
              fontSize: '1.1em'
            }}>
              <span>📝</span> Lesson Title *
            </label>
            <input
              type="text"
              placeholder="e.g., Learning Alphabets"
              value={newLesson.title}
              onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              marginBottom: 8, 
              fontWeight: 'bold',
              color: '#667eea',
              fontSize: '1.1em'
            }}>
              <span>📖</span> Lesson Content *
            </label>
            <textarea
              placeholder="Enter the lesson text content that students will read and hear..."
              rows="6"
              value={newLesson.textContent}
              onChange={(e) => setNewLesson({ ...newLesson, textContent: e.target.value })}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
            <div>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                marginBottom: 8, 
                fontWeight: 'bold',
                color: '#667eea',
                fontSize: '1.1em'
              }}>
                <span>🎓</span> Grade Level *
              </label>
              <select
                value={newLesson.grade}
                onChange={(e) => setNewLesson({ ...newLesson, grade: Number(e.target.value) })}
              >
                <option value={1}>🌟 Grade 1</option>
                <option value={2}>⭐ Grade 2</option>
                <option value={3}>✨ Grade 3</option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 8, 
                marginBottom: 8, 
                fontWeight: 'bold',
                color: '#667eea',
                fontSize: '1.1em'
              }}>
                <span>📚</span> Subject
              </label>
              <input
                type="text"
                placeholder="English, Math, Science"
                value={newLesson.subject}
                onChange={(e) => setNewLesson({ ...newLesson, subject: e.target.value })}
              />
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: 20,
            borderRadius: 15,
            border: '3px dashed #667eea'
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              marginBottom: 8, 
              fontWeight: 'bold',
              color: '#667eea',
              fontSize: '1.1em'
            }}>
              <span>🎵</span> Audio URL (Optional)
            </label>
            <input
              type="text"
              placeholder="/audio/grade1/lesson-name.mp3"
              value={newLesson.audioUrl}
              onChange={(e) => setNewLesson({ ...newLesson, audioUrl: e.target.value })}
            />
            <div style={{ 
              marginTop: 12, 
              padding: 12, 
              background: '#ffeaa7', 
              borderRadius: 10,
              fontSize: '0.95em',
              lineHeight: 1.8
            }}>
              <div style={{ fontWeight: 'bold', color: '#d63031', marginBottom: 6 }}>
                💡 How to add audio:
              </div>
              <div>📁 Place MP3 files in: <code style={{ background: '#fff', padding: '2px 8px', borderRadius: 4, fontWeight: 'bold' }}>frontend/public/audio/grade1/</code></div>
              <div>📝 Then enter: <code style={{ background: '#fff', padding: '2px 8px', borderRadius: 4, fontWeight: 'bold' }}>/audio/grade1/your-file.mp3</code></div>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn" 
            disabled={loading}
            style={{ 
              marginTop: 12,
              fontSize: '1.2em',
              padding: '18px 40px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            {loading ? '⏳ Creating...' : '✓ Create Lesson'}
          </button>
        </form>
      </div>

      {/* Existing Lessons Section */}
      <div style={{ marginTop: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: '2em' }}>📚</span>
          <h4 style={{ color: '#667eea', margin: 0, fontSize: '1.8em' }}>
            Existing Lessons ({lessons.length})
          </h4>
        </div>
        
        {lessons.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 60,
            background: 'linear-gradient(135deg, #f8f9ff 0%, #e0e7ff 100%)',
            borderRadius: 20,
            border: '3px dashed #667eea'
          }}>
            <div style={{ fontSize: '4em', marginBottom: 15 }}>📝</div>
            <p style={{ fontSize: '1.3em', color: '#6b7280' }}>
              No lessons created yet. Start by creating your first lesson above!
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 15 }}>
            {lessons.map((lesson) => (
              <div 
                key={lesson._id} 
                className="lesson" 
                style={{ 
                  padding: 20,
                  background: 'white',
                  borderRadius: 20,
                  border: '3px solid #e0e7ff',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 15 }}>
                  <div style={{ flex: 1 }}>
                    {/* Lesson Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: '1.5em' }}>{getGradeEmoji(lesson.grade)}</span>
                      <strong style={{ fontSize: '1.4em', color: '#667eea' }}>
                        {lesson.title}
                      </strong>
                    </div>
                    
                    {/* Grade and Subject Badges */}
                    <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                      <span style={{
                        background: getGradeColor(lesson.grade),
                        color: 'white',
                        padding: '6px 15px',
                        borderRadius: 50,
                        fontSize: '0.9em',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                      }}>
                        Grade {lesson.grade}
                      </span>
                      
                      {lesson.subject && (
                        <span style={{
                          background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
                          color: '#d63031',
                          padding: '6px 15px',
                          borderRadius: 50,
                          fontSize: '0.9em',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}>
                          📚 {lesson.subject}
                        </span>
                      )}
                    </div>
                    
                    {/* Content Preview */}
                    <p style={{ 
                      fontSize: '1.05em', 
                      color: '#6b7280', 
                      lineHeight: 1.7,
                      marginBottom: 12,
                      padding: 15,
                      background: '#f8f9ff',
                      borderRadius: 10
                    }}>
                      {lesson.textContent.substring(0, 150)}...
                    </p>
                    
                    {/* Audio Indicator */}
                    {lesson.audioUrl && (
                      <div style={{ 
                        marginTop: 10, 
                        padding: 10, 
                        background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)', 
                        borderRadius: 10,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                      }}>
                        <span style={{ fontSize: '1.3em', animation: 'pulse 2s ease-in-out infinite' }}>🎵</span>
                        <span style={{ fontSize: '0.95em', color: '#155724', fontWeight: 'bold' }}>
                          Audio Available: {lesson.audioUrl.split('/').pop()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    className="btn"
                    onClick={() => deleteLesson(lesson._id)}
                    style={{ 
                      background: 'linear-gradient(135deg, #ff7675 0%, #d63031 100%)',
                      padding: '12px 24px',
                      fontSize: '1em',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}