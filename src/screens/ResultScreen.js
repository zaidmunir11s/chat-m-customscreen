// src/screens/ResultScreen.js - WITH EXACT POSITIONING
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const ResultScreen = () => {
  const navigate = useNavigate();
  const { score } = useParams();
  const location = useLocation();
  const { getReport, clearSession } = useSession();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [reportData, setReportData] = useState(location.state?.report || null);
  const [loading, setLoading] = useState(!location.state?.report);

  const scoreNum = parseInt(score);

  // Load report on mount only if not passed via navigation state
  useEffect(() => {
    const loadReport = async () => {
      // Skip if report already loaded from navigation state
      if (location.state?.report) {
        return;
      }

      try {
        setLoading(true);
        const report = await getReport();
        setReportData(report);
      } catch (error) {
        console.error('Failed to load report:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [getReport, location.state?.report]);

  // Function to get background image based on score
  const getBackgroundImage = () => {
    if (scoreNum <= 2) {
      return 'url(/bg.png)'; // Green background for low risk (0-2)
    } else if (scoreNum >= 3 && scoreNum <= 7) {
      return 'url(/yellow_bg.png)'; // Yellow background for moderate risk (3-7)
    } else {
      return 'url(/red_bg.png)'; // Red background for high risk (8-20)
    }
  };

  const handleBackToMain = () => {
    clearSession();
    navigate('/');
  };

  // Display loading state
  if (loading) {
    return (
      <div className="app-container" style={{
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          fontSize: '64px',
          fontWeight: '600',
          color: 'white',
          textAlign: 'center',
          fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : '"Instrument Sans", sans-serif'
        }}>
          {t('result.loadingReport')}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{
      backgroundImage: getBackgroundImage(),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflow: 'auto'
    }}>
      <div style={{
        minHeight: '100%',
        position: 'relative'
      }}>
        {/* Title - Your score: */}
        <div style={{
          position: 'absolute',
          top: '150px',
          left: '0',
          right: '0',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : 'Instrument Sans',
            fontSize: '330px',
            fontWeight: '500',
            color: '#FFFFFF',
            lineHeight: '0.9',
            letterSpacing: '-13.2px',
            margin: 0,
            padding: '60px 0'
          }}>
            {t('result.title')}
          </h1>
        </div>

        {/* Score number */}
        <div style={{
          position: 'absolute',
          top: '600px',
          left: '0',
          right: '0',
          textAlign: 'center'
        }}>
          <div style={{
            fontFamily: 'Instrument Sans',
            fontSize: '790px',
            fontWeight: '400',
            lineHeight: '1.1',
            letterSpacing: '-55.3px',
            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.7) 70%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {scoreNum}
          </div>
        </div>

        {/* What it means container - With exact Figma properties */}
        <div style={{
          position: 'absolute',
          top: '1640px',
          left: '160px',
          width: '1898px',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '82px',
          padding: '32px',
          border: '4px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}>
          {/* What it means text */}
          <div style={{
            textAlign: 'center',
            fontSize: '60px',
            fontWeight: '600',
            color: 'white'
          }}>
            {t('result.whatItMeans')}
          </div>

          {/* Score 0-2 Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '40px',
            padding: '55px 60px',
            border: scoreNum <= 2 ? '3px solid rgba(255, 255, 255, 0.8)' : 'none'
          }}>
            <h3 style={{
              fontSize: '62px',
              fontWeight: '700',
              color: '#10b981',
              marginBottom: '28px'
            }}>
              {t('result.score0to2Title')}
            </h3>
            <p style={{
              fontSize: '46px',
              color: '#1f2937',
              lineHeight: '1.5',
              fontWeight: '400'
            }}>
              {t('result.score0to2Text')}
            </p>
          </div>

          {/* Score 3-7 Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '40px',
            padding: '55px 60px',
            border: scoreNum >= 3 && scoreNum <= 7 ? '3px solid rgba(255, 255, 255, 0.8)' : 'none'
          }}>
            <h3 style={{
              fontSize: '62px',
              fontWeight: '700',
              color: '#f59e0b',
              marginBottom: '28px'
            }}>
              {t('result.score3to7Title')}
            </h3>
            <p style={{
              fontSize: '46px',
              color: '#1f2937',
              lineHeight: '1.5',
              fontWeight: '400'
            }}>
              {t('result.score3to7Text')}
            </p>
          </div>

          {/* Score 8-20 Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '40px',
            padding: '55px 60px',
            border: scoreNum >= 8 ? '3px solid rgba(255, 255, 255, 0.8)' : 'none'
          }}>
            <h3 style={{
              fontSize: '62px',
              fontWeight: '700',
              color: '#ef4444',
              marginBottom: '28px'
            }}>
              {t('result.score8to20Title')}
            </h3>
            <p style={{
              fontSize: '46px',
              color: '#1f2937',
              lineHeight: '1.5',
              fontWeight: '400'
            }}>
              {t('result.score8to20Text')}
            </p>
          </div>
        </div>

        {/* Bottom Button */}
        <div style={{
          position: 'absolute',
          bottom: '200px',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '45px 70px',
              borderRadius: '36px',
              background: 'white',
              color: '#1f2937',
              fontSize: '56px',
              fontWeight: '600',
              border: '3px solid #e5e7eb',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onClick={handleBackToMain}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '65px',
              borderRadius: '18px',
              background: 'transparent',
              border: '3px solid #6b7280',
              fontSize: '40px',
              fontWeight: '600',
              color: '#1f2937'
            }}>
              {t('common.esc')}
            </span>
            {t('result.backToMain')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
