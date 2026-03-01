import type { SearchFilters } from "@/hooks/use-search";

const ARRAY_FILTER_KEYS = [
  "kind",
  "asset_categories",
  "fund_category",
  "investment_suitability",
  "management_approach",
  "dividend_frequency",
] as const;

const RANGE_FILTER_KEYS = [
  "fund_size",
  "management_fee",
  "one_year_return",
  "five_year_return",
] as const;

interface ParsedSearchParams {
  query: string;
  filters: SearchFilters;
  orderBy: string;
  page: number;
}

/**
 * Serializes all search state into URL query parameters.
 *
 * Array filters use comma-separated values: `kind=etf,equity`
 * Range filters use _min/_max suffixes: `fund_size_min=100&fund_size_max=500`
 */
export function filtersToParams(
  filters: SearchFilters,
  orderBy: string,
  query: string,
  page: number
): URLSearchParams {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (orderBy) {
    params.set("sort", orderBy);
  }

  for (const key of ARRAY_FILTER_KEYS) {
    const values = filters[key];
    if (values && values.length > 0) {
      params.set(key, values.join(","));
    }
  }

  for (const key of RANGE_FILTER_KEYS) {
    const range = filters[key];
    if (range?.min) {
      params.set(`${key}_min`, range.min);
    }
    if (range?.max) {
      params.set(`${key}_max`, range.max);
    }
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  return params;
}

/**
 * Parses URL query parameters back into typed search state.
 * Handles missing or malformed values gracefully.
 */
export function paramsToFilters(params: URLSearchParams): ParsedSearchParams {
  const query = params.get("q") ?? "";
  const orderBy = params.get("sort") ?? "";
  const page = Math.max(1, Number(params.get("page")) || 1);

  const filters: SearchFilters = {};

  for (const key of ARRAY_FILTER_KEYS) {
    const raw = params.get(key);
    if (raw) {
      const values = raw.split(",").filter(Boolean);
      if (values.length > 0) {
        filters[key] = values;
      }
    }
  }

  for (const key of RANGE_FILTER_KEYS) {
    const min = params.get(`${key}_min`) || null;
    const max = params.get(`${key}_max`) || null;
    if (min || max) {
      filters[key] = { min, max };
    }
  }

  return { query, filters, orderBy, page };
}
