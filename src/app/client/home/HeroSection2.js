import React from 'react'
import Button from '@/components/Button'
import { ParallaxBanner } from 'react-scroll-parallax'

function HeroSection2() {
  return (
    <ParallaxBanner
      layers={[
        {
          image: '/images/banner-image-3.jpg',
          speed: -20,
          style: {
            filter: 'brightness(0.4)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          },
        },
        {
          speed: -5,
          children: (
            <div className="flex items-center justify-start w-full h-full px-4 lg:px-20">
              <div className="max-w-4xl text-left">
                <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl text-primary-base drop-shadow-md">
                  Help Us <br />
                  <span className="text-secondary-base">
                    Achieve Our Mission
                  </span>
                  <span className="text-accent-base">.</span>
                </h1>
                <div className="mt-8">
                  <Button
                    text="Donate"
                    outline
                    className="px-6 py-3 text-xl transition-transform duration-300 shadow-lg hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ),
        },
      ]}
      className="w-full h-screen"
    />
  )
}

export default HeroSection2
