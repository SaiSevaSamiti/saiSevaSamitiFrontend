import Button from '@/components/Button'
import Link from 'next/link'
import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

function HeroSection3() {
  return (
    <div className="w-full">
      <ParallaxBanner
        layers={[
          {
            image: '/images/hero-section-3.jpg',
            speed: -20,
            style: {
              filter: 'brightness(0.3)',
            },
          },
          {
            speed: -5,
            children: (
              <div className="flex items-center justify-center w-full h-full">
                <div className="max-w-2xl px-8 py-12 mx-6 text-center border shadow-2xl lg:mx-20 rounded-3xl border-white/20 backdrop-blur-xl bg-white/10 dark:bg-white/10">
                  <h1 className="text-3xl font-extrabold leading-tight tracking-wide text-white sm:text-4xl lg:text-5xl">
                    Want to become a Volunteer{' '}
                    <span className="text-accent-base brightness-125">?</span>
                  </h1>

                  <p className="mt-6 font-medium text-md sm:text-lg lg:text-xl text-white/90">
                    Real change and development can only happen with active
                    involvement from civil society. Join us.
                  </p>

                  <div className="w-full mt-10 space-y-4">
                    <Link href="/client/contact-us">
                      <Button
                        text="Become a Volunteer"
                        className="w-full transition-all rounded-lg bg-secondary-dark border-secondary-dark hover:dark:bg-transparent hover:text-primary-base hover:border-primary-base"
                      />
                    </Link>
                    <Link href="/client/donate">
                      <Button
                        text="Donate Now"
                        className="w-full mt-6 text-white transition-all bg-transparent rounded-lg border-primary-base hover:bg-primary-base hover:text-white dark:hover:bg-secondary-dark dark:hover:text-white dark:hover:border-secondary-dark "
                      />
                    </Link>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        className="aspect-[1/2] lg:aspect-[2/1]"
      />
    </div>
  )
}

export default HeroSection3
