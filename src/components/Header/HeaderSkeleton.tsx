import styles from "./Header.module.css";

function HeaderSkeleton() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo placeholder */}
        <div className={`${styles.skeletonBlock} ${styles.shimmer} ${styles.skeletonLogo}`} />

        {/* Search toggle — mobile only */}
        <div
          className={`${styles.skeletonBlock} ${styles.shimmer} ${styles.skeletonSearchToggle}`}
        />

        {/* Search bar — visible on desktop */}
        <div className={styles.search}>
          <div className={styles.searchInner}>
            <div
              className={`${styles.skeletonBlock} ${styles.shimmer} ${styles.skeletonSearchBar}`}
            />
          </div>
        </div>

        {/* Right section: nav links + CTA — desktop only */}
        <div className={styles.rightSection}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i}>
                  <div
                    className={`${styles.skeletonBlock} ${styles.shimmer} ${styles.skeletonNavLink}`}
                  />
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.actions}>
            <div
              className={`${styles.skeletonBlock} ${styles.shimmer} ${styles.skeletonButton}`}
            />
          </div>
        </div>

        {/* Menu button — mobile/tablet only */}
        <div
          className={`${styles.skeletonBlock} ${styles.shimmer} ${styles.skeletonMenuButton}`}
        />
      </div>
    </header>
  );
}

export { HeaderSkeleton };
