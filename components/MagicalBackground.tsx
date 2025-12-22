import React, { useEffect, useRef } from 'react';

interface MagicalBackgroundProps {
  isDarkMode: boolean;
}

const MagicalBackground: React.FC<MagicalBackgroundProps> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Type definition for particles
    type Particle = {
      x: number;
      y: number;
      r: number;
      dx: number;
      dy: number;
      a: number;
      type: 'star' | 'dust' | 'ink';
    };

    const particles: Particle[] = [];
    const particleCount = 150;

    const initParticles = () => {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 2,
                dx: (Math.random() - 0.5) * (isDarkMode ? 0.2 : 0.4),
                dy: (Math.random() - 0.5) * (isDarkMode ? 0.2 : 0.4),
                a: Math.random(),
                type: isDarkMode 
                    ? (Math.random() > 0.9 ? 'star' : 'dust') 
                    : (Math.random() > 0.9 ? 'ink' : 'dust')
            });
        }
    };

    initParticles();

    let animationFrameId: number;

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Background Gradient
      const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
      if (isDarkMode) {
          // Night Mode: Deep Blue/Black
          gradient.addColorStop(0, '#1a1f35');
          gradient.addColorStop(1, '#050505');
      } else {
          // Light Mode: Parchment/Warm White
          gradient.addColorStop(0, '#fdfbf7');
          gradient.addColorStop(1, '#e6dfd0');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Draw Particles
      particles.forEach(p => {
        ctx.beginPath();
        
        if (isDarkMode) {
            // Dark Mode Styles
            if (p.type === 'star') {
                ctx.fillStyle = `rgba(255, 220, 100, ${p.a})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = "gold";
                ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
            } else {
                ctx.fillStyle = `rgba(100, 150, 255, ${p.a * 0.3})`;
                ctx.shadowBlur = 0;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            }
        } else {
            // Light Mode Styles
            if (p.type === 'ink') {
                // Floating Ink Specks
                ctx.fillStyle = `rgba(62, 39, 35, ${p.a * 0.6})`;
                ctx.shadowBlur = 0;
                ctx.arc(p.x, p.y, p.r * 1.2, 0, Math.PI * 2);
            } else {
                // Dust motes in sunlight
                ctx.fillStyle = `rgba(218, 165, 32, ${p.a * 0.4})`; // Goldenrod
                ctx.shadowBlur = 0;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            }
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Movement
        p.x += p.dx;
        p.y += p.dy;
        
        // Twinkle/Fade effect
        p.a += (Math.random() - 0.5) * 0.05;
        if (p.a < 0) p.a = 0;
        if (p.a > 1) p.a = 1;

        // Wrap around screen
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    
    // Re-init particles when mode changes
    initParticles();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]); // Re-run effect when isDarkMode changes

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000" />;
};

export default MagicalBackground;