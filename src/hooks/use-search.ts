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
  pageSize: number;
}

export function useSearch(initialQuery = ""): UseSearchReturn {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

      const params: SearchParams = {
        from: (searchPage - 1) * PAGE_SIZE + 1,
        size: PAGE_SIZE,
      };

      if (searchQuery.trim()) {
        params.search_text = searchQuery.trim();
      }

      if (searchOrderBy) {
        params.order_by = searchOrderBy;
      }

      // Apply filters
      if (searchFilters.kind?.length) {
        params.kind = searchFilters.kind;
      }
      if (searchFilters.asset_categories?.length) {
        params.asset_categories = searchFilters.asset_categories;
      }
      if (searchFilters.fund_category?.length) {
        params.fund_category = searchFilters.fund_category;
      }
      if (searchFilters.investment_suitability?.length) {
        params.investment_suitability = searchFilters.investment_suitability;
      }
      if (searchFilters.management_approach?.length) {
        params.management_approach = searchFilters.management_approach;
      }
      if (searchFilters.dividend_frequency?.length) {
        params.dividend_frequency = searchFilters.dividend_frequency;
      }
      if (searchFilters.fund_size) {
        params.fund_size = searchFilters.fund_size;
      }
      if (searchFilters.management_fee) {
        params.management_fee = searchFilters.management_fee;
      }
      if (searchFilters.one_year_return) {
        params.one_year_return = searchFilters.one_year_return;
      }
      if (searchFilters.five_year_return) {
        params.five_year_return = searchFilters.five_year_return;
      }

      try {
        const response = await searchProducts(params, controller.signal);
        setResults(response.results);
        setCount(response.count);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
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

  // Reset page when query or filters change
  useEffect(() => {
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
    pageSize: PAGE_SIZE,
  };
}
