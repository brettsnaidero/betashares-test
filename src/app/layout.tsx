import type { Metadata } from "next";

import "@/styles/variables.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "We help Australians build wealth | Betashares",
  description:
    "Betashares, a leading Australian fund manager specialising in ETFs. Over $50 billion under management, we serve over 1 million investors.",
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
