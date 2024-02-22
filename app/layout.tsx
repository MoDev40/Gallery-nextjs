import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/utils/Providers";
import NavBar from "./_component/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gallery App",
  description: "Unleash Your Creativity: Upload, Delete, and Explore a Visual Symphony! Our Gallery Web App lets you seamlessly share your moments with the world. Dive into a collective canvas where your images find a home, and where every delete is a step towards refining the masterpiece. Join the community, witness diverse perspectives, and make your mark in pixels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
        <NavBar/>
        {children}
        </Providers>
      </body>
    </html>
  );
}
