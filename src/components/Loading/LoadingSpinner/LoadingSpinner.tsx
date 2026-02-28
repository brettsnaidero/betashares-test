import styles from "./LoadingSpinner.module.css";

export interface LoadingSpinnerProps {
  /** Size of the spinner in pixels */
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 48, className }: LoadingSpinnerProps) {
  return (
    <div
      className={`${styles.wrapper} ${className ?? ""}`}
      role="status"
      aria-label="Loading"
    >
      <svg
        width="50"
        height="50"
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
          fill="#FA4D16"
        />
      </svg>
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}
