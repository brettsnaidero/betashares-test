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
      <div className={styles.shape} style={{ width: size, height: size }} />
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}
