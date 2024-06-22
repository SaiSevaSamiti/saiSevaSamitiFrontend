'use client'

import React, { useEffect, useRef, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Card from '@/components/Card'
import API from '@/axios'
import Image from 'next/image'

function CertificatesPage() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get('/certificates')
      const { certificates } = await res.data

      setCertificates(certificates)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full h-full px-4 lg:px-20 text-secondary-dark dark:text-primary-base py-10">
      <div className="text-6xl lg:text-7xl text-secondary-dark dark:text-secondary-base tracking-wide font-bold pb-4 flex flex-col lg:flex-row">
        <div>Our</div>
        <div className="mx-2 bg-gradient-to-tr from-accent-base to-primary-dark bg-clip-text text-transparent">
          Certificates
        </div>
      </div>
      <div className="flex justify-center">
        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-4xl"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{
            align: 'center',
            loop: true,
          }}
        >
          <CarouselContent>
            {certificates.map((certificate, index) => (
              <CarouselItem key={index} className="w-full h-full py-10">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="bg-gradient-to-tr from-accent-base to-primary-dark p-0.5 rounded-lg">
                    <div>
                      <Image
                        src={
                          certificate.image || '/images/image-not-available.jpg'
                        }
                        alt="certificate"
                        width={500}
                        height={500}
                        className="rounded-lg p-1"
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

export default CertificatesPage
