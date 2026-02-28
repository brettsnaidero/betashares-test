import { useCallback, useEffect, useRef, useState } from "react";
import { searchProducts, type SearchResult } from "@/lib/search-api";
import type { ComboboxGroup } from "@/components/Combobox";
import { useDebounce } from "./use-debounce";

const DEBOUNCE_MS = 300;
const SUGGESTION_SIZE = 10;

interface UseSuggestionsReturn {
  groups: ComboboxGroup<SearchResult>[];
  isLoading: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
}

function groupByKind(results: SearchResult[]): ComboboxGroup<SearchResult>[] {
  const etfs = results.filter((r) => r.kind === "etf");
  const equities = results.filter((r) => r.kind === "equity");

  const groups: ComboboxGroup<SearchResult>[] = [];
  if (etfs.length > 0) groups.push({ label: "ETFs", items: etfs });
  if (equities.length > 0) groups.push({ label: "Stocks", items: equities });
  return groups;
}

export function useSuggestions(): UseSuggestionsReturn {
  const [inputValue, setInputValue] = useState("");
  const [groups, setGroups] = useState<ComboboxGroup<SearchResult>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const debouncedQuery = useDebounce(inputValue, DEBOUNCE_MS);

  const fetchSuggestions = useCallback(async (query: string) => {
    abortRef.current?.abort();

    if (!query.trim()) {
      setGroups([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setIsLoading(true);

    try {
      const response = await searchProducts(
        { search_text: query, size: SUGGESTION_SIZE, from: 1 },
        controller.signal
      );
      setGroups(groupByKind(response.results));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setGroups([]);
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchSuggestions(debouncedQuery);
  }, [debouncedQuery, fetchSuggestions]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return { groups, isLoading, inputValue, setInputValue };
}
