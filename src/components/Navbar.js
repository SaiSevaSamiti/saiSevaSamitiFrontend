'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import slugify from 'slugify'
import { Menu, X, XIcon } from 'lucide-react'

export default function Navbar() {
  const navItems = [
    'Home',
    'Campaigns',
    'Gallery',
    'Certificates',
    'About Us',
    'Contact Us',
  ]
  const pathname = usePathname()
  const currentPath = pathname?.split('/').pop() || ''
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-20 shadow-md bg-primary-base dark:bg-secondary-dark">
      <div className="flex justify-between w-full h-16 px-4 mx-auto lg:px-20">
        {/* Logo */}
        <Link href="/client" className="flex items-center">
          <Image
            src="/images/logo-image.jpg"
            alt="Sai Seva Samiti"
            width={48}
            height={48}
            className="transition-transform rounded-full hover:scale-110"
          />
          <span className="hidden ml-3 text-2xl font-extrabold lg:block text-secondary-dark dark:text-secondary-base">
            Sai Seva Samiti
          </span>
        </Link>

        {/* Hamburger / Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 transition rounded-md lg:hidden text-secondary-dark dark:text-primary-base hover:bg-secondary-base/30"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`fixed inset-0 z-30 lg:static lg:z-auto bg-primary-base dark:bg-secondary-dark lg:bg-transparent transform transition-transform duration-300 lg:flex lg:items-center ${
            menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Close Button for Mobile Nav */}
          <div className="absolute top-4 right-4 lg:hidden">
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 transition rounded-md text-secondary-dark dark:text-primary-base hover:bg-secondary-base/30"
            >
              <X size={28} />
            </button>
          </div>

          <ul className="flex flex-col items-center justify-center h-full p-8 space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0 lg:h-auto lg:p-0">
            {navItems.map((item) => {
              const href = `/client/${slugify(item, { lower: true })}`
              const isActive = currentPath === slugify(item, { lower: true })
              return (
                <li key={item}>
                  <Link href={href} onClick={() => setMenuOpen(false)}>
                    <span
                      className={`block text-lg font-semibold transition-colors hover:text-accent-base ${
                        isActive
                          ? 'text-accent-base'
                          : 'text-secondary-dark dark:text-primary-base'
                      }`}
                    >
                      {item}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Optional backdrop blur to close on click */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  )
}
