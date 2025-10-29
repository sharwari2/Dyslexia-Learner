import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import RoleSelect from './components/RoleSelect';
import ChallengeSelect from './components/ChallengeSelect';
import DyslexiaHome from './components/DyslexiaHome';
import ParentDashboard from './components/ParentDashboard';
import Teacher from './components/Teacher';
import AnimatedBackground from './components/AnimatedBackground';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const navigate = useNavigate();
  
  const handleLogin = (u) => {
    setUser(u);
    localStorage.setItem('user', JSON.stringify(u));
    navigate('/role');
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  function getUserEmoji(role) {
    const emojis = {
      student: '👨‍🎓',
      teacher: '👨‍🏫',
      parent: '👨‍👩‍👧'
    };
    return emojis[role] || '👤';
  }

  return (
    <div className="container">
      <AnimatedBackground />
      
      {/* Modern Header */}
      <div className="card header" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '25px 30px',
        borderRadius: 20,
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        marginBottom: 30,
        border: '3px solid rgba(255,255,255,0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }}></div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Logo and Title Section */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{
              fontSize: '3.5em',
              background: 'white',
              borderRadius: '50%',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            }}>
              📚
            </div>
            <div>
              <h2 style={{
                margin: 0,
                fontSize: '2.5em',
                background: 'linear-gradient(45deg, #fff, #ffd700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                fontWeight: 'bold',
                letterSpacing: '1px'
              }}>
                NeuroLearn+
              </h2>
              <div style={{
                color: '#e0e7ff',
                fontSize: '1.15em',
                marginTop: 5,
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}>
                ✨ Learning Made Simple, Success Made Possible
              </div>
            </div>
          </div>

          {/* User Section */}
          <div>
            {user ? (
              <div style={{
                display: 'flex',
                gap: 12,
                alignItems: 'center',
                background: 'rgba(255,255,255,0.15)',
                padding: '12px 20px',
                borderRadius: 50,
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: '1.1em'
                }}>
                  <span style={{ fontSize: '1.5em' }}>{getUserEmoji(user.role)}</span>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>
                      {user.name}
                    </div>
                    <div style={{
                      fontSize: '0.85em',
                      opacity: 0.9,
                      textTransform: 'capitalize'
                    }}>
                      {user.role}
                    </div>
                  </div>
                </div>
                <button
                  className="btn"
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(255,255,255,0.95)',
                    color: '#667eea',
                    padding: '10px 20px',
                    fontSize: '1em',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}
                >
                  🚪 Logout
                </button>
              </div>
            ) : (
              <button
                className="btn"
                onClick={() => navigate('/login')}
                style={{
                  background: 'white',
                  color: '#667eea',
                  padding: '15px 35px',
                  fontSize: '1.2em',
                  fontWeight: 'bold',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                <span style={{ fontSize: '1.3em' }}>🔐</span>
                Login / Register
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/role" element={<RoleSelect user={user} />} />
        <Route path="/challenge" element={<ChallengeSelect />} />
        <Route path="/dyslexia" element={<DyslexiaHome user={user} />} />
        <Route path="/parent-dashboard" element={<ParentDashboard user={user} />} />
        <Route path="/teacher-dashboard" element={<Teacher user={user} />} />
        <Route path="/audio-lessons" element={<AudioPlayer />} />
        
        <Route
          path="/"
          element={
            <div style={{ marginTop: 20 }} className="card">
              {/* Welcome Hero Section */}
              <div style={{
                textAlign: 'center',
                padding: '60px 40px',
                background: 'linear-gradient(135deg, #e8f52fff 0%, #764ba2 100%)',
                borderRadius: 20,
                color: 'white',
                marginBottom: 30,
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '150%',
                  height: '150%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)'
                }}></div>
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: '5em', marginBottom: 20 }}>🌟</div>
                  <h3 style={{
                    fontSize: '3em',
                    margin: 0,
                    marginBottom: 15,
                    textShadow: '2px 2px 4px rgba(2, 2, 2, 0.2)'
                  }}>
                    Welcome to NeuroLearn+
                  </h3>
                  <p style={{
                    fontSize: '1.4em',
                    opacity: 0.95,
                    lineHeight: 1.8,
                    maxWidth: 700,
                    margin: '0 auto',
                    marginBottom: 30
                  }}>
                    A fun, friendly learning platform designed specifically for students with dyslexia, ADHD & Autism. 
                    Learn at your own pace!
                  </p>
                  <button
                    className="btn"
                    onClick={() => navigate('/login')}
                    style={{
                      background: 'white',
                      color: '#f0da12ff',
                      padding: '20px 50px',
                      fontSize: '1.3em',
                      fontWeight: 'bold',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 12
                    }}
                  >
                    <span style={{ fontSize: '1.3em' }}>🚀</span>
                    Get Started
                  </button>
                </div>
              </div>

              {/* Features Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 20,
                marginTop: 30
              }}>
                {/* Feature Card 1 */}
                <div style={{
                  background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
                  padding: 30,
                  borderRadius: 20,
                  textAlign: 'center',
                  border: '3px solid #fdcb6e',
                  boxShadow: '0 8px 25px rgba(253, 203, 110, 0.3)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{ fontSize: '4em', marginBottom: 15 }}>👨‍🎓</div>
                  <h4 style={{ color: '#d63031', fontSize: '1.5em', marginBottom: 10 }}>
                    For Students
                  </h4>
                  <p style={{ color: '#2d3436', lineHeight: 1.7 }}>
                    Interactive lessons with text-to-speech, visuals, and focus-friendly activities designed for learners with Dyslexia, ADHD & Autism.
                  </p>
                </div>

                {/* Feature Card 2 */}
                <div style={{
                  background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                  padding: 30,
                  borderRadius: 20,
                  textAlign: 'center',
                  border: '3px solid #0984e3',
                  boxShadow: '0 8px 25px rgba(9, 132, 227, 0.3)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{ fontSize: '4em', marginBottom: 15 }}>👨‍🏫</div>
                  <h4 style={{ color: 'white', fontSize: '1.5em', marginBottom: 10 }}>
                    For Teachers
                  </h4>
                  <p style={{ color: 'white', lineHeight: 1.7 }}>
                    Create and manage inclusive lessons with audio and visual aids for Grades 1–3, ensuring accessibility for every learner.
                  </p>
                </div>

                {/* Feature Card 3 */}
                <div style={{
                  background: 'linear-gradient(135deg, #fab1a0 0%, #ff7675 100%)',
                  padding: 30,
                  borderRadius: 20,
                  textAlign: 'center',
                  border: '3px solid #ff7675',
                  boxShadow: '0 8px 25px rgba(255, 118, 117, 0.3)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{ fontSize: '4em', marginBottom: 15 }}>👨‍👩‍👧</div>
                  <h4 style={{ color: 'white', fontSize: '1.5em', marginBottom: 10 }}>
                    For Parents
                  </h4>
                  <p style={{ color: 'white', lineHeight: 1.7 }}>
                    Track your child's progress and learning journey
                  </p>
                </div>
              </div>

              {/* Why Choose Us Section */}
              <div style={{
                marginTop: 40,
                padding: 30,
                background: 'linear-gradient(135deg, #e0e7ff 0%, #f8f9ff 100%)',
                borderRadius: 20,
                border: '3px solid #667eea'
              }}>
                <h4 style={{
                  color: '#667eea',
                  fontSize: '2em',
                  textAlign: 'center',
                  marginBottom: 25
                }}>
                  🌈 Why Choose NeuroLearn+ ?
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 20
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3em', marginBottom: 10 }}>🎵</div>
                    <strong style={{ color: '#667eea', display: 'block', marginBottom: 5 }}>
                      Audio Support
                    </strong>
                    <p className="small">Every lesson includes audio recordings</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3em', marginBottom: 10 }}>📖</div>
                    <strong style={{ color: '#667eea', display: 'block', marginBottom: 5 }}>
                      Easy to Read
                    </strong>
                    <p className="small">Dyslexia-friendly fonts and spacing</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3em', marginBottom: 10 }}>⚡</div>
                    <strong style={{ color: '#667eea', display: 'block', marginBottom: 5 }}>
                      Self-Paced
                    </strong>
                    <p className="small">Learn at your own comfortable speed</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3em', marginBottom: 10 }}>🎯</div>
                    <strong style={{ color: '#667eea', display: 'block', marginBottom: 5 }}>
                      Grade-Specific
                    </strong>
                    <p className="small">Tailored content for Grades 1, 2, and 3</p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </Routes>

      <style>{`
        @media (max-width: 768px) {
          .card.header {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          .card.header > div {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default App;