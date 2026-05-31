import { memo } from 'react';

type ProfileFrameProps = {
  imageSrc: string;
  name: string;
  className?: string;
};

const ProfileFrame = memo(({ imageSrc, name, className = '' }: ProfileFrameProps) => {
  return (
    <div className={`profile-frame ${className}`.trim()} aria-label={`${name} profile portrait`}>
      <div className="profile-orbit__glow" aria-hidden="true" />
      <div className="profile-orbit__ring" aria-hidden="true" />
      <div className="profile-orbit__particle-layer" aria-hidden="true">
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
    </div>
  );
});

ProfileFrame.displayName = 'ProfileFrame';

export default ProfileFrame;