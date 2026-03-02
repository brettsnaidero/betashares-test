"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/use-search";
import { useDebounce } from "@/hooks/use-debounce";
import { filtersToParams, paramsToFilters } from "@/lib/search-params";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { SearchFilters } from "@/components/SearchFilters";
import { SearchOrdering } from "@/components/SearchOrdering";
import { SearchPagination } from "@/components/SearchPagination";
import { Drawer } from "@/components/Drawer";
import styles from "./page.module.css";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components";
import { SlidersHorizontal, X } from "lucide-react";

const SKELETON_COUNT = 9;

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    query: initialQuery,
    filters: initialFilters,
    orderBy: initialOrderBy,
    page: initialPage,
  } = paramsToFilters(searchParams);

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
    error,
    pageSize,
  } = useSearch(initialQuery, initialPage, initialFilters, initialOrderBy);

  const debouncedQuery = useDebounce(query, 300);

  /* Get count of all active filters */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    for (const value of Object.values(filters)) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          count++;
        }
      } else if (value && (value.min || value.max)) {
        count++;
      }
    }
    return count;
  }, [filters]);

  // Track the last URL we pushed so we can skip the URL→State sync for our own changes
  const lastPushedParams = useRef<string | null>(null);

  // Sync URL → State (only for external navigation like back/forward)
  useEffect(() => {
    const currentParams = searchParams.toString();
    if (lastPushedParams.current === currentParams) {
      return;
    }
    const parsed = paramsToFilters(searchParams);
    setQuery(parsed.query);
    setPage(parsed.page);
    setFilters(parsed.filters);
    setOrderBy(parsed.orderBy);
  }, [searchParams, setQuery, setPage, setFilters, setOrderBy]);

  // Push state changes to URL (replace to avoid history spam from filter toggles)
  useEffect(() => {
    const params = filtersToParams(filters, orderBy, debouncedQuery, page);
    const paramsStr = params.toString();
    const currentParams = searchParams.toString();

    if (paramsStr !== currentParams) {
      lastPushedParams.current = paramsStr;
      const newUrl = paramsStr ? `/search?${paramsStr}` : "/search";
      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedQuery, filters, orderBy, page, router, searchParams]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    [setPage]
  );

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.queryInfo}>
          {query ? (
            <div className={styles.headingWrapper}>
              <h1 className={styles.heading}>
                Results for{" "}
                <span className={styles.queryText}>&ldquo;{query}&rdquo;</span>
              </h1>
              <Button
                variant="tertiary"
                size="small"
                padding="compact"
                onClick={() => setQuery("")}
              >
                <X size={16} />
                <span className="sr-only">Clear search term</span>
              </Button>
            </div>
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

        <div className={styles.toolbarSubset}>
          <div className={styles.mobileFilterButton}>
            <Drawer.Root anchor="left" size="small">
              <Drawer.Trigger
                render={(props) => <Button {...props} variant="secondary" />}
              >
                <SlidersHorizontal size={16} />
                <span>
                  Filters
                  {activeFilterCount > 0 ? (
                    <>
                      {" "}
                      ({activeFilterCount}
                      <span className="sr-only"> active filters</span>)
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Backdrop />
                <Drawer.Popup>
                  <Drawer.Header>
                    <Drawer.Title>Search filters</Drawer.Title>
                    <Drawer.Close />
                  </Drawer.Header>
                  <Drawer.Content>
                    <SearchFilters
                      filters={filters}
                      onFiltersChange={setFilters}
                    />
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Portal>
            </Drawer.Root>
          </div>

          <SearchOrdering orderBy={orderBy} onOrderByChange={setOrderBy} />
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.desktopFilters}>
          <SearchFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <main className={styles.results}>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                className={styles.grid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                className={styles.empty}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                <h2 className={styles.emptyTitle}>An error occurred</h2>
                <p className={styles.emptyText}>
                  There was a problem fetching the search results.
                </p>
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className={styles.grid}>
                  {results.map((product) => (
                    <ProductCard key={product.symbol} product={product} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                className={styles.empty}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              >
                <h2 className={styles.emptyTitle}>No results found</h2>
                <p className={styles.emptyText}>
                  Try adjusting your search terms or filters to find what
                  you&apos;re looking for.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {results.length > 0 && !isLoading && (
            <SearchPagination
              page={page}
              pageSize={pageSize}
              totalCount={count}
              onPageChange={handlePageChange}
            />
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
