import styles from "./page.module.css";
import { Button } from "@/components/Button/Button";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Welcome to Betashares</h1>
      <p className={styles.description}>
        A Next.js project with TypeScript, CSS Modules, Base UI, Storybook, and
        Vitest.
      </p>
      <div className={styles.actions}>
        <Button variant="primary">Get Started</Button>
        <Button variant="secondary">Learn More</Button>
      </div>
    </main>
  );
}
