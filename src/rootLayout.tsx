// app/rootLayout.tsx
"use client";
import React from "react";
import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./components/navbar";
const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <header className="z-40">
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="w-full">
      </footer>
    </div>
  );
};

export default RootLayout;