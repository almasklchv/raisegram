"use client";
import "../styles/globals.css";
import "normalize.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import BottomNavigationMenu from "../components/BottomNavigationMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="root">
        <div className="centralizer">
          <Header/>
          {children}
          <Footer />
        </div>
        <BottomNavigationMenu />
      </body>
    </html>
  );
}
