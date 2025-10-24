export const Logo = ({ width = 200, height = 171 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="210 20 280 320"
    width={width}
    height={height}
  >
    {/* Column Capital */}
    <rect x="250" y="30" width="200" height="15" fill="#808080" rx="2" />
    <rect x="240" y="55" width="220" height="25" fill="#808080" rx="2" />

    {/* Left Scroll */}
    <path
      d="M 230 90 Q 230 105, 245 115 Q 255 122, 260 135 Q 263 148, 260 160 Q 257 172, 245 180 L 245 330"
      fill="none"
      stroke="#808080"
      strokeWidth="20"
      strokeLinecap="round"
    />

    {/* Right Scroll */}
    <path
      d="M 470 90 Q 470 105, 455 115 Q 445 122, 440 135 Q 437 148, 440 160 Q 443 172, 455 180 L 455 330"
      fill="none"
      stroke="#808080"
      strokeWidth="20"
      strokeLinecap="round"
    />

    {/* Three Column Bars */}
    <rect x="295" y="100" width="30" height="230" fill="#808080" rx="3" />
    <rect x="335" y="100" width="30" height="230" fill="#808080" rx="3" />
    <rect x="375" y="100" width="30" height="230" fill="#808080" rx="3" />
  </svg>
);