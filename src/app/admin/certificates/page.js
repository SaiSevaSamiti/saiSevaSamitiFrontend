'use client'

import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
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
import API from '@/axios'
import convertToBase64 from '@/lib/convertToBase64'
import imageCompression from 'browser-image-compression'

const ColDef = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'issuedBy',
    header: 'Issued By',
  },
]

function CertificatesPage() {
  const { toast } = useToast()
  const [data, setData] = useState([])
  const [certificateImage, setCertificateImage] = useState({ myFile: '' })

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/certificates')
      const { certificates } = res.data
      setData(certificates)
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
    setCertificateImage({ myFile: base64 })
  }

  const createCertificate = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get('name')
    const issuedBy = formData.get('issuedBy')

    try {
      const res = await API.post('/certificates', {
        name,
        issuedBy,
        image: certificateImage.myFile,
      })
      if (res.status === 200) {
        toast({
          title: 'Certificate Created Successfully',
        })
        setData((prevData) => [...prevData, res.data.certificate])
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while creating the certificate.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while creating the certificate.',
      })
    }
  }

  return (
    <div className="px-16 py-8 dark:text-primary-base relative h-full">
      <div className="py-4">Certifcates of Our Organisation</div>
      <div>
        <DataTable columns={ColDef} data={data} />
        <Sheet>
          <SheetTrigger className="border-2 border-secondary-dark dark:border-secondary-base p-4 rounded-lg absolute bottom-8 left-16">
            Add New Certificate
          </SheetTrigger>
          <SheetContent className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base">
            <SheetHeader>
              <SheetTitle className="pb-12">
                Enter Certificate Details
              </SheetTitle>
              <SheetDescription>
                <form
                  onSubmit={createCertificate}
                  className="flex flex-col gap-4"
                >
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
                    name="name"
                    placeholder="Name"
                    required
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="text"
                    name="issuedBy"
                    placeholder="Issued By"
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

export default CertificatesPage
