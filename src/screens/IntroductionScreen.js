import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const IntroductionScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="app-container" style={{
      backgroundImage: 'url(/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div style={{ padding: '180px 120px', textAlign: 'center' }}>
        {/* Title Section */}
        <h1 style={{
          fontSize: '200px',
          fontWeight: '700',
          color: 'white',
          lineHeight: '1',
          marginBottom: '40px',
          letterSpacing: '-3px',
          padding: '60px 0'
        }}>
          {t('introduction.title')}
        </h1>
        <h1 style={{
          fontSize: '200px',
          fontWeight: '700',
          color: 'rgba(255, 255, 255, 0.5)',
          lineHeight: '1',
          marginBottom: '60px',
          letterSpacing: '-3px',
          padding: '60px 0'
        }}>
          {t('introduction.subtitle')}
        </h1>

        <p style={{
          fontSize: '64px',
          fontWeight: '400',
          color: 'white',
          marginBottom: '80px'
        }}>
          {t('introduction.description')}
        </p>

        {/* Progress Dots */}
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          marginBottom: '100px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'white'
          }}></div>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.4)'
          }}></div>
        </div>

        {/* Info Cards Container */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '64px',
          padding: '80px',
          marginBottom: '120px',
          border: '2px solid rgba(255, 255, 255, 0.25)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px'
          }}>
            {/* Card 1 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              borderRadius: '40px',
              padding: '60px',
              textAlign: 'left',
              border: '3px solid rgba(255, 255, 255, 0.6)'
            }}>
              <div style={{
                fontSize: '72px',
                color: '#10b981',
                marginBottom: '32px'
              }}>
                ✓
              </div>
              <h3 style={{
                fontSize: '64px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '28px'
              }}>
                {t('introduction.card1Title')}
              </h3>
              <p style={{
                fontSize: '48px',
                color: '#4b5563',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                {t('introduction.card1Text')}
              </p>
            </div>

            {/* Card 2 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              borderRadius: '40px',
              padding: '60px',
              textAlign: 'left',
              border: '3px solid rgba(255, 255, 255, 0.6)'
            }}>
              <div style={{
                fontSize: '72px',
                color: '#10b981',
                marginBottom: '32px'
              }}>
                ⚙
              </div>
              <h3 style={{
                fontSize: '64px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '28px'
              }}>
                {t('introduction.card2Title')}
              </h3>
              <p style={{
                fontSize: '48px',
                color: '#4b5563',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                {t('introduction.card2Text')}
              </p>
            </div>

            {/* Card 3 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              borderRadius: '40px',
              padding: '60px',
              textAlign: 'left',
              border: '3px solid rgba(255, 255, 255, 0.6)'
            }}>
              <div style={{
                fontSize: '72px',
                color: '#10b981',
                marginBottom: '32px'
              }}>
                ⓘ
              </div>
              <h3 style={{
                fontSize: '64px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '28px'
              }}>
                {t('introduction.card3Title')}
              </h3>
              <p style={{
                fontSize: '48px',
                color: '#4b5563',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                {t('introduction.card3Text')}
              </p>
            </div>

            {/* Card 4 */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)',
              borderRadius: '40px',
              padding: '60px',
              textAlign: 'left',
              border: '3px solid rgba(255, 255, 255, 0.6)'
            }}>
              <div style={{
                fontSize: '72px',
                color: '#10b981',
                marginBottom: '32px'
              }}>
                📋
              </div>
              <h3 style={{
                fontSize: '64px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '28px'
              }}>
                {t('introduction.card4Title')}
              </h3>
              <p style={{
                fontSize: '48px',
                color: '#4b5563',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                {t('introduction.card4Text')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div style={{
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
            onClick={() => navigate('/')}
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
              background: '#10b981',
              color: 'white',
              fontSize: '60px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => navigate('/age-selection')}
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
              N
            </span>
            {t('common.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroductionScreen;
