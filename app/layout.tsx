import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { StoreProvider } from "@/store/storeProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "CodeLeap Network | Social Feed",
  description:
    "A modern, interactive social feed platform built with Next.js, Redux, and Tailwind CSS. Join the conversation!",
  keywords: ["CodeLeap", "Social Network", "Frontend Test", "Next.js", "React"],
  openGraph: {
    title: "CodeLeap Network | Join the Conversation",
    description:
      "A modern, interactive social feed platform built with Next.js, Redux, and Tailwind CSS.",
    siteName: "CodeLeap Network",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeLeap Network",
    description: "A modern, interactive social feed platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} antialiased dark:bg-zinc-950 transition-colors duration-500`}
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            {children}
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
