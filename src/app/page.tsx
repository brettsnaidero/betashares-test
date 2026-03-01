"use client";

import styles from "./page.module.css";
import { Button } from "@/components/Button/Button";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>We help Australians build wealth</h1>
        <p className={styles.description}>
          With more than one million investors and over $75 billion in assets
          under management, Betashares offers Australia’s largest range of ETFs,
          in addition to managed accounts, superannuation and innovative
          investing solutions through our platform, Betashares Direct.
        </p>
        <div className={styles.actions}>
          <Button
            variant="primary"
            render={<a href="https://www.betashares.com.au/direct" />}
          >
            Explore Betashares Direct
          </Button>
          <Button
            variant="secondary"
            render={<a href="https://www.betashares.com.au/fund" />}
          >
            View all funds
          </Button>
        </div>
      </div>
    </main>
  );
}
