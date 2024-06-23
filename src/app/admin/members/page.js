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
import React, { useEffect, useState } from 'react'
import convertToBase64 from '@/lib/convertToBase64'
import imageCompression from 'browser-image-compression'

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
    accessorKey: 'joiningDate',
    header: 'Joining Date',
  },
  {
    accessorKey: 'designation',
    header: 'Designation',
  },
  {
    accessorKey: 'isActive',
    header: 'Active',
  },
]

function MembersPage() {
  const { toast } = useToast()
  const [data, setData] = useState([])
  const [memberImage, setMemberImage] = useState({ myFile: '' })

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    })
    const base64 = await convertToBase64(compressedFile)
    setMemberImage({ ...memberImage, myFile: base64 })
  }

  const createNewMember = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const name = formData.get('name')
    const email = formData.get('email')
    const phone = formData.get('phone')
    const designation = formData.get('designation')
    const fbURL = formData.get('fbURL')
    const twitterURL = formData.get('twitterURL')
    const linkedinURL = formData.get('linkedinURL')
    const instagramURL = formData.get('instagramURL')
    const image = memberImage.myFile

    try {
      const res = await API.post('/members', {
        name,
        email,
        phone,
        designation,
        fbURL,
        twitterURL,
        linkedinURL,
        instagramURL,
        image,
      })

      if (res.status === 200) {
        toast({
          title: 'User Created Successfully',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get('/members')
        const { members } = res.data

        setData(members)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="dark:text-primary-base px-16 py-8 relative h-full">
      <div className="py-4">Members of Our Organisation</div>
      <DataTable columns={ColDef} data={data} />
      <Sheet>
        <SheetTrigger className="border-2 border-secondary-dark dark:border-secondary-base p-4 rounded-lg absolute bottom-8 left-16">
          Add New Member
        </SheetTrigger>
        <SheetContent className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base">
          <SheetHeader>
            <SheetTitle className="pb-4">Enter User Details</SheetTitle>
            <SheetDescription>
              <form onSubmit={createNewMember} className="flex flex-col gap-4">
                <Input
                  className="dark:bg-primary-dark/20"
                  id="picture"
                  type="file"
                  name="image"
                  placeholder="Profile Image"
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
                  name="designation"
                  placeholder="Designation"
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
  )
}

export default MembersPage
// Added member priority values
