import Button from '@/components/Button'
import Link from 'next/link'
import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

function HeroSection3() {
  return (
    <div className="">
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
              <div className="h-full w-full flex items-center justify-center bg-secondary-dark/[0.24] backdrop-blur-md text-secondary-dark">
                <div className="h-[45%] lg:h-[75%] aspect-auto lg:aspect-square flex flex-col items-center justify-center border-2 mx-4 lg:mx-20 p-12 rounded-xl shadow-xl bg-secondary-base/[0.44] dark:bg-secondary-base/[0.44] dark:brightness-150 backdrop-blur-xl">
                  <h1 className="text-3xl lg:text-5xl font-extrabold lg:text-center">
                    Want to become a Volunteer{' '}
                    <span className="text-accent-base brightness-50">?</span>
                  </h1>
                  <div className="text-justify font-semibold text-md lg:text-xl tracking-wide my-8">
                    Real change and development can only happen with active
                    involvement from civil society. Join us.
                  </div>
                  <div>
                    <Link href="/client/contact-us">
                      <Button
                        text="Become a Volunteer"
                        className={
                          'bg-secondary-dark rounded-lg border-secondary-dark w-full hover:border-primary-base dark:hover:bg-transparent dark:hover:text-primary-base hover:text-primary-base '
                        }
                      />
                    </Link>
                    <Link href="/client/donate">
                      <Button
                        text="Donate Now"
                        className={
                          'bg-transparent rounded-lg border-primary-base w-full mt-4 hover:border-secondary-dark hover:text-secondary-dark dark:hover:text-secondary-base'
                        }
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
