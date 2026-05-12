import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { questions } from '../data/questions';

const Questionnaire = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (name, value) => {
    setAnswers({ ...answers, [name]: value });
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full z-10">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <span className="text-blue-400 font-bold text-sm tracking-wider uppercase">Question {currentStep + 1} of {questions.length}</span>
            <span className="text-white font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16 rounded-full" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20">
                <span className="text-2xl font-bold">{currentStep + 1}</span>
              </div>

              <h2 className="text-3xl font-bold text-white mb-10 leading-tight">
                {currentQuestion.label}
              </h2>

              <div className="space-y-4">
                {currentQuestion.type === "number" ? (
                  <input
                    type="number"
                    value={answers[currentQuestion.name] || ""}
                    onChange={(e) => handleChange(currentQuestion.name, e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          handleChange(currentQuestion.name, option);
                          // Auto-advance for select questions after a short delay
                          setTimeout(handleNext, 300);
                        }}
                        className={`w-full text-left px-8 py-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group ${
                          answers[currentQuestion.name] === option
                            ? "bg-gradient-to-r from-blue-600/20 to-red-600/20 border-blue-500/50 text-white shadow-lg shadow-blue-500/10"
                            : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        <span className="text-lg font-medium">{option}</span>
                        {answers[currentQuestion.name] === option && (
                          <CheckCircle2 size={24} className="text-blue-400" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-12 flex justify-between items-center">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${
                    currentStep === 0 ? "opacity-0 pointer-events-none" : "text-slate-500 hover:text-white"
                  }`}
                >
                  <ChevronLeft size={20} /> Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion.name]}
                  className={`btn-gradient text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 shadow-xl active:scale-95 transition-all ${
                    !answers[currentQuestion.name] ? "opacity-50 cursor-not-allowed grayscale" : ""
                  }`}
                >
                  {currentStep === questions.length - 1 ? "Get Results" : "Next"} <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Questionnaire;
