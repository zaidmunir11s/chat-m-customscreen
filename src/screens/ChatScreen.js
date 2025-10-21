// src/screens/ChatScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import APIService from '../services/api';

const ChatScreen = () => {
  const navigate = useNavigate();
  const { sessionId, sessionData, messages, sendMessage, loading, error, conversationComplete } = useSession();
  const [inputMessage, setInputMessage] = useState('');
  const [isPlaying, setIsPlaying] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);
  const { isRecording, startRecording, stopRecording, audioBlob } = useAudioRecorder();

  // Redirect if no session
  useEffect(() => {
    if (!sessionId) {
      navigate('/age-selection');
    }
  }, [sessionId, navigate]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle audio recording result - transcribe then send as text
  useEffect(() => {
    if (audioBlob && !isRecording) {
      handleSendAudio(audioBlob);
    }
  }, [audioBlob, isRecording]);

  // Navigate to thank you screen when conversation is complete
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
      await sendMessage(inputMessage, false); // Disable audio generation temporarily
      setInputMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleSendAudio = async (blob) => {
    try {
      setIsTranscribing(true);
      const audioFile = new File([blob], 'recording.webm', { type: 'audio/webm' });

      // Step 1: Transcribe audio using /asr endpoint
      const transcriptionResult = await APIService.transcribeAudio(audioFile, 'english');

      // Step 2: Send transcribed text as regular message
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

  const handlePlayAudio = (audioUrl, messageIndex) => {
    if (isPlaying === messageIndex) {
      audioRef.current?.pause();
      setIsPlaying(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
        setIsPlaying(messageIndex);
      }
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
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Hidden audio element for playback */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(null)}
        style={{ display: 'none' }}
      />

      {/* Error Toast */}
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

      {/* Header */}
      <div style={{
        background: 'transparent',
        padding: '120px 120px 80px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '160px',
          fontWeight: '600',
          color: 'white',
          marginBottom: '60px',
          letterSpacing: '-2px'
        }}>
          Autism Screening
        </h1>

        <div style={{
          display: 'flex',
          gap: '60px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '80px'
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
            {sessionData?.childAge || '16'} months old
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
            ✓ Screening Complete! Redirecting...
          </div>
        )}
      </div>

      {/* Chat Messages Container */}
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
            alignItems: message.type === 'user' ? 'flex-end' : 'flex-start',
            animation: 'fadeIn 0.5s ease'
          }}>
            {message.type === 'bot' ? (
              <div style={{
                maxWidth: '85%',
                background: '#f3f4f6',
                padding: '60px 70px',
                borderRadius: '40px',
                borderBottomLeftRadius: '8px',
                fontSize: '52px',
                lineHeight: '1.6',
                color: '#1f2937'
              }}>
                {message.text}
                {message.audio_url && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    marginTop: '40px'
                  }}>
                    <button
                      onClick={() => handlePlayAudio(message.audio_url, index)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '20px 40px',
                        background: isPlaying === index ? '#10b981' : 'white',
                        border: '2px solid #e5e7eb',
                        borderRadius: '20px',
                        fontSize: '44px',
                        color: isPlaying === index ? 'white' : '#6b7280',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '56px',
                        height: '56px',
                        borderRadius: '12px',
                        background: isPlaying === index ? 'rgba(255, 255, 255, 0.2)' : '#f9fafb',
                        fontSize: '36px',
                        fontWeight: '600'
                      }}>
                        {isPlaying === index ? '⏸' : '▶'}
                      </span>
                      {isPlaying === index ? 'Playing' : 'Listen'}
                    </button>
                  </div>
                )}
                {message.time && (
                  <div style={{
                    fontSize: '40px',
                    color: '#9ca3af',
                    marginTop: '24px'
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
                borderBottomRightRadius: '8px',
                fontSize: '52px',
                lineHeight: '1.6',
                color: 'white',
                maxWidth: '85%'
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
            alignItems: 'flex-start'
          }}>
            <div style={{
              background: '#f3f4f6',
              padding: '60px 70px',
              borderRadius: '40px',
              borderBottomLeftRadius: '8px',
              fontSize: '52px',
              color: '#6b7280'
            }}>
              <span className="typing-indicator">Thinking</span>
              <span className="dots">...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
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
        paddingTop: '80px'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '40px'
        }}>
          <input
            type="text"
            placeholder={isRecording ? "Recording..." : isTranscribing ? "Transcribing..." : "Write your message here"}
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
              opacity: (loading || conversationComplete) ? 0.6 : 1
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
              opacity: (loading || conversationComplete) ? 0.6 : 1
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
            {isRecording ? 'Stop' : 'Voice'}
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
            opacity: conversationComplete ? 0.6 : 1
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
          Finish Screening
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
