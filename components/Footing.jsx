import React from 'react'
import Link from 'next/link'
export const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground py-6 px-4 md:px-6">
    <div className="container flex items-center justify-between">
      <p className="text-sm">&copy; 2023 Acme Realty. All rights reserved.</p>
      <nav className="flex items-center gap-4">
        <Link href="#" className="text-sm hover:underline" prefetch={false}>
          Privacy Policy
        </Link>
        <Link href="#" className="text-sm hover:underline" prefetch={false}>
          Terms of Service
        </Link>
      </nav>
    </div>
  </footer>
  )
}
