import Button from '@/components/Button'
import React from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

function HeroSection2() {
  return (
    <>
      <div className="block lg:hidden">
        <ParallaxBanner
          layers={[
            {
              image: '/images/banner-image-3-sm.jpg',
              speed: -20,
              style: {
                filter: 'brightness(0.5)',
              },
            },
            {
              speed: -5,
              children: (
                <div className="h-full flex items-center px-4 lg:px-20">
                  <h1 className="text-6xl lg:text-8xl font-extrabold max-w-min text-primary-base">
                    Help Us
                    <br />
                    <span className="text-secondary-base">
                      Achieve Our Mission
                    </span>
                    <span className="text-accent-base">.</span>
                    <span>
                      <Button
                        text={'Donate'}
                        outline={true}
                        className={'my-8 text-3xl'}
                      />
                    </span>
                  </h1>
                </div>
              ),
            },
          ]}
          className="w-[100vw] h-[100vh]"
        />
      </div>
      <div className="hidden lg:block">
        <ParallaxBanner
          layers={[
            {
              image: '/images/banner-image-3.jpg',
              speed: -20,
              style: {
                filter: 'brightness(0.5)',
              },
            },
            {
              speed: -5,
              children: (
                <div className="h-full flex items-center px-4 lg:px-20">
                  <h1 className="text-6xl lg:text-8xl font-extrabold max-w-min text-primary-base">
                    Help Us
                    <br />
                    <span className="text-secondary-base">
                      Achieve Our Mission
                    </span>
                    <span className="text-accent-base">.</span>
                  </h1>
                </div>
              ),
            },
          ]}
          className="w-[100vw] h-[100vh]"
        />
      </div>
    </>
  )
}

export default HeroSection2
