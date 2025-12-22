import React, { useEffect, useRef } from 'react';

const MagicalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // Runes or Symbols could be simple geometric shapes
    const particles: {x: number, y: number, r: number, dx: number, dy: number, a: number, type: 'star' | 'dust'}[] = [];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.2,
        dy: (Math.random() - 0.5) * 0.2,
        a: Math.random(),
        type: Math.random() > 0.9 ? 'star' : 'dust'
      });
    }

    const draw = () => {
      // Deep dark blue background clear
      const gradient = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, w);
      gradient.addColorStop(0, '#1a1f35');
      gradient.addColorStop(1, '#050505');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => {
        ctx.beginPath();
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
        
        ctx.fill();
        ctx.shadowBlur = 0;
        
        p.x += p.dx;
        p.y += p.dy;
        
        // Twinkle effect
        p.a += (Math.random() - 0.5) * 0.05;
        if (p.a < 0) p.a = 0;
        if (p.a > 1) p.a = 1;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      });
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default MagicalBackground;