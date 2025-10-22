import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useSession } from '../context/SessionContext';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const EmailScreen = () => {
  const navigate = useNavigate();
  // const { sessionData, sessionId } = useSession();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Validate email
    if (!email) {
      setError(t('email.errorRequired'));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(t('email.errorInvalid'));
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Simulate email send (setTimeout 1500ms)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success alert
      alert(t('email.successMessage', { email }));

      // Navigate to home
      navigate('/');
    } catch (err) {
      setError(t('email.errorSendFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container" style={{
      backgroundImage: 'url(/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div style={{
        padding: '200px 120px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
      }}>
        {/* Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '200px' }}>
          <h1 style={{
            textAlign: 'center',
            WebkitTextStrokeWidth: '2px',
            WebkitTextStrokeColor: '#FFF',
            fontFamily: language === 'arabic' ? 'Saudi-MoD, sans-serif' : 'Instrument Sans',
            fontSize: '200px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '80%',
            letterSpacing: '-9.2px',
            background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.70) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '60px'
          }}>
            {t('email.title')}
          </h1>
          <h1 style={{
            textAlign: 'center',
            WebkitTextStrokeWidth: '2px',
            WebkitTextStrokeColor: '#FFF',
            fontFamily: language === 'arabic' ? 'Saudi-MoD, sans-serif' : 'Instrument Sans',
            fontSize: '200px',
            fontStyle: 'normal',
            fontWeight: '500',
            lineHeight: '80%',
            letterSpacing: '-9.2px',
            background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.70) 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '80px'
          }}>
            {t('email.subtitle')}
          </h1>
          <p style={{
            fontSize: '64px',
            fontWeight: '400',
            color: 'white',
            lineHeight: '1.4',
            fontFamily: language === 'arabic' ? 'Saudi-MoD, sans-serif' : '"Instrument Sans", sans-serif'
          }}>
            {t('email.description')}
          </p>
        </div>

        {/* Error Toast */}
        {error && (
          <div style={{
            position: 'fixed',
            top: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(239, 68, 68, 0.95)',
            color: 'white',
            padding: '30px 60px',
            borderRadius: '24px',
            fontSize: '48px',
            fontWeight: '600',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: 1000
          }}>
            {error}
          </div>
        )}

        {/* Form Container with Star */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '64px',
          padding: '80px 120px',
          marginBottom: '400px',
          border: '3px solid rgba(255, 255, 255, 0.3)'
        }}>
          {/* Star Divider */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '60px'
          }}>
            <span style={{
              fontSize: '72px',
              color: 'white'
            }}>✦</span>
          </div>

          {/* Email Input Field - Split into two containers */}
          {/* Email Label Container */}
          <div style={{
            borderRadius: '50px 50px 0 0',
            border: '4px solid #FFF',
            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%), rgba(255, 255, 255, 0.50)',
            padding: '48px 70px 32px 70px'
          }}>
            <label style={{
              fontSize: '56px',
              fontWeight: '600',
              color: '#10b981',
              display: 'block'
            }}>
              {t('email.emailLabel')}
            </label>
          </div>

          {/* Your Email Input Container */}
          <div style={{
            borderRadius: '0 0 50px 50px',
            borderRight: '4px solid #FFF',
            borderBottom: '4px solid #FFF',
            borderLeft: '4px solid #FFF',
            background: 'rgba(255, 255, 255, 0.50)',
            padding: '32px 70px 48px 70px'
          }}>
            <input
              type="email"
              placeholder={t('email.emailPlaceholder')}
              style={{
                width: '100%',
                padding: '0',
                border: 'none',
                background: 'transparent',
                color: 'rgba(16, 185, 129, 0.4)',
                fontSize: '52px',
                outline: 'none',
                fontWeight: '400'
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Bottom Buttons */}
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          marginTop: 'auto'
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
            onClick={() => navigate('/thank-you')}
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
              background: loading ? '#9ca3af' : '#10b981',
              color: 'white',
              fontSize: '60px',
              fontWeight: '600',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? '0 4px 20px rgba(156, 163, 175, 0.3)' : '0 4px 20px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1
            }}
            onClick={handleSubmit}
            disabled={loading}
            onMouseOver={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(16, 185, 129, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.3)';
              }
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
              {loading ? '...' : '✓'}
            </span>
            {loading ? t('email.sending') : t('email.submit')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailScreen;
