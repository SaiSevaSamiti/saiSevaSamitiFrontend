'use client'

import React, { useEffect, useState } from 'react'
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
import { DataTable } from './data-table'
import imageCompression from 'browser-image-compression'

const ColDef = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
]
function CampaignsPage() {
  const { toast } = useToast()
  const [data, setData] = useState([])
  const [galleryImage, setGalleryImage] = useState({ myFile: '' })

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/campaigns')
      const { campaigns } = res.data
      setData(campaigns)
    }

    fetchData()
  }, [])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    })
    const base64 = await convertToBase64(compressedFile)
    setGalleryImage({ myFile: base64 })
  }

  const createCampaign = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const name = formData.get('name')
    const description = formData.get('description')
    const image = galleryImage.myFile

    try {
      const res = await API.post('/campaigns', {
        name,
        description,
        image,
      })
      if (res.status === 200) {
        toast({
          title: 'Success',
          description: 'Your campaign has been created successfully.',
        })
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while creating your campaign.',
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An error occurred while creating your campaign.',
      })
    }
  }

  return (
    <div className="px-16 py-8 dark:text-primary-base relative h-full">
      <div className="py-4">Campaigns conduced by Us</div>
      <div>
        <DataTable columns={ColDef} data={data} />
        <Sheet>
          <SheetTrigger className="border-2 border-secondary-dark dark:border-secondary-base p-4 rounded-lg absolute bottom-8 left-16">
            Add New Campaign
          </SheetTrigger>
          <SheetContent className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base">
            <SheetHeader>
              <SheetTitle className="pb-12">Enter Image Details</SheetTitle>
              <SheetDescription>
                <form onSubmit={createCampaign} className="flex flex-col gap-4">
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="file"
                    name="image"
                    placeholder="Campaign Image"
                    accept=".jpeg, .png, .jpg"
                    onChange={handleImageUpload}
                    required
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="text"
                    name="name"
                    placeholder="Name of Campaign"
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

export default CampaignsPage
