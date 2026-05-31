import { memo, useEffect, useState } from 'react';

type ProfileFrameProps = {
  imageSrc: string;
  name: string;
  className?: string;
};

function useTypingLoop(text: string) {
  const [visibleText, setVisibleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!text) {
      return;
    }

    if (visibleText === text && !isDeleting) {
      const holdTimer = window.setTimeout(() => setIsDeleting(true), 2000);
      return () => window.clearTimeout(holdTimer);
    }

    if (!visibleText.length && isDeleting) {
      const holdTimer = window.setTimeout(() => setIsDeleting(false), 1000);
      return () => window.clearTimeout(holdTimer);
    }

    const typingDelay = isDeleting ? 48 : 88;

    const timer = window.setTimeout(() => {
      if (isDeleting) {
        setVisibleText(text.slice(0, Math.max(visibleText.length - 1, 0)));
        return;
      }

      setVisibleText(text.slice(0, visibleText.length + 1));
    }, typingDelay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, text, visibleText]);

  return visibleText;
}

const ProfileFrame = memo(({ imageSrc, name, className = '' }: ProfileFrameProps) => {
  const typedName = useTypingLoop(name);

  return (
    <div className={`profile-frame ${className}`.trim()} aria-label={`${name} profile portrait`}>
      <div className="profile-frame__visual">
        <div className="profile-orbit__glow" aria-hidden="true" />
        <div className="profile-orbit__ring" aria-hidden="true" />
        <div className="profile-orbit__arc profile-orbit__arc--lower" aria-hidden="true" />
        <div className="profile-orbit__particle-path" aria-hidden="true">
          <span className="profile-orbit__particle" />
        </div>
        <div className="profile-orbit__image-shell" aria-hidden="true">
          <img
            src={imageSrc}
            alt={`${name} profile`}
            className="profile-orbit__image"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="profile-orbit__arc profile-orbit__arc--upper" aria-hidden="true" />
      </div>

      <p className="profile-frame__name" aria-live="polite">
        <span>{typedName || '\u00a0'}</span>
        <span className="profile-frame__caret" aria-hidden="true">
          |
        </span>
      </p>
    </div>
  );
});

ProfileFrame.displayName = 'ProfileFrame';

export default ProfileFrame;