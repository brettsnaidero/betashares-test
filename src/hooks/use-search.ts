import { useCallback, useEffect, useRef, useState } from "react";
import {
  searchProducts,
  type SearchResult,
  type SearchParams,
} from "@/lib/search-api";
import { useDebounce } from "./use-debounce";

const DEBOUNCE_MS = 300;
const PAGE_SIZE = 15;

export interface SearchFilters {
  kind?: string[];
  asset_categories?: string[];
  fund_category?: string[];
  investment_suitability?: string[];
  management_approach?: string[];
  dividend_frequency?: string[];
  fund_size?: { min?: string | null; max?: string | null };
  management_fee?: { min?: string | null; max?: string | null };
  one_year_return?: { min?: string | null; max?: string | null };
  five_year_return?: { min?: string | null; max?: string | null };
}

interface UseSearchReturn {
  results: SearchResult[];
  count: number;
  isLoading: boolean;
  query: string;
  setQuery: (query: string) => void;
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
  orderBy: string;
  setOrderBy: (orderBy: string) => void;
  page: number;
  setPage: (page: number) => void;
  error: boolean;
  pageSize: number;
}

export function useSearch(
  initialQuery = "",
  initialPage = 1,
  initialFilters: SearchFilters = {},
  initialOrderBy = ""
): UseSearchReturn {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [page, setPage] = useState(initialPage);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);

  const executeSearch = useCallback(
    async (
      searchQuery: string,
      searchFilters: SearchFilters,
      searchOrderBy: string,
      searchPage: number
    ) => {
      abortRef.current?.abort();

      const controller = new AbortController();
      abortRef.current = controller;
      setIsLoading(true);
      setError(false);

      const params: SearchParams = {
        from: searchPage,
        size: PAGE_SIZE,
        ...(searchQuery.trim() && { search_text: searchQuery.trim() }),
        ...(searchOrderBy && { order_by: searchOrderBy }),
      };

      // Apply non-empty filters
      for (const [key, value] of Object.entries(searchFilters)) {
        if (Array.isArray(value) ? value.length : value) {
          (params as Record<string, unknown>)[key] = value;
        }
      }

      try {
        const response = await searchProducts(params, controller.signal);
        setResults(response.results);
        setCount(response.count);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          // Ignore abort errors
          return;
        }

        setError(true);

        setResults([]);
        setCount(0);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    []
  );

  // Reset page when query or filters change (skip initial mount to preserve initialPage)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPage(1);
  }, [debouncedQuery, filters, orderBy]);

  // Execute search when parameters change
  useEffect(() => {
    executeSearch(debouncedQuery, filters, orderBy, page);
  }, [debouncedQuery, filters, orderBy, page, executeSearch]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return {
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
    pageSize: PAGE_SIZE,
  };
}
