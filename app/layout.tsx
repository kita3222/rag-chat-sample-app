import { Inter } from "next/font/google";
import "./styles/global.css";
import StyledComponentsRegistry from "../lib/registry";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Almondo RAG Chat",
  description:
    "Retrieval Augmented Generation を活用したチャットアプリケーション",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
