"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default function Navbar({ menuOpen, toggleMenu }) {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <HomeIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">Acme Realty</span>
      </Link>
      <nav
        className={`fixed top-0 left-0 w-full h-full bg-primary bg-opacity-90 flex flex-col items-center justify-center gap-6 md:relative md:flex md:flex-row md:items-center md:bg-transparent md:h-auto md:w-auto transition-transform duration-300 ease-in-out ${
          menuOpen ? "transform-none" : "transform -translate-x-full md:translate-x-0"
        }`}
      >
        <Link href="/" className="text-sm font-medium hover:underline" prefetch={false}>
          Buy
        </Link>
        <Link href="/sell-property" className="text-sm font-medium hover:underline" prefetch={false}>
          Sell
        </Link>
        <Link href="https://portfolio-iota-ebon-70.vercel.app/" className="text-sm font-medium hover:underline" prefetch={false}>
          About
        </Link>
        <Link href="https://chat.whatsapp.com/JIFxPevzvbXLKgAMDPmu0d" className="text-sm font-medium hover:underline" prefetch={false}>
          Contact
        </Link>
      </nav>
      <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMenu}>
        <MenuIcon className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    </header>
  );
}
