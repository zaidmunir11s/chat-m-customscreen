// src/context/SessionContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import APIService from '../services/api';

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationComplete, setConversationComplete] = useState(false);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('m_chat_session');
    if (savedSession) {
      const parsed = JSON.parse(savedSession);
      setSessionId(parsed.sessionId);
      setSessionData(parsed.sessionData);
      setMessages(parsed.messages || []);
    }
  }, []);

  // Save session to localStorage whenever it changes
  useEffect(() => {
    if (sessionId && sessionData) {
      localStorage.setItem('m_chat_session', JSON.stringify({
        sessionId,
        sessionData,
        messages
      }));
    }
  }, [sessionId, sessionData, messages]);

  const createSession = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await APIService.createSession(data);
      setSessionId(response.session_id);
      setSessionData(data);

      // Add initial message
      if (response.initial_message) {
        setMessages([{
          type: 'bot',
          text: response.initial_message,
          time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })
        }]);
      }

      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message, generateAudio = false) => {
    if (!sessionId) {
      throw new Error('No active session');
    }

    setLoading(true);
    setError(null);

    // Add user message immediately
    const userMessage = {
      type: 'user',
      text: message,
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await APIService.sendTextMessage(sessionId, message, generateAudio);

      // Add bot response (backend returns "response" field, not "message")
      const botMessage = {
        type: 'bot',
        text: response.response || response.message,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        audio_url: response.audio_url
      };
      setMessages(prev => [...prev, botMessage]);

      if (response.conversation_complete || response.is_complete) {
        setConversationComplete(true);
      }

      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendAudioMessage = async (audioFile) => {
    if (!sessionId) {
      throw new Error('No active session');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await APIService.sendAudioMessage(sessionId, audioFile);

      // Add user message with transcription
      const userMessage = {
        type: 'user',
        text: response.transcribed_text || 'Audio message',
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages(prev => [...prev, userMessage]);

      // Add bot response (backend returns "response" field, not "message")
      const botMessage = {
        type: 'bot',
        text: response.response || response.message,
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        audio_url: response.audio_url
      };
      setMessages(prev => [...prev, botMessage]);

      if (response.conversation_complete || response.is_complete) {
        setConversationComplete(true);
      }

      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getReport = async () => {
    if (!sessionId) {
      throw new Error('No active session');
    }

    setLoading(true);
    setError(null);

    try {
      const report = await APIService.getFinalReport(sessionId);
      return report;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearSession = () => {
    setSessionId(null);
    setSessionData(null);
    setMessages([]);
    setConversationComplete(false);
    localStorage.removeItem('m_chat_session');
  };

  const value = {
    sessionId,
    sessionData,
    messages,
    loading,
    error,
    conversationComplete,
    createSession,
    sendMessage,
    sendAudioMessage,
    getReport,
    clearSession
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
