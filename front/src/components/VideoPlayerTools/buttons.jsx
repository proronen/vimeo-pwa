export const PlayButton = () => (
  <svg
    viewBox="0 0 20 20"
    preserveAspectRatio="xMidYMid"
    focusable="false"
    aria-hidden="true"
  >
    <polygon className="fill" points="1,0 20,10 1,20"></polygon>
  </svg>
);

export const PauseButton = () => (
  <svg
    viewBox="0 0 20 20"
    preserveAspectRatio="xMidYMid"
    focusable="false"
    aria-hidden="true"
  >
    <rect className="fill" width="6" height="20" x="0" y="0"></rect>
    <rect className="fill" width="6" height="20" x="12" y="0"></rect>
  </svg>
);
