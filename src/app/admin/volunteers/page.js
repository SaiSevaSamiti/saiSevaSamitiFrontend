'use client'

import API from '@/axios'
import { DataTable } from './data-table'
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
import { useToast } from '@/components/ui/use-toast'
import convertToBase64 from '@/lib/convertToBase64'
import React, { useEffect, useState } from 'react'
import imageCompression from 'browser-image-compression'
import { formDataToObject } from '@/lib/formDataObject'

const ColDef = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'showInList',
    header: 'Show In List',
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
  },
]

function VolunteersPage() {
  const { toast } = useToast()
  const [data, setData] = useState([])
  const [volunteerImage, setvolunteerImage] = useState({ myFile: '' })

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    })
    const base64 = await convertToBase64(compressedFile)
    setvolunteerImage({ ...volunteerImage, myFile: base64 })
  }

  const createVolunteer = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const volunteer = formDataToObject(formData)
    volunteer.image = volunteerImage.myFile

    try {
      const res = await API.post('/volunteers', volunteer)
      if (res.status === 200) {
        toast({
          title: 'Volunteer Created Successfully',
        })
        setData((prev) => [...prev, res.data.volunteer])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/volunteers')
        const { volunteers } = res.data
        setData(volunteers)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="dark:text-primary-base px-16 py-8 relative h-full">
      <div className="py-4">Volunteers of Our Organisation</div>
      <div>
        <DataTable columns={ColDef} data={data} />
        <Sheet>
          <SheetTrigger className="border-2 border-secondary-dark dark:border-secondary-base p-4 rounded-lg absolute bottom-8 left-16">
            Add Volunteer
          </SheetTrigger>
          <SheetContent className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base">
            <SheetHeader>
              <SheetTitle className="pb-4">Enter User Details</SheetTitle>
              <SheetDescription>
                <form
                  onSubmit={createVolunteer}
                  className="flex flex-col gap-4"
                >
                  <Input
                    className="dark:bg-primary-dark/20"
                    id="picture"
                    type="file"
                    name="image"
                    placeholder="Profile Image"
                    required
                    onChange={handleImageUpload}
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
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="tel"
                    name="phone"
                    placeholder="Phone No."
                    required
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="text"
                    name="role"
                    placeholder="Role"
                    required
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="text"
                    name="fbURL"
                    placeholder="Facebook URL"
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="text"
                    name="instaURL"
                    placeholder="Instagram URL"
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="text"
                    name="twitterURL"
                    placeholder="Twitter URL"
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="text"
                    name="linkedinURL"
                    placeholder="Linkedin URL"
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

export default VolunteersPage
