import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/Providers";
import NavBar from "./_component/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-full md:w-[1120px] md:mx-auto p-4 ${inter.className}`}>
        <Providers>
        <NavBar/>
        {children}
        </Providers>
      </body>
    </html>
  );
}
