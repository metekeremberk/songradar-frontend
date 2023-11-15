export default function MusicSVG({ color = "#000000", size = 20, className }) {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 20C9 21.1046 7.65685 22 6 22C4.34315 22 3 21.1046 3 20C3 18.8954 4.34315 18 6 18C7.65685 18 9 18.8954 9 20ZM9 20V10M20 18V6M20 6V3.4277C20 2.73374 19.3104 2.25075 18.6583 2.48791L9.65826 5.76063C9.26307 5.90434 9 6.27992 9 6.70043V10M20 6L9 10"
        stroke={color}
        stroke-linejoin="round"
      />
      <ellipse
        cx="17"
        cy="18"
        rx="3"
        ry="2"
        stroke={color}
        stroke-linejoin="round"
      />
    </svg>
  );
}
