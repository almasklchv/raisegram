"use client";
import "../styles/globals.css";
import "normalize.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import BottomNavigationMenu from "../components/BottomNavigationMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setInterval(() => {
      fetch("https://raisegram-api-j38q.onrender.com");
    }, 300000);
  }, []);

  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-Q7SSF5RQHT"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q7SSF5RQHT');
            `,
          }}
        />
      </head>
      <body className="root">
        <div className="centralizer">
          <Header />
          {children}
          <Footer />
        </div>
        <BottomNavigationMenu />
      </body>
    </html>
  );
}
