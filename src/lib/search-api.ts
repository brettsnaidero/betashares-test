const SEARCH_API_URL = "https://search.betashares.services/search";

/* ------------------------------------------------------------------ */
/*  Request types                                                      */
/* ------------------------------------------------------------------ */

interface RangeFilter {
  min?: string | null;
  max?: string | null;
}

export interface SearchParams {
  search_text?: string;
  from?: number;
  size?: number;
  kind?: string[];
  order_by?: string;

  /* Array filters */
  asset_categories?: string[];
  fund_category?: string[];
  investment_suitability?: string[];
  management_approach?: string[];
  dividend_frequency?: string[];

  /* Range filters */
  fund_size?: RangeFilter;
  management_fee?: RangeFilter;
  one_year_return?: RangeFilter;
  five_year_return?: RangeFilter;
}

/* ------------------------------------------------------------------ */
/*  Response types                                                     */
/* ------------------------------------------------------------------ */

export type SearchResultKind = "etf" | "equity";

export interface SearchResult {
  symbol: string;
  display_name: string;
  kind: SearchResultKind;
  logo?: string;
  inception_date: string;
  currency: string;
  domicile: string;
  exchange: string;
  one_year_return: string | null;
  five_year_return: string | null;
  asset_classes: string[];
  categories: string[];
  asset_categories: string[];
  trailing_12m_dividend_yield: string | null;
  forward_12m_dividend_yield: string | null;
  is_flagship_fund: boolean;
  flagship_description_short: string | null;
  flagship_image_url: string | null;
  discoverable_tags: string[];

  /* ETF-specific fields (null for equities) */
  classification: string | null;
  sub_classification: string | null;
  issuer: string | null;
  fund_size: string | null;
  management_fee: string | null;
  dividend_frequency: string | null;
  investment_suitability: string | null;
  management_approach: string | null;

  /* Equity-specific fields (null for ETFs) */
  sector: string | null;
  market_capitalisation: string | null;
  pe_ratio_ttm: string | null;
  total_assets: string | null;
  total_revenue: string | null;
  quick_ratio: string | null;
  current_ratio: string | null;
  price_to_book_ratio: string | null;
}

export interface SearchResponse {
  results: SearchResult[];
  count: number;
  indexed_at: number;
}

/* ------------------------------------------------------------------ */
/*  API client                                                         */
/* ------------------------------------------------------------------ */

export async function searchProducts(
  params: SearchParams,
  signal?: AbortSignal
): Promise<SearchResponse> {
  const response = await fetch(SEARCH_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Search API error: ${response.status}`);
  }

  return response.json();
}
