'use client'

import Button from '@/components/Button'
import Link from 'next/link'
import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

function HeroSection() {
  return (
    <>
      <div className="hidden lg:block">
        <ParallaxBanner
          layers={[
            {
              image: '/images/banner-image-bg.jpg',
              speed: -20,
              style: {
                filter: 'brightness(0.3)',
              },
            },
            {
              speed: -1,
              children: (
                <div className="absolute flex flex-col justify-center inset-0 px-20">
                  <h1 className="text-8xl font-extrabold max-w-min text-primary-base">
                    Sai Seva Samiti
                    <span className="text-secondary-base">.</span>
                  </h1>
                  <div className="flex my-4">
                    <Link href="/client/donate">
                      <Button
                        text="Donate"
                        className="mr-8 px-8 hover:bg-transparent hover:dark:bg-transparent"
                      />
                    </Link>
                    <Link href="/client/contact-us">
                      <Button
                        text="Call Us"
                        className="mr-8 px-8"
                        outline={true}
                      />
                    </Link>
                  </div>
                </div>
              ),
            },
          ]}
          className="aspect-[2/1]"
        />
      </div>
      <div className="lg:hidden">
        <ParallaxBanner
          layers={[
            {
              image: '/images/banner-image-bg-sm.jpg',
              speed: -20,
              style: {
                filter: 'brightness(0.4)',
              },
            },
            {
              speed: 0,
              children: (
                <div className="absolute flex flex-col justify-center inset-0 px-4">
                  <h1 className="text-8xl font-extrabold max-w-min text-primary-base">
                    Sai Seva Samiti
                    <span className="text-secondary-base">.</span>
                  </h1>
                  <div className="flex my-4">
                    <Button text="Donate" className="mr-8 px-8" />
                    <Button
                      text="Call Us"
                      className="mr-8 px-8"
                      outline={true}
                    />
                  </div>
                </div>
              ),
            },
          ]}
          className="aspect-[1/2]"
        />
      </div>
    </>
  )
}

export default HeroSection
