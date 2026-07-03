import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Magnet = React.lazy(() => import('../components/react-bits/Magnet'));

const QUESTIONS = [
  {
    id: 'name',
    label: "Let's start with your name.",
    placeholder: "Type your name here...",
    type: 'text',
  },
  {
    id: 'email',
    label: "What email should we reach you at?",
    placeholder: "name@company.com",
    type: 'email',
  },
  {
    id: 'message',
    label: "Describe your project or goals briefly.",
    placeholder: "We need a dashboard for...",
    type: 'textarea',
  },
  {
    id: 'budget',
    label: "What is your estimated budget?",
    type: 'select',
    options: ['$3,500 — Sprint Launch', '$8,000 — Product Core', '$12,000+ — Custom Suite', 'Retainer bandwidth']
  }
];

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: '$8,000 — Product Core',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleNext = (e) => {
    if (e) e.preventDefault();
    
    // Simple verification
    const currentQuestion = QUESTIONS[currentStep];
    const value = formData[currentQuestion.id];
    
    if (currentQuestion.type !== 'select' && !value.trim()) {
      alert("Please fill in the field before proceeding.");
      return;
    }

    if (currentQuestion.type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (id, val) => {
    setFormData((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = () => {
    setStatus('submitting');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: '',
      budget: '$8,000 — Product Core',
    });
    setCurrentStep(0);
    setStatus('idle');
  };

  const currentQuestion = QUESTIONS[currentStep];

  return (
    <section id="contact" className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-transparent border-t border-white/5 flex flex-col justify-center overflow-hidden">
      {/* Squircle SVG clipPath definitions */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="squircle-clip-contact" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0.08 0.08,0 0.5,0 C 0.92,0 1,0.08 1,0.5 C 1,0.92 0.92,1 0.5,1 C 0.08,1 0,0.92 0,0.5 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background decoration */}
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-brand-primary/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto w-full z-10 relative">
        <span className="text-xs uppercase tracking-[0.25em] text-brand-accent font-bold mb-3 inline-block">
          ✦ Get In Touch
        </span>

        <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-text-primary mb-12">
          Let's build something.
        </h2>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-bg-panel border border-brand-primary/20 space-y-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-display font-bold text-text-primary">Submission Received!</h3>
            <p className="text-text-muted text-sm max-w-md mx-auto leading-relaxed font-light">
              Thanks for reaching out. Vedant will review your project brief and get back to you within 24 hours.
            </p>
            <button
              onClick={resetForm}
              className="text-xs font-semibold uppercase tracking-wider text-brand-accent hover:underline pt-4"
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <div 
            className="p-8 md:p-12 min-h-[380px] flex flex-col justify-between shadow-xl relative bg-bg-panel/40 backdrop-blur-sm"
            style={{ clipPath: 'url(#squircle-clip-contact)' }}
          >
            {/* Squircle Custom Border Stroke */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path
                d="M 0,50 C 0,8 8,0 50,0 C 92,0 100,8 100,50 C 100,92 92,100 50,100 C 8,100 0,92 0,50 Z"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Step Counter */}
            <div className="flex justify-between items-center text-[10px] text-text-muted font-bold uppercase tracking-widest pb-6 border-b border-white/5 z-10">
              <span>Conversational Form</span>
              <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
            </div>

            {/* Input Question Area */}
            <div className="my-8 flex-1 flex flex-col justify-center">
              <label className="text-lg md:text-2xl font-display font-bold text-text-primary mb-6 block">
                {currentQuestion.label}
              </label>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full"
                >
                  {currentQuestion.type === 'text' && (
                    <input
                      type="text"
                      value={formData[currentQuestion.id]}
                      onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="w-full bg-transparent border-b-2 border-white/10 hover:border-brand-primary focus:border-brand-primary text-lg md:text-xl py-3 focus:outline-none transition-colors duration-300 text-text-primary font-light"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}
                    />
                  )}

                  {currentQuestion.type === 'email' && (
                    <input
                      type="email"
                      value={formData[currentQuestion.id]}
                      onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      className="w-full bg-transparent border-b-2 border-white/10 hover:border-brand-primary focus:border-brand-primary text-lg md:text-xl py-3 focus:outline-none transition-colors duration-300 text-text-primary font-light"
                      autoFocus
                      onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}
                    />
                  )}

                  {currentQuestion.type === 'textarea' && (
                    <textarea
                      value={formData[currentQuestion.id]}
                      onChange={(e) => handleInputChange(currentQuestion.id, e.target.value)}
                      placeholder={currentQuestion.placeholder}
                      rows={3}
                      className="w-full bg-transparent border-b-2 border-white/10 hover:border-brand-primary focus:border-brand-primary text-base md:text-lg py-2 focus:outline-none transition-colors duration-300 text-text-primary font-light resize-none"
                      autoFocus
                    />
                  )}

                  {currentQuestion.type === 'select' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {currentQuestion.options.map((opt) => (
                        <div
                          key={opt}
                          onClick={() => handleInputChange(currentQuestion.id, opt)}
                          className={`p-4 rounded-xl border cursor-pointer text-xs font-semibold tracking-wider transition-all duration-300 ${
                            formData.budget === opt
                              ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                              : 'border-white/5 bg-white/5 hover:border-white/10 text-text-muted hover:text-text-primary'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <button
                onClick={handlePrev}
                disabled={currentStep === 0 || status === 'submitting'}
                className={`text-xs uppercase tracking-widest font-bold font-mono transition-opacity ${
                  currentStep === 0 || status === 'submitting' ? 'opacity-0 pointer-events-none' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                ← Back
              </button>

              <Suspense fallback={
                <button
                  onClick={handleNext}
                  disabled={status === 'submitting'}
                  className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-text-primary text-bg-base hover:bg-brand-primary transition-colors font-display z-10"
                >
                  {status === 'submitting'
                    ? 'Submitting...'
                    : currentStep === QUESTIONS.length - 1
                    ? 'Submit Project Brief'
                    : 'Next Step →'}
                </button>
              }>
                <Magnet padding={30} magnetStrength={3} wrapperClassName="z-10">
                  <button
                    onClick={handleNext}
                    disabled={status === 'submitting'}
                    className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-text-primary text-bg-base hover:bg-brand-primary transition-colors font-display"
                  >
                    {status === 'submitting'
                      ? 'Submitting...'
                      : currentStep === QUESTIONS.length - 1
                      ? 'Submit Project Brief'
                      : 'Next Step →'}
                  </button>
                </Magnet>
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
