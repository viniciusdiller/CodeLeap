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
  title: "CodeLeap Network",
  description: "Frontend Test for CodeLeap",
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
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
