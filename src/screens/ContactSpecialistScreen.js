import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';

const ContactSpecialistScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    medicalRecord: '',
    assessmentDate: 'October 10, 2025, 03:53 PM'
  });

  const handleSubmit = () => {
    navigate('/thank-you');
  };

  return (
    <div className="app-container" style={{
      backgroundImage: 'url(/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div style={{
        padding: '180px 120px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
      }}>
        {/* Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '140px' }}>
          <h1 style={{
            textAlign: 'center',
            WebkitTextStrokeWidth: '2px',
            WebkitTextStrokeColor: '#FFF',
            fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : 'Instrument Sans',
            fontSize: '220px',
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
            {t('contactSpecialist.title')}
          </h1>
          <h1 style={{
            textAlign: 'center',
            WebkitTextStrokeWidth: '2px',
            WebkitTextStrokeColor: '#FFF',
            fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : 'Instrument Sans',
            fontSize: '220px',
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
            {t('contactSpecialist.subtitle')}
          </h1>
          <p style={{
            fontSize: '64px',
            fontWeight: '400',
            color: 'white',
            lineHeight: '1.4',
            fontFamily: language === 'arabic' ? 'Saudi-mod, sans-serif' : 'Instrument Sans'
          }}>
            {t('contactSpecialist.description')}
          </p>
        </div>

        {/* Form Section */}
        <div style={{ flex: 1, maxWidth: '1920px', margin: '0 auto', width: '100%' }}>
          {/* Parent/Guardian Name */}
          <div style={{ marginBottom: '40px' }}>
            {/* Label Container */}
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
                {t('contactSpecialist.parentGuardianName')}
              </label>
            </div>

            {/* Input Container */}
            <div style={{
              borderRadius: '0 0 50px 50px',
              borderRight: '4px solid #FFF',
              borderBottom: '4px solid #FFF',
              borderLeft: '4px solid #FFF',
              background: 'rgba(255, 255, 255, 0.50)',
              padding: '32px 70px 48px 70px'
            }}>
              <input
                type="text"
                placeholder={t('contactSpecialist.enterName')}
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
                value={formData.parentName}
                onChange={(e) => setFormData({...formData, parentName: e.target.value})}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '60px 0'
          }}>
            <span style={{
              fontSize: '72px',
              color: 'white'
            }}>✦</span>
          </div>

          {/* Child Name */}
          <div style={{ marginBottom: '40px' }}>
            {/* Label Container */}
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
                {t('contactSpecialist.childName')}
              </label>
            </div>

            {/* Input Container */}
            <div style={{
              borderRadius: '0 0 50px 50px',
              borderRight: '4px solid #FFF',
              borderBottom: '4px solid #FFF',
              borderLeft: '4px solid #FFF',
              background: 'rgba(255, 255, 255, 0.50)',
              padding: '32px 70px 48px 70px'
            }}>
              <input
                type="text"
                placeholder={t('contactSpecialist.enterName')}
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
                value={formData.childName}
                onChange={(e) => setFormData({...formData, childName: e.target.value})}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '60px 0'
          }}>
            <span style={{
              fontSize: '72px',
              color: 'white'
            }}>✦</span>
          </div>

          {/* Medical Record Number */}
          <div style={{ marginBottom: '40px' }}>
            {/* Label Container */}
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
                {t('contactSpecialist.medicalRecordNumber')}
              </label>
            </div>

            {/* Input Container */}
            <div style={{
              borderRadius: '0 0 50px 50px',
              borderRight: '4px solid #FFF',
              borderBottom: '4px solid #FFF',
              borderLeft: '4px solid #FFF',
              background: 'rgba(255, 255, 255, 0.50)',
              padding: '32px 70px 48px 70px'
            }}>
              <input
                type="text"
                placeholder={t('contactSpecialist.enterNumber')}
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
                value={formData.medicalRecord}
                onChange={(e) => setFormData({...formData, medicalRecord: e.target.value})}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '60px 0'
          }}>
            <span style={{
              fontSize: '72px',
              color: 'white'
            }}>✦</span>
          </div>

          {/* Assessment Date */}
          <div style={{ marginBottom: '100px' }}>
            {/* Label Container */}
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
                {t('contactSpecialist.assessmentDate')}
              </label>
            </div>

            {/* Date Display Container */}
            <div style={{
              borderRadius: '0 0 50px 50px',
              borderRight: '4px solid #FFF',
              borderBottom: '4px solid #FFF',
              borderLeft: '4px solid #FFF',
              background: 'rgba(255, 255, 255, 0.50)',
              padding: '32px 70px 48px 70px'
            }}>
              <div style={{
                width: '100%',
                padding: '0',
                color: '#1f2937',
                fontSize: '52px',
                fontWeight: '500'
              }}>
                {formData.assessmentDate}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div style={{
          display: 'flex',
          gap: '40px',
          justifyContent: 'center',
          paddingTop: '300px'
        }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '48px 72px',
              borderRadius: '26px',
              background: 'white',
              color: '#1f2937',
              fontSize: '58px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => navigate('/chat')}
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
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              background: '#f3f4f6',
              fontSize: '42px',
              fontWeight: '700',
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
              gap: '24px',
              padding: '48px 72px',
              borderRadius: '26px',
              background: '#10b981',
              color: 'white',
              fontSize: '58px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onClick={handleSubmit}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.3)';
            }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.25)',
              fontSize: '42px',
              fontWeight: '700',
              color: 'white'
            }}>
              ✓
            </span>
            {t('contactSpecialist.submitForm')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSpecialistScreen;