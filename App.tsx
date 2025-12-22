
import React, { useState, useEffect, useRef } from 'react';
import { SLIDES, ICONS } from './constants';
import { SlideType, Mode } from './types';
import MagicalBackground from './components/MagicalBackground';
import GrammarTimeline from './components/GrammarTimeline';
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
  Wand2
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const ParchmentContainer = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`relative w-full max-w-4xl mx-auto p-8 md:p-12 bg-hogwarts-parchment text-hogwarts-ink shadow-[0_0_50px_rgba(0,0,0,0.5)] border-[12px] border-double border-hogwarts-wood rounded-lg bg-parchment-pattern shadow-inner-parchment ${className}`}>
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none border border-hogwarts-gold/30 rounded-lg m-1"></div>
    {children}
    {/* Decorative corner flourishes */}
    <div className="absolute top-2 left-2 text-hogwarts-gold opacity-50"><Sparkles size={16} /></div>
    <div className="absolute top-2 right-2 text-hogwarts-gold opacity-50"><Sparkles size={16} /></div>
    <div className="absolute bottom-2 left-2 text-hogwarts-gold opacity-50"><Sparkles size={16} /></div>
    <div className="absolute bottom-2 right-2 text-hogwarts-gold opacity-50"><Sparkles size={16} /></div>
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
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleOptionClick = (optionId: string, isCorrect?: boolean) => {
    if (mode === Mode.TEACHER) return; 
    
    if (!answers[currentSlide.id]) {
      setAnswers(prev => ({ ...prev, [currentSlide.id]: optionId }));
      setShowResult(prev => ({ ...prev, [currentSlide.id]: true }));
      if (isCorrect) {
        setScore(prev => prev + 10);
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
    }
  };

  const toggleMode = () => {
    const modes = [Mode.STUDENT, Mode.TEACHER, Mode.KAHOOT, Mode.PRACTICE];
    const nextIndex = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[nextIndex]);
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
      // Using the native audio model as per instructions for audio capabilities
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
    } catch (error) {
      console.error("Gemini analysis error:", error);
      setFeedback("Communication with the Ministry of Magic failed. (API Error)");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRecordToggle = async () => {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
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
      } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Could not access microphone.");
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
          <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-hogwarts-gold blur-[60px] opacity-20 rounded-full"></div>
              {IconComponent && <IconComponent size={140} className="text-hogwarts-gold relative z-10 drop-shadow-[0_0_25px_rgba(255,197,0,0.8)]" />}
            </div>
            <h1 className="text-7xl font-harry text-hogwarts-gold mt-10 mb-6 text-glow tracking-wide">{currentSlide.content}</h1>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-hogwarts-gold to-transparent mb-4"></div>
            <p className="text-3xl text-hogwarts-parchment font-hand tracking-widest text-glow-blue">Set 3: Technology and Global Connectivity</p>
          </div>
        );

      case SlideType.TIMELINE:
          return (
              <div className="flex flex-col h-full justify-center w-full px-4 items-center">
                  <ParchmentContainer className="w-full max-w-6xl">
                      {currentSlide.timelineData && <GrammarTimeline data={currentSlide.timelineData} />}
                  </ParchmentContainer>
              </div>
          );

      case SlideType.QUIZ:
        return (
          <div className="flex flex-col h-full justify-center w-full px-4">
             <div className="max-w-4xl mx-auto w-full relative z-10">
                <ParchmentContainer>
                  <div className="flex items-center justify-between mb-6 border-b-2 border-hogwarts-ink/20 pb-4">
                     <h2 className="text-3xl font-harry text-hogwarts-wood flex items-center gap-3">
                       <Feather className="text-hogwarts-crimson" />
                       {currentSlide.title}
                     </h2>
                     {isKahoot && <div className="text-hogwarts-crimson font-bold text-3xl font-harry animate-pulse">00:30</div>}
                  </div>
                  
                  <p className="text-3xl mb-10 leading-relaxed font-body font-semibold">{currentSlide.content}</p>
                  
                  <div className={`grid ${currentSlide.options && currentSlide.options.length > 2 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
                    {currentSlide.options?.map((opt, idx) => {
                      let btnClass = "relative p-5 rounded-lg border-2 text-left text-xl font-body transition-all duration-300 transform hover:scale-[1.02] shadow-md ";
                      
                      // Magical aesthetic for buttons
                      if (isKahoot) {
                         const colors = ['bg-red-700 border-red-900', 'bg-blue-700 border-blue-900', 'bg-yellow-600 border-yellow-800', 'bg-green-700 border-green-900'];
                         btnClass += `${colors[idx % 4]} text-white`;
                      } else {
                         // Parchment/Wood style buttons
                         btnClass += "bg-hogwarts-wood/10 border-hogwarts-wood/40 hover:bg-hogwarts-wood/20 hover:border-hogwarts-gold text-hogwarts-ink";
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
                          className={btnClass}
                          disabled={!!answered && !isTeacher}
                        >
                          <div className="flex items-center">
                            <span className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 border-2 ${isKahoot ? 'border-white/50 bg-black/20' : 'border-hogwarts-wood/50 bg-hogwarts-parchment text-hogwarts-wood'} font-harry font-bold`}>
                              {opt.id}
                            </span>
                            <span className="font-semibold">{opt.text}</span>
                          </div>
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
          <div className="flex flex-col h-full justify-center items-center text-center w-full px-4">
             <ParchmentContainer className="flex flex-col items-center">
                 <div className="mb-6 p-4 rounded-full border-4 border-hogwarts-gold/50 bg-hogwarts-navy shadow-lg relative">
                    <div className="absolute inset-0 bg-hogwarts-gold opacity-10 rounded-full animate-pulse-slow"></div>
                    {IconComponent && <IconComponent size={54} className="text-hogwarts-gold" />}
                 </div>
                 
                 <h2 className="text-lg font-harry uppercase tracking-[0.2em] text-hogwarts-crimson mb-4 border-b border-hogwarts-crimson/30 pb-1">
                   {currentSlide.type === SlideType.REASON ? "Pauline's Insight" : currentSlide.title || currentSlide.type}
                 </h2>

                 <h1 className="text-4xl md:text-5xl font-harry mb-8 leading-tight text-hogwarts-ink drop-shadow-sm">
                   {currentSlide.content}
                 </h1>

                 {(currentSlide.uzbek || currentSlide.russian) && (
                   <div className="space-y-4 mt-6 bg-hogwarts-wood/5 p-6 rounded-lg border border-hogwarts-wood/20 w-full max-w-2xl">
                     {currentSlide.uzbek && (
                       <div className="flex items-start gap-4 text-left">
                         <span className="text-xs font-bold text-hogwarts-wood/60 mt-1.5 font-sans">UZ</span>
                         <p className="text-xl font-hand text-hogwarts-wood font-bold">"{currentSlide.uzbek}"</p>
                       </div>
                     )}
                     {currentSlide.russian && (
                       <div className="flex items-start gap-4 text-left">
                         <span className="text-xs font-bold text-hogwarts-wood/60 mt-1.5 font-sans">RU</span>
                         <p className="text-xl font-hand text-hogwarts-wood font-bold">"{currentSlide.russian}"</p>
                       </div>
                     )}
                   </div>
                 )}

                 {currentSlide.insight && (mode === Mode.TEACHER || mode === Mode.STUDENT) && (
                   <div className="mt-8 p-6 bg-blue-900/10 border-l-4 border-hogwarts-gold text-left max-w-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-2 opacity-10"><Scroll size={40}/></div>
                     <p className="text-blue-900 font-body text-xl italic">
                       <span className="font-harry font-bold not-italic mr-2 text-hogwarts-navy">Tip:</span> 
                       {currentSlide.insight}
                     </p>
                   </div>
                 )}

                 {/* Practice Mode Recording Visual */}
                 {mode === Mode.PRACTICE && (
                   <div className="mt-10 flex flex-col items-center gap-6 w-full max-w-2xl">
                     <button 
                       onClick={handleRecordToggle}
                       disabled={isAnalyzing}
                       className={`w-24 h-24 rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-magical border-4 border-hogwarts-gold ${
                         isRecording 
                           ? 'bg-hogwarts-navy animate-pulse' 
                           : isAnalyzing 
                             ? 'bg-hogwarts-goldDim cursor-wait'
                             : 'bg-hogwarts-crimson'
                       }`}
                     >
                       {isRecording ? (
                         <Square className="text-white" size={32} fill="currentColor" />
                       ) : isAnalyzing ? (
                         <Loader2 className="text-white animate-spin" size={40} />
                       ) : (
                         <Mic className="text-white" size={40} />
                       )}
                     </button>
                     
                     <span className="text-sm font-harry tracking-widest text-hogwarts-wood/70 uppercase">
                       {isRecording ? 'Recording Spell...' : isAnalyzing ? 'Consulting The Oracle...' : 'Tap to Cast Voice'}
                     </span>

                     {/* Analysis Feedback Area */}
                     {feedback && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="w-full bg-hogwarts-parchmentDark/40 p-6 rounded-lg border-2 border-hogwarts-gold/30 text-left relative overflow-hidden group"
                        >
                          <div className="flex items-center gap-3 mb-4 border-b border-hogwarts-gold/30 pb-2">
                             <Wand2 className="text-hogwarts-gold" />
                             <h3 className="font-harry text-xl text-hogwarts-wood">Examiner's Verdict</h3>
                          </div>
                          <div className="prose font-body text-lg text-hogwarts-ink/90 whitespace-pre-wrap leading-relaxed">
                            {feedback}
                          </div>
                          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-hogwarts-gold blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        </motion.div>
                     )}
                   </div>
                 )}

                 {/* Bonus Vocab List Rendering */}
                 {currentSlide.type === SlideType.VOCAB && currentSlide.options && (
                   <div className="mt-8 w-full max-w-3xl text-left grid grid-cols-1 gap-3">
                      {currentSlide.options.map((opt) => (
                        <div key={opt.id} className="p-4 bg-hogwarts-parchmentDark/30 rounded border border-hogwarts-wood/20 hover:border-hogwarts-gold transition-colors font-body text-xl shadow-sm flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-hogwarts-gold"></div>
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
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-1000 bg-hogwarts-navy`}>
      <MagicalBackground />
      
      {/* Header - Gothic Stone Style */}
      <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-hogwarts-navy/80 border-b-4 border-hogwarts-wood shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-hogwarts-gold to-hogwarts-goldDim flex items-center justify-center shadow-glow-gold border-2 border-hogwarts-parchment">
             <span className="text-hogwarts-navy font-black font-harry text-2xl">H</span>
           </div>
           <div>
             <h1 className="text-hogwarts-parchment font-harry text-xl md:text-2xl hidden md:block tracking-wider text-glow">IELTS Mastery</h1>
             <span className="text-xs text-hogwarts-gold font-harry tracking-widest">{mode} MODE</span>
           </div>
        </div>

        <div className="flex items-center gap-4">
           {mode === Mode.KAHOOT && (
             <div className="bg-hogwarts-crimson px-6 py-2 rounded-lg border-2 border-hogwarts-gold shadow-lg">
                <span className="text-white font-harry font-bold text-lg">Score: {score}</span>
             </div>
           )}

           <button onClick={toggleMode} className="p-3 rounded-full hover:bg-white/10 transition-colors text-hogwarts-parchment hover:text-hogwarts-gold" title="Switch Mode">
             {mode === Mode.STUDENT && <GraduationCap size={24} />}
             {mode === Mode.TEACHER && <Presentation size={24} />}
             {mode === Mode.KAHOOT && <Gamepad2 size={24} />}
             {mode === Mode.PRACTICE && <Mic size={24} />}
           </button>
           
           <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-3 rounded-full hover:bg-white/10 transition-colors text-hogwarts-parchment hover:text-hogwarts-gold">
             {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
           </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col p-4 md:p-8 z-10 overflow-hidden">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="flex-1 flex flex-col justify-center w-full h-full perspective-1000"
          >
             {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Controls - Wooden Plank Style */}
      <footer className="relative z-20 px-6 py-4 bg-hogwarts-wood border-t-4 border-hogwarts-gold/50 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] flex items-center justify-between text-hogwarts-parchment">
        <div className="flex items-center gap-4 font-harry text-sm tracking-widest opacity-80">
           <span>SLIDE {currentSlideIndex + 1} / {SLIDES.length}</span>
           <div className="w-24 md:w-48 h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
             <div 
               className="h-full bg-hogwarts-gold shadow-[0_0_10px_#ffc500]"
               style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
             ></div>
           </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={resetProgress}
            className="p-3 rounded-lg hover:bg-white/10 text-hogwarts-parchment/60 hover:text-hogwarts-gold transition-all"
            title="Reset Lesson"
          >
            <RefreshCw size={20} />
          </button>
          
          <button 
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-hogwarts-navy/50 border border-hogwarts-parchment/20 hover:border-hogwarts-gold hover:bg-hogwarts-navy disabled:opacity-30 disabled:cursor-not-allowed transition-all font-harry tracking-wide"
          >
            <ChevronLeft size={20} />
            <span className="hidden md:inline">Prev</span>
          </button>

          <button 
            onClick={nextSlide}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-hogwarts-gold to-hogwarts-goldDim text-hogwarts-navy font-black hover:scale-105 shadow-glow-gold disabled:opacity-30 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed transition-all font-harry tracking-widest border border-yellow-200"
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
