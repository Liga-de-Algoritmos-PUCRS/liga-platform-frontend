// app/rootLayout.tsx
"use client";

import React from "react";
import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./components/navbar";

/**
 * Root layout that renders the Navbar and the Router Outlet.
 * - Navbar1 is a client component (it already contains "use client"), so this file must also be a client component.
 * - Keeps a column layout so footer (if any) stays at the bottom and the main content scrolls.
 */
const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="z-40">
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* optional footer placeholder; remove or customize as needed */}
      <footer className="w-full">
        {/* <div className="container py-4 text-sm text-center text-muted-foreground">
          © {new Date().getFullYear()}
        </div> */}
      </footer>
    </div>
  );
};

export default RootLayout;