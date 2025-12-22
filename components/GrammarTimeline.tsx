
import React from 'react';
import { motion } from 'framer-motion';
import { TimelineData } from '../types';
import { Sparkles, Clock } from 'lucide-react';

interface GrammarTimelineProps {
  data: TimelineData;
}

const GrammarTimeline: React.FC<GrammarTimelineProps> = ({ data }) => {
  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-white/60 dark:bg-hogwarts-navy/50 rounded-xl border-2 border-hogwarts-ink/20 dark:border-hogwarts-gold/30 shadow-2xl backdrop-blur-sm relative overflow-visible mt-8 transition-colors duration-500">
      {/* Title Area */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-harry text-hogwarts-crimson dark:text-hogwarts-gold tracking-widest dark:text-glow text-glow-ink mb-4 flex items-center justify-center gap-4 transition-colors">
            <Clock className="animate-spin-slow" />
            {data.tenseName}
            <Clock className="animate-spin-slow" />
        </h2>
        <p className="text-xl font-body text-hogwarts-ink/80 dark:text-hogwarts-parchment italic opacity-90">{data.description}</p>
      </div>

      {/* The Timeline Container */}
      <div className="relative h-64 w-full flex items-center justify-center">
        
        {/* The Base Line (Past -> Future) */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-hogwarts-ink/30 dark:bg-hogwarts-wood/50 rounded-full"></div>
        
        {/* Animated Active Line */}
        <motion.div 
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hogwarts-crimson dark:via-hogwarts-gold to-transparent shadow-[0_0_15px_#740001] dark:shadow-[0_0_15px_#ffc500]"
        />

        {/* Markers (Past, Now, Future) */}
        {data.markers.map((marker, idx) => {
            // Determine marker type based on label or position for styling
            const isNow = marker.label.toUpperCase().includes('NOW');
            const isFuture = marker.position > 85 || marker.label.toUpperCase().includes('FUTURE');
            const isPast = !isNow && !isFuture;

            return (
                <div 
                    key={idx} 
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 group"
                    style={{ left: `${marker.position}%` }}
                >
                    {/* Halo effect for 'NOW' or active markers */}
                    {isNow && (
                       <motion.div
                         className="absolute w-12 h-12 rounded-full bg-hogwarts-crimson/20 dark:bg-hogwarts-gold/20 blur-md -z-10 top-[-10px]"
                         animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                         transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                       />
                    )}

                    {/* The Marker Dot */}
                    <motion.div 
                        className={`w-5 h-5 rounded-full border-2 z-10 transition-colors duration-300 flex items-center justify-center shadow-lg
                            ${isNow ? 'bg-hogwarts-gold border-hogwarts-crimson dark:border-hogwarts-parchment shadow-[0_0_15px_rgba(255,197,0,0.6)]' : ''}
                            ${isPast ? 'bg-stone-300 dark:bg-stone-700 border-stone-500 dark:border-stone-500 opacity-80' : ''}
                            ${isFuture ? 'bg-blue-100 dark:bg-blue-900 border-blue-400 dark:border-blue-400 opacity-80' : ''}
                        `}
                        animate={isNow ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {isNow && <div className="w-1.5 h-1.5 bg-hogwarts-crimson dark:bg-hogwarts-navy rounded-full" />}
                    </motion.div>

                    {/* Label */}
                    <span className={`font-harry text-sm tracking-widest uppercase mt-4 font-bold transition-all duration-300
                        ${isNow ? 'text-hogwarts-crimson dark:text-hogwarts-gold scale-110 text-glow-ink dark:text-glow' : ''}
                        ${isPast ? 'text-stone-500 dark:text-stone-400' : ''}
                        ${isFuture ? 'text-blue-600 dark:text-blue-300' : ''}
                    `}>
                        {marker.label}
                    </span>

                    {/* Vertical Dashed Line */}
                    <div className={`h-32 w-px absolute -top-16 -z-10 border-dashed border-l transition-colors duration-300
                        ${isNow ? 'border-hogwarts-crimson/40 dark:border-hogwarts-gold/40' : 'border-hogwarts-ink/10 dark:border-hogwarts-parchment/10'}
                    `}></div>
                </div>
            );
        })}

        {/* Events Rendering */}
        {data.events.map((event, idx) => {
            const isRange = event.type === 'range';
            
            return (
                <React.Fragment key={idx}>
                    {isRange ? (
                         // Range Event
                         <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: `${event.position}%`, opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="absolute top-1/2 -translate-y-1/2 h-8 bg-hogwarts-crimson/10 dark:bg-hogwarts-gold/20 border-y border-hogwarts-crimson/40 dark:border-hogwarts-gold/50 flex items-center justify-center backdrop-blur-sm z-0"
                            style={{ 
                                left: `10%`, 
                                width: `${event.position - 10}%` 
                            }}
                         >
                            <span className="text-hogwarts-crimson dark:text-hogwarts-gold font-bold font-hand text-lg animate-pulse">{event.label}</span>
                         </motion.div>
                    ) : (
                        // Point Event
                        <motion.div
                            initial={{ scale: 0, y: -50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + (idx * 0.5), type: "spring" }}
                            className="absolute top-1/2 -translate-x-1/2 -translate-y-[80px]" // Floating above
                            style={{ left: `${event.position}%` }}
                        >
                            <div className={`
                                bg-hogwarts-parchment dark:bg-hogwarts-navy border-2 
                                ${event.color === 'gold' 
                                  ? 'border-hogwarts-crimson dark:border-hogwarts-gold text-hogwarts-crimson dark:text-hogwarts-gold' 
                                  : 'border-blue-600 dark:border-blue-400 text-blue-800 dark:text-blue-300'} 
                                px-4 py-2 rounded-lg shadow-magical dark:shadow-magical-dark text-center min-w-[120px] relative transition-colors
                            `}>
                                <div className="font-bold font-harry text-sm mb-1">{event.label}</div>
                                <div className="text-xs font-sans opacity-80 dark:opacity-80 text-hogwarts-ink dark:text-hogwarts-parchment">{event.description}</div>
                                
                                {/* Connector Line */}
                                <div className={`absolute -bottom-10 left-1/2 w-px h-10 ${event.color === 'gold' ? 'bg-hogwarts-crimson dark:bg-hogwarts-gold' : 'bg-blue-600 dark:bg-blue-400'} -translate-x-1/2`}></div>
                                <div className={`absolute -bottom-[44px] left-1/2 w-2 h-2 rounded-full ${event.color === 'gold' ? 'bg-hogwarts-crimson dark:bg-hogwarts-gold' : 'bg-blue-600 dark:bg-blue-400'} -translate-x-1/2`}></div>
                            </div>
                        </motion.div>
                    )}
                </React.Fragment>
            )
        })}

        {/* Floating Particles for Magic Feel */}
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-hogwarts-crimson dark:bg-hogwarts-gold rounded-full"
                    animate={{
                        x: ['0%', '100%'],
                        y: [Math.random() * 20 - 10, Math.random() * 20 - 10],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "linear"
                    }}
                    style={{ top: '50%' }}
                />
            ))}
        </div>

      </div>

      <div className="mt-12 text-center text-hogwarts-ink/60 dark:text-hogwarts-parchment/60 font-sans text-sm transition-colors">
        <Sparkles className="inline-block w-4 h-4 mr-2 text-hogwarts-crimson dark:text-hogwarts-gold" />
        Follow the timeline to understand the sequence of events.
        <Sparkles className="inline-block w-4 h-4 ml-2 text-hogwarts-crimson dark:text-hogwarts-gold" />
      </div>
    </div>
  );
};

export default GrammarTimeline;
