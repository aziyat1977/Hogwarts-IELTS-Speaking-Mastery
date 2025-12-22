import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES, ICONS } from './constants';
import { SlideType, Mode } from './types';
import MagicalBackground from './components/MagicalBackground';
import { 
  ChevronRight, 
  ChevronLeft, 
  Sun, 
  Moon, 
  GraduationCap, 
  Presentation, 
  Gamepad2, 
  Mic, 
  Volume2,
  RefreshCw,
  Sparkles,
  Square
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [mode, setMode] = useState<Mode>(Mode.STUDENT);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
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
    if (mode === Mode.TEACHER) return; // Teachers just show answers
    
    if (!answers[currentSlide.id]) {
      setAnswers(prev => ({ ...prev, [currentSlide.id]: optionId }));
      setShowResult(prev => ({ ...prev, [currentSlide.id]: true }));
      if (isCorrect) {
        setScore(prev => prev + 10);
        // Play simplistic sound effect logic could go here
      }
    }
  };

  const resetProgress = () => {
    if (confirm("Restart the lesson?")) {
      setCurrentSlideIndex(0);
      setAnswers({});
      setShowResult({});
      setScore(0);
    }
  };

  const toggleMode = () => {
    const modes = [Mode.STUDENT, Mode.TEACHER, Mode.KAHOOT, Mode.PRACTICE];
    const nextIndex = (modes.indexOf(mode) + 1) % modes.length;
    setMode(modes[nextIndex]);
  };

  const handleRecordToggle = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          // Create blob and play back automatically for feedback
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          audio.play().catch(e => console.log("Playback error", e));
          
          // Clean up stream tracks
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        alert("Could not access microphone. Please ensure you have granted permission.");
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
            {IconComponent && <IconComponent size={120} className="text-hogwarts-gold mb-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />}
            <h1 className="text-6xl font-magic text-hogwarts-gold mb-4">{currentSlide.content}</h1>
            <p className="text-xl text-slate-300">Set 3: Technology and Global Connectivity</p>
          </div>
        );

      case SlideType.QUIZ:
        return (
          <div className="flex flex-col h-full justify-center max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-3xl font-magic text-hogwarts-parchment">{currentSlide.title}</h2>
               {isKahoot && <div className="text-hogwarts-crimson font-bold text-2xl animate-pulse">00:30</div>}
            </div>
            
            <p className="text-2xl mb-8 leading-relaxed">{currentSlide.content}</p>
            
            <div className={`grid ${currentSlide.options && currentSlide.options.length > 2 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
              {currentSlide.options?.map((opt, idx) => {
                let btnClass = "p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 text-left text-lg font-semibold relative overflow-hidden group ";
                
                if (isKahoot) {
                   const colors = ['bg-hogwarts-crimson', 'bg-blue-600', 'bg-hogwarts-gold', 'bg-hogwarts-emerald'];
                   btnClass += `${colors[idx % 4]} border-transparent text-white shadow-lg`;
                } else {
                   btnClass += "bg-slate-800/50 backdrop-blur-sm border-slate-600 hover:border-hogwarts-gold";
                }

                if (revealed) {
                  if (opt.isCorrect) btnClass = "bg-hogwarts-emerald/20 border-hogwarts-emerald text-hogwarts-emerald shadow-[0_0_20px_rgba(16,185,129,0.3)]";
                  else if (answered === opt.id) btnClass = "bg-hogwarts-crimson/20 border-hogwarts-crimson text-hogwarts-crimson";
                  else btnClass += " opacity-50";
                }

                return (
                  <button 
                    key={opt.id}
                    onClick={() => handleOptionClick(opt.id, opt.isCorrect)}
                    className={btnClass}
                    disabled={!!answered && !isTeacher}
                  >
                    <div className="flex items-center">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${isKahoot ? 'bg-black/20' : 'bg-slate-700'} text-sm`}>
                        {opt.id}
                      </span>
                      {opt.text}
                    </div>
                    {revealed && opt.isCorrect && (
                      <Sparkles className="absolute top-2 right-2 text-hogwarts-gold animate-sparkle" />
                    )}
                  </button>
                )
              })}
            </div>
            {IconComponent && !isKahoot && (
               <div className="absolute -z-10 bottom-10 right-10 opacity-10">
                 <IconComponent size={300} />
               </div>
            )}
          </div>
        );

      case SlideType.QUESTION:
      case SlideType.TEST:
      case SlideType.INFO:
      case SlideType.REASON:
      case SlideType.VOCAB:
        return (
          <div className="flex flex-col h-full justify-center items-center text-center max-w-5xl mx-auto w-full relative">
             <div className="mb-6 p-4 rounded-full bg-hogwarts-gold/10 border border-hogwarts-gold/30 backdrop-blur-md shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                {IconComponent && <IconComponent size={64} className="text-hogwarts-gold" />}
             </div>
             
             <h2 className="text-sm font-bold uppercase tracking-widest text-hogwarts-gold mb-4 opacity-80">
               {currentSlide.type === SlideType.REASON ? "Pauline's Insight" : currentSlide.title || currentSlide.type}
             </h2>

             <h1 className="text-4xl md:text-5xl font-magic mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-hogwarts-parchment to-white">
               {currentSlide.content}
             </h1>

             {(currentSlide.uzbek || currentSlide.russian) && (
               <div className="space-y-4 mt-8 bg-slate-900/50 p-6 rounded-lg border border-slate-700 max-w-2xl w-full">
                 {currentSlide.uzbek && (
                   <div className="flex items-start gap-3">
                     <span className="text-xs font-bold text-slate-500 mt-1">UZ</span>
                     <p className="text-lg text-slate-300 italic">"{currentSlide.uzbek}"</p>
                   </div>
                 )}
                 {currentSlide.russian && (
                   <div className="flex items-start gap-3">
                     <span className="text-xs font-bold text-slate-500 mt-1">RU</span>
                     <p className="text-lg text-slate-300 italic">"{currentSlide.russian}"</p>
                   </div>
                 )}
               </div>
             )}

             {currentSlide.insight && (mode === Mode.TEACHER || mode === Mode.STUDENT) && (
               <div className="mt-8 p-4 bg-blue-900/30 border-l-4 border-hogwarts-gold text-left max-w-2xl animate-fade-in-up">
                 <p className="text-hogwarts-parchment font-serif italic text-lg">
                   <span className="font-bold not-italic mr-2">Tip:</span> 
                   {currentSlide.insight}
                 </p>
               </div>
             )}

             {/* Practice Mode Recording Visual */}
             {mode === Mode.PRACTICE && (
               <div className="mt-12 flex flex-col items-center gap-2">
                 <button 
                   onClick={handleRecordToggle}
                   className={`w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(239,68,68,0.5)] ${isRecording ? 'bg-slate-700 animate-pulse' : 'bg-hogwarts-crimson'}`}
                 >
                   {isRecording ? <Square className="text-white" size={28} fill="currentColor" /> : <Mic className="text-white" size={32} />}
                 </button>
                 <span className="text-xs text-slate-400 uppercase tracking-widest">
                   {isRecording ? 'Recording... (Tap to Stop)' : 'Tap to Record Answer'}
                 </span>
               </div>
             )}

             {/* Bonus Vocab List Rendering */}
             {currentSlide.type === SlideType.VOCAB && currentSlide.options && (
               <div className="mt-8 w-full max-w-3xl text-left grid grid-cols-1 gap-2">
                  {currentSlide.options.map((opt) => (
                    <div key={opt.id} className="p-3 bg-slate-800/80 rounded border border-slate-700 hover:border-hogwarts-gold transition-colors">
                      {opt.text}
                    </div>
                  ))}
               </div>
             )}
          </div>
        );
      
      default:
        return <div>Unknown Slide Type</div>;
    }
  };

  // Main Render
  return (
    <div className={`min-h-screen w-full flex flex-col transition-colors duration-500 ${isDarkMode ? 'dark' : ''} ${isDarkMode ? 'bg-hogwarts-navy' : 'bg-slate-100'}`}>
      {isDarkMode && <MagicalBackground />}
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-900/30 backdrop-blur-md">
        <div className="flex items-center gap-4">
           <div className="w-10 h-10 rounded bg-gradient-to-br from-hogwarts-gold to-hogwarts-darkParchment flex items-center justify-center shadow-lg">
             <span className="text-hogwarts-navy font-bold font-magic text-xl">H</span>
           </div>
           <div>
             <h1 className="text-slate-200 font-magic hidden md:block">IELTS Mastery</h1>
             <span className="text-xs text-hogwarts-gold uppercase tracking-wider">{mode} MODE</span>
           </div>
        </div>

        <div className="flex items-center gap-4">
           {mode === Mode.KAHOOT && (
             <div className="bg-slate-800 px-4 py-2 rounded-full border border-slate-600">
                <span className="text-hogwarts-gold font-bold">Score: {score}</span>
             </div>
           )}

           <button onClick={toggleMode} className="p-2 rounded-full hover:bg-slate-700/50 transition-colors text-slate-300" title="Switch Mode">
             {mode === Mode.STUDENT && <GraduationCap />}
             {mode === Mode.TEACHER && <Presentation />}
             {mode === Mode.KAHOOT && <Gamepad2 />}
             {mode === Mode.PRACTICE && <Mic />}
           </button>
           
           <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-slate-700/50 transition-colors text-slate-300">
             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
           </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col p-6 md:p-12 z-10">
        <AnimatePresence mode='wait'>
          <motion.div 
            key={currentSlideIndex}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 flex flex-col justify-center w-full h-full"
          >
             {renderSlideContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Controls */}
      <footer className="relative z-10 px-6 py-4 border-t border-slate-700/50 bg-slate-900/30 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-slate-400 font-mono">
           <span>SLIDE {currentSlideIndex + 1} / {SLIDES.length}</span>
           <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
             <div 
               className="h-full bg-hogwarts-gold transition-all duration-300"
               style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
             ></div>
           </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={resetProgress}
            className="p-3 rounded-full hover:bg-slate-700/50 text-slate-400 mr-4"
            title="Reset Lesson"
          >
            <RefreshCw size={18} />
          </button>
          
          <button 
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-slate-800 border border-slate-600 hover:border-hogwarts-gold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18} />
            <span className="hidden md:inline">Prev</span>
          </button>

          <button 
            onClick={nextSlide}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-hogwarts-gold text-hogwarts-navy font-bold hover:bg-hogwarts-darkParchment hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.4)] disabled:opacity-50 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed transition-all"
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
