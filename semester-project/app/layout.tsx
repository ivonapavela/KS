import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import Button from "@/components/buttons";

// Get this info from some external source (e.g. CMS)
const pages = {
  Home: "/",
  Adopt: "./adopt",
  "Pet Care": "./petcare",
  //"Get Involved": "./getinvolved",
  "Support Us": "./supportus",
  "About Us": "./aboutus",
  "Log In": "./login"
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js lab project",
  description: "Next.js lab project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex items-center justify-center p-4">
          <ul className="flex gap-8">
            {Object.entries(pages).map(([name, path]) => (
              <li key={name}>
                <Button path={path} name={name}></Button>
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
