import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Questionnaire from './pages/Questionnaire';
import Results from './pages/Results';
import NeuronBackground from './components/NeuronBackground';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [view, setView] = useState('landing'); // 'landing', 'test', 'results'
  const [answers, setAnswers] = useState(null);

  const startTest = () => setView('test');
  
  const handleComplete = (finalAnswers) => {
    setAnswers(finalAnswers);
    setView('results');
  };

  const reset = () => {
    setAnswers(null);
    setView('landing');
  };

  const retake = () => {
    setAnswers(null);
    setView('test');
  };

  return (
    <div className="relative min-h-screen text-slate-200">
      <NeuronBackground />
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 glass border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
            N
          </div>
          <span className="text-xl font-bold tracking-tight text-white">NeuroAI</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
        </div>
      </nav>

      <main className="relative">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage onStart={startTest} />
            </motion.div>
          )}

          {view === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Questionnaire onComplete={handleComplete} />
            </motion.div>
          )}

          {view === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Results answers={answers} onReset={retake} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative py-10 text-center text-slate-500 text-sm border-t border-white/5 bg-background/50 backdrop-blur-sm">
        <p>© 2024 NeuroScope-AI. All rights reserved.</p>
        <p className="mt-2">Empowering mental wellness through advanced neural analysis.</p>
      </footer>
    </div>
  );
}

export default App;
