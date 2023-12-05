export default function ThrashSVG({
  color = "#000000",
  size = 20,
  className,
  onClick,
}) {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M5 7.5H19L18 21H6L5 7.5Z"
        stroke={color}
        strokeLinejoin="round"
      />
      <path
        d="M15.5 9.5L15 19"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.5V19"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 9.5L9 19"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 5H19C20.1046 5 21 5.89543 21 7V7.5H3V7C3 5.89543 3.89543 5 5 5H8M16 5L15 3H9L8 5M16 5H8"
        stroke={color}
        strokeLinejoin="round"
      />
    </svg>
  );
}
