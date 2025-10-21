// src/services/api.js
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const WS_BASE_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8000';

class APIService {
  // Session Management
  async createSession(data) {
    const response = await fetch(`${BASE_URL}/start_session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parent_name: data.parentName,
        child_name: data.childName,
        child_age: data.childAge,
        language: data.language || 'english',
        mrn: data.mrn
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to create session');
    }

    return response.json();
  }

  async getSessionStatus(sessionId) {
    const response = await fetch(`${BASE_URL}/api/sessions/${sessionId}/status`);

    if (!response.ok) {
      throw new Error('Failed to get session status');
    }

    return response.json();
  }

  async sendTextMessage(sessionId, message, generateAudio = false) {
    const response = await fetch(`${BASE_URL}/chat/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to send message');
    }

    return response.json();
  }

  // Transcribe audio using ASR endpoint (then send as text)
  async transcribeAudio(audioFile, language = 'english') {
    const formData = new FormData();
    formData.append('audio_file', audioFile);
    formData.append('language', language);

    const response = await fetch(`${BASE_URL}/asr`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to transcribe audio');
    }

    return response.json();
  }

  // Legacy method - keeping for compatibility
  async sendAudioMessage(sessionId, audioFile) {
    const formData = new FormData();
    formData.append('audio_file', audioFile);

    const response = await fetch(`${BASE_URL}/api/sessions/${sessionId}/audio`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to send audio');
    }

    return response.json();
  }

  async getFinalReport(sessionId) {
    const response = await fetch(`${BASE_URL}/api/sessions/${sessionId}/report`);

    if (!response.ok) {
      throw new Error('Report not available yet');
    }

    return response.json();
  }

  // Voice Services
  async textToSpeech(text, language = 'english', sessionId = null) {
    const response = await fetch(`${BASE_URL}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        language,
        session_id: sessionId
      })
    });

    if (!response.ok) {
      throw new Error('TTS failed');
    }

    return response.json();
  }

  async speechToText(audioFile, language = 'auto') {
    const formData = new FormData();
    formData.append('audio_file', audioFile);
    formData.append('language', language);

    const response = await fetch(`${BASE_URL}/asr`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('ASR failed');
    }

    return response.json();
  }

  async getVoiceStatus() {
    const response = await fetch(`${BASE_URL}/voice/status`);
    return response.json();
  }

  // Reports
  async getLatestReportByMRN(mrn) {
    const response = await fetch(`${BASE_URL}/api/test-report?mrn=${mrn}`);

    if (!response.ok) {
      throw new Error('Report not found');
    }

    return response.json();
  }

  async updateAnswer(mrn, questionId, updatedAnswer) {
    const response = await fetch(`${BASE_URL}/api/test-report/${mrn}/update-answer`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question_id: questionId,
        updated_answer: updatedAnswer
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update answer');
    }

    return response.json();
  }

  // WebSocket
  createWebSocket(sessionId) {
    return new WebSocket(`${WS_BASE_URL}/ws/${sessionId}`);
  }

  // Health Check
  async healthCheck() {
    const response = await fetch(`${BASE_URL}/health`);
    return response.json();
  }
}

export default new APIService();
