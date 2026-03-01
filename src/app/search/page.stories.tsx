import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import type { SearchResult, SearchResponse } from "@/lib/search-api";
import { Header } from "@/components/Header";
import { mockFetch } from "@/test/mock-fetch";
import SearchPage from "./page";

/* Mock data */
const baseResult: SearchResult = {
  symbol: "A200",
  display_name: "BetaShares Australia 200 ETF",
  kind: "etf",
  logo: undefined, // "https://betashares.com.au/logo/a200.png",
  inception_date: "2018-05-10",
  currency: "AUD",
  domicile: "Australia",
  exchange: "ASX",
  one_year_return: "12.45",
  five_year_return: "8.92",
  asset_classes: ["Equities"],
  categories: ["Australian Equities"],
  asset_categories: ["Australian Equities"],
  trailing_12m_dividend_yield: "3.80",
  forward_12m_dividend_yield: "3.95",
  is_flagship_fund: true,
  flagship_description_short: "Track the ASX 200",
  flagship_image_url: null,
  discoverable_tags: ["core", "passive"],
  classification: "Australian Equities",
  sub_classification: "Large Cap",
  issuer: "BetaShares",
  fund_size: "4500",
  management_fee: "0.04",
  dividend_frequency: "Quarterly",
  investment_suitability: "Capital growth",
  management_approach: "Passive",
  sector: null,
  market_capitalisation: null,
  pe_ratio_ttm: null,
  total_assets: null,
  total_revenue: null,
  quick_ratio: null,
  current_ratio: null,
  price_to_book_ratio: null,
};

const mockResults: SearchResult[] = [
  baseResult,
  {
    ...baseResult,
    symbol: "NDQ",
    display_name: "BetaShares Nasdaq 100 ETF",
    classification: "International Equities",
    asset_categories: ["International Equities"],
    categories: ["International Equities"],
    fund_size: "5200",
    management_fee: "0.48",
    one_year_return: "28.30",
    five_year_return: "18.12",
  },
  {
    ...baseResult,
    symbol: "DHHF",
    display_name: "BetaShares Diversified All Growth ETF",
    classification: "Multi-Asset",
    asset_categories: ["Australian Equities", "International Equities"],
    categories: ["Diversified"],
    fund_size: "3100",
    management_fee: "0.19",
    one_year_return: "18.60",
    five_year_return: "10.45",
    dividend_frequency: "Semiannually",
  },
  {
    ...baseResult,
    symbol: "BHP",
    display_name: "BHP Group Limited",
    kind: "equity",
    classification: null,
    sub_classification: null,
    issuer: null,
    fund_size: null,
    management_fee: null,
    dividend_frequency: null,
    investment_suitability: null,
    management_approach: null,
    sector: "Materials",
    market_capitalisation: "220000",
    pe_ratio_ttm: "12.5",
    price_to_book_ratio: "3.20",
    one_year_return: "-5.20",
    five_year_return: "6.30",
    asset_categories: [],
    categories: [],
  },
  {
    ...baseResult,
    symbol: "HGEN",
    display_name: "BetaShares Global Sustainability Leaders ETF",
    classification: "International Equities",
    asset_categories: ["International Equities"],
    categories: ["ESG"],
    fund_size: "1200",
    management_fee: "0.57",
    one_year_return: "15.80",
    five_year_return: "12.30",
    management_approach: "Active",
    investment_suitability: "Capital growth and regular income",
  },
  {
    ...baseResult,
    symbol: "AAA",
    display_name: "BetaShares High Interest Cash ETF",
    classification: "Cash",
    asset_categories: ["Cash"],
    categories: ["Cash"],
    fund_size: "7800",
    management_fee: "0.18",
    one_year_return: "4.35",
    five_year_return: "2.10",
    dividend_frequency: "Monthly",
    investment_suitability: "Regular income",
  },
];

function createMockResponse(
  results: SearchResult[] = mockResults
): SearchResponse {
  return {
    results,
    count: results.length,
    indexed_at: Date.now(),
  };
}

/* ─── Stories ───────────────────────────────────────────── */

const meta: Meta = {
  title: "Pages/Search",
  parameters: {
    layout: "fullscreen",
    nextjs: { appDirectory: true },
  },
  decorators: [
    (Story) => (
      <>
        <Header />
        <Story />
      </>
    ),
  ],
};

export default meta;

/* Default */
export const Default: StoryFn = () => {
  return <SearchPage />;
};

Default.beforeEach = () => mockFetch({ response: createMockResponse() });

/* Empty Results */
export const EmptyResults: StoryFn = () => {
  return <SearchPage />;
};

EmptyResults.parameters = {
  nextjs: {
    appDirectory: true,
    navigation: { query: { q: "xyznonexistent" } },
  },
};

EmptyResults.beforeEach = () => mockFetch({ response: createMockResponse([]) });

/* Loading State */
export const Loading: StoryFn = () => {
  return <SearchPage />;
};

Loading.beforeEach = () => mockFetch();

/* Error State */
export const Error: StoryFn = () => {
  return <SearchPage />;
};

Error.beforeEach = () => mockFetch({ error: { status: 500 } });
