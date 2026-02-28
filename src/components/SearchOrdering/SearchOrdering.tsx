"use client";

import styles from "./SearchOrdering.module.css";

interface SearchOrderingProps {
  orderBy: string;
  onOrderByChange: (orderBy: string) => void;
}

const ORDER_OPTIONS = [
  { label: "Relevance", value: "" },
  { label: "1 Year Return (High → Low)", value: "one_year_return.desc" },
  { label: "1 Year Return (Low → High)", value: "one_year_return.asc" },
  { label: "5 Year Return (High → Low)", value: "five_year_return.desc" },
  { label: "5 Year Return (Low → High)", value: "five_year_return.asc" },
  { label: "Fund Size (Large → Small)", value: "fund_size.desc" },
  { label: "Fund Size (Small → Large)", value: "fund_size.asc" },
  { label: "Mgmt Fee (Low → High)", value: "management_fee.asc" },
  { label: "Mgmt Fee (High → Low)", value: "management_fee.desc" },
];

function SearchOrdering({ orderBy, onOrderByChange }: SearchOrderingProps) {
  return (
    <div className={styles.ordering}>
      <label htmlFor="sort-select" className={styles.label}>
        Sort by
      </label>
      <select
        id="sort-select"
        className={styles.select}
        value={orderBy}
        onChange={(e) => onOrderByChange(e.target.value)}
      >
        {ORDER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export { SearchOrdering };
export type { SearchOrderingProps };
