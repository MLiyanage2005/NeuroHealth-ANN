import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ShieldCheck, Activity, ArrowRight, Zap } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full text-center z-10"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Brain size={64} className="animate-pulse-slow" />
          </div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
        >
          AI-Powered <span className="text-gradient">Mental Wellness</span> Assessment
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          NeuroAI uses advanced neural network analysis to evaluate your mental health indicators and provide personalized recommendations. Get instant insights into your mental wellness and discover the level of care that's right for you.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <button
            onClick={onStart}
            className="btn-gradient text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            Take the Test <ArrowRight size={20} />
          </button>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          <div className="glass-card p-8 rounded-3xl">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Real-time Analysis</h3>
            <p className="text-slate-400">Our AI processes your responses instantly to provide accurate mental health insights.</p>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">100% Confidential</h3>
            <p className="text-slate-400">Your privacy matters. All responses are encrypted and never shared with third parties.</p>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Personalized Recommendations</h3>
            <p className="text-slate-400">Receive tailored suggestions based on your unique mental wellness profile.</p>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div variants={itemVariants} className="mt-32 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
          <p className="text-lg text-slate-400">
            Our questionnaire consists of 22 carefully designed questions that assess various aspects of your mental wellness, including workplace environment, support systems, and personal experiences. Based on your responses, our AI algorithm analyzes patterns and provides you with a comprehensive assessment along with actionable recommendations for improving your mental health.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
