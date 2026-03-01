"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { BetasharesLogo } from "@/components/BetasharesLogo";
import { Combobox } from "@/components/Combobox";
import { Drawer } from "@/components/Drawer";
import { useSuggestions } from "@/hooks/use-suggestions";
import type { SearchResult } from "@/lib/search-api";
import styles from "./Header.module.css";
import { Button } from "../Button";

const navLinks = [
  { href: "/funds", label: "Funds" },
  // { href: "/about", label: "About us" },
  { href: "/resources", label: "Resources" },
  { href: "/insights", label: "Insights" },
  { href: "/super", label: "Super" },
];

function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("q") ?? "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { groups, isLoading, setInputValue } = useSuggestions(defaultQuery);

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

        <button
          type="button"
          className={styles.searchToggle}
          aria-expanded={searchOpen}
          aria-controls="header-search"
          aria-label={searchOpen ? "Close search" : "Open search"}
          onClick={() => setSearchOpen((prev) => !prev)}
        >
          <Search size={20} />
        </button>

        <motion.div
          id="header-search"
          className={styles.search}
          initial={false}
          animate={
            searchOpen
              ? { height: "auto", opacity: 1 }
              : { height: 0, opacity: 0 }
          }
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className={styles.searchInner}>
            <Combobox<SearchResult>
              groups={groups}
              defaultInputValue={defaultQuery}
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
              placeholder="Search by ASX code or fund name"
              aria-label="Search the site by ASX code or fund name"
              emptyMessage="No matching results found"
            />
          </div>
        </motion.div>

        <div className={styles.rightSection}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href="#" className={styles.navLink}>
                    {label}
                    <span className={styles.dropdownIcon}>
                      <ChevronDown size={16} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <Button size="mediumSmall" padding="compact">
              Betashares Direct
            </Button>
          </div>
        </div>

        <Drawer.Root
          anchor="right"
          size="small"
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
        >
          <Drawer.Trigger className={styles.menuButton} aria-label="Open menu">
            <Menu size={24} />
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Popup>
              <Drawer.Header>
                <Drawer.Title>Menu</Drawer.Title>
                <Drawer.Close />
              </Drawer.Header>
              <Drawer.Content>
                <nav>
                  <ul className={styles.mobileNavList}>
                    {navLinks.map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href="#"
                          className={styles.mobileNavLink}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Drawer.Content>
            </Drawer.Popup>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </header>
  );
}

export { Header };
