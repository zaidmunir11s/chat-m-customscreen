// src/screens/AgeSelectionScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const AgeSelectionScreen = () => {
  const navigate = useNavigate();
  const { createSession, loading, error } = useSession();
  const { t, i18n } = useTranslation();
  const { language } = useLanguage();
  const [age, setAge] = useState(16);

  const handleSliderChange = (e) => {
    setAge(parseInt(e.target.value));
  };

  const handleStartScreening = async () => {
    try {
      // Generate a 10-character MRN (3-15 chars as per backend validation)
      const randomMRN = `MRN${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      // Create session with selected age
      await createSession({
        parentName: 'Parent', // You might want to collect this earlier
        childName: 'Child',   // You might want to collect this earlier
        childAge: age,
        language: i18n.language === 'ar' ? 'arabic' : 'english',
        mrn: randomMRN // Generate or collect MRN
      });

      navigate('/chat');
    } catch (err) {
      console.error('Failed to create session:', err);
      alert('Failed to start screening. Please try again.');
    }
  };

  const progress = ((age - 16) / (30 - 16)) * 100;

  return (
    <div className="app-container" style={{
      backgroundImage: 'url(/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {error && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(239, 68, 68, 0.95)',
          color: 'white',
          padding: '40px 60px',
          borderRadius: '20px',
          fontSize: '48px',
          zIndex: 1000
        }}>
          {error}
        </div>
      )}

      <div style={{ minHeight: '100%', position: 'relative' }}>
        {/* Title Section */}
        <div style={{
          textAlign: 'center',
          paddingTop: '120px'
        }}>
          <h1 style={{
            textAlign: 'center',
            WebkitTextStrokeWidth: '2px',
            WebkitTextStrokeColor: '#FFF',
            fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : '"Instrument Sans", sans-serif',
            fontSize: '230px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '80%',
            letterSpacing: '-9.2px',
            background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.70) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0'
          }}>
            {t('ageSelection.title')}
            <br />
            {t('ageSelection.subtitle')}
          </h1>
        </div>

        {/* How old are you + dots */}
        <div style={{
          textAlign: 'center',
          marginTop: '150px'
        }}>
          <p style={{
            fontSize: '64px',
            fontWeight: '600',
            color: 'white',
            marginBottom: '50px',
            fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : '"Instrument Sans", sans-serif'
          }}>
            {t('ageSelection.howOldAreYou')}
          </p>

          {/* Progress Dots */}
          <div style={{
            display: 'flex',
            gap: '28px',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.5)'
            }}></div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'white'
            }}></div>
          </div>
        </div>

        {/* Age Container - WITH PROPER CENTERING */}
        <div style={{
          position: 'absolute',
          top: '1368px',
          left: '0',
          right: '0',
          width: '100%',
          height: '1241px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          {/* 16 text - With exact properties but centered */}
          <div style={{
            width: '100%',
            height: '1091px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible'
          }}>
            <div style={{
              fontFamily: 'Instrument Sans',
              fontSize: '970px',
              fontWeight: '400',
              color: '#FFFFFF',
              lineHeight: '1.2',
              letterSpacing: '-67.9px',
              textAlign: 'center',
              background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              padding: '0 100px'
            }}>
              {age}
            </div>
          </div>

          {/* months text - With exact properties */}
          <div style={{
            width: '100%',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : 'Instrument Sans',
              fontSize: '150px',
              fontWeight: '400',
              color: '#FFFFFF',
              lineHeight: '1',
              letterSpacing: '-4.5px',
              textAlign: 'center',
              background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {t('ageSelection.months')}
            </div>
          </div>
        </div>

        {/* Slider - CENTERED */}
        <div style={{
          position: 'absolute',
          top: '2750px',
          left: '212px',
          right: '212px',
          width: 'auto'
        }}>
          <input
            type="range"
            min="16"
            max="30"
            value={age}
            onChange={handleSliderChange}
            style={{
              width: '100%',
              height: '28px',
              borderRadius: '620px',
              outline: 'none',
              WebkitAppearance: 'none',
              appearance: 'none',
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${progress}%, rgba(255, 255, 255, 0.4) ${progress}%, rgba(255, 255, 255, 0.4) 100%)`,
              cursor: 'pointer'
            }}
            className="age-slider"
          />
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
            onClick={() => navigate('/introduction')}
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
              {t('common.esc')}
            </span>
            {t('common.back')}
          </button>

          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
              padding: '50px 80px',
              borderRadius: '40px',
              background: loading ? '#6b7280' : '#10b981',
              color: 'white',
              fontSize: '60px',
              fontWeight: '600',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1,
              fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : '"Instrument Sans", sans-serif'
            }}
            onClick={handleStartScreening}
            disabled={loading}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(16, 185, 129, 0.4)';
              }
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
              {loading ? '...' : 'S'}
            </span>
            {loading ? t('ageSelection.starting') : t('home.startScreening')}
          </button>
        </div>
      </div>

      <style>{`
        .age-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 0 0 8px white, 0 4px 12px rgba(16, 185, 129, 0.4);
          transition: all 0.3s ease;
          border: none;
          margin-top: -30px;
        }

        .age-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 0 8px white, 0 6px 16px rgba(16, 185, 129, 0.5);
        }

        .age-slider::-moz-range-thumb {
          width: 88px;
          height: 88px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 0 8px white, 0 4px 12px rgba(16, 185, 129, 0.4);
          transition: all 0.3s ease;
        }

        .age-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 0 0 8px white, 0 6px 16px rgba(16, 185, 129, 0.5);
        }

        .age-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 28px;
          cursor: pointer;
          border-radius: 16px;
        }

        .age-slider::-moz-range-track {
          width: 100%;
          height: 28px;
          cursor: pointer;
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
};

export default AgeSelectionScreen;
