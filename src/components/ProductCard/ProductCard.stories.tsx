import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { SearchResult } from "@/lib/search-api";
import { ProductCard } from "./ProductCard";

const sampleEtf: SearchResult = {
  symbol: "NDQ",
  display_name: "Betashares NASDAQ 100 ETF",
  kind: "etf",
  logo: "",
  inception_date: "2015-05-26",
  currency: "AUD",
  domicile: "AU",
  exchange: "ASX",
  one_year_return: "28.41",
  five_year_return: "18.73",
  asset_classes: ["Equity"],
  categories: ["International"],
  asset_categories: ["International Equities"],
  trailing_12m_dividend_yield: "0.32",
  forward_12m_dividend_yield: null,
  is_flagship_fund: true,
  flagship_description_short: null,
  flagship_image_url: null,
  discoverable_tags: [],
  classification: "International Equities",
  sub_classification: "North America",
  issuer: "Betashares",
  fund_size: "4200",
  management_fee: "0.48",
  dividend_frequency: "Semi-annual",
  investment_suitability: "Growth",
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

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: sampleEtf,
  },
};
