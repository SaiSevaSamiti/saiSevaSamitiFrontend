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
    <div className="w-full min-h-screen px-4 py-12 lg:px-20 bg-primary-base dark:bg-secondary-dark text-secondary-dark dark:text-primary-base">
      <h1 className="mb-12 text-5xl font-extrabold tracking-tight text-center lg:text-6xl">
        Gallery
      </h1>

      {/* Gallery Grid */}
      <div className="grid max-w-screen-xl grid-cols-2 gap-4 mx-auto md:grid-cols-3 xl:grid-cols-4">
        {galleryImages.map((image, i) => (
          <div
            key={i}
            className={`relative aspect-square rounded-xl overflow-hidden shadow-sm cursor-pointer group transition-all duration-300 hover:scale-[1.015] ${
              i === 3 || i === 6 ? 'md:col-span-2' : ''
            }`}
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image.image || '/images/image-not-available.jpg'}
              alt="Gallery image"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl h-[80vh]">
            <Image
              src={selectedImage.image || '/images/image-not-available.jpg'}
              alt="Full screen image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-lg"
            />
            {/* Close Button Desktop */}
            <button
              className="absolute hidden px-4 py-2 font-semibold text-white bg-red-500 rounded md:block top-4 right-4 hover:bg-red-700"
              onClick={closeModal}
            >
              ✕ Close
            </button>
          </div>

          {/* Mobile Close Button */}
          <button
            className="fixed bottom-0 left-0 w-full py-4 text-lg font-bold text-white bg-red-600 md:hidden"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default GalleryPage
