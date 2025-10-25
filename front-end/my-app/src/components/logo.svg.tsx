export const Logo = ({ width = 200, height = 171 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="210 20 280 320"
    width={width}
    height={height}
  >
    {/* Column Capital */}
    <rect x="250" y="30" width="200" height="15" fill="#ced4da" rx="2" />
    <rect x="240" y="55" width="220" height="25" fill="#ced4da" rx="2" />

    {/* Three Column Bars */}
    <rect x="295" y="100" width="30" height="230" fill="#ced4da" rx="3" />
    <rect x="335" y="100" width="30" height="230" fill="#ced4da" rx="3" />
    <rect x="375" y="100" width="30" height="230" fill="#ced4da" rx="3" />
  </svg>
);