// src/screens/ResultScreen.js - WITH EXACT POSITIONING
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

const ResultScreen = () => {
  const navigate = useNavigate();
  const { score } = useParams();
  const location = useLocation();
  const { getReport, clearSession } = useSession();
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
          textAlign: 'center'
        }}>
          Loading report...
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
        {/* Report Metadata Section */}
        {reportData && (
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '160px',
            right: '160px',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '40px',
            padding: '40px 60px',
            border: '3px solid rgba(255, 255, 255, 0.8)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '40px',
              fontSize: '36px',
              color: '#1f2937'
            }}>
              <div>
                <strong>Parent:</strong> {reportData.parent_name || 'N/A'}
              </div>
              <div>
                <strong>Child:</strong> {reportData.child_name || 'N/A'}
              </div>
              <div>
                <strong>Age:</strong> {reportData.child_age || 'N/A'} months
              </div>
              <div>
                <strong>MRN:</strong> {reportData.mrn || 'N/A'}
              </div>
              <div>
                <strong>Completed:</strong> {reportData.completed_at ? new Date(reportData.completed_at).toLocaleDateString() : 'N/A'}
              </div>
            </div>
          </div>
        )}

        {/* Title - Your score: */}
        <div style={{
          position: 'absolute',
          top: '150px',
          left: '0',
          right: '0',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontFamily: 'Instrument Sans',
            fontSize: '330px',
            fontWeight: '500',
            color: '#FFFFFF',
            lineHeight: '0.9',
            letterSpacing: '-13.2px',
            margin: 0
          }}>
            Your score:
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
            What it means?
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
              Total Score 0-2
            </h3>
            <p style={{
              fontSize: '46px',
              color: '#1f2937',
              lineHeight: '1.5',
              fontWeight: '400'
            }}>
              The score indicates <strong>LOW likelihood for autism.</strong> No Follow-Up needed. Child has screened negative. Refer as needed if developmental surveillance or other tools suggest increased likelihood for autism. Rescreen at 24 months if the child is younger than 2 years old.
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
              Total Score 3-7
            </h3>
            <p style={{
              fontSize: '46px',
              color: '#1f2937',
              lineHeight: '1.5',
              fontWeight: '400'
            }}>
              The score indicates <strong>MODERATE likelihood for autism.</strong> Administer the M-CHAT-R Follow-Up items that correspond to the elevated likelihood responses. Only those items which were scored as elevated likelihood need to be completed. If 2 or more items continue to indicate elevated likelihood, the result is a positive screen. Refer the child immediately for (a) early intervention and (b) diagnostic evaluation.
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
              Total Score: 8-20
            </h3>
            <p style={{
              fontSize: '46px',
              color: '#1f2937',
              lineHeight: '1.5',
              fontWeight: '400'
            }}>
              The score indicates <strong>HIGH likelihood for autism.</strong> The child has screened positive. It is not necessary to complete the M-CHAT-R Follow-Up at this time. Bypass Follow-Up, and refer immediately for (a) early intervention and (b) diagnostic evaluation.
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
              Esc
            </span>
            Back to main
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
