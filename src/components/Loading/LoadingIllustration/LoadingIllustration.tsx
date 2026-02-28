import styles from "./LoadingIllustration.module.css";

export interface LoadingIllustrationProps {
  /** Size of the spinner in pixels */
  size?: number;
  className?: string;
}

export function LoadingIllustration({
  size = 48,
  className,
}: LoadingIllustrationProps) {
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
          r="20"
          fill="#FA4D16"
        />
        {/* Hexagon */}
        <path
          className={styles.hexagon}
          d="M13.2887 25.5C13.11 25.1906 13.11 24.8094 13.2887 24.5L18.7113 15.1077C18.89 14.7983 19.2201 14.6077 19.5773 14.6077L30.4227 14.6077C30.7799 14.6077 31.11 14.7983 31.2887 15.1077L36.7113 24.5C36.89 24.8094 36.89 25.1906 36.7113 25.5L31.2887 34.8923C31.11 35.2017 30.7799 35.3923 30.4227 35.3923L19.5774 35.3923C19.2201 35.3923 18.89 35.2017 18.7113 34.8923L13.2887 25.5Z"
          fill="#FA4D16"
          stroke="white"
          stroke-width="2"
          stroke-linejoin="round"
        />
        {/* Triangle */}
        <path
          className={styles.triangle}
          d="M35.4265 24.1258C36.1123 24.5068 36.1123 25.4932 35.4265 25.8742L20.4856 34.1746C19.8191 34.5449 19 34.063 19 33.3005V16.6995C19 15.937 19.8191 15.4551 20.4856 15.8254L35.4265 24.1258Z"
          fill="#FA4D16"
          stroke="white"
          stroke-width="2"
          stroke-linejoin="round"
        />
      </svg>
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
}
