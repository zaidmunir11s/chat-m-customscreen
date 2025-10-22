import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useLanguage } from '../context/LanguageContext';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import APIService from '../services/api';

const ChatScreen = () => {
  const navigate = useNavigate();
  const { t, isRTL, language } = useLanguage();
  const { sessionId, sessionData, messages, sendMessage, loading, error, conversationComplete } = useSession();
  const [inputMessage, setInputMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoMessage, setCurrentVideoMessage] = useState(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const { isRecording, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  useEffect(() => {
    if (!sessionId) {
      navigate('/age-selection');
    }
  }, [sessionId, navigate]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (audioBlob && !isRecording) {
      handleSendAudio(audioBlob);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioBlob, isRecording]);

  useEffect(() => {
    if (conversationComplete) {
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);
    }
  }, [conversationComplete, navigate]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      await sendMessage(inputMessage, false);
      setInputMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleSendAudio = async (blob) => {
    try {
      setIsTranscribing(true);
      const audioFile = new File([blob], 'recording.webm', { type: 'audio/webm' });

      const transcriptionResult = await APIService.transcribeAudio(audioFile, sessionData?.language || 'english');

      if (transcriptionResult.text) {
        await sendMessage(transcriptionResult.text, false);
      } else {
        console.error('No transcription text received');
      }
    } catch (err) {
      console.error('Failed to send audio:', err);
      alert('Voice recognition failed. Please try again or type your response.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleVoiceToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleListenClick = async (messageText, messageIndex, language = 'english') => {
    try {
      if (isPlaying === messageIndex) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setIsPlaying(null);
        return;
      }

      if (isPlaying !== null && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      setIsPlaying(messageIndex);

      const response = await fetch('https://rset-api.onrender.com/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: messageText,
          language: language,
          session_id: sessionId
        })
      });

      if (!response.ok) {
        throw new Error('TTS generation failed');
      }

      const data = await response.json();

      if (data.audio_url && audioRef.current) {
        audioRef.current.src = data.audio_url;
        await audioRef.current.play();
      } else {
        throw new Error('No audio URL received');
      }
    } catch (err) {
      console.error('Failed to play audio:', err);
      setIsPlaying(null);
      alert('Failed to read the message. Please try again.');
    }
  };

  const handleWatchClick = (messageIndex) => {
    setCurrentVideoMessage(messageIndex);
    setShowVideoModal(true);
    setIsPlayingVideo(false);
  };

  const handleCloseModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideoModal(false);
    setIsPlayingVideo(false);
  };

  const handlePlayVideo = async () => {
    if (!videoRef.current) return;

    try {
      if (isPlayingVideo) {
        videoRef.current.pause();
        setIsPlayingVideo(false);
      } else {
        await videoRef.current.play();
        setIsPlayingVideo(true);
      }
    } catch (err) {
      console.error('Video play error:', err);
      setIsPlayingVideo(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="app-container" style={{
      backgroundImage: 'url(/bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      direction: isRTL ? 'rtl' : 'ltr'
    }}>
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(null)}
        onError={() => setIsPlaying(null)}
        style={{ display: 'none' }}
      />

      {/* Video Modal Popup */}
      {showVideoModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '60px',
          direction: isRTL ? 'rtl' : 'ltr'
        }}
        onClick={handleCloseModal}
        >
          <div
            style={{
              background: '#f5f5f5',
              borderRadius: '0',
              width: '100%',
              maxWidth: '1800px',
              maxHeight: '95vh',
              position: 'relative',
              padding: '80px 100px',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '30px',
                [isRTL ? 'right' : 'left']: '30px',
                background: 'transparent',
                border: 'none',
                fontSize: '70px',
                cursor: 'pointer',
                color: '#1f2937',
                padding: '0',
                lineHeight: '1',
                fontWeight: '300'
              }}
            >
              ×
            </button>

            <div style={{
              display: 'flex',
              gap: '0',
              marginBottom: '80px',
              justifyContent: isRTL ? 'flex-end' : 'flex-start',
              direction: isRTL ? 'rtl' : 'ltr'
            }}>
              <button style={{
                padding: '28px 70px',
                background: '#10b981',
                border: 'none',
                borderRadius: '0',
                fontSize: '44px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '400'
              }}>
                {t('firstExample')}
              </button>
              <button style={{
                padding: '28px 70px',
                background: '#d1d5db',
                border: 'none',
                borderRadius: '0',
                fontSize: '44px',
                color: '#6b7280',
                cursor: 'pointer',
                fontWeight: '400'
              }}>
                {t('secondExample')}
              </button>
              <button style={{
                padding: '28px 70px',
                background: '#d1d5db',
                border: 'none',
                borderRadius: '0',
                fontSize: '44px',
                color: '#6b7280',
                cursor: 'pointer',
                fontWeight: '400'
              }}>
                {t('thirdExample')}
              </button>
              <button style={{
                padding: '28px 70px',
                background: '#d1d5db',
                border: 'none',
                borderRadius: '0',
                fontSize: '44px',
                color: '#6b7280',
                cursor: 'pointer',
                fontWeight: '400'
              }}>
                {t('fourthExample')}
              </button>
            </div>

            <div style={{
              textAlign: isRTL ? 'right' : 'left',
              marginBottom: '60px'
            }}>
              <h2 style={{
                fontSize: '80px',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0 0 15px 0',
                lineHeight: '1.2'
              }}>
                {t('firstExample')}
              </h2>
              <p style={{
                fontSize: '46px',
                color: '#4b5563',
                margin: 0,
                fontWeight: '400'
              }}>
                {t('exampleDescription')}
              </p>
            </div>

            <div
              onClick={handlePlayVideo}
              style={{
                width: '100%',
                height: '750px',
                background: '#e0e0e0',
                borderRadius: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
            >
              {!isPlayingVideo && (
                <div style={{
                  width: '160px',
                  height: '160px',
                  background: 'rgba(200, 200, 200, 0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1
                }}>
                  <div style={{
                    width: '0',
                    height: '0',
                    borderLeft: '55px solid white',
                    borderTop: '35px solid transparent',
                    borderBottom: '35px solid transparent',
                    [isRTL ? 'marginRight' : 'marginLeft']: '12px'
                  }}></div>
                </div>
              )}
              <video
                ref={videoRef}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: isPlayingVideo ? 'block' : 'none'
                }}
                onEnded={() => setIsPlayingVideo(false)}
                onPause={() => setIsPlayingVideo(false)}
              >
              </video>
            </div>
          </div>
        </div>
      )}

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
        background: 'transparent',
        padding: '120px 120px 80px',
        textAlign: 'center'
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
          marginBottom: '60px'
        }}>
          {t('chat.title')}
        </h1>

        <div style={{
          display: 'flex',
          gap: '60px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '80px',
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <span style={{
            fontSize: '56px',
            color: '#1f2937',
            fontWeight: '500',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            padding: '24px 48px',
            borderRadius: '20px'
          }}>
            {sessionData?.childAge || '16'} {t('monthsOld')}
          </span>
          <span style={{
            fontSize: '56px',
            color: '#1f2937',
            fontWeight: '500',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            padding: '24px 48px',
            borderRadius: '20px'
          }}>
            {sessionData?.mrn || 'N/A'}
          </span>
        </div>

        {conversationComplete && (
          <div style={{
            fontSize: '52px',
            color: 'white',
            fontWeight: '500',
            background: '#10b981',
            padding: '32px 64px',
            borderRadius: '28px',
            display: 'inline-block',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
          }}>
            {t('screeningComplete')}
          </div>
        )}
      </div>

      <div
        ref={chatContainerRef}
        style={{
          padding: '0 120px',
          height: '2400px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '60px',
          paddingBottom: '400px'
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: message.type === 'user' ? (isRTL ? 'flex-start' : 'flex-end') : (isRTL ? 'flex-end' : 'flex-start'),
            animation: 'fadeIn 0.5s ease'
          }}>
            {message.type === 'bot' ? (
              <div style={{
                maxWidth: '85%',
                background: '#f3f4f6',
                padding: '60px 70px',
                borderRadius: '40px',
                [isRTL ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: '8px',
                fontSize: '52px',
                lineHeight: '1.6',
                color: '#1f2937',
                textAlign: isRTL ? 'right' : 'left'
              }}>
                {message.text}

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  marginTop: '40px',
                  flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                  <button
                    onClick={() => handleWatchClick(index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '20px 40px',
                      background: '#10b981',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '44px',
                      color: 'white',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}
                  >
                    <span style={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      fontSize: '36px',
                      fontWeight: '600'
                    }}>
                      W
                    </span>
                    {t('watchButton')}
                  </button>

                  <button
                    onClick={() => handleListenClick(
                      message.text,
                      index,
                      sessionData?.language || 'english'
                    )}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '20px 40px',
                      background: isPlaying === index ? '#10b981' : 'white',
                      border: '2px solid #e5e7eb',
                      borderRadius: '20px',
                      fontSize: '44px',
                      color: isPlaying === index ? 'white' : '#1f2937',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}
                  >
                    <span style={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      background: isPlaying === index ? 'rgba(255, 255, 255, 0.2)' : '#f9fafb',
                      fontSize: '36px',
                      fontWeight: '600'
                    }}>
                      {isPlaying === index ? '⏸' : 'L'}
                    </span>
                    {isPlaying === index ? t('playingButton') : t('listenButton')}
                  </button>
                </div>

                {message.time && (
                  <div style={{
                    fontSize: '40px',
                    color: '#9ca3af',
                    marginTop: '24px',
                    textAlign: isRTL ? 'right' : 'left'
                  }}>
                    {message.time}
                  </div>
                )}
              </div>
            ) : (
              <div style={{
                background: '#10b981',
                padding: '50px 70px',
                borderRadius: '40px',
                [isRTL ? 'borderBottomLeftRadius' : 'borderBottomRightRadius']: '8px',
                fontSize: '52px',
                lineHeight: '1.6',
                color: 'white',
                maxWidth: '85%',
                textAlign: isRTL ? 'right' : 'left'
              }}>
                {message.text}
                {message.time && (
                  <div style={{
                    fontSize: '40px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginTop: '16px'
                  }}>
                    {message.time}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{
            display: 'flex',
            alignItems: isRTL ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              background: '#f3f4f6',
              padding: '60px 70px',
              borderRadius: '40px',
              [isRTL ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: '8px',
              fontSize: '52px',
              color: '#6b7280'
            }}>
              <span className="typing-indicator">{t('thinking')}</span>
              <span className="dots">...</span>
            </div>
          </div>
        )}
      </div>

      <div style={{
        position: 'fixed',
        bottom: '200px',
        left: '120px',
        right: '120px',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        alignItems: 'center',
        background: 'linear-gradient(to top, white 0%, white 90%, transparent 100%)',
        paddingTop: '80px',
        direction: isRTL ? 'rtl' : 'ltr'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
          flexDirection: isRTL ? 'row-reverse' : 'row'
        }}>
          <input
            type="text"
            placeholder={isRecording ? t('recording') : isTranscribing ? t('transcribing') : t('writeMessage')}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading || isRecording || isTranscribing || conversationComplete}
            style={{
              flex: 1,
              padding: '60px 80px',
              borderRadius: '32px',
              border: '2px solid #e5e7eb',
              background: isRecording || isTranscribing ? '#fef3c7' : 'white',
              color: '#1f2937',
              fontSize: '52px',
              outline: 'none',
              opacity: (loading || conversationComplete) ? 0.6 : 1,
              textAlign: isRTL ? 'right' : 'left'
            }}
          />
          <button
            onClick={handleVoiceToggle}
            disabled={loading || conversationComplete}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '60px 80px',
              background: isRecording ? '#ef4444' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '32px',
              fontSize: '52px',
              fontWeight: '600',
              cursor: (loading || conversationComplete) ? 'not-allowed' : 'pointer',
              boxShadow: `0 8px 24px ${isRecording ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
              transition: 'all 0.3s ease',
              opacity: (loading || conversationComplete) ? 0.6 : 1,
              flexDirection: isRTL ? 'row-reverse' : 'row'
            }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              fontSize: '40px',
              fontWeight: '700'
            }}>
              {isRecording ? '⏹' : '🎤'}
            </span>
            {isRecording ? t('stopButton') : t('voiceButton')}
          </button>
        </div>

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
            cursor: conversationComplete ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            opacity: conversationComplete ? 0.6 : 1,
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}
          onClick={() => !conversationComplete && navigate('/thank-you')}
          disabled={conversationComplete}
          onMouseOver={(e) => {
            if (!conversationComplete) {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(0, 0, 0, 0.12)';
            }
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
            F
          </span>
          {t('finishScreening')}
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .typing-indicator {
          animation: pulse 1.5s ease-in-out infinite;
        }

        .dots {
          animation: dots 1.5s steps(4, end) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60%, 100% { content: '...'; }
        }
      `}</style>
    </div>
  );
};

export default ChatScreen;
