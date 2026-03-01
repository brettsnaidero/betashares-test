import cn from "classnames";
import styles from "./ProductCard.module.css";

function ProductCardSkeleton() {
  return (
    <article className={cn(styles.card, styles.skeleton)}>
      <div className={styles.header}>
        <div className={cn(styles.logo, styles.shimmer)} />
        <div className={styles.identity}>
          <span className={cn(styles.skeletonText, styles.shimmer)} />
        </div>
      </div>
      <div
        className={cn(
          styles.skeletonText,
          styles.skeletonTitle,
          styles.shimmer
        )}
      />
      <div className={styles.meta}>
        <span
          className={cn(
            styles.skeletonText,
            styles.skeletonTag,
            styles.shimmer
          )}
        />
        <span
          className={cn(
            styles.skeletonText,
            styles.skeletonTag,
            styles.shimmer
          )}
        />
      </div>
      <div className={styles.stats}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div className={styles.stat} key={i}>
            <span className={cn(styles.skeletonText, styles.shimmer)} />
            <span className={cn(styles.skeletonText, styles.shimmer)} />
          </div>
        ))}
      </div>
    </article>
  );
}

export { ProductCardSkeleton };
