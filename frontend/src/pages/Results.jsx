import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, AlertCircle, Info, RefreshCcw, Home, Download } from 'lucide-react';

const Results = ({ answers, onReset }) => {
  // Simple heuristic scoring for the demo
  const result = useMemo(() => {
    let score = 0;
    
    if (answers.family_history === "Yes") score += 2;
    if (answers.work_interfere === "Often") score += 3;
    if (answers.work_interfere === "Sometimes") score += 2;
    if (answers.mental_health_consequence === "Yes") score += 2;
    if (answers.obs_consequence === "Yes") score += 2;
    if (answers.leave === "Very difficult") score += 2;
    if (answers.leave === "Somewhat difficult") score += 1;
    if (answers.care_options === "No") score += 1;
    if (answers.benefits === "No") score += 1;

    if (score <= 3) return 1;
    if (score <= 6) return 2;
    if (score <= 10) return 3;
    return 4;
  }, [answers]);

  const levels = {
    1: {
      color: "from-green-400 to-emerald-600",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      icon: <CheckCircle className="text-green-400" size={48} />,
      title: "LEVEL 1 — LOW PRIORITY",
      subtitle: "Maintain Your Mental Wellness",
      description: "Your responses suggest that you are currently managing your mental wellness reasonably well. Continue maintaining healthy habits, emotional balance, and supportive routines to preserve your overall wellbeing.",
      actions: [
        "Continue engaging in activities that support your mental wellness",
        "Maintain healthy work-life boundaries and routines",
        "Stay socially connected with supportive people",
        "Prioritize regular sleep, hydration, and physical activity",
        "Continue practicing stress-management techniques",
        "Monitor your mental wellbeing periodically and seek support if needed"
      ]
    },
    2: {
      color: "from-yellow-400 to-orange-600",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      icon: <Info className="text-yellow-400" size={48} />,
      title: "🟡 LEVEL 2 — MILD CONCERN",
      subtitle: "Early Signs of Mental Wellness Strain",
      description: "Your responses indicate mild mental wellness concerns that may be related to stress, emotional fatigue, or workplace pressure. While these indicators are not severe, paying attention to your wellbeing now may help prevent increased stress in the future.",
      actions: [
        "Improve daily sleep quality and recovery habits",
        "Reduce prolonged stress exposure where possible",
        "Take regular breaks during work or study sessions",
        "Speak openly with trusted friends, family, or supportive coworkers",
        "Practice mindfulness, exercise, or relaxation techniques",
        "Monitor changes in mood, focus, and emotional wellbeing"
      ]
    },
    3: {
      color: "from-orange-400 to-red-600",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      icon: <AlertTriangle className="text-orange-400" size={48} />,
      title: "🟠 LEVEL 3 — MODERATE RISK",
      subtitle: "Noticeable Mental Wellness Concerns Detected",
      description: "Your responses suggest moderate mental wellness concerns that may be affecting your emotional wellbeing, stress levels, or daily functioning. Consider taking proactive steps to improve your mental wellness and seek supportive guidance if symptoms continue.",
      actions: [
        "Consider speaking with a qualified mental health professional",
        "Prioritize stress reduction and emotional recovery",
        "Avoid prolonged isolation and maintain social support",
        "Establish healthier work-life boundaries",
        "Track mood patterns, sleep quality, and stress triggers",
        "Seek workplace or academic support resources if available"
      ]
    },
    4: {
      color: "from-red-500 to-rose-700",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      icon: <AlertCircle className="text-red-500" size={48} />,
      title: "🔴 LEVEL 4 — HIGH ALERT",
      subtitle: "High Mental Wellness Risk Indicators Detected",
      description: "Your responses indicate significant mental wellness concerns that may require professional attention. Persistent stress, emotional exhaustion, or mental health difficulties can affect both personal wellbeing and daily functioning. Seeking support from a qualified healthcare professional is strongly recommended.",
      actions: [
        "Consider consulting a licensed mental health professional",
        "Reach out to trusted family members, friends, or support systems",
        "Prioritize immediate stress reduction and self-care",
        "Avoid handling emotional distress entirely alone",
        "Seek workplace accommodations or support if necessary",
        "If emotional distress becomes overwhelming or urgent, seek immediate professional help"
      ]
    }
  };

  const currentLevel = levels[result];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full z-10"
      >
        <div className="glass-card p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className={`p-6 rounded-3xl ${currentLevel.bg} ${currentLevel.border} border`}>
                {currentLevel.icon}
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-clip-text text-transparent bg-gradient-to-r ${currentLevel.color}`}
            >
              {currentLevel.title}
            </motion.h2>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              {currentLevel.subtitle}
            </motion.h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              {currentLevel.description}
            </motion.p>
          </div>

          {/* Recommendations */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-blue-500 rounded-full"></span> Recommended Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLevel.actions.map((action, index) => (
                <div key={index} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-300 leading-snug">{action}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Disclaimer */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10 mb-10"
          >
            <p className="text-xs text-slate-500 italic text-center">
              <span className="text-red-400 font-bold not-italic">⚠️ Important Notice:</span> This assessment is designed for informational and educational purposes only. It is not a medical diagnosis and should not replace professional medical advice, diagnosis, or treatment. If you are experiencing a mental health crisis, please call your local emergency services or seek immediate help from a qualified healthcare provider.
            </p>
          </motion.div>

          {/* Footer Actions */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
            >
              <RefreshCcw size={20} /> Retake Assessment
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all"
            >
              <Home size={20} /> Back to Home
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Results;
