import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function RoleSelect({ user }) {
  const nav = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user && user.role === 'student') {
      fetchStats();
    }
  }, [user]);

  async function fetchStats() {
    try {
      const data = await API(`/api/progress/stats/${user.id}`);
      setStats(data);
    } catch (err) {
      console.error('Could not load stats');
    }
  }

  if (!user) {
    return (
      <div className="card" style={{ marginTop: 20, textAlign: 'center', padding: 60 }}>
        <div style={{ fontSize: '5em', marginBottom: 20 }}>🔒</div>
        <h3 style={{ color: '#667eea', fontSize: '2em' }}>Please login first</h3>
        <p style={{ color: '#6b7280', fontSize: '1.2em', marginTop: 10 }}>
          You need to be logged in to access this page
        </p>
        <button
          className="btn"
          onClick={() => nav('/login')}
          style={{ marginTop: 20, padding: '15px 35px', fontSize: '1.1em' }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  function getRoleIcon(role) {
    const icons = {
      student: '👨‍🎓',
      parent: '👨‍👩‍👧',
      teacher: '👨‍🏫'
    };
    return icons[role] || '👤';
  }

  return (
    <div className="card" style={{ marginTop: 20 }}>
      {/* Welcome Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 40,
        borderRadius: 20,
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '5em', marginBottom: 15 }}>
            {getRoleIcon(user.role)}
          </div>
          <h3 style={{ margin: 0, fontSize: '2.5em', marginBottom: 10 }}>
            Welcome back, {user.name}!
          </h3>
          <p style={{ fontSize: '1.3em', opacity: 0.9, margin: 0 }}>
            You are logged in as: <strong style={{ textTransform: 'capitalize' }}>{user.role}</strong>
          </p>
        </div>
      </div>

      {/* Student Dashboard Options */}
      {user.role === 'student' && (
        <div>
          {/* Stats Cards */}
          {stats && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
              marginBottom: 30
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
                padding: 25,
                borderRadius: 20,
                textAlign: 'center',
                border: '3px solid #fdcb6e',
                boxShadow: '0 8px 25px rgba(253, 203, 110, 0.3)'
              }}>
                <div style={{ fontSize: '3em', marginBottom: 10 }}>🎯</div>
                <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#d63031' }}>
                  {stats.completionPercentage}%
                </div>
                <div style={{ fontSize: '1.1em', color: '#2d3436', fontWeight: 'bold' }}>
                  Progress
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                padding: 25,
                borderRadius: 20,
                textAlign: 'center',
                border: '3px solid #0984e3',
                boxShadow: '0 8px 25px rgba(9, 132, 227, 0.3)'
              }}>
                <div style={{ fontSize: '3em', marginBottom: 10 }}>✅</div>
                <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: 'white' }}>
                  {stats.completedLessons}
                </div>
                <div style={{ fontSize: '1.1em', color: 'white', fontWeight: 'bold' }}>
                  Completed
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #fab1a0 0%, #ff7675 100%)',
                padding: 25,
                borderRadius: 20,
                textAlign: 'center',
                border: '3px solid #ff7675',
                boxShadow: '0 8px 25px rgba(255, 118, 117, 0.3)'
              }}>
                <div style={{ fontSize: '3em', marginBottom: 10 }}>📚</div>
                <div style={{ fontSize: '2.5em', fontWeight: 'bold', color: 'white' }}>
                  {stats.totalLessons}
                </div>
                <div style={{ fontSize: '1.1em', color: 'white', fontWeight: 'bold' }}>
                  Total Lessons
                </div>
              </div>
            </div>
          )}

          {/* Action Cards */}
          <div style={{ display: 'grid', gap: 20 }}>
            {/* Challenges Card */}
            <div
              onClick={() => nav('/challenge')}
              style={{
                background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
                padding: 30,
                borderRadius: 20,
                cursor: 'pointer',
                border: '3px solid #fdcb6e',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(253, 203, 110, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 20
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ fontSize: '4em' }}>🎮</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, color: '#d63031', fontSize: '1.8em', marginBottom: 8 }}>
                  Go to Challenges
                </h4>
                <p style={{ margin: 0, color: '#2d3436', fontSize: '1.1em', lineHeight: 1.6 }}>
                  Choose between Dyslexia, ADHD, or Autism learning paths
                </p>
              </div>
              <div style={{ fontSize: '2em' }}>→</div>
            </div>

            {/* Lessons Card */}
            <div
              onClick={() => nav('/dyslexia')}
              style={{
                background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                padding: 30,
                borderRadius: 20,
                cursor: 'pointer',
                border: '3px solid #0984e3',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(9, 132, 227, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: 20
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={{ fontSize: '4em' }}>📚</div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, color: 'white', fontSize: '1.8em', marginBottom: 8 }}>
                  Go to Dyslexia Lessons
                </h4>
                <p style={{ margin: 0, color: 'white', fontSize: '1.1em', lineHeight: 1.6, opacity: 0.95 }}>
                  Start learning with audio-supported lessons for Grades 1-3
                </p>
              </div>
              <div style={{ fontSize: '2em', color: 'white' }}>→</div>
            </div>
          </div>

          {/* Quick Tips */}
          <div style={{
            marginTop: 30,
            background: 'linear-gradient(135deg, #e0e7ff 0%, #f8f9ff 100%)',
            padding: 25,
            borderRadius: 20,
            border: '3px solid #667eea'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
              <span style={{ fontSize: '2em' }}>💡</span>
              <h4 style={{ margin: 0, color: '#667eea', fontSize: '1.5em' }}>Quick Tips</h4>
            </div>
            <ul style={{ margin: 0, paddingLeft: 25, color: '#6b7280', fontSize: '1.1em', lineHeight: 2 }}>
              <li>Use headphones for the best audio experience 🎧</li>
              <li>Adjust reading speed to your comfort level ⚡</li>
              <li>Take breaks between lessons for better learning 😊</li>
              <li>Complete lessons to track your progress 📊</li>
            </ul>
          </div>
        </div>
      )}

      {/* Parent Dashboard Options */}
      {user.role === 'parent' && (
        <div>
          <div
            onClick={() => nav('/parent-dashboard')}
            style={{
              background: 'linear-gradient(135deg, #fab1a0 0%, #ff7675 100%)',
              padding: 40,
              borderRadius: 20,
              cursor: 'pointer',
              border: '3px solid #ff7675',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 35px rgba(255, 118, 117, 0.4)',
              textAlign: 'center'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '5em', marginBottom: 20 }}>👨‍👩‍👧</div>
            <h4 style={{ margin: 0, color: 'white', fontSize: '2.2em', marginBottom: 15 }}>
              Parent Dashboard
            </h4>
            <p style={{ margin: 0, color: 'white', fontSize: '1.3em', lineHeight: 1.8, opacity: 0.95 }}>
              Track your child's learning progress, view completed lessons, and monitor performance
            </p>
            <div style={{ marginTop: 25, fontSize: '2.5em' }}>→</div>
          </div>

          {/* Parent Info */}
          <div style={{
            marginTop: 30,
            background: 'linear-gradient(135deg, #ffeaa7 0%, #fff5e1 100%)',
            padding: 25,
            borderRadius: 20,
            border: '3px solid #fdcb6e'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
              <span style={{ fontSize: '2em' }}>📊</span>
              <h4 style={{ margin: 0, color: '#d63031', fontSize: '1.5em' }}>What You Can Do</h4>
            </div>
            <ul style={{ margin: 0, paddingLeft: 25, color: '#2d3436', fontSize: '1.1em', lineHeight: 2 }}>
              <li>View all completed lessons by your child ✅</li>
              <li>Monitor progress across different grades 📈</li>
              <li>See scores and completion dates 🏆</li>
              <li>Track time spent on learning ⏱️</li>
            </ul>
          </div>
        </div>
      )}

      {/* Teacher Dashboard Options */}
      {user.role === 'teacher' && (
        <div>
          <div
            onClick={() => nav('/teacher-dashboard')}
            style={{
              background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
              padding: 40,
              borderRadius: 20,
              cursor: 'pointer',
              border: '3px solid #0984e3',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 35px rgba(9, 132, 227, 0.4)',
              textAlign: 'center'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '5em', marginBottom: 20 }}>👨‍🏫</div>
            <h4 style={{ margin: 0, color: 'white', fontSize: '2.2em', marginBottom: 15 }}>
              Teacher Dashboard
            </h4>
            <p style={{ margin: 0, color: 'white', fontSize: '1.3em', lineHeight: 1.8, opacity: 0.95 }}>
              Create engaging lessons with audio support, manage existing lessons, and track your content
            </p>
            <div style={{ marginTop: 25, fontSize: '2.5em' }}>→</div>
          </div>

          {/* Teacher Info */}
          <div style={{
            marginTop: 30,
            background: 'linear-gradient(135deg, #e0e7ff 0%, #f8f9ff 100%)',
            padding: 25,
            borderRadius: 20,
            border: '3px solid #667eea'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
              <span style={{ fontSize: '2em' }}>✨</span>
              <h4 style={{ margin: 0, color: '#667eea', fontSize: '1.5em' }}>What You Can Do</h4>
            </div>
            <ul style={{ margin: 0, paddingLeft: 25, color: '#6b7280', fontSize: '1.1em', lineHeight: 2 }}>
              <li>Create new lessons for Grades 1, 2, and 3 📝</li>
              <li>Add audio files to enhance learning 🎵</li>
              <li>Organize lessons by units and subjects 📚</li>
              <li>Edit or delete existing lessons ✏️</li>
              <li>View statistics on your lessons 📊</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}