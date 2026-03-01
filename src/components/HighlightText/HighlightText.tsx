import styles from "./HighlightText.module.css";

interface HighlightTextProps {
  /** The full text to display. */
  text: string;
  /** The substring to highlight (case-insensitive). */
  query: string;
}

/**
 * Renders `text` with all occurrences of `query` wrapped in a `<mark>` tag.
 */
function HighlightText({ text, query }: HighlightTextProps) {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className={styles.mark}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export { HighlightText };
