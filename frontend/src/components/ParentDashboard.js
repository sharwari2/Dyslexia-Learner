import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function ParentDashboard({ user }) {
  const [progress, setProgress] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (user) {
      load();
    }
  }, [user]);

  async function load() {
    try {
      setLoading(true);
      const p = await API(`/api/progress/${user.id}`);
      setProgress(p);
      
      // Calculate stats
      const completed = p.filter(item => item.completed).length;
      const total = p.length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      // Grade breakdown
      const grade1 = p.filter(item => item.lesson?.grade === 1 && item.completed).length;
      const grade2 = p.filter(item => item.lesson?.grade === 2 && item.completed).length;
      const grade3 = p.filter(item => item.lesson?.grade === 3 && item.completed).length;
      
      // Average score
      const completedLessons = p.filter(item => item.completed);
      const avgScore = completedLessons.length > 0
        ? Math.round(completedLessons.reduce((sum, item) => sum + item.score, 0) / completedLessons.length)
        : 0;
      
      setStats({
        completed,
        total,
        percentage,
        grade1,
        grade2,
        grade3,
        avgScore
      });
    } catch (err) {
      console.error(err);
      alert('Could not load progress data');
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

  // Sort by most recent
  const sortedProgress = [...progress].sort(
    (a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed)
  );

  const recentCompletions = sortedProgress.filter(p => p.completed).slice(0, 5);
  const inProgress = sortedProgress.filter(p => !p.completed);

  return (
    <div className="card" style={{ marginTop: 20 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #fab1a0 0%, #ff7675 100%)',
        padding: 35,
        borderRadius: 20,
        color: 'white',
        marginBottom: 30,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 250,
          height: 250,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(50px)'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15 }}>
            <div style={{ fontSize: '3.5em' }}>👨‍👩‍👧</div>
            <div>
              <h3 style={{ margin: 0, fontSize: '2.5em' }}>Parent Dashboard</h3>
              <p style={{ margin: 0, opacity: 0.95, fontSize: '1.2em' }}>
                Track your child's learning journey
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <button
              className="btn"
              onClick={() => nav('/dyslexia')}
              style={{
                background: 'rgba(255,255,255,0.95)',
                color: '#ff7675',
                padding: '12px 25px',
                fontSize: '1.1em'
              }}
            >
              📚 View All Lessons
            </button>
            <button
              className="btn"
              onClick={() => load()}
              style={{
                background: 'rgba(255,255,255,0.95)',
                color: '#ff7675',
                padding: '12px 25px',
                fontSize: '1.1em'
              }}
            >
              🔄 Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: 60 }}>
          <div style={{ fontSize: '4em', animation: 'pulse 1.5s ease-in-out infinite' }}>📊</div>
          <p style={{ fontSize: '1.3em', color: '#667eea', marginTop: 15 }}>Loading progress data...</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && stats && (
        <div>
          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 20,
            marginBottom: 30
          }}>
            {/* Overall Progress */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: 25,
              borderRadius: 20,
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}>
              <div style={{ fontSize: '3em', marginBottom: 10 }}>🎯</div>
              <div style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{stats.percentage}%</div>
              <div style={{ fontSize: '1em', opacity: 0.9 }}>Overall Progress</div>
            </div>

            {/* Completed Lessons */}
            <div style={{
              background: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
              padding: 25,
              borderRadius: 20,
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 8px 25px rgba(0, 184, 148, 0.3)'
            }}>
              <div style={{ fontSize: '3em', marginBottom: 10 }}>✅</div>
              <div style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{stats.completed}</div>
              <div style={{ fontSize: '1em', opacity: 0.9 }}>Completed</div>
            </div>

            {/* Total Lessons */}
            <div style={{
              background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
              padding: 25,
              borderRadius: 20,
              textAlign: 'center',
              color: 'white',
              boxShadow: '0 8px 25px rgba(116, 185, 255, 0.3)'
            }}>
              <div style={{ fontSize: '3em', marginBottom: 10 }}>📚</div>
              <div style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{stats.total}</div>
              <div style={{ fontSize: '1em', opacity: 0.9 }}>Total Accessed</div>
            </div>

            {/* Average Score */}
            <div style={{
              background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
              padding: 25,
              borderRadius: 20,
              textAlign: 'center',
              color: '#d63031',
              boxShadow: '0 8px 25px rgba(253, 203, 110, 0.3)'
            }}>
              <div style={{ fontSize: '3em', marginBottom: 10 }}>🏆</div>
              <div style={{ fontSize: '2.5em', fontWeight: 'bold' }}>{stats.avgScore}</div>
              <div style={{ fontSize: '1em', opacity: 0.9 }}>Average Score</div>
            </div>
          </div>

          {/* Grade Breakdown */}
          <div style={{
            background: 'linear-gradient(135deg, #e0e7ff 0%, #f8f9ff 100%)',
            padding: 25,
            borderRadius: 20,
            border: '3px solid #667eea',
            marginBottom: 30
          }}>
            <h4 style={{ 
              color: '#667eea', 
              fontSize: '1.8em', 
              marginBottom: 20, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10 
            }}>
              <span>📊</span> Progress by Grade
            </h4>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: 20 
            }}>
              {/* Grade 1 */}
              <div style={{
                background: getGradeColor(1),
                padding: 20,
                borderRadius: 15,
                textAlign: 'center',
                color: 'white'
              }}>
                <div style={{ fontSize: '2.5em', marginBottom: 10 }}>{getGradeEmoji(1)}</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.grade1}</div>
                <div style={{ fontSize: '1em', opacity: 0.9 }}>Grade 1 Complete</div>
              </div>

              {/* Grade 2 */}
              <div style={{
                background: getGradeColor(2),
                padding: 20,
                borderRadius: 15,
                textAlign: 'center',
                color: 'white'
              }}>
                <div style={{ fontSize: '2.5em', marginBottom: 10 }}>{getGradeEmoji(2)}</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.grade2}</div>
                <div style={{ fontSize: '1em', opacity: 0.9 }}>Grade 2 Complete</div>
              </div>

              {/* Grade 3 */}
              <div style={{
                background: getGradeColor(3),
                padding: 20,
                borderRadius: 15,
                textAlign: 'center',
                color: 'white'
              }}>
                <div style={{ fontSize: '2.5em', marginBottom: 10 }}>{getGradeEmoji(3)}</div>
                <div style={{ fontSize: '2em', fontWeight: 'bold' }}>{stats.grade3}</div>
                <div style={{ fontSize: '1em', opacity: 0.9 }}>Grade 3 Complete</div>
              </div>
            </div>
          </div>

          {/* Recent Completions */}
          {recentCompletions.length > 0 && (
            <div style={{ marginBottom: 30 }}>
              <h4 style={{ 
                color: '#667eea', 
                fontSize: '1.8em', 
                marginBottom: 20, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 10 
              }}>
                <span>🏆</span> Recently Completed Lessons
              </h4>
              <div style={{ display: 'grid', gap: 15 }}>
                {recentCompletions.map(p => (
                  <div
                    key={p._id}
                    style={{
                      background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
                      padding: 20,
                      borderRadius: 15,
                      border: '3px solid #28a745',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20
                    }}
                  >
                    <div style={{ fontSize: '3em' }}>✅</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 10, 
                        marginBottom: 8 
                      }}>
                        <span style={{ fontSize: '1.5em' }}>{getGradeEmoji(p.lesson?.grade)}</span>
                        <strong style={{ color: '#155724', fontSize: '1.3em' }}>
                          {p.lesson?.title || 'Unknown Lesson'}
                        </strong>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        gap: 15, 
                        flexWrap: 'wrap', 
                        fontSize: '0.95em' 
                      }}>
                        <span style={{
                          background: 'rgba(21, 87, 36, 0.15)',
                          color: '#155724',
                          padding: '4px 12px',
                          borderRadius: 50,
                          fontWeight: 'bold'
                        }}>
                          📚 Grade {p.lesson?.grade}
                        </span>
                        <span style={{
                          background: 'rgba(21, 87, 36, 0.15)',
                          color: '#155724',
                          padding: '4px 12px',
                          borderRadius: 50,
                          fontWeight: 'bold'
                        }}>
                          🏆 Score: {p.score}/100
                        </span>
                        <span style={{
                          background: 'rgba(21, 87, 36, 0.15)',
                          color: '#155724',
                          padding: '4px 12px',
                          borderRadius: 50,
                          fontWeight: 'bold'
                        }}>
                          📅 {new Date(p.lastAccessed).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* In Progress Lessons */}
          {inProgress.length > 0 && (
            <div style={{ marginBottom: 30 }}>
              <h4 style={{ 
                color: '#667eea', 
                fontSize: '1.8em', 
                marginBottom: 20, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 10 
              }}>
                <span>📖</span> In Progress ({inProgress.length})
              </h4>
              <div style={{ display: 'grid', gap: 15 }}>
                {inProgress.slice(0, 5).map(p => (
                  <div
                    key={p._id}
                    style={{
                      background: 'linear-gradient(135deg, #fff5e1 0%, #ffeaa7 100%)',
                      padding: 20,
                      borderRadius: 15,
                      border: '3px solid #fdcb6e',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20
                    }}
                  >
                    <div style={{ fontSize: '3em' }}>📖</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 10, 
                        marginBottom: 8 
                      }}>
                        <span style={{ fontSize: '1.5em' }}>{getGradeEmoji(p.lesson?.grade)}</span>
                        <strong style={{ color: '#d63031', fontSize: '1.3em' }}>
                          {p.lesson?.title || 'Unknown Lesson'}
                        </strong>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        gap: 15, 
                        flexWrap: 'wrap', 
                        fontSize: '0.95em' 
                      }}>
                        <span style={{
                          background: 'rgba(214, 48, 49, 0.15)',
                          color: '#d63031',
                          padding: '4px 12px',
                          borderRadius: 50,
                          fontWeight: 'bold'
                        }}>
                          📚 Grade {p.lesson?.grade}
                        </span>
                        <span style={{
                          background: 'rgba(214, 48, 49, 0.15)',
                          color: '#d63031',
                          padding: '4px 12px',
                          borderRadius: 50,
                          fontWeight: 'bold'
                        }}>
                          📅 Last accessed: {new Date(p.lastAccessed).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn"
                      onClick={() => nav('/dyslexia')}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        padding: '10px 20px',
                        fontSize: '1em',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Continue →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {progress.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: 60,
              background: 'linear-gradient(135deg, #f8f9ff 0%, #e0e7ff 100%)',
              borderRadius: 20,
              border: '3px dashed #667eea'
            }}>
              <div style={{ fontSize: '5em', marginBottom: 20 }}>📚</div>
              <h3 style={{ color: '#667eea', fontSize: '2em', marginBottom: 15 }}>
                No Progress Yet
              </h3>
              <p style={{ fontSize: '1.2em', color: '#6b7280', marginBottom: 25 }}>
                Your child hasn't started any lessons yet. Encourage them to begin their learning journey!
              </p>
              <button
                className="btn"
                onClick={() => nav('/dyslexia')}
                style={{
                  padding: '15px 35px',
                  fontSize: '1.2em'
                }}
              >
                🚀 Start Learning
              </button>
            </div>
          )}

          {/* Tips for Parents */}
          <div style={{
            marginTop: 30,
            background: 'linear-gradient(135deg, #ffeaa7 0%, #fff5e1 100%)',
            padding: 25,
            borderRadius: 20,
            border: '3px solid #fdcb6e'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10, 
              marginBottom: 15 
            }}>
              <span style={{ fontSize: '2em' }}>💡</span>
              <h4 style={{ margin: 0, color: '#d63031', fontSize: '1.5em' }}>
                Tips for Parents
              </h4>
            </div>
            <ul style={{ 
              margin: 0, 
              paddingLeft: 25, 
              color: '#2d3436', 
              fontSize: '1.1em', 
              lineHeight: 2 
            }}>
              <li><strong>Encourage Daily Practice:</strong> Even 15-20 minutes daily makes a difference</li>
              <li><strong>Celebrate Progress:</strong> Acknowledge every completed lesson, no matter how small</li>
              <li><strong>Create a Routine:</strong> Set a consistent time for learning each day</li>
              <li><strong>Use Audio Support:</strong> Encourage your child to use the audio features</li>
              <li><strong>Monitor, Don't Pressure:</strong> Check progress regularly but keep it positive</li>
              <li><strong>Discuss Lessons:</strong> Ask your child what they learned today</li>
            </ul>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}