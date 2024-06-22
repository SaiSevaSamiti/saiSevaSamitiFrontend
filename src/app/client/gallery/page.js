'use client'

import API from '@/axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function GalleryPage() {
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [galleryImages, setGalleryImages] = useState([])

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedImage('')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/gallery')
        const { images } = res.data
        setGalleryImages(images)
      } catch (error) {
        console.error('Failed to fetch gallery images:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="px-4 lg:px-20 h-full w-full">
      <h1 className="text-6xl lg:text-7xl text-secondary-dark dark:text-secondary-base tracking-wide font-bold py-12">
        Gallery
      </h1>
      <div className="h-full w-full">
        <div className="grid auto-rows-[200px] lg:auto-rows-[384px] grid-cols-3 gap-4 pb-20">
          {galleryImages.map((image, i) => (
            <div
              key={i}
              className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 dark:bg-neutral-900 ${
                i === 3 || i === 6 ? 'col-span-2' : ''
              } text-secondary-dark dark:text-primary-base bg-gradient-to-tr from-accent-base to-secondary-base relative cursor-pointer`}
              onClick={() => handleImageClick(image)}
            >
              <div className="h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg p-4 flex flex-col overflow-hidden">
                <Image
                  src={image.image || '/images/image-not-available.jpg'}
                  alt={'Gallery image'}
                  className="p-2 rounded-xl"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center bg-black/[0.15] backdrop-blur-xl bg-opacity-100">
          <div className="relative w-full h-full max-w-full max-h-full m-auto">
            <Image
              src={selectedImage.image || '/images/image-not-available.jpg'}
              alt={'Full screen image'}
              layout="fill"
              objectFit="contain"
              className="max-w-full max-h-full"
            />
          </div>
          <button
            className="hidden md:block absolute top-0 right-0 m-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModal}
          >
            Close
          </button>
          {/* Mobile Close Button */}
          <div className="md:hidden fixed bottom-0 left-0 w-full">
            <button
              className="w-full h-20 bg-red-500 hover:bg-red-700 text-white font-bold py-2"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
