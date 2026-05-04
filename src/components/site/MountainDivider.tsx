export function MountainDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0,80 L0,55 L180,20 L320,50 L470,8 L620,42 L780,18 L940,46 L1110,12 L1280,38 L1440,18 L1440,80 Z"
        fill="currentColor"
      />
    </svg>
  );
}
