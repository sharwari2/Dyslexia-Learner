import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const res = await API(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      onLogin(res.user);
      nav('/role');
    } catch (err) {
      alert('❌ ' + (err.message || 'Error occurred. Please try again.'));
    } finally {
      setLoading(false);
    }
  }

  function getRoleEmoji(role) {
    const emojis = {
      student: '👨‍🎓',
      parent: '👨‍👩‍👧',
      teacher: '👨‍🏫'
    };
    return emojis[role] || '👤';
  }

  function getRoleColor(role) {
    const colors = {
      student: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
      parent: 'linear-gradient(135deg, #fab1a0 0%, #ff7675 100%)',
      teacher: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'
    };
    return colors[role] || colors.student;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 200px)',
      padding: 20
    }}>
      <div className="card" style={{
        marginTop: 20,
        maxWidth: 550,
        width: '100%',
        background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
        border: '3px solid #667eea',
        boxShadow: '0 15px 50px rgba(102, 126, 234, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 250,
          height: 250,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          opacity: 0.1,
          filter: 'blur(40px)'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 200,
          height: 200,
          background: 'linear-gradient(135deg, #fdcb6e 0%, #ffeaa7 100%)',
          borderRadius: '50%',
          opacity: 0.1,
          filter: 'blur(30px)'
        }}></div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header with Icon */}
          <div style={{ textAlign: 'center', marginBottom: 35 }}>
            <div style={{
              fontSize: '5em',
              marginBottom: 15,
              animation: 'bounce 2s ease-in-out infinite'
            }}>
              {mode === 'login' ? '👋' : '🌟'}
            </div>
            <h3 style={{
              color: '#667eea',
              fontSize: '2.5em',
              margin: 0,
              marginBottom: 8
            }}>
              {mode === 'login' ? 'Welcome Back!' : 'Join Us!'}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '1.15em',
              margin: 0
            }}>
              {mode === 'login' 
                ? 'Sign in to continue your learning journey' 
                : 'Create an account to start learning'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} style={{ display: 'grid', gap: 20 }}>
            {/* Name Field (Register Only) */}
            {mode !== 'login' && (
              <div>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                  color: '#667eea',
                  fontWeight: 'bold',
                  fontSize: '1.05em'
                }}>
                  <span>👤</span> Full Name
                </label>
                <input
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  style={{
                    fontSize: '1.1em',
                    padding: '15px'
                  }}
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
                color: '#667eea',
                fontWeight: 'bold',
                fontSize: '1.05em'
              }}>
                <span>📧</span> Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                style={{
                  fontSize: '1.1em',
                  padding: '15px'
                }}
              />
            </div>

            {/* Password Field */}
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
                color: '#667eea',
                fontWeight: 'bold',
                fontSize: '1.05em'
              }}>
                <span>🔒</span> Password
              </label>
              <input
                type="password"
                placeholder={mode === 'login' ? 'Enter your password' : 'Create a password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  fontSize: '1.1em',
                  padding: '15px'
                }}
              />
            </div>

            {/* Role Selection */}
            <div>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
                color: '#667eea',
                fontWeight: 'bold',
                fontSize: '1.05em'
              }}>
                <span>🎭</span> I am a...
              </label>
              
              {/* Role Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 10
              }}>
                {['student', 'parent', 'teacher'].map(role => (
                  <div
                    key={role}
                    onClick={() => setForm({ ...form, role })}
                    style={{
                      background: form.role === role 
                        ? getRoleColor(role)
                        : '#f0f0f0',
                      padding: '15px 10px',
                      borderRadius: 15,
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: form.role === role 
                        ? '3px solid #667eea' 
                        : '3px solid transparent',
                      transition: 'all 0.3s ease',
                      boxShadow: form.role === role 
                        ? '0 6px 20px rgba(102, 126, 234, 0.3)' 
                        : 'none',
                      transform: form.role === role ? 'scale(1.05)' : 'scale(1)'
                    }}
                  >
                    <div style={{ fontSize: '2.5em', marginBottom: 5 }}>
                      {getRoleEmoji(role)}
                    </div>
                    <div style={{
                      fontSize: '0.95em',
                      fontWeight: 'bold',
                      color: form.role === role ? 'white' : '#667eea',
                      textTransform: 'capitalize'
                    }}>
                      {role}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginTop: 10
            }}>
              {/* Submit Button */}
              <button
                className="btn"
                type="submit"
                disabled={loading}
                style={{
                  background: loading 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '18px',
                  fontSize: '1.2em',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10
                }}
              >
                {loading ? (
                  <>
                    <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>{mode === 'login' ? '🚀' : '✨'}</span>
                    {mode === 'login' ? 'Login' : 'Create Account'}
                  </>
                )}
              </button>

              {/* Switch Mode Button */}
              <button
                type="button"
                className="btn"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                style={{
                  background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
                  padding: '15px',
                  fontSize: '1.05em'
                }}
              >
                {mode === 'login' 
                  ? '✨ Create New Account' 
                  : '🔑 Already have an account? Login'}
              </button>

              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => nav('/')}
                style={{
                  background: 'transparent',
                  border: '2px solid #e0e7ff',
                  color: '#667eea',
                  padding: '12px',
                  borderRadius: 50,
                  fontSize: '1em',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  e.target.style.background = '#f8f9ff';
                  e.target.style.borderColor = '#667eea';
                }}
                onMouseOut={e => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = '#e0e7ff';
                }}
              >
                ← Back to Home
              </button>
            </div>
          </form>

          {/* Help Text */}
          <div style={{
            marginTop: 25,
            padding: 15,
            background: 'linear-gradient(135deg, #ffeaa7 0%, #fff5e1 100%)',
            borderRadius: 15,
            textAlign: 'center',
            fontSize: '0.95em',
            color: '#d63031',
            border: '2px solid #fdcb6e'
          }}>
            <strong>💡 Tip:</strong> {mode === 'login' 
              ? 'Use the email and password you registered with' 
              : 'Choose your role carefully - it determines your dashboard'}
          </div>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}