import styles from "./LoadingSpinner.module.css";

export interface LoadingSpinnerProps {
  /** Size of the spinner in pixels */
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 40, className }: LoadingSpinnerProps) {
  return (
    <div
      className={`${styles.wrapper} ${className ?? ""}`}
      role="status"
      aria-label="Loading"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Circle background */}
        <circle
          className={styles.circle}
          cx="25"
          cy="25"
          r="10"
          strokeWidth="2px"
        />
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="10"
          strokeWidth="2px"
          // strokeDasharray is 3/4 circumference of the circle (2 * π * r)
          strokeDasharray={(Math.PI * 2 * 10 * 0.75).toFixed(2)}
          strokeLinecap="round"
        />
      </svg>
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}
