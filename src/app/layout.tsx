import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/reset.css";
import "@/styles/variables.css";
import "@/styles/globals.css";

import { Header, HeaderSkeleton } from "@/components/Header";

const rundDisplay = localFont({
  src: [{ path: "../../public/fonts/RundDisplay-Medium.woff2", weight: "500" }],
  variable: "--font-heading",
  display: "swap",
});

const rundText = localFont({
  src: [
    { path: "../../public/fonts/RundText-Regular.woff2", weight: "400" },
    { path: "../../public/fonts/RundText-Medium.woff2", weight: "500" },
    { path: "../../public/fonts/RundText-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-text",
  display: "swap",
});

export const metadata: Metadata = {
  title: "We help Australians build wealth | Betashares",
  description:
    "Betashares, a leading Australian fund manager specialising in ETFs. Over $50 billion under management, we serve over 1 million investors.",
  icons: [
    { url: "/favicon-16x16.webp", sizes: "16x16", type: "image/webp" },
    { url: "/favicon-32x32.webp", sizes: "32x32", type: "image/webp" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rundDisplay.variable} ${rundText.variable}`}>
      <body>
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
