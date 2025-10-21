import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container" style={{
      backgroundImage: 'url(/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: '300px 120px 200px'
      }}>
        {/* Title Section */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h1 style={{
            fontSize: '280px',
            fontWeight: '700',
            color: 'white',
            lineHeight: '0.95',
            marginBottom: '80px',
            letterSpacing: '-4px'
          }}>
            Autism
          </h1>
          <h1 style={{
            fontSize: '280px',
            fontWeight: '700',
            color: 'rgba(255, 255, 255, 0.5)',
            lineHeight: '0.95',
            marginBottom: '80px',
            letterSpacing: '-4px'
          }}>
            Screening
          </h1>
          <h1 style={{
            fontSize: '280px',
            fontWeight: '700',
            color: 'white',
            lineHeight: '0.95',
            marginBottom: '120px',
            letterSpacing: '-4px'
          }}>
            Tool
          </h1>

          <p style={{
            fontSize: '68px',
            fontWeight: '400',
            color: 'white',
            lineHeight: '1.4',
            marginBottom: '400px'
          }}>
            Early detection for children<br />
            aged 16 to 30 months
          </p>
        </div>

        {/* Language Selector */}
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          marginBottom: '300px'
        }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '32px 56px',
            borderRadius: '20px',
            background: '#10b981',
            color: 'white',
            fontSize: '52px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.3s ease'
          }}>
            <span style={{ fontSize: '56px' }}>🇺🇸</span>
            English
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            padding: '32px 56px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            fontSize: '52px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            <span style={{ fontSize: '56px' }}>🇸🇦</span>
            العربية
          </button>
        </div>

        {/* Bottom Buttons */}
        <div style={{
          display: 'flex',
          gap: '48px',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1800px'
        }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              padding: '50px 80px',
              borderRadius: '40px',
              background: 'white',
              color: '#1f2937',
              fontSize: '60px',
              fontWeight: '600',
              border: '4px solid #e5e7eb',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              flex: 1
            }}
            onClick={() => navigate('/contact-specialist')}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(0, 0, 0, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '90px',
              height: '70px',
              padding: '0 12px',
              borderRadius: '20px',
              background: 'transparent',
              border: '4px solid #6b7280',
              fontSize: '44px',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              H
            </span>
            Contact Specialist
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              padding: '50px 80px',
              borderRadius: '40px',
              background: '#10b981',
              color: 'white',
              fontSize: '60px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
              flex: 1
            }}
            onClick={() => navigate('/introduction')}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(16, 185, 129, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';
            }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '90px',
              height: '70px',
              padding: '0 12px',
              borderRadius: '20px',
              background: 'transparent',
              border: '4px solid white',
              fontSize: '44px',
              fontWeight: '600',
              color: 'white'
            }}>
              S
            </span>
            Start Screening
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
