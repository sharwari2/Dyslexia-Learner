import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChallengeSelect() {
  const nav = useNavigate();

  const challenges = [
    {
      id: 'dyslexia',
      name: 'Dyslexia',
      icon: '📚',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderColor: '#667eea',
      description: 'Audio-supported lessons with text-to-speech for reading difficulties',
      features: ['Audio Support', 'Text-to-Speech', 'Large Fonts', 'Progress Tracking'],
      available: true,
      action: () => nav('/dyslexia')
    },
    {
      id: 'adhd',
      name: 'ADHD',
      icon: '🎯',
      color: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)',
      borderColor: '#fdcb6e',
      description: 'Interactive lessons with gamification for focus and attention',
      features: ['Short Lessons', 'Rewards', 'Timers', 'Interactive Games'],
      available: false,
      action: () => alert('🚧 ADHD learning path coming soon!')
    },
    {
      id: 'autism',
      name: 'Autism',
      icon: '🧩',
      color: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      borderColor: '#0984e3',
      description: 'Structured, visual learning with clear routines and predictability',
      features: ['Visual Aids', 'Routines', 'Social Stories', 'Sensory Options'],
      available: false,
      action: () => alert('🚧 Autism learning path coming soon!')
    }
  ];

  return (
    <div className="card" style={{ marginTop: 20 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 40,
        borderRadius: 20,
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
        position: 'relative',
        overflow: 'hidden'
      }}>
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

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '5em', marginBottom: 15 }}>🌟</div>
          <h3 style={{ margin: 0, fontSize: '2.5em', marginBottom: 10 }}>
            Choose Your Learning Path
          </h3>
          <p style={{ margin: 0, fontSize: '1.3em', opacity: 0.95 }}>
            Select the learning experience that works best for you
          </p>
        </div>
      </div>

      {/* Challenge Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 25
      }}>
        {challenges.map(challenge => (
          <div
            key={challenge.id}
            onClick={challenge.action}
            style={{
              background: challenge.color,
              padding: 30,
              borderRadius: 20,
              cursor: challenge.available ? 'pointer' : 'not-allowed',
              border: `3px solid ${challenge.borderColor}`,
              transition: 'all 0.3s ease',
              boxShadow: `0 8px 25px ${challenge.borderColor}40`,
              position: 'relative',
              opacity: challenge.available ? 1 : 0.7,
              minHeight: 400
            }}
            onMouseOver={e => {
              if (challenge.available) {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = `0 15px 40px ${challenge.borderColor}60`;
              }
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 8px 25px ${challenge.borderColor}40`;
            }}
          >
            {/* Coming Soon Badge */}
            {!challenge.available && (
              <div style={{
                position: 'absolute',
                top: 15,
                right: 15,
                background: 'rgba(255,255,255,0.95)',
                color: '#667eea',
                padding: '8px 18px',
                borderRadius: 50,
                fontSize: '0.85em',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                🚧 Coming Soon
              </div>
            )}

            {/* Icon */}
            <div style={{
              fontSize: '5em',
              textAlign: 'center',
              marginBottom: 20,
              animation: challenge.available ? 'bounce 2s ease-in-out infinite' : 'none'
            }}>
              {challenge.icon}
            </div>

            {/* Title */}
            <h4 style={{
              color: 'white',
              fontSize: '2em',
              margin: 0,
              marginBottom: 15,
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}>
              {challenge.name}
            </h4>

            {/* Description */}
            <p style={{
              color: 'white',
              fontSize: '1.1em',
              lineHeight: 1.7,
              marginBottom: 20,
              textAlign: 'center',
              opacity: 0.95
            }}>
              {challenge.description}
            </p>

            {/* Features */}
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              padding: 20,
              borderRadius: 15,
              marginTop: 'auto'
            }}>
              <div style={{
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 12,
                fontSize: '1.1em'
              }}>
                ✨ Features:
              </div>
              <div style={{ display: 'grid', gap: 8 }}>
                {challenge.features.map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      color: 'white',
                      fontSize: '1em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <span style={{ fontSize: '1.2em' }}>✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <div style={{
                background: 'rgba(255,255,255,0.95)',
                color: challenge.borderColor,
                padding: '15px 30px',
                borderRadius: 50,
                fontSize: '1.2em',
                fontWeight: 'bold',
                display: 'inline-block'
              }}>
                {challenge.available ? '🚀 Start Learning' : '⏳ Coming Soon'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div style={{
        marginTop: 40,
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8f9ff 100%)',
        padding: 30,
        borderRadius: 20,
        border: '3px solid #667eea'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ fontSize: '2em' }}>💡</span>
          <h4 style={{ margin: 0, color: '#667eea', fontSize: '1.6em' }}>
            About Our Learning Paths
          </h4>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 20,
          color: '#6b7280',
          fontSize: '1.1em',
          lineHeight: 1.8
        }}>
          <div>
            <strong style={{ color: '#667eea' }}>📚 Dyslexia Path</strong>
            <p style={{ margin: '8px 0 0 0' }}>
              Fully featured with audio support, text-to-speech, and progress tracking for Grades 1-3
            </p>
          </div>
          <div>
            <strong style={{ color: '#fdcb6e' }}>🎯 ADHD Path</strong>
            <p style={{ margin: '8px 0 0 0' }}>
              Coming soon with gamification, short lessons, and interactive activities
            </p>
          </div>
          <div>
            <strong style={{ color: '#0984e3' }}>🧩 Autism Path</strong>
            <p style={{ margin: '8px 0 0 0' }}>
              In development with visual schedules, social stories, and structured learning
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}