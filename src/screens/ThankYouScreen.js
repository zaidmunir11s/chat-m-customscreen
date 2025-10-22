// src/screens/ThankYouScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const ThankYouScreen = () => {
  const navigate = useNavigate();
  const { getReport } = useSession();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSeeNow = async () => {
    setLoading(true);
    setError(null);

    try {
      const report = await getReport();

      console.log('Report received:', report);

      // Navigate to result screen with score and pass report data
      // The backend returns assessment_score.total_score
      let score;
      if (report && report.assessment_score && typeof report.assessment_score.total_score === 'number') {
        score = report.assessment_score.total_score;
      } else if (report && typeof report.final_score === 'number') {
        score = report.final_score;
      } else if (report && typeof report.score === 'number') {
        score = report.score;
      }

      if (score !== undefined) {
        navigate(`/result/${score}`, { state: { report } });
      } else {
        console.error('Report structure:', report);
        setError('Unable to retrieve score from report. Please try again.');
      }
    } catch (err) {
      console.error('Failed to get report:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container" style={{
      backgroundImage: 'url(/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative'
    }}>
      {error && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(239, 68, 68, 0.95)',
          color: 'white',
          padding: '30px 50px',
          borderRadius: '20px',
          fontSize: '44px',
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          {error}
        </div>
      )}

      <div style={{
        minHeight: '100%',
        position: 'relative'
      }}>
        {/* Thank you! text */}
        <div style={{
          position: 'absolute',
          top: '303px',
          left: '92px',
          width: '1976px',
          height: '336px',
          border: '2px solid transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{
            fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : 'Instrument Sans',
            fontSize: '373px',
            fontWeight: '500',
            color: '#FFFFFF',
            lineHeight: '0.9',
            letterSpacing: '-14.92px',
            textAlign: 'center',
            margin: 0,
            padding: '60px 0',
            whiteSpace: 'nowrap',
            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('thankYou.title')}
          </h1>
        </div>

        {/* Middle Text */}
        <div style={{
          position: 'absolute',
          top: '1850px',
          left: '0',
          right: '0',
          textAlign: 'center',
          fontSize: '64px',
          fontWeight: '400',
          color: 'white',
          lineHeight: '1.4'
        }}>
          {t('thankYou.question')}<br />
          {t('thankYou.description')}
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
              transition: 'all 0.3s ease'
            }}
            onClick={() => navigate('/email')}
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
              E
            </span>
            {t('thankYou.laterByEmail')}
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
              opacity: loading ? 0.7 : 1
            }}
            onClick={handleSeeNow}
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
            {loading ? t('common.loading') : t('thankYou.seeNow')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouScreen;
