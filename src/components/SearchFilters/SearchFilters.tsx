"use client";

import { useCallback, useState } from "react";
import type { SearchFilters as Filters } from "@/hooks/use-search";
import styles from "./SearchFilters.module.css";

interface SearchFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const ASSET_CATEGORIES = [
  "Australian Equities",
  "International Equities",
  "Australian Bonds",
  "International Bonds",
  "Cash",
  "Technology",
  "Thematic",
  "Shorts Funds & Geared Funds",
];

const MANAGEMENT_APPROACHES = ["Passive", "Active"];

const DIVIDEND_FREQUENCIES = [
  "Monthly",
  "Quarterly",
  "Semiannually",
  "Annually",
];

const INVESTMENT_SUITABILITIES = [
  "Capital growth",
  "Regular income",
  "Capital growth and regular income",
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <fieldset className={styles.section}>
      <legend className={styles.sectionTitle}>
        <button
          type="button"
          className={styles.sectionToggle}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
        >
          {title}
          <span className={styles.chevron} aria-hidden="true">
            {isOpen ? "−" : "+"}
          </span>
        </button>
      </legend>
      {isOpen && <div className={styles.sectionContent}>{children}</div>}
    </fieldset>
  );
}

function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const toggleArrayFilter = useCallback(
    (key: keyof Filters, value: string) => {
      const current = (filters[key] as string[] | undefined) ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      onFiltersChange({ ...filters, [key]: next.length ? next : undefined });
    },
    [filters, onFiltersChange]
  );

  const handleRangeChange = useCallback(
    (key: keyof Filters, bound: "min" | "max", value: string) => {
      const current =
        (filters[key] as
          | { min?: string | null; max?: string | null }
          | undefined) ?? {};
      const next = { ...current, [bound]: value || null };
      const isEmpty = !next.min && !next.max;
      onFiltersChange({ ...filters, [key]: isEmpty ? undefined : next });
    },
    [filters, onFiltersChange]
  );

  const clearAll = useCallback(() => {
    onFiltersChange({});
  }, [onFiltersChange]);

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);

  return (
    <aside className={styles.filters} aria-label="Search filters">
      <div className={styles.heading}>
        <h2 className={styles.title}>Filters</h2>
        {hasActiveFilters && (
          <button type="button" className={styles.clearBtn} onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      <FilterSection title="Product Type">
        {[
          { value: "etf", label: "ETFs" },
          { value: "equity", label: "Stocks" },
        ].map(({ value, label }) => (
          <label key={value} className={styles.checkbox}>
            <input
              type="checkbox"
              checked={filters.kind?.includes(value) ?? false}
              onChange={() => toggleArrayFilter("kind", value)}
            />
            <span>{label}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Asset Category">
        {ASSET_CATEGORIES.map((cat) => (
          <label key={cat} className={styles.checkbox}>
            <input
              type="checkbox"
              checked={filters.asset_categories?.includes(cat) ?? false}
              onChange={() => toggleArrayFilter("asset_categories", cat)}
            />
            <span>{cat}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Management Approach">
        {MANAGEMENT_APPROACHES.map((approach) => (
          <label key={approach} className={styles.checkbox}>
            <input
              type="checkbox"
              checked={filters.management_approach?.includes(approach) ?? false}
              onChange={() =>
                toggleArrayFilter("management_approach", approach)
              }
            />
            <span>{approach}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Dividend Frequency">
        {DIVIDEND_FREQUENCIES.map((freq) => (
          <label key={freq} className={styles.checkbox}>
            <input
              type="checkbox"
              checked={filters.dividend_frequency?.includes(freq) ?? false}
              onChange={() => toggleArrayFilter("dividend_frequency", freq)}
            />
            <span>{freq}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Investment Suitability">
        {INVESTMENT_SUITABILITIES.map((suit) => (
          <label key={suit} className={styles.checkbox}>
            <input
              type="checkbox"
              checked={filters.investment_suitability?.includes(suit) ?? false}
              onChange={() => toggleArrayFilter("investment_suitability", suit)}
            />
            <span>{suit}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Management Fee (%)" defaultOpen={false}>
        <div className={styles.rangeInputs}>
          <input
            type="number"
            step="0.01"
            placeholder="Min"
            className={styles.rangeInput}
            value={
              (filters.management_fee as { min?: string | null })?.min ?? ""
            }
            onChange={(e) =>
              handleRangeChange("management_fee", "min", e.target.value)
            }
          />
          <span className={styles.rangeSeparator}>to</span>
          <input
            type="number"
            step="0.01"
            placeholder="Max"
            className={styles.rangeInput}
            value={
              (filters.management_fee as { max?: string | null })?.max ?? ""
            }
            onChange={(e) =>
              handleRangeChange("management_fee", "max", e.target.value)
            }
          />
        </div>
      </FilterSection>

      <FilterSection title="Fund Size ($M)" defaultOpen={false}>
        <div className={styles.rangeInputs}>
          <input
            type="number"
            step="1"
            placeholder="Min"
            className={styles.rangeInput}
            value={(filters.fund_size as { min?: string | null })?.min ?? ""}
            onChange={(e) =>
              handleRangeChange("fund_size", "min", e.target.value)
            }
          />
          <span className={styles.rangeSeparator}>to</span>
          <input
            type="number"
            step="1"
            placeholder="Max"
            className={styles.rangeInput}
            value={(filters.fund_size as { max?: string | null })?.max ?? ""}
            onChange={(e) =>
              handleRangeChange("fund_size", "max", e.target.value)
            }
          />
        </div>
      </FilterSection>
    </aside>
  );
}

export { SearchFilters };
export type { SearchFiltersProps };
