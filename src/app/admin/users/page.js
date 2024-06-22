'use client'

import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import API from '@/axios'
import { useToast } from '@/components/ui/use-toast'

const ColDef = [
  {
    accessorKey: 'name',
    header: 'User Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
]

function UsersPage() {
  const [data, setData] = useState([])
  const { toast } = useToast()

  async function fetchData() {
    const res = await API.get('/users')
    const { users } = await res.data

    setData(users)
  }

  const createUser = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const name = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const res = await API.post('/users', {
        name,
        email,
        password,
      })

      if (res.status === 200) {
        toast({
          title: 'User Created Successfully',
        })
        setData((prev) => [...prev, res.data.user])
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: 'User with Email already Exists',
        })
      } else {
        toast({
          title: 'An error occurred',
          description:
            error.response?.data?.message || 'Please try again later',
        })
      }
    }
  }

  const removeUserFromState = (userId) => {
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex-1 h-full py-8 px-16 dark:text-primary-base relative">
      <div className="py-4 text-3xl">Admins</div>
      <DataTable
        columns={ColDef}
        data={data}
        removeUserFromState={removeUserFromState}
      />
      <Sheet>
        <SheetTrigger className="border-2 border-secondary-dark dark:border-secondary-base p-4 rounded-lg absolute bottom-8 left-16">
          Add New User
        </SheetTrigger>
        <SheetContent className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base">
          <SheetHeader>
            <SheetTitle className="pb-12">Enter User Details</SheetTitle>
            <SheetDescription>
              <form onSubmit={createUser} className="flex flex-col gap-4">
                <Input
                  className="dark:bg-primary-dark/20"
                  type="text"
                  name="username"
                  placeholder="User Name"
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
                  type="password"
                  name="password"
                  placeholder="password"
                  required
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

export default UsersPage
