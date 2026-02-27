export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Welcome to Betashares Test App</h1>
      <p>
        This is a TypeScript boilerplate NextJS app with Vite, Storybook, and
        Vitest.
      </p>
      <div style={{ marginTop: '2rem' }}>
        <h2>Features:</h2>
        <ul>
          <li>Next.js 16 with TypeScript</li>
          <li>Vite for fast development</li>
          <li>Storybook for component development</li>
          <li>Vitest for unit testing</li>
        </ul>
      </div>
    </main>
  );
}
