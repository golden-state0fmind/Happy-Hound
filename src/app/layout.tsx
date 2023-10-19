// These styles apply to every route in the application
import "../../styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthStatus from "./components/auth-status";
import { Suspense } from "react";
import { NavBar } from "./components/NavBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Happy Hound Care";
const description =
  "The trusted and best option for taking care of your furry friends.";

export const metadata: Metadata = {
  title,
  description,
  //metadataBase: new URL("happy-hound-care.vercel.app"),
  themeColor: "#FFF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        <Suspense fallback="Fetching 🐶...">
          <AuthStatus />
        </Suspense>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
