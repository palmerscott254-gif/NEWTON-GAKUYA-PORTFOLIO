import { memo } from 'react';
import '@components/Background/darkForest.css';

/**
 * DarkForestBackground - Immersive animated background inspired by a dark forest at night
 * Features: moving shadows, drifting mist, soft light rays, glowing depth effects
 * Optimized for performance with GPU-accelerated CSS transforms
 */
const DarkForestBackground = memo(() => {
  return (
    <div className="dark-forest-background" aria-hidden="true">
      {/* Photo layer - external forest image */}
      <div className="forest-photo" />
      {/* Base gradient layer - deep forest darkness */}
      <div className="forest-base" />
      
      {/* Depth layers - parallax forest silhouettes */}
      <div className="forest-depth-layers">
        <div className="depth-layer depth-far" />
        <div className="depth-layer depth-mid" />
        <div className="depth-layer depth-near" />
      </div>
      
      {/* Moving mist layers - subtle drifting fog */}
      <div className="mist-container">
        <svg className="mist-layer mist-1" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <defs>
            <filter id="mist-blur-1">
              <feGaussianBlur in="SourceGraphic" stdDeviation="40" />
            </filter>
          </defs>
          <path
            d="M0,200 Q300,150 600,200 T1200,200 L1200,400 L0,400 Z"
            fill="rgba(100, 116, 139, 0.08)"
            filter="url(#mist-blur-1)"
          />
        </svg>
        <svg className="mist-layer mist-2" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <defs>
            <filter id="mist-blur-2">
              <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
            </filter>
          </defs>
          <path
            d="M0,250 Q400,180 800,250 T1200,250 L1200,400 L0,400 Z"
            fill="rgba(148, 163, 184, 0.06)"
            filter="url(#mist-blur-2)"
          />
        </svg>
        <svg className="mist-layer mist-3" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <defs>
            <filter id="mist-blur-3">
              <feGaussianBlur in="SourceGraphic" stdDeviation="35" />
            </filter>
          </defs>
          <path
            d="M0,180 Q350,220 700,180 T1200,180 L1200,400 L0,400 Z"
            fill="rgba(71, 85, 105, 0.05)"
            filter="url(#mist-blur-3)"
          />
        </svg>
      </div>
      
      {/* Soft light rays - god rays filtering through trees */}
      <div className="light-rays-container">
        <div className="light-ray ray-1" />
        <div className="light-ray ray-2" />
        <div className="light-ray ray-3" />
        <div className="light-ray ray-4" />
      </div>
      
      {/* Ambient glow spots - bioluminescent effect */}
      <div className="ambient-glows">
        <div className="glow-spot glow-1" />
        <div className="glow-spot glow-2" />
        <div className="glow-spot glow-3" />
        <div className="glow-spot glow-4" />
      </div>
      
      {/* Shadow movements - subtle darkness shifts */}
      <div className="shadow-overlay" />
    </div>
  );
});

DarkForestBackground.displayName = 'DarkForestBackground';

export default DarkForestBackground;
