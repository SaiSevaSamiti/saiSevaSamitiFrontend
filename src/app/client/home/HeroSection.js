'use client'

import Button from '@/components/Button'
import Link from 'next/link'
import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

function HeroSection() {
  return (
    <section className="relative w-full">
      {/* Desktop */}
      <div className="hidden lg:block">
        <ParallaxBanner
          layers={[
            {
              image: '/images/banner-image-bg.jpg',
              speed: -20,
              style: { filter: 'brightness(0.6)' },
            },
            {
              speed: -1,
              children: (
                <div className="absolute inset-0 flex flex-col items-start justify-center px-24 py-16">
                  {/* Gradient overlay for modern look */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-black/60 via-secondary-dark/40 to-transparent " />
                  <h1 className="relative z-10 text-5xl font-extrabold leading-tight 2xl:text-8xl text-primary-base drop-shadow-lg">
                    Sai Seva Samiti
                    <span className="text-accent-base">.</span>
                  </h1>
                  <p className="relative z-10 max-w-2xl mt-6 text-xl font-medium 2xl:text-2xl text-primary-base/80 drop-shadow-lg">
                    Empowering communities through seva, compassion, and
                    collective action. Join us in making a difference today.
                  </p>
                  <div className="relative z-10 flex gap-4 mt-8">
                    <Link href="/client/donate">
                      <Button
                        text="Donate"
                        className="py-4 text-base transition-transform shadow-lg px-14 hover:scale-105 hover:dark:bg-transparent"
                      />
                    </Link>
                    <Link href="/client/contact-us">
                      <Button
                        text="Call Us"
                        outline={true}
                        className="py-4 text-base transition-transform px-14 hover:scale-105"
                      />
                    </Link>
                  </div>
                </div>
              ),
            },
          ]}
          className="aspect-[2/1] overflow-hidden shadow-xl"
        />
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <ParallaxBanner
          layers={[
            {
              image: '/images/banner-image-bg-sm.jpg',
              speed: -20,
              style: { filter: 'brightness(0.6)' },
            },
            {
              speed: 0,
              children: (
                <div className="absolute inset-0 flex flex-col items-start justify-center px-4 py-10">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-secondary-dark/40 to-transparent" />
                  <h1 className="relative z-10 text-6xl font-extrabold leading-tight sm:text-7 xl md:text-8xl text-primary-base drop-shadow-lg">
                    Sai <br />
                    Seva <br />
                    Samiti
                    <span className="text-accent-base">.</span>
                  </h1>

                  <p className="relative z-10 max-w-md mt-4 text-lg font-medium text-primary-base/80 drop-shadow-lg">
                    Empowering communities through seva, compassion, and
                    collective action.
                  </p>
                  <div className="relative z-10 flex gap-4 mt-8">
                    <Link href="/client/donate">
                      <Button
                        text="Donate"
                        className="px-8 py-2 text-base transition-transform shadow-lg hover:scale-105 hover:dark:bg-transparent"
                      />
                    </Link>
                    <Link href="/client/contact-us">
                      <Button
                        text="Call Us"
                        outline={true}
                        className="px-8 py-2 text-base transition-transform hover:scale-105"
                      />
                    </Link>
                  </div>
                </div>
              ),
            },
          ]}
          className="aspect-[1/2] overflow-hidden shadow-xl"
        />
      </div>
    </section>
  )
}

export default HeroSection
