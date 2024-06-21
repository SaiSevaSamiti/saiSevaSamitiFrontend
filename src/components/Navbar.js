'use client'

import CloseIcon from '@/svg/CloseIcon'
import MenuIcon from '@/svg/MenuIcon'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useDebugValue, useEffect, useState } from 'react'
import slugify from 'slugify'

function Navbar() {
  const navElements = [
    'Home',
    'Campaigns',
    'Gallary',
    'Certificates',
    'About Us',
    'Contact Us',
  ]
  const currentRoute = usePathname().split('/')[2]
  const [path, setPath] = useState('')
  const [isNavbarOpen, setIsNavarOpen] = useState(false)

  useEffect(() => {
    setPath(currentRoute)
    // Prevent body scrolling when the navbar is open
    if (isNavbarOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [path, currentRoute, isNavbarOpen])

  const handleNavbar = () => {
    setIsNavarOpen(!isNavbarOpen)
  }

  return (
    <>
      <div className="h-16 flex items-center sticky top-0 z-10 bg-primary-base dark:bg-secondary-dark dark:text-primary-base px-4 lg:px-20 shadow-lg">
        <Link href="/client/home">
          <div className="border-2 border-secondary-dark dark:border-primary-base rounded-full h-12 w-12 flex items-center justify-center hover:scale-105 transition-all ease-in-out">
            Logo
          </div>
        </Link>
        <div
          className="m-auto mr-0 cursor-pointer lg:hidden"
          onClick={handleNavbar}
        >
          <MenuIcon />
        </div>
        <div
          className={`flex place-items-center place-content-center m-auto mr-0 bg-primary-base dark:bg-secondary-dark h-[100vh] top-0 w-full absolute flex-col lg:flex-row lg:relative lg:dark:bg-secondary-dark lg:h-12 lg:w-[40.1vw] transition-all ease-in-out ${
            isNavbarOpen ? 'left-0' : '-left-[100%] lg:left-0'
          }`}
        >
          {navElements.map((element, index) => (
            <Link key={index} href={slugify(element, { lower: true })}>
              <div
                className={
                  slugify(element, { lower: true }) === path
                    ? 'text-primary-dark lg:ml-8 font-semibold tracking-wide hover:scale-105 transition-all border-b-primary-dark border-b-2 mb-12 lg:mb-0 '
                    : 'lg:ml-8 font-semibold tracking-wide hover:text-primary-dark hover:scale-105 transition-all mb-12 lg:mb-0 '
                }
              >
                {element}
              </div>
            </Link>
          ))}
          <div
            className="border-2 border-black rounded-full p-4 dark:border-primary-base hover:scale-105 transition-all ease-in-out cursor-pointer lg:hidden"
            onClick={handleNavbar}
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
