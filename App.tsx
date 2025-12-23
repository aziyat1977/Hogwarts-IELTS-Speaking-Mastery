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

// Refined Parchment Container with scale-aware padding
const ParchmentContainer = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`relative w-full max-w-4xl mx-auto p-4 md:p-8 lg:p-12 
    bg-hogwarts-parchment text-hogwarts-ink 
    shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8)]
    border-[6px] md:border-[12px] border-double border-hogwarts-wood 
    rounded-sm bg-parchment-pattern shadow-inner-parchment transition-all duration-500 ${className}`}>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none border border-hogwarts-gold/30 rounded-sm m-1"></div>
    {children}
    {/* Decorative corner flourishes */}
    <div className="absolute top-2 left-2 text-hogwarts-wood/40 dark:text-hogwarts-gold/40"><Sparkles size={16} /></div>
    <div className="absolute top-2 right-2 text-hogwarts-wood/40 dark:text-hogwarts-gold/40"><Sparkles size={16} /></div>
    <div className="absolute bottom-2 left-2 text-hogwarts-wood/40 dark:text-hogwarts-gold/40"><Sparkles size={16} /></div>
    <div className="absolute bottom-2 right-2 text-hogwarts-wood/40 dark:text-hogwarts-gold/40"><Sparkles size={16} /></div>
  </div>
);

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [mode, setMode] = useState<Mode>(Mode.STUDENT);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);

  // Audio Recording & Analysis State
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentSlide = SLIDES[currentSlideIndex];
  const IconComponent = currentSlide.visualDescription ? ICONS[currentSlide.visualDescription] : Sparkles;

  // --- THE ULTRA PRECISE AUTO-ADJUST ALGORITHM ---
  useEffect(() => {
    const optimizeView = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Base logic: 
      // 1rem = 16px is standard.
      // We scale 1rem based on device width/type categories to ensure fluid layout.
      
      let newFontSize = 16;
      
      if (w <= 320) { // iPhone SE / Small Android
        newFontSize = 13; 
      } else if (w < 480) { // Standard Mobile
        newFontSize = 14;
      } else if (w < 768) { // Phablet
        newFontSize = 15;
      } else if (w < 1024) { // Tablet / Small Laptop
        newFontSize = 16;
      } else if (w < 1440) { // Laptop
        newFontSize = 17; 
      } else if (w < 1920) { // Desktop
        newFontSize = 18; 
      } else if (w < 2560) { // Wide
        newFontSize = 20;
      } else if (w >= 2560) { // 4K / Projector
        newFontSize = 28;
      }

      // Projector mode heuristic: Very large width, standard aspect ratio (16:9)
      // Boost size slightly more for distance reading on wall projections
      if (w > 1900 && h > 1000) {
          newFontSize = Math.max(newFontSize, 22);
      }

      // Apply to root. Tailwind's 'rem' units will now automatically scale everything.
      const root = document.documentElement;
      root.style.fontSize = `${newFontSize}px`;
      
      // Update safe area variables for notch support
      const safeTop = getComputedStyle(document.documentElement).getPropertyValue("--sat");
      if (!safeTop) root.style.setProperty("--sat", "env(safe-area-inset-top)");
    };

    // Debounce for performance during resize events
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(optimizeView, 50);
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
    if (confirm("Restart the lesson?")) {
      setCurrentSlideIndex(0);
      setAnswers({});
      setShowResult({});
      setScore(0);
      setFeedback(null);
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
              text: `Act as a strict but encouraging IELTS examiner. Analyze this audio response to the question: "${currentSlide.content}". 
              Provide specific feedback in valid Markdown format on:
              1. **Pronunciation**: Identify any unclear words or stress errors.
              2. **Fluency**: Did I speak naturally?
              3. **Vocabulary**: Did I use the target vocabulary correctly?
              Keep it concise (max 100 words).`
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
          <div className="flex flex-col items-center justify-center h-full text-center p-4 md:p-8 animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-hogwarts-gold blur-[60px] opacity-20 rounded-full"></div>
              {/* Use classes for icons to allow rem scaling */}
              {IconComponent && <IconComponent className="w-32 h-32 md:w-40 md:h-40 text-hogwarts-ink dark:text-hogwarts-gold relative z-10 drop-shadow-[0_0_25px_rgba(255,197,0,0.8)] transition-colors" />}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-harry text-hogwarts-ink dark:text-hogwarts-gold mt-6 md:mt-10 mb-4 md:mb-6 text-glow-ink dark:text-glow tracking-wide transition-colors leading-tight">{currentSlide.content}</h1>
            <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-transparent via-hogwarts-crimson dark:via-hogwarts-gold to-transparent mb-4"></div>
            <p className="text-xl md:text-3xl text-hogwarts-wood dark:text-hogwarts-parchment font-hand tracking-widest text-glow-blue transition-colors">Set 3: Technology and Global Connectivity</p>
          </div>
        );

      case SlideType.TIMELINE:
          return (
              <div className="flex flex-col h-full justify-center w-full px-2 md:px-4 items-center">
                  <div className="w-full max-w-6xl py-2 md:py-4">
                      {currentSlide.timelineData && <GrammarTimeline data={currentSlide.timelineData} />}
                  </div>
              </div>
          );

      case SlideType.QUIZ:
        return (
          <div className="flex flex-col h-full justify-center w-full px-2 md:px-4">
             <div className="max-w-4xl mx-auto w-full relative z-10">
                <ParchmentContainer>
                  <div className="flex items-center justify-between mb-4 md:mb-6 border-b-2 border-hogwarts-ink/20 pb-4">
                     <h2 className="text-xl md:text-3xl font-harry text-hogwarts-wood flex items-center gap-3">
                       <Feather className="text-hogwarts-crimson w-5 h-5 md:w-8 md:h-8" />
                       {currentSlide.title}
                     </h2>
                     {isKahoot && <div className="text-hogwarts-crimson font-bold text-xl md:text-3xl font-harry animate-pulse">00:30</div>}
                  </div>
                  
                  <p className="text-xl md:text-3xl mb-6 md:mb-10 leading-relaxed font-body font-semibold">{currentSlide.content}</p>
                  
                  <div className={`grid ${currentSlide.options && currentSlide.options.length > 2 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-3 md:gap-6`}>
                    {currentSlide.options?.map((opt, idx) => {
                      let btnClass = "relative p-4 md:p-5 rounded-sm border-2 text-left text-base md:text-xl font-body transition-all duration-300 transform group ";
                      
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
                            <span className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rotate-45 group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center mr-4 border-2 ${isKahoot ? 'border-white/50 bg-black/20' : 'border-hogwarts-wood/50 bg-hogwarts-parchment text-hogwarts-wood'} font-harry font-bold text-sm md:text-base`}>
                              <span className="group-hover:rotate-0 -rotate-45 transition-transform duration-300">{opt.id}</span>
                            </span>
                            <span className="font-semibold">{opt.text}</span>
                          </div>
                          {/* Corner details for UI feel */}
                          <div className="absolute top-1 left-1 w-1 h-1 bg-current opacity-30"></div>
                          <div className="absolute bottom-1 right-1 w-1 h-1 bg-current opacity-30"></div>
                          
                          {revealed && opt.isCorrect && (
                            <Sparkles className="absolute -top-3 -right-3 text-hogwarts-gold animate-sparkle w-8 h-8 fill-current" />
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
        return (
          <div className="flex flex-col h-full justify-center items-center text-center w-full px-2 md:px-4">
             <ParchmentContainer className="flex flex-col items-center">
                 <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-full border-4 border-hogwarts-gold/50 bg-hogwarts-navy shadow-lg relative shrink-0">
                    <div className="absolute inset-0 bg-hogwarts-gold opacity-10 rounded-full animate-pulse-slow"></div>
                    {IconComponent && <IconComponent className="text-hogwarts-gold w-8 h-8 md:w-14 md:h-14" />}
                 </div>
                 
                 <h2 className="text-xs md:text-lg font-harry uppercase tracking-[0.2em] text-hogwarts-crimson mb-2 md:mb-4 border-b border-hogwarts-crimson/30 pb-1">
                   {currentSlide.type === SlideType.REASON ? "Pauline's Insight" : currentSlide.title || currentSlide.type}
                 </h2>

                 <h1 className="text-2xl md:text-5xl font-harry mb-4 md:mb-8 leading-tight text-hogwarts-ink drop-shadow-sm">
                   {currentSlide.content}
                 </h1>

                 {(currentSlide.uzbek || currentSlide.russian) && (
                   <div className="space-y-2 md:space-y-4 mt-4 md:mt-6 bg-hogwarts-wood/5 p-3 md:p-6 rounded-lg border border-hogwarts-wood/20 w-full max-w-2xl">
                     {currentSlide.uzbek && (
                       <div className="flex items-start gap-2 md:gap-4 text-left">
                         <span className="text-[10px] md:text-xs font-bold text-hogwarts-wood/60 mt-1.5 font-sans">UZ</span>
                         <p className="text-base md:text-xl font-hand text-hogwarts-wood font-bold">"{currentSlide.uzbek}"</p>
                       </div>
                     )}
                     {currentSlide.russian && (
                       <div className="flex items-start gap-2 md:gap-4 text-left">
                         <span className="text-[10px] md:text-xs font-bold text-hogwarts-wood/60 mt-1.5 font-sans">RU</span>
                         <p className="text-base md:text-xl font-hand text-hogwarts-wood font-bold">"{currentSlide.russian}"</p>
                       </div>
                     )}
                   </div>
                 )}

                 {currentSlide.insight && (mode === Mode.TEACHER || mode === Mode.STUDENT) && (
                   <div className="mt-6 md:mt-8 p-4 md:p-6 bg-blue-900/10 border-l-4 border-hogwarts-gold text-left max-w-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-2 opacity-10"><Scroll size={40}/></div>
                     <p className="text-blue-900 font-body text-base md:text-xl italic">
                       <span className="font-harry font-bold not-italic mr-2 text-hogwarts-navy">Tip:</span> 
                       {currentSlide.insight}
                     </p>
                   </div>
                 )}

                 {mode === Mode.PRACTICE && (
                   <div className="mt-8 md:mt-10 flex flex-col items-center gap-4 md:gap-6 w-full max-w-2xl">
                     <button 
                       onClick={handleRecordToggle}
                       disabled={isAnalyzing}
                       onMouseEnter={() => playSound('hover')}
                       className={`w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-magical border-4 border-hogwarts-gold ${
                         isRecording 
                           ? 'bg-hogwarts-navy animate-pulse' 
                           : isAnalyzing 
                             ? 'bg-hogwarts-goldDim cursor-wait'
                             : 'bg-hogwarts-crimson'
                       }`}
                     >
                       {isRecording ? (
                         <Square className="text-white w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
                       ) : isAnalyzing ? (
                         <Loader2 className="text-white animate-spin w-8 h-8 md:w-10 md:h-10" />
                       ) : (
                         <Mic className="text-white w-8 h-8 md:w-10 md:h-10" />
                       )}
                     </button>
                     
                     <span className="text-xs md:text-sm font-harry tracking-widest text-hogwarts-wood/70 uppercase">
                       {isRecording ? 'Recording Spell...' : isAnalyzing ? 'Consulting The Oracle...' : 'Tap to Cast Voice'}
                     </span>

                     {feedback && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full bg-hogwarts-parchmentDark/40 p-4 md:p-6 rounded-lg border-2 border-hogwarts-gold/30 text-left relative overflow-hidden group"
                        >
                          <div className="flex items-center gap-3 mb-2 md:mb-4 border-b border-hogwarts-gold/30 pb-2">
                             <Wand2 className="text-hogwarts-gold" />
                             <h3 className="font-harry text-lg md:text-xl text-hogwarts-wood">Examiner's Verdict</h3>
                          </div>
                          <div className="prose font-body text-base md:text-lg text-hogwarts-ink/90 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto custom-scrollbar">
                            {feedback}
                          </div>
                          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-hogwarts-gold blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        </motion.div>
                     )}
                   </div>
                 )}

                 {currentSlide.type === SlideType.VOCAB && currentSlide.options && (
                   <div className="mt-6 md:mt-8 w-full max-w-3xl text-left grid grid-cols-1 gap-2 md:gap-3">
                      {currentSlide.options.map((opt) => (
                        <div key={opt.id} className="p-3 md:p-4 bg-hogwarts-parchmentDark/30 rounded border border-hogwarts-wood/20 hover:border-hogwarts-gold transition-colors font-body text-lg md:text-xl shadow-sm flex items-center gap-3 group hover:pl-6 transition-all duration-300">
                           <div className="w-2 h-2 rounded-full bg-hogwarts-gold group-hover:scale-150 transition-transform"></div>
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
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-1000 bg-hogwarts-lightBg dark:bg-hogwarts-navy text-hogwarts-ink dark:text-hogwarts-parchment overflow-hidden supports-[height:100dvh]:h-[100dvh] h-screen`}>
      <MagicalBackground isDarkMode={isDarkMode} />
      
      {/* Header - Gothic Stone Style */}
      <header className="relative z-20 flex shrink-0 items-center justify-between px-3 md:px-6 py-2 md:py-4 bg-white/80 dark:bg-hogwarts-navy/80 border-b-2 md:border-b-4 border-hogwarts-wood shadow-lg backdrop-blur-sm transition-colors duration-500">
        <div className="flex items-center gap-2 md:gap-4">
           <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg bg-gradient-to-br from-hogwarts-gold to-hogwarts-goldDim flex items-center justify-center shadow-glow-gold border-2 border-hogwarts-parchment transform rotate-45 overflow-hidden">
             <span className="text-hogwarts-navy font-black font-harry text-lg md:text-2xl -rotate-45">H</span>
           </div>
           <div>
             <h1 className="text-hogwarts-ink dark:text-hogwarts-parchment font-harry text-sm md:text-2xl hidden sm:block tracking-wider text-glow-ink dark:text-glow transition-colors">IELTS Mastery</h1>
             <span className="text-[10px] md:text-xs text-hogwarts-crimson dark:text-hogwarts-gold font-harry tracking-widest flex items-center gap-1 md:gap-2">
                <Diamond size={8} fill="currentColor"/> {mode}
             </span>
           </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
           {(mode === Mode.KAHOOT || mode === Mode.STUDENT) && (
             <motion.div 
               key={score}
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="bg-hogwarts-crimson px-3 py-1 md:px-6 md:py-2 rounded-lg border-2 border-hogwarts-gold shadow-magical flex items-center gap-2"
             >
                <Award className="w-4 h-4 md:w-5 md:h-5 text-hogwarts-gold" fill="currentColor" />
                <span className="text-white font-harry font-bold text-xs md:text-lg tracking-wider">
                  {score} <span className="hidden md:inline text-xs opacity-80 ml-1">PTS</span>
                </span>
             </motion.div>
           )}

           <div className="flex bg-hogwarts-wood/20 rounded-full p-1 border border-hogwarts-wood/30 backdrop-blur-sm">
             <button onClick={toggleMode} onMouseEnter={() => playSound('hover')} className="p-2 md:p-3 rounded-full hover:bg-hogwarts-gold/20 transition-colors text-hogwarts-ink dark:text-hogwarts-parchment hover:text-hogwarts-crimson dark:hover:text-hogwarts-gold" title="Switch Mode">
               {mode === Mode.STUDENT && <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />}
               {mode === Mode.TEACHER && <Presentation className="w-4 h-4 md:w-5 md:h-5" />}
               {mode === Mode.KAHOOT && <Gamepad2 className="w-4 h-4 md:w-5 md:h-5" />}
               {mode === Mode.PRACTICE && <Mic className="w-4 h-4 md:w-5 md:h-5" />}
             </button>
             
             <button onClick={() => setIsDarkMode(!isDarkMode)} onMouseEnter={() => playSound('hover')} className="p-2 md:p-3 rounded-full hover:bg-hogwarts-gold/20 transition-colors text-hogwarts-ink dark:text-hogwarts-parchment hover:text-hogwarts-crimson dark:hover:text-hogwarts-gold">
               {isDarkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
             </button>
           </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col p-2 md:p-8 z-10 overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex-1 flex flex-col justify-center w-full h-full perspective-1000"
          >
             {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Controls - Wooden Plank Style */}
      <footer className="relative z-20 shrink-0 px-2 md:px-6 py-2 md:py-4 bg-hogwarts-wood border-t-4 border-hogwarts-gold/50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between text-hogwarts-parchment gap-2 md:gap-4">
        
        {/* Progress Bar Area */}
        <div className="flex items-center gap-2 md:gap-4 font-harry text-[10px] md:text-sm tracking-widest opacity-80 w-full md:w-auto justify-center md:justify-start">
           <span>SLIDE {currentSlideIndex + 1} / {SLIDES.length}</span>
           <div className="w-24 md:w-48 h-1 md:h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
             <div 
               className="h-full bg-hogwarts-gold shadow-[0_0_10px_#ffc500] transition-all duration-1000 ease-out"
               style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
             ></div>
           </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-center">
          <button 
            onClick={resetProgress}
            onMouseEnter={() => playSound('hover')}
            className="p-2 md:p-3 rounded-sm border border-transparent hover:border-hogwarts-gold/50 hover:bg-white/5 text-hogwarts-parchment/60 hover:text-hogwarts-gold transition-all transform hover:rotate-180 duration-500"
            title="Reset Lesson"
          >
            <RefreshCw size={16} className="md:w-5 md:h-5" />
          </button>
          
          <button 
            onClick={prevSlide}
            onMouseEnter={() => playSound('hover')}
            disabled={currentSlideIndex === 0}
            className="group flex items-center gap-2 px-3 md:px-6 py-2 md:py-3 rounded-sm bg-hogwarts-navy/50 border border-hogwarts-parchment/20 hover:border-hogwarts-gold hover:bg-hogwarts-navy disabled:opacity-30 disabled:cursor-not-allowed transition-all font-harry tracking-wide relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-hogwarts-gold/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            <ChevronLeft size={16} className="md:w-5 md:h-5" />
            <span className="hidden md:inline">Prev</span>
          </button>

          <button 
            onClick={nextSlide}
            onMouseEnter={() => playSound('hover')}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="group flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 rounded-sm bg-gradient-to-r from-hogwarts-gold to-hogwarts-goldDim text-hogwarts-navy font-black hover:scale-105 shadow-glow-gold disabled:opacity-30 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed transition-all font-harry tracking-widest border border-yellow-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/40 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            <span className="hidden md:inline">Next</span>
            <ChevronRight size={16} className="md:w-5 md:h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;