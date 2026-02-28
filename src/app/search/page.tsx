"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/use-search";
import { ProductCard, ProductCardSkeleton } from "@/components/EtfCard";
import { SearchFilters } from "@/components/SearchFilters";
import { SearchOrdering } from "@/components/SearchOrdering";
import { SearchPagination } from "@/components/SearchPagination";
import styles from "./page.module.css";

const SKELETON_COUNT = 6;

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const {
    results,
    count,
    isLoading,
    query,
    setQuery,
    filters,
    setFilters,
    orderBy,
    setOrderBy,
    page,
    setPage,
    pageSize,
  } = useSearch(initialQuery);

  // Sync URL query param with hook state on navigation
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setQuery(q);
  }, [searchParams, setQuery]);

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.queryInfo}>
          {query ? (
            <h1 className={styles.heading}>
              Results for{" "}
              <span className={styles.queryText}>&ldquo;{query}&rdquo;</span>
            </h1>
          ) : (
            <h1 className={styles.heading}>All Products</h1>
          )}
          {isLoading ? (
            <span className={styles.count}>Loading...</span>
          ) : (
            <span className={styles.count}>
              {count.toLocaleString()} {count === 1 ? "result" : "results"}
            </span>
          )}
        </div>
        <SearchOrdering orderBy={orderBy} onOrderByChange={setOrderBy} />
      </div>

      <div className={styles.layout}>
        <SearchFilters filters={filters} onFiltersChange={setFilters} />

        <main className={styles.results}>
          {isLoading ? (
            <div className={styles.grid}>
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : results.length > 0 ? (
            <>
              <div className={styles.grid}>
                {results.map((product) => (
                  <ProductCard key={product.symbol} product={product} />
                ))}
              </div>
              <SearchPagination
                page={page}
                pageSize={pageSize}
                totalCount={count}
                onPageChange={setPage}
              />
            </>
          ) : (
            <div className={styles.empty}>
              <h2 className={styles.emptyTitle}>No results found</h2>
              <p className={styles.emptyText}>
                Try adjusting your search terms or filters to find what
                you&apos;re looking for.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SearchFallback() {
  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.queryInfo}>
          <h1 className={styles.heading}>All Products</h1>
        </div>
      </div>
      <div className={styles.layout}>
        <div />
        <main className={styles.results}>
          <div className={styles.grid}>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  );
}
