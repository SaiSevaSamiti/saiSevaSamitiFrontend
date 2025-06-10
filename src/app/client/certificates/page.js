'use client'

import React, { useEffect, useRef, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import API from '@/axios'
import Image from 'next/image'
import { BadgeCheck } from 'lucide-react'

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
    <div className="w-full h-full px-4 py-16 lg:px-20 text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark">
      {/* Section Title */}
      <div className="flex flex-col items-center justify-center mb-10 text-center">
        <div className="flex items-center gap-3">
          <BadgeCheck className="w-10 h-10 text-accent-base" />
          <h1 className="text-5xl font-bold tracking-tight lg:text-6xl text-secondary-dark dark:text-secondary-base">
            Our{' '}
            <span className="text-transparent bg-gradient-to-tr from-accent-base to-primary-dark bg-clip-text">
              Certificates
            </span>
          </h1>
        </div>
        <p className="mt-4 text-lg text-secondary-dark/70 dark:text-primary-base/70">
          Honoring the moments that matter.
        </p>
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          opts={{ align: 'center', loop: true }}
          className="w-full max-w-5xl"
        >
          <CarouselContent>
            {certificates.map((certificate, index) => (
              <CarouselItem key={index} className="w-full h-full py-10">
                <div className="flex items-center justify-center w-full h-full">
                  <div className="bg-gradient-to-tr from-accent-base to-primary-dark p-0.5 rounded-lg">
                    <div>
                      <Image
                        src={
                          certificate.image || '/images/image-not-available.jpg'
                        }
                        alt="certificate"
                        width={500}
                        height={500}
                        className="p-1 rounded-lg"
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
