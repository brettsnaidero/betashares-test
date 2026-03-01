import Image from "next/image";
import cn from "classnames";
import type { SearchResult } from "@/lib/search-api";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: SearchResult;
}

function formatMillions(raw: string | null): string {
  if (!raw) return "—";
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return "—";
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}B`;
  return `$${value.toFixed(0)}M`;
}

function formatReturn(raw: string | null): string {
  if (!raw) return "—";
  const value = parseFloat(raw);
  if (Number.isNaN(value)) return "—";
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function isPositiveReturn(raw: string | null): boolean {
  if (!raw) return false;
  return parseFloat(raw) >= 0;
}

function returnClassName(raw: string | null): string {
  return cn(styles.statValue, {
    [styles.positive]: isPositiveReturn(raw),
    [styles.negative]: raw && !isPositiveReturn(raw),
  });
}

function ProductCard({ product }: ProductCardProps) {
  const isEtf = product.kind === "etf";

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        {product.logo ? (
          <Image
            src={product.logo}
            alt=""
            className={styles.logo}
            width={32}
            height={32}
            unoptimized
          />
        ) : (
          <div className={styles.logo} />
        )}
        <div className={styles.identity}>
          <span className={styles.symbol}>{product.symbol}</span>
          <span className={styles.exchange}>{product.exchange}</span>
        </div>
        <span
          className={cn(styles.kindBadge, isEtf ? styles.etf : styles.equity)}
        >
          {isEtf ? "ETF" : "Stock"}
        </span>
      </div>

      <h3 className={styles.name}>{product.display_name}</h3>

      <div className={styles.meta}>
        {isEtf && product.classification && (
          <span className={styles.tag}>{product.classification}</span>
        )}
        {isEtf && product.management_approach && (
          <span className={styles.tag}>{product.management_approach}</span>
        )}
        {!isEtf && product.sector && (
          <span className={styles.tag}>{product.sector}</span>
        )}
      </div>

      <div className={styles.stats}>
        {isEtf ? (
          <>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Fund Size</span>
              <span className={styles.statValue}>
                {formatMillions(product.fund_size)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Mgmt Fee</span>
              <span className={styles.statValue}>
                {product.management_fee ? `${product.management_fee}%` : "—"}
              </span>
            </div>
          </>
        ) : (
          <>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Mkt Cap</span>
              <span className={styles.statValue}>
                {formatMillions(product.market_capitalisation)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>P/B Ratio</span>
              <span className={styles.statValue}>
                {product.price_to_book_ratio
                  ? parseFloat(product.price_to_book_ratio).toFixed(2)
                  : "—"}
              </span>
            </div>
          </>
        )}
        <div className={styles.stat}>
          <span className={styles.statLabel}>1Y Return</span>
          <span className={returnClassName(product.one_year_return)}>
            {formatReturn(product.one_year_return)}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>5Y Return</span>
          <span className={returnClassName(product.five_year_return)}>
            {formatReturn(product.five_year_return)}
          </span>
        </div>
      </div>

      {/* ETF-specific footer with dividend frequency and investment suitability */}
      {/* isEtf &&
        (product.dividend_frequency || product.investment_suitability) && (
          <div className={styles.footer}>
            <span>{product.dividend_frequency ?? ""}</span>
            <span>{product.investment_suitability ?? ""}</span>
          </div>
        ) */}
    </article>
  );
}

export { ProductCard };
export type { ProductCardProps };
