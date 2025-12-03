import { memo } from 'react';
import './videoBackground.css';

/**
 * VideoBackground - Background image for the home page
 * Displays a static background with overlay for readability
 */
const VideoBackground = memo(() => {
  return (
    <div className="video-background" aria-hidden="true">
      <img
        className="background-video"
        src="/background video.jpeg"
        alt=""
      />
      {/* Subtle overlay for better text readability */}
      <div className="video-overlay" />
    </div>
  );
});

VideoBackground.displayName = 'VideoBackground';

export default VideoBackground;
