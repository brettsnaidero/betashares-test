import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Betashares Test App',
  description: 'A TypeScript boilerplate NextJS app with Vite, Storybook, and Vitest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
