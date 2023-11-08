import Header from "./_components/layout/Header/Header";
import { jaJP } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={jaJP}>
      <html lang="ja">
        <body className={inter.className}>
          <Header />
          <main className="mx-auto flex min-h-screen max-w-5xl flex-col place-content-center justify-between md:p-12">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}