"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { BetasharesLogo } from "@/components/BetasharesLogo";
import { Combobox } from "@/components/Combobox";
import { useSuggestions } from "@/hooks/use-suggestions";
import type { SearchResult } from "@/lib/search-api";
import styles from "./Header.module.css";

function Header() {
  const router = useRouter();
  const { groups, isLoading, setInputValue } = useSuggestions();

  const navigateToSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    },
    [router]
  );

  const handleValueChange = useCallback(
    (item: SearchResult | null) => {
      if (item) {
        router.push(`/search?q=${encodeURIComponent(item.symbol)}`);
      }
    },
    [router]
  );

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logoLink} aria-label="Betashares home">
          <BetasharesLogo />
        </Link>

        <div className={styles.search}>
          <Combobox<SearchResult>
            groups={groups}
            onInputValueChange={setInputValue}
            icon={<Search className={styles.searchIcon} />}
            getItemLabel={(item) => `${item.symbol} — ${item.display_name}`}
            getItemValue={(item) => item.symbol}
            renderItem={(item) => (
              <div className={styles.suggestion}>
                <span className={styles.ticker}>{item.symbol}</span>
                <span className={styles.name}>{item.display_name}</span>
              </div>
            )}
            onValueChange={handleValueChange}
            onSubmit={navigateToSearch}
            isLoading={isLoading}
            placeholder="Search the site by ASX code or fund name"
            aria-label="Search the site by ASX code or fund name"
            emptyMessage="No matching results found"
          />
        </div>
      </div>
    </header>
  );
}

export { Header };
