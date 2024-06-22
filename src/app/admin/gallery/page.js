'use client'

import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import API from '@/axios'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import convertToBase64 from '@/lib/convertToBase64'
import imageCompression from 'browser-image-compression'

const ColDef = [
  {
    accessorKey: 'imgTitle',
    header: 'Image Title',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
]

function GallaryPage() {
  const { toast } = useToast()
  const [data, setData] = useState([])
  const [galleryImage, setGalleryImage] = useState({ myFile: '' })

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get('/gallery')
        const { images } = res.data
        if (images) {
          setData(images)
        } else {
          console.error('No images found in the response')
        }
      } catch (error) {
        console.error('Error fetching gallery data:', error)
      }
    }

    fetchData()
  }, [])

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0]
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      })
      const base64 = await convertToBase64(compressedFile)
      setGalleryImage({ myFile: base64 })
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const uploadImage = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const imgTitle = formData.get('imgTitle')
    const description = formData.get('description')

    if (!imgTitle || !galleryImage.myFile) {
      toast({
        title: 'Error',
        description: 'Please provide a title and an image.',
        status: 'error',
      })
      return
    }

    try {
      const res = await API.post('/gallery', {
        imgTitle,
        description,
        image: galleryImage.myFile,
      })

      if (res.status === 200) {
        toast({
          title: 'Image Uploaded Successfully',
          description: 'Your image has been uploaded successfully.',
          status: 'success',
        })
        // TODO: it is not setting the data properly
        // setData((prevData) => [...prevData, res.data.uploadedImg])
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while uploading the image.',
          status: 'error',
        })
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: 'Error',
        description: 'An error occurred while uploading the image.',
        status: 'error',
      })
    }
  }

  return (
    <div className="px-16 py-8 dark:text-primary-base relative h-full">
      <div>GallaryPage</div>
      <div>
        <DataTable columns={ColDef} data={data} />
        <Sheet>
          <SheetTrigger className="border-2 border-secondary-dark dark:border-secondary-base p-4 rounded-lg absolute bottom-8 left-16">
            Add New Image
          </SheetTrigger>
          <SheetContent className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base">
            <SheetHeader>
              <SheetTitle className="pb-12">Enter Image Details</SheetTitle>
              <SheetDescription>
                <form onSubmit={uploadImage} className="flex flex-col gap-4">
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="file"
                    name="image"
                    placeholder="Certificate Image"
                    accept=".jpeg, .png, .jpg"
                    onChange={handleImageUpload}
                    required
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="text"
                    name="imgTitle"
                    placeholder="Image Title"
                    required
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="text"
                    name="description"
                    placeholder="Description"
                  />
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default GallaryPage
