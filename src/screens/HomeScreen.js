// src/screens/HomeScreen.js - WITH EXACT CONTAINER PROPERTIES
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { t, setEnglish, setArabic, language } = useLanguage();

  return (
    <div className="app-container" style={{
      backgroundImage: 'url(/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      <div style={{
        minHeight: '100%',
        position: 'relative'
      }}>
        {/* Title Container - Frame 1000007853 - WITH EXACT FIGMA PROPERTIES */}
        <div style={{
          position: 'absolute',
          top: '359.5px',
          left: '92px',
          width: '1976px',
          height: '1296px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '138px'
        }}>
          {/* Autism text */}
          <div style={{
            width: '1976px',
            height: '330px',
            border: '2px solid transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h1 style={{
              textAlign: 'center',
              WebkitTextStrokeWidth: '2px',
              WebkitTextStrokeColor: '#FFF',
              fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : '"Instrument Sans", sans-serif',
              fontSize: '413px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '80%',
              letterSpacing: '-16.52px',
              background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.70) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              {t('home.title')}
            </h1>
          </div>

          {/* Screening text */}
          <div style={{
            width: '1976px',
            height: '330px',
            border: '2px solid transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h1 style={{
              fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : '"Instrument Sans", sans-serif',
              fontSize: '413px',
              fontWeight: '500',
              color: '#52FFA0',
              lineHeight: '0.8',
              letterSpacing: '-16.52px',
              textAlign: 'center',
              margin: 0,
              padding: '60px 0',
              background: 'radial-gradient(circle, #52FFA0 0%, #D3FFEB 50%, #60FAAD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {t('home.screening')}
            </h1>
          </div>

          {/* Tool text */}
          <div style={{
            width: '1976px',
            height: '330px',
            border: '2px solid transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h1 style={{
              textAlign: 'center',
              WebkitTextStrokeWidth: '2px',
              WebkitTextStrokeColor: '#FFF',
              fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : '"Instrument Sans", sans-serif',
              fontSize: '413px',
              fontStyle: 'normal',
              fontWeight: '500',
              lineHeight: '80%',
              letterSpacing: '-16.52px',
              background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.70) 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              {t('home.tool')}
            </h1>
          </div>
        </div>

        {/* Subtitle - Two lines */}
        <div style={{
          position: 'absolute',
          top: '1750px',
          left: '0',
          right: '0',
          textAlign: 'center',
          fontSize: '64px',
          fontWeight: '400',
          color: 'white',
          lineHeight: '1.4',
          fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : '"Instrument Sans", sans-serif'
        }}>
          {t('home.subtitle')}
        </div>

        {/* Language Selection Container */}
        <div style={{
          position: 'absolute',
          top: '2725px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0',
          padding: '10px',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '46px',
          border: '1.75px solid #EEEEEE'
        }}>
          {/* English Button */}
          <button
            onClick={setEnglish}
            style={{
              minWidth: '340px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              padding: '32px 48px',
              borderRadius: '36px',
              background: language === 'english' ? '#10b981' : 'transparent',
              color: language === 'english' ? 'white' : '#1f2937',
              fontSize: '56px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ fontSize: '56px' }}>🇺🇸</span>
            English
          </button>

          {/* Arabic Button */}
          <button
            onClick={setArabic}
            style={{
              minWidth: '340px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              padding: '32px 48px',
              borderRadius: '36px',
              background: language === 'arabic' ? '#10b981' : 'transparent',
              color: language === 'arabic' ? 'white' : '#1f2937',
              fontSize: '56px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              fontFamily: 'Saudi-mod, sans-serif'
            }}
          >
            <span style={{ fontSize: '56px' }}>🇸🇦</span>
            عربي
          </button>
        </div>

        {/* Bottom Buttons */}
        <div style={{
          position: 'absolute',
          bottom: '200px',
          left: '0',
          right: '0',
          display: 'flex',
          gap: '40px',
          justifyContent: 'center'
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
              fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : '"Instrument Sans", sans-serif'
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
            {t('home.contactSpecialist')}
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
              fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : '"Instrument Sans", sans-serif'
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
            {t('home.startScreening')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
