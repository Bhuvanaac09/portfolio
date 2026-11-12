import React, { useEffect, useRef, useState } from 'react';
import { PageRoute } from '../types';

interface AnimeHeroSceneProps {
  onNavigate: (route: PageRoute) => void;
  onExploreClick?: () => void;
}

export const AnimeHeroScene: React.FC<AnimeHeroSceneProps> = ({
  onNavigate,
  onExploreClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // =========================================================================
  // Canvas Animation: Gentle Floating Sakura Petals
  // Organic, silky-smooth drifting with zero subpixel or rendering artifacts.
  // =========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = 1717;
    const height = 916;

    canvas.width = width;
    canvas.height = height;

    interface Petal {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rot: number;
      vRot: number;
      wobble: number;
      wobbleSpeed: number;
      color: string;
      alpha: number;
    }

    const petals: Petal[] = [];
    const PETAL_COLORS = ['#f7b2bd', '#faa2b1', '#f5ccd4', '#fce2e8', '#ffd8e1'];

    const spawnPetal = (initial = false): Petal => ({
      x: initial ? Math.random() * width : -20 + Math.random() * 250,
      y: initial ? Math.random() * height : -15 + Math.random() * 250,
      vx: 0.35 + Math.random() * 0.40,
      vy: 0.38 + Math.random() * 0.38,
      size: 3.5 + Math.random() * 3.5,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.03,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.018 + Math.random() * 0.02,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      alpha: 0.72 + Math.random() * 0.26,
    });

    for (let i = 0; i < 22; i++) {
      petals.push(spawnPetal(true));
    }

    // Clean, artifact-free organic petal drawing
    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.52, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p, idx) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.55;
        p.y += p.vy + Math.cos(p.wobble) * 0.22;
        p.rot += p.vRot;

        if (p.y > height + 20 || p.x > width + 20) {
          petals[idx] = spawnPetal();
        } else {
          drawPetal(p);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // =========================================================================
  // Web Audio Living Atmosphere Synthesizer (Pure Web Audio, Zero Files)
  // =========================================================================
  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const playChime = () => {
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
          const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
          const note = notes[Math.floor(Math.random() * notes.length)];
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, ctx.currentTime);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 2.6);
        };

        playChime();
        const intervalId = window.setInterval(() => {
          if (Math.random() < 0.6) {
            playChime();
          }
        }, 3200);

        (window as unknown as { __chimeInterval?: number }).__chimeInterval = intervalId;
        setSoundEnabled(true);
      } catch {
        setSoundEnabled(false);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      const intervalId = (window as unknown as { __chimeInterval?: number }).__chimeInterval;
      if (intervalId) {
        clearInterval(intervalId);
      }
      setSoundEnabled(false);
    }
  };

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const target = document.getElementById('home-content-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full bg-[#f2e5cc] flex justify-center items-center overflow-hidden select-none min-h-[50vh] sm:min-h-[65vh] md:min-h-[82vh] lg:min-h-[90vh] py-2 sm:py-4 md:py-6">
      {/* 
        Responsive Aspect Frame:
        - Maintains exact 1717 / 916 aspect ratio at all times
        - Horizontally and vertically centered
        - Capped so it always fits both viewport width and viewport height without overflow or letterbox distortion
      */}
      <div
        ref={containerRef}
        className="relative overflow-hidden mx-auto flex items-center justify-center transition-all duration-300"
        style={{
          width: '100%',
          maxWidth: 'min(1717px, calc((100vh - 4.5rem) * 1.87445))',
          aspectRatio: '1717 / 916',
          backgroundColor: '#f2e5cc',
        }}
      >
        {/* =================================================================
            1. BASE ILLUSTRATION (100% Static, Pristine Original Pixel Art)
            Fully intact with Kiki, Howl, and all characters in high-fidelity.
            ================================================================= */}
        <img
          src="/assets/anime-hero-backdrop.png?v=2"
          alt="Chyavan Rohan - Anime World Portfolio Illustration"
          className="absolute inset-0 w-full h-full object-contain pixelated pointer-events-none select-none z-0"
        />

        {/* =================================================================
            2. CANVAS LIVING PETALS (Gentle Sakura Petals Floating Across)
            ================================================================= */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* =================================================================
            3. INTERACTIVE EXPLORE BUTTON (Over exact original teal button)
            ================================================================= */}
        <button
          onClick={handleExplore}
          aria-label="Explore My World"
          title="Explore Chyavan Rohan's Portfolio"
          className="absolute z-25 cursor-pointer rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#48796a]/50 active:opacity-75 transition-opacity"
          style={{
            left: '43.68%',
            top: '58.95%',
            width: '12.23%',
            height: '6.0%',
            backgroundColor: 'transparent',
          }}
        >
          {/* Subtle gleam on hover without any scaling mismatch or distortion */}
          <span className="sr-only">EXPLORE</span>
          <div className="w-full h-full rounded-[3px] transition-colors duration-150 hover:bg-white/20 active:bg-black/10" />
        </button>

        {/* =================================================================
            4. DESKTOP INTERACTIVE NAVIGATION HOTSPOTS (Over top-right nav)
            ================================================================= */}
        <nav
          aria-label="Anime Hero Navigation"
          className="absolute z-25 hidden md:block"
          style={{
            right: '5.2%',
            top: '4.6%',
            width: '30%',
            height: '4.5%',
          }}
        >
          <div className="w-full h-full flex items-center justify-end gap-[6.5%]">
            <button
              onClick={() => onNavigate('home')}
              className="cursor-pointer text-transparent font-medium tracking-widest hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
              title="Home"
            >
              HOME
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="cursor-pointer text-transparent font-medium tracking-widest hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
              title="About Chyavan Rohan"
            >
              ABOUT
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="cursor-pointer text-transparent font-medium tracking-widest hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
              title="Blog & Projects"
            >
              BLOG
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="cursor-pointer text-transparent font-medium tracking-widest hover:bg-white/20 px-2 py-0.5 rounded transition-colors"
              title="Contact Me"
            >
              CONTACT
            </button>
          </div>
        </nav>

        {/* Living Sound Atmosphere Toggle (Bottom Right Corner) */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Mute Atmosphere Chimes' : 'Enable Atmosphere Chimes'}
          className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 bg-[#23282d]/75 hover:bg-[#23282d] text-[#faf6ea] text-[10px] tracking-wider uppercase rounded-full backdrop-blur-xs transition-all duration-200 shadow-sm cursor-pointer"
        >
          <span>{soundEnabled ? '🔊' : '🔈'}</span>
          <span className="hidden sm:inline">
            {soundEnabled ? 'Calm Ambiance On' : 'Living Ambiance'}
          </span>
        </button>
      </div>
    </section>
  );
};


