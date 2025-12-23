import React, { useState, useEffect, useRef } from 'react';
import { SLIDES, ICONS } from './constants';
import { SlideType, Mode } from './types';
import MagicalBackground from './components/MagicalBackground';
import GrammarTimeline from './components/GrammarTimeline';
import { playSound } from './utils/audio';
import { GoogleGenAI } from "@google/genai";
import { 
  ChevronRight, 
  ChevronLeft, 
  Sun, 
  Moon, 
  GraduationCap, 
  Presentation, 
  Gamepad2, 
  Mic, 
  RefreshCw,
  Sparkles,
  Square,
  Scroll,
  Feather,
  Loader2,
  Wand2,
  Diamond,
  Award
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Refined Parchment Container with compact padding for "fit-to-screen"
const ParchmentContainer = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`relative w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8 
    bg-hogwarts-parchment text-hogwarts-ink 
    shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8)]
    border-[4px] md:border-[8px] border-double border-hogwarts-wood 
    rounded-sm bg-parchment-pattern shadow-inner-parchment transition-all duration-500 flex flex-col justify-center ${className}`}>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none border border-hogwarts-gold/30 rounded-sm m-1"></div>
    {children}
    {/* Decorative corner flourishes - scaled down */}
    <div className="absolute top-1 left-1 text-hogwarts-wood/40 dark:text-hogwarts-gold/40"><Sparkles size={12} /></div>
    <div className="absolute top-1 right-1 text-hogwarts-wood/40 dark:text-hogwarts-gold/40"><Sparkles size={12} /></div>
    <div className="absolute bottom-1 left-1 text-hogwarts-wood/40 dark:text-hogwarts-gold/40"><Sparkles size={12} /></div>
    <div className="absolute bottom-1 right-1 text-hogwarts-wood/40 dark:text-hogwarts-gold/40"><Sparkles size={12} /></div>
  </div>
);

const App: React.FC = () => {
  // Initialize state from localStorage if available
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hogwarts_ielts_slide_index');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [mode, setMode] = useState<Mode>(Mode.STUDENT);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hogwarts_ielts_dark_mode');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hogwarts_ielts_answers');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const [showResult, setShowResult] = useState<Record<number, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hogwarts_ielts_results');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const [score, setScore] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hogwarts_ielts_score');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  // Audio Recording & Analysis State
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentSlide = SLIDES[currentSlideIndex];
  const IconComponent = currentSlide.visualDescription ? ICONS[currentSlide.visualDescription] : Sparkles;

  // Persist state changes to localStorage
  useEffect(() => {
    localStorage.setItem('hogwarts_ielts_slide_index', currentSlideIndex.toString());
  }, [currentSlideIndex]);

  useEffect(() => {
    localStorage.setItem('hogwarts_ielts_score', score.toString());
  }, [score]);

  useEffect(() => {
    localStorage.setItem('hogwarts_ielts_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('hogwarts_ielts_results', JSON.stringify(showResult));
  }, [showResult]);

  useEffect(() => {
    localStorage.setItem('hogwarts_ielts_dark_mode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // --- THE ULTRA PRECISE FIT-TO-SCREEN ALGORITHM ---
  useEffect(() => {
    const optimizeView = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Constraint Logic:
      // We want the entire UI (Header + Main + Footer) to fit in 'h'.
      // Header ~ 3rem, Footer ~ 3rem. Main ~ 40rem content?
      // Let's assume a "design height" of around 45rem units covers everything comfortably.
      // If we set 1rem = h / 45, everything naturally scales to fit height.
      // We also check width to ensure horizontal content doesn't overflow.
      
      const heightBasedSize = h / 48; // Divisor adjusts "zoom level". Higher = smaller UI.
      const widthBasedSize = w / 64;  // Ensure width fits too.
      
      // Use the limiting dimension to ensure NO SCROLLING.
      let newFontSize = Math.min(heightBasedSize, widthBasedSize);
      
      // Soft Clamps
      // Don't let it get microscopic on mobile (better to crop slightly than be unreadable? 
      // User said "see all page", so we prioritize fit, but min 9px is usually absolute floor for readability).
      newFontSize = Math.max(9, Math.min(newFontSize, 32));

      const root = document.documentElement;
      root.style.fontSize = `${newFontSize}px`;
      
      const safeTop = getComputedStyle(document.documentElement).getPropertyValue("--sat");
      if (!safeTop) root.style.setProperty("--sat", "env(safe-area-inset-top)");
    };

    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(optimizeView, 10);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Initial call
    optimizeView();
    
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleResize);
        clearTimeout(timeoutId);
    };
  }, []);

  // Toggle Dark Mode Class on Body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    playSound('click');
  }, [isDarkMode]);

  // Key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  // Clear feedback when slide changes
  useEffect(() => {
    setFeedback(null);
    setIsAnalyzing(false);
    setIsRecording(false);
  }, [currentSlideIndex, mode]);

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      playSound('nav');
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
      playSound('nav');
    }
  };

  const handleOptionClick = (optionId: string, isCorrect?: boolean) => {
    if (mode === Mode.TEACHER) return; 
    
    if (!answers[currentSlide.id]) {
      setAnswers(prev => ({ ...prev, [currentSlide.id]: optionId }));
      setShowResult(prev => ({ ...prev, [currentSlide.id]: true }));
      if (isCorrect) {
        setScore(prev => prev + 10);
        playSound('correct');
      } else {
        playSound('wrong');
      }
    }
  };

  const resetProgress = () => {
    if (confirm("Restart the lesson? This will clear your saved progress.")) {
      setCurrentSlideIndex(0);
      setAnswers({});
      setShowResult({});
      setScore(0);
      setFeedback(null);
      // Local storage updates automatically via useEffect hooks
      playSound('spell');
    }
  };

  const toggleMode = () => {
    const modes = [Mode.STUDENT, Mode.TEACHER, Mode.KAHOOT, Mode.PRACTICE];
    const nextIndex = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[nextIndex]);
    playSound('spell');
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const analyzeAudio = async (audioBlob: Blob) => {
    setIsAnalyzing(true);
    setFeedback(null);

    try {
      const base64Audio = await blobToBase64(audioBlob);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let promptText = "";
      
      if (currentSlide.type === SlideType.SPEAKING_PRACTICE) {
         promptText = `Act as a strict but encouraging IELTS examiner. Analyze this audio response to the question: "${currentSlide.content}".
         
         Provide specific feedback in valid Markdown format.
         **IMPORTANT:** The very first line of your response must be exactly: "Speaking Score: X/10" (where X is 0-10 based on Coherence and Task Achievement).
         
         Then provide concise bullet points on:
         1. **Coherence & Cohesion**: Did I use linking words effectively? Was the flow logical?
         2. **Task Achievement**: Did I answer the prompt fully and stay on topic?
         3. **Vocabulary & Grammar**: Brief note on range and accuracy.
         
         Keep the total response concise (max 100 words).`;
      } else {
         promptText = `Act as a strict but encouraging IELTS examiner. Analyze this audio response to the question: "${currentSlide.content}". 
              
         Provide specific feedback in valid Markdown format.
         **IMPORTANT:** The very first line of your response must be exactly: "Pronunciation Score: X/10" (where X is 0-10).

         Then provide concise bullet points on:
         1. **Pronunciation**: Specifically identify mispronounced vowels, consonant issues, or incorrect stress patterns.
         2. **Fluency**: Did I speak naturally?
         3. **Vocabulary**: Did I use the target vocabulary correctly?
              
         Keep the total response concise (max 80 words).`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: 'audio/webm',
                data: base64Audio
              }
            },
            {
              text: promptText
            }
          ]
        }
      });
      
      setFeedback(response.text || "The owl lost your message. Please try again.");
      playSound('correct');
    } catch (error) {
      console.error("Gemini analysis error:", error);
      setFeedback("Communication with the Ministry of Magic failed. (API Error)");
      playSound('wrong');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRecordToggle = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
        playSound('click');
      }
    } else {
      setFeedback(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          stream.getTracks().forEach(track => track.stop());
          analyzeAudio(audioBlob);
        };

        mediaRecorder.start();
        setIsRecording(true);
        playSound('spell');
      } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Could not access microphone.");
        playSound('wrong');
      }
    }
  };

  // Render Logic based on Slide Type
  const renderSlideContent = () => {
    const isKahoot = mode === Mode.KAHOOT;
    const isTeacher = mode === Mode.TEACHER;
    const answered = answers[currentSlide.id];
    const revealed = showResult[currentSlide.id] || isTeacher;

    switch (currentSlide.type) {
      case SlideType.PART_HEADER:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-4 animate-float">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-hogwarts-gold blur-[40px] opacity-20 rounded-full"></div>
              {/* Use classes for icons to allow rem scaling */}
              {IconComponent && <IconComponent className="w-24 h-24 md:w-32 md:h-32 text-hogwarts-ink dark:text-hogwarts-gold relative z-10 drop-shadow-[0_0_25px_rgba(255,197,0,0.8)] transition-colors" />}
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-harry text-hogwarts-ink dark:text-hogwarts-gold mb-2 text-glow-ink dark:text-glow tracking-wide transition-colors leading-tight">{currentSlide.content}</h1>
            <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-transparent via-hogwarts-crimson dark:via-hogwarts-gold to-transparent mb-2"></div>
            <p className="text-lg md:text-2xl text-hogwarts-wood dark:text-hogwarts-parchment font-hand tracking-widest text-glow-blue transition-colors">Set 3: Technology and Global Connectivity</p>
          </div>
        );

      case SlideType.TIMELINE:
          return (
              <div className="flex flex-col h-full justify-center w-full px-2 items-center overflow-hidden">
                  <div className="w-full max-w-6xl h-full flex flex-col justify-center">
                      {currentSlide.timelineData && <GrammarTimeline data={currentSlide.timelineData} />}
                  </div>
              </div>
          );

      case SlideType.QUIZ:
        return (
          <div className="flex flex-col h-full justify-center w-full px-2">
             <div className="max-w-4xl mx-auto w-full relative z-10">
                <ParchmentContainer>
                  <div className="flex items-center justify-between mb-2 md:mb-4 border-b-2 border-hogwarts-ink/20 pb-2">
                     <h2 className="text-lg md:text-2xl font-harry text-hogwarts-wood flex items-center gap-2">
                       <Feather className="text-hogwarts-crimson w-5 h-5 md:w-6 md:h-6" />
                       {currentSlide.title}
                     </h2>
                     {isKahoot && <div className="text-hogwarts-crimson font-bold text-lg md:text-2xl font-harry animate-pulse">00:30</div>}
                  </div>
                  
                  <p className="text-lg md:text-2xl mb-4 md:mb-8 leading-relaxed font-body font-semibold">{currentSlide.content}</p>
                  
                  <div className={`grid ${currentSlide.options && currentSlide.options.length > 2 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-2 md:gap-4`}>
                    {currentSlide.options?.map((opt, idx) => {
                      let btnClass = "relative p-3 md:p-4 rounded-sm border-2 text-left text-base md:text-lg font-body transition-all duration-300 transform group ";
                      
                      if (isKahoot) {
                         const colors = ['bg-red-700 border-red-900', 'bg-blue-700 border-blue-900', 'bg-yellow-600 border-yellow-800', 'bg-green-700 border-green-900'];
                         btnClass += `${colors[idx % 4]} text-white`;
                      } else {
                         // Hogwarts Legacy Style Button
                         btnClass += "bg-white/40 border-hogwarts-wood/40 hover:bg-white/60 hover:border-hogwarts-gold text-hogwarts-ink hover:scale-[1.02] hover:shadow-glow-gold";
                      }

                      if (revealed) {
                        if (opt.isCorrect) btnClass = "bg-hogwarts-emerald border-hogwarts-emerald text-white ring-4 ring-hogwarts-gold/50";
                        else if (answered === opt.id) btnClass = "bg-hogwarts-crimson border-hogwarts-crimson text-white opacity-90";
                        else btnClass += " opacity-40 grayscale";
                      }

                      return (
                        <button 
                          key={opt.id}
                          onClick={() => handleOptionClick(opt.id, opt.isCorrect)}
                          onMouseEnter={() => playSound('hover')}
                          className={btnClass}
                          disabled={!!answered && !isTeacher}
                        >
                          <div className="flex items-center">
                            <span className={`w-6 h-6 md:w-8 md:h-8 shrink-0 rotate-45 group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center mr-3 border-2 ${isKahoot ? 'border-white/50 bg-black/20' : 'border-hogwarts-wood/50 bg-hogwarts-parchment text-hogwarts-wood'} font-harry font-bold text-xs md:text-sm`}>
                              <span className="group-hover:rotate-0 -rotate-45 transition-transform duration-300">{opt.id}</span>
                            </span>
                            <span className="font-semibold">{opt.text}</span>
                          </div>
                          {/* Corner details for UI feel */}
                          <div className="absolute top-1 left-1 w-1 h-1 bg-current opacity-30"></div>
                          <div className="absolute bottom-1 right-1 w-1 h-1 bg-current opacity-30"></div>
                          
                          {revealed && opt.isCorrect && (
                            <Sparkles className="absolute -top-2 -right-2 text-hogwarts-gold animate-sparkle w-6 h-6 fill-current" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </ParchmentContainer>
             </div>
          </div>
        );

      case SlideType.QUESTION:
      case SlideType.TEST:
      case SlideType.INFO:
      case SlideType.REASON:
      case SlideType.VOCAB:
      case SlideType.SPEAKING_PRACTICE:
        const isSpeakingPractice = currentSlide.type === SlideType.SPEAKING_PRACTICE;
        return (
          <div className="flex flex-col h-full justify-center items-center text-center w-full px-2">
             <ParchmentContainer className="flex flex-col items-center">
                 <div className="mb-2 md:mb-4 p-2 md:p-3 rounded-full border-4 border-hogwarts-gold/50 bg-hogwarts-navy shadow-lg relative shrink-0">
                    <div className="absolute inset-0 bg-hogwarts-gold opacity-10 rounded-full animate-pulse-slow"></div>
                    {IconComponent && <IconComponent className="text-hogwarts-gold w-6 h-6 md:w-10 md:h-10" />}
                 </div>
                 
                 <h2 className="text-[10px] md:text-sm font-harry uppercase tracking-[0.2em] text-hogwarts-crimson mb-2 border-b border-hogwarts-crimson/30 pb-1">
                   {currentSlide.type === SlideType.REASON ? "Pauline's Insight" : currentSlide.title || currentSlide.type.replace('_', ' ')}
                 </h2>

                 <div className={`text-xl md:text-4xl font-harry mb-4 leading-tight text-hogwarts-ink drop-shadow-sm ${isSpeakingPractice ? 'whitespace-pre-wrap' : ''}`}>
                   {currentSlide.content}
                 </div>

                 {(currentSlide.uzbek || currentSlide.russian) && (
                   <div className="space-y-1 md:space-y-2 mt-2 md:mt-4 bg-hogwarts-wood/5 p-2 md:p-4 rounded-lg border border-hogwarts-wood/20 w-full max-w-xl">
                     {currentSlide.uzbek && (
                       <div className="flex items-start gap-2 text-left">
                         <span className="text-[10px] font-bold text-hogwarts-wood/60 mt-1 font-sans">UZ</span>
                         <p className="text-sm md:text-lg font-hand text-hogwarts-wood font-bold leading-tight">"{currentSlide.uzbek}"</p>
                       </div>
                     )}
                     {currentSlide.russian && (
                       <div className="flex items-start gap-2 text-left">
                         <span className="text-[10px] font-bold text-hogwarts-wood/60 mt-1 font-sans">RU</span>
                         <p className="text-sm md:text-lg font-hand text-hogwarts-wood font-bold leading-tight">"{currentSlide.russian}"</p>
                       </div>
                     )}
                   </div>
                 )}

                 {currentSlide.insight && (mode === Mode.TEACHER || mode === Mode.STUDENT || isSpeakingPractice) && (
                   <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-900/10 border-l-4 border-hogwarts-gold text-left max-w-xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-1 opacity-10"><Scroll size={30}/></div>
                     <p className="text-blue-900 font-body text-sm md:text-lg italic leading-snug">
                       <span className="font-harry font-bold not-italic mr-1 text-hogwarts-navy">Tip:</span> 
                       {currentSlide.insight}
                     </p>
                   </div>
                 )}

                 {(mode === Mode.PRACTICE || isSpeakingPractice) && (
                   <div className="mt-4 md:mt-6 flex flex-col items-center gap-2 w-full max-w-xl">
                     <button 
                       onClick={handleRecordToggle}
                       disabled={isAnalyzing}
                       onMouseEnter={() => playSound('hover')}
                       className={`w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-magical border-4 border-hogwarts-gold ${
                         isRecording 
                           ? 'bg-hogwarts-navy animate-pulse' 
                           : isAnalyzing 
                             ? 'bg-hogwarts-goldDim cursor-wait'
                             : 'bg-hogwarts-crimson'
                       }`}
                     >
                       {isRecording ? (
                         <Square className="text-white w-5 h-5 md:w-8 md:h-8" fill="currentColor" />
                       ) : isAnalyzing ? (
                         <Loader2 className="text-white animate-spin w-6 h-6 md:w-8 md:h-8" />
                       ) : (
                         <Mic className="text-white w-6 h-6 md:w-8 md:h-8" />
                       )}
                     </button>
                     
                     <span className="text-[10px] md:text-xs font-harry tracking-widest text-hogwarts-wood/70 uppercase">
                       {isRecording ? 'Recording...' : isAnalyzing ? 'Analyzing...' : 'Tap to Speak'}
                     </span>

                     {feedback && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full bg-hogwarts-parchmentDark/40 p-3 md:p-4 rounded-lg border-2 border-hogwarts-gold/30 text-left relative overflow-hidden group max-h-[25vh] overflow-y-auto custom-scrollbar"
                        >
                           {/* Custom Logic to Parse and Display Score if Present */}
                           {(() => {
                             // Attempt to extract Score (Pronunciation OR Speaking)
                             // Matches: "Pronunciation Score: X/10" OR "Speaking Score: X/10"
                             const scoreMatch = feedback.match(/(?:Pronunciation|Speaking)\s*Score:\s*(\d+(?:\.\d+)?)\/10/i);
                             const scoreVal = scoreMatch ? parseFloat(scoreMatch[1]) : null;
                             const scoreLabel = scoreMatch ? (scoreMatch[0].includes('Speaking') ? 'Speaking' : 'Pronunciation') : 'Score';
                             
                             // Remove the score line from the displayed text to avoid duplication
                             const displayText = feedback.replace(/(?:Pronunciation|Speaking)\s*Score:\s*\d+(?:\.\d+)?\/10\s*/i, '').trim();

                             return (
                               <>
                                 <div className="flex items-center justify-between gap-2 mb-2 border-b border-hogwarts-gold/30 pb-1">
                                    <div className="flex items-center gap-2">
                                        <Wand2 className="text-hogwarts-gold w-4 h-4" />
                                        <h3 className="font-harry text-sm md:text-lg text-hogwarts-wood">Examiner's Verdict</h3>
                                    </div>
                                    {scoreVal !== null && (
                                        <div className={`px-2 py-0.5 rounded-full border ${scoreVal >= 7 ? 'bg-hogwarts-emerald/20 border-hogwarts-emerald text-hogwarts-emerald' : scoreVal >= 5 ? 'bg-yellow-600/20 border-yellow-600 text-yellow-700' : 'bg-hogwarts-crimson/20 border-hogwarts-crimson text-hogwarts-crimson'} font-bold text-xs md:text-sm`}>
                                            {scoreLabel}: {scoreVal}/10
                                        </div>
                                    )}
                                 </div>
                                 <div className="prose font-body text-sm md:text-base text-hogwarts-ink/90 whitespace-pre-wrap leading-tight">
                                   {displayText}
                                 </div>
                               </>
                             );
                          })()}
                        </motion.div>
                     )}
                   </div>
                 )}

                 {currentSlide.type === SlideType.VOCAB && currentSlide.options && (
                   <div className="mt-4 md:mt-6 w-full max-w-2xl text-left grid grid-cols-1 gap-2">
                      {currentSlide.options.map((opt) => (
                        <div key={opt.id} className="p-2 md:p-3 bg-hogwarts-parchmentDark/30 rounded border border-hogwarts-wood/20 hover:border-hogwarts-gold transition-colors font-body text-base md:text-lg shadow-sm flex items-center gap-2 group hover:pl-4 transition-all duration-300">
                           <div className="w-1.5 h-1.5 rounded-full bg-hogwarts-gold group-hover:scale-150 transition-transform"></div>
                           {opt.text}
                        </div>
                      ))}
                   </div>
                 )}
             </ParchmentContainer>
          </div>
        );
      
      default:
        return <div>Unknown Slide Type</div>;
    }
  };

  // Main Render
  return (
    <div className={`h-screen w-screen flex flex-col transition-colors duration-1000 bg-hogwarts-lightBg dark:bg-hogwarts-navy text-hogwarts-ink dark:text-hogwarts-parchment overflow-hidden fixed inset-0`}>
      <MagicalBackground isDarkMode={isDarkMode} />
      
      {/* Header - Compact height */}
      <header className="relative z-20 flex shrink-0 items-center justify-between px-3 py-2 bg-white/80 dark:bg-hogwarts-navy/80 border-b-2 border-hogwarts-wood shadow-lg backdrop-blur-sm transition-colors duration-500 h-[8vh] min-h-[50px]">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-hogwarts-gold to-hogwarts-goldDim flex items-center justify-center shadow-glow-gold border-2 border-hogwarts-parchment transform rotate-45 overflow-hidden">
             <span className="text-hogwarts-navy font-black font-harry text-lg -rotate-45">H</span>
           </div>
           <div>
             <h1 className="text-hogwarts-ink dark:text-hogwarts-parchment font-harry text-lg hidden sm:block tracking-wider text-glow-ink dark:text-glow transition-colors">IELTS Mastery</h1>
             <span className="text-[10px] text-hogwarts-crimson dark:text-hogwarts-gold font-harry tracking-widest flex items-center gap-1">
                <Diamond size={8} fill="currentColor"/> {mode}
             </span>
           </div>
        </div>

        <div className="flex items-center gap-2">
           {(mode === Mode.KAHOOT || mode === Mode.STUDENT) && (
             <motion.div 
               key={score}
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="bg-hogwarts-crimson px-2 py-1 rounded-md border border-hogwarts-gold shadow-magical flex items-center gap-1"
             >
                <Award className="w-3 h-3 text-hogwarts-gold" fill="currentColor" />
                <span className="text-white font-harry font-bold text-sm tracking-wider">
                  {score}
                </span>
             </motion.div>
           )}

           <div className="flex bg-hogwarts-wood/20 rounded-full p-0.5 border border-hogwarts-wood/30 backdrop-blur-sm">
             <button onClick={toggleMode} onMouseEnter={() => playSound('hover')} className="p-1.5 rounded-full hover:bg-hogwarts-gold/20 transition-colors text-hogwarts-ink dark:text-hogwarts-parchment hover:text-hogwarts-crimson dark:hover:text-hogwarts-gold" title="Switch Mode">
               {mode === Mode.STUDENT && <GraduationCap className="w-4 h-4" />}
               {mode === Mode.TEACHER && <Presentation className="w-4 h-4" />}
               {mode === Mode.KAHOOT && <Gamepad2 className="w-4 h-4" />}
               {mode === Mode.PRACTICE && <Mic className="w-4 h-4" />}
             </button>
             
             <button onClick={() => setIsDarkMode(!isDarkMode)} onMouseEnter={() => playSound('hover')} className="p-1.5 rounded-full hover:bg-hogwarts-gold/20 transition-colors text-hogwarts-ink dark:text-hogwarts-parchment hover:text-hogwarts-crimson dark:hover:text-hogwarts-gold">
               {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
             </button>
           </div>
        </div>
      </header>

      {/* Main Content Area - Flex 1 ensuring it takes available space */}
      <main className="flex-1 relative flex flex-col p-2 z-10 overflow-hidden h-0">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(5px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1 flex flex-col justify-center w-full h-full"
          >
             {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Controls - Compact height */}
      <footer className="relative z-20 shrink-0 px-4 py-2 bg-hogwarts-wood border-t-4 border-hogwarts-gold/50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] flex flex-row items-center justify-between text-hogwarts-parchment gap-2 h-[8vh] min-h-[50px]">
        
        {/* Progress Bar Area */}
        <div className="flex items-center gap-2 font-harry text-[10px] md:text-xs tracking-widest opacity-80">
           <span>{currentSlideIndex + 1}/{SLIDES.length}</span>
           <div className="w-16 md:w-32 h-1 bg-black/40 rounded-full overflow-hidden border border-white/10">
             <div 
               className="h-full bg-hogwarts-gold shadow-[0_0_10px_#ffc500] transition-all duration-1000 ease-out"
               style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
             ></div>
           </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2">
          <button 
            onClick={resetProgress}
            onMouseEnter={() => playSound('hover')}
            className="p-1.5 rounded-sm border border-transparent hover:border-hogwarts-gold/50 hover:bg-white/5 text-hogwarts-parchment/60 hover:text-hogwarts-gold transition-all transform hover:rotate-180 duration-500"
            title="Reset Lesson"
          >
            <RefreshCw size={14} />
          </button>
          
          <button 
            onClick={prevSlide}
            onMouseEnter={() => playSound('hover')}
            disabled={currentSlideIndex === 0}
            className="group flex items-center gap-1 px-3 py-1.5 rounded-sm bg-hogwarts-navy/50 border border-hogwarts-parchment/20 hover:border-hogwarts-gold hover:bg-hogwarts-navy disabled:opacity-30 disabled:cursor-not-allowed transition-all font-harry tracking-wide relative overflow-hidden text-xs md:text-sm"
          >
            <div className="absolute inset-0 bg-hogwarts-gold/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button 
            onClick={nextSlide}
            onMouseEnter={() => playSound('hover')}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="group flex items-center gap-1 px-4 py-1.5 rounded-sm bg-gradient-to-r from-hogwarts-gold to-hogwarts-goldDim text-hogwarts-navy font-black hover:scale-105 shadow-glow-gold disabled:opacity-30 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed transition-all font-harry tracking-widest border border-yellow-200 relative overflow-hidden text-xs md:text-sm"
          >
            <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;