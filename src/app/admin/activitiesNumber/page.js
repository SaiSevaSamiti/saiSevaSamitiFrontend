'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import API from '@/axios'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

function ActivitiesNumberPage() {
  const [activitiesNum, setActivitiesNum] = useState({})
  const { toast } = useToast()

  const UpdateActivitiesNumbers = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const happyPeople = formData.get('happyPeople')
    const offices = formData.get('offices')
    const staff = formData.get('staff')
    const volunteers = formData.get('volunteers')

    try {
      const res = await API.put('/activitiesNumber', {
        happyPeople,
        offices,
        staff,
        volunteers,
      })
      if (res.status === 200) {
        toast({
          title: 'Data Updated Successfully',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/activitiesNumber')
      const { actNumber } = await res.data

      setActivitiesNum(actNumber)
    }

    fetchData()
  }, [])

  return (
    <div className="px-16 py-8 dark:text-primary-base relative h-full">
      <div className="py-4">Activities Counter Details</div>
      <div className="">
        <Card className="">
          <CardContent className="p-4 bg-primary-dark/50 rounded-lg">
            <div>HappyPeople - {activitiesNum.happyPeople}</div>
            <div>Offices - {activitiesNum.offices}</div>
            <div>Staff - {activitiesNum.staff}</div>
            <div>Volunteers - {activitiesNum.volunteers}</div>
          </CardContent>
        </Card>
        <Sheet>
          <SheetTrigger className="border-2 border-secondary-dark dark:border-secondary-base p-4 rounded-lg absolute bottom-8 left-16">
            Update Data
          </SheetTrigger>
          <SheetContent className="bg-primary-base dark:bg-secondary-dark dark:text-primary-base">
            <SheetHeader>
              <SheetTitle className="pb-12">
                Update Activities Number
              </SheetTitle>
              <SheetDescription>
                <form
                  onSubmit={UpdateActivitiesNumbers}
                  className="flex flex-col gap-4"
                >
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="number"
                    name="happyPeople"
                    placeholder="Happy People"
                    required
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="number"
                    name="offices"
                    placeholder="Offices"
                    required
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="number"
                    name="staff"
                    placeholder="Staff"
                    required
                  />
                  <Input
                    className="dark:bg-primary-dark/20"
                    type="number"
                    name="volunteers"
                    placeholder="Voulunteers"
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
    </div>
  )
}

export default ActivitiesNumberPage
