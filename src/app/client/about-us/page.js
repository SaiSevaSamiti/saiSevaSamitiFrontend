'use client'

import React, { useEffect, useState } from 'react'
import OurActivities from '../home/OurActivities'
import Image from 'next/image'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import API from '@/axios'

const MemberItem = ({ member }) => {
  return (
    <div className="text-secondary-dark dark:text-primary-base my-8 px-12 lg:px-0">
      <div className="h-full relative w-full p-0.5 bg-gradient-to-bl from-primary-dark to-accent-base rounded-lg">
        <div className="h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg p-4 flex flex-col lg:flex-row lg:items-center">
          <div className="flex justify-center">
            <Image
              src={member.image || '/images/image-not-available.jpg'}
              alt={member.name}
              width={150}
              height={150}
              className="rounded-full lg:rounded-lg"
            />
          </div>
          <div className="flex flex-col lg:pl-8 items-start">
            <div className="text-3xl">{member.name}</div>
            <div className="text-secondary-dark/[0.54] dark:text-primary-base/[0.25]">
              {member.designation}
            </div>
            <div>{member.email}</div>
            <div>{member.phone}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AboutUsPage() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/members')
        const { members } = res.data

        setMembers(members)
      } catch (error) {
        console.error('Failed to fetch members:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <div className="px-4 lg:px-20 pt-12 ">
        <div className="flex flex-col items-center">
          <div className="flex">
            <div className="text-6xl lg:text-7xl text-secondary-dark dark:text-secondary-base tracking-wide font-bold">
              About
            </div>
            <div className="h-24 text-6xl lg:text-7xl font-bold bg-gradient-to-bl dark:bg-gradient-to-tr from-accent-base to-secondary-base bg-clip-text text-transparent mx-4">
              Us
            </div>
          </div>
          <div className="mt-12 flex flex-col items-start lg:items-center">
            <div className="text-2xl font-semibold text-secondary-dark dark:text-primary-base">
              {' '}
              What are we doing
            </div>
            <div className="text-3xl lg:text-5xl font-bold tracking-wide bg-gradient-to-bl from-secondary-dark to-accent-base bg-clip-text text-transparent">
              We are in a Mission To
            </div>
            <div className="text-3xl lg:text-5xl font-bold tracking-wide text-secondary-dark dark:text-secondary-base">
              Help the Helpless
            </div>
          </div>
          <div>
            <OurActivities heading={false} glow={false} />
          </div>
        </div>
        <div>
          <div className="flex flex-col lg:flex-row">
            <div className="text-5xl font-bold tracking-wide text-secondary-base">
              Founders
            </div>
            <div className="text-5xl font-bold tracking-wide h-16 bg-gradient-to-tr from-accent-base to-secondary-base bg-clip-text text-transparent lg:ml-4">
              Message
            </div>
          </div>
          <div className="h-96 mt-8 mb-12 bg-gradient-to-tl from-secondary-base/[0.34] to-accent-base/[0.34] backdrop-blur-2xl brightness-100 rounded-lg dark:text-primary-base">
            Message
          </div>
        </div>
        <div>
          <div className="font-bold tracking-wide text-secondary-base pb-8">
            <div className="text-4xl lg:text-7xl">Our Members</div>
            {members?.map((member, index) => (
              <MemberItem key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pb-8 px-20 dark:text-secondary-base">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                className={
                  'bg-primary-dark/[0.54] dark:bg-secondary-base/[0.25] mx-4 hover:bg-secondary-base dark:hover:bg-secondary-base/[0.50]'
                }
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                className="border-secondary-dark dark:border-secondary-base border-2 rounded-lg hover:bg-secondary-base/[0.54] dark:hover:bg-secondary-base/[0.54]"
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                className={
                  'bg-primary-dark/[0.54] dark:bg-primary-dark/[0.25] mx-4 hover:bg-secondary-base dark:hover:bg-secondary-base/[0.50]'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* <div className="px-0">
        <Volunteers />
      </div> */}
    </>
  )
}

export default AboutUsPage
