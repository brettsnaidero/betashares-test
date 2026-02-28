"use client";

import cn from "classnames";
import styles from "./SearchPagination.module.css";

interface SearchPaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "…")[] = [1];

  if (current > 3) pages.push("…");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("…");

  pages.push(total);

  return pages;
}

function SearchPagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
}: SearchPaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(page, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Search results pagination">
      <button
        type="button"
        className={cn(styles.button, styles.arrow)}
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        ‹ Prev
      </button>

      <div className={styles.pages}>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={cn(styles.button, styles.page, {
                [styles.active]: p === page,
              })}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        className={cn(styles.button, styles.arrow)}
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        Next ›
      </button>
    </nav>
  );
}

export { SearchPagination };
export type { SearchPaginationProps };
