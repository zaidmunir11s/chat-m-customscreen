import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import { SessionProvider } from './context/SessionContext';
import { LanguageProvider } from './context/LanguageContext';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import IntroductionScreen from './screens/IntroductionScreen';
import AgeSelectionScreen from './screens/AgeSelectionScreen';
import ChatScreen from './screens/ChatScreen';
import ContactSpecialistScreen from './screens/ContactSpecialistScreen';
import ThankYouScreen from './screens/ThankYouScreen';
import EmailScreen from './screens/EmailScreen';
import ResultScreen from './screens/ResultScreen';

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <SessionProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/welcome" element={<WelcomeScreen />} />
                <Route path="/introduction" element={<IntroductionScreen />} />
                <Route path="/age-selection" element={<AgeSelectionScreen />} />
                <Route path="/chat" element={<ChatScreen />} />
                <Route path="/contact-specialist" element={<ContactSpecialistScreen />} />
                <Route path="/thank-you" element={<ThankYouScreen />} />
                <Route path="/email" element={<EmailScreen />} />
                <Route path="/result/:score" element={<ResultScreen />} />
              </Routes>
            </div>
          </Router>
        </SessionProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
