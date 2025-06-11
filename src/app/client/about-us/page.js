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
import Volunteers from '../home/Volunteers'

const MemberItem = ({ member }) => (
  <div className="w-full p-4 sm:w-1/2 lg:w-1/3">
    <div className="flex flex-col items-center bg-white dark:bg-[#1f1f1f] border border-secondary-dark/[0.05] dark:border-white/[0.08] rounded-2xl shadow-md dark:shadow-xl p-6 transition-transform hover:scale-[1.03]">
      <Image
        src={member.image || '/images/image-not-available.jpg'}
        alt={member.name}
        width={120}
        height={120}
        className="object-cover rounded-full"
      />
      <div className="mt-4 space-y-1 text-center text-secondary-dark dark:text-primary-base">
        <div className="text-xl font-bold">{member.name}</div>
        <div className="text-secondary-dark/[0.6] dark:text-primary-base/[0.6]">
          {member.designation}
        </div>
        <div className="font-medium">{member.email}</div>
        <div className="font-medium">{member.phone}</div>
      </div>
    </div>
  </div>
)

export default function AboutUsPage() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    API.get('/members')
      .then((res) =>
        setMembers(res.data.members.sort((a, b) => a.priority - b.priority))
      )
      .catch(console.error)
  }, [])

  return (
    <main className="bg-primary-base dark:bg-secondary-dark">
      {/* Hero */}
      <section className="relative px-4 pt-12 pb-20 overflow-hidden text-center lg:px-20 bg-white/5 dark:bg-black/10">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-accent-base/20 via-secondary-base/20 to-transparent dark:from-accent-base/40 dark:via-secondary-base/40 dark:to-secondary-dark/10 backdrop-blur-sm" />
        </div>

        <h1 className="relative z-10 flex justify-center text-6xl font-bold lg:text-7xl text-secondary-dark dark:text-secondary-base">
          <span>About&nbsp;</span>
          <span className="text-transparent bg-gradient-to-bl from-accent-base to-secondary-base bg-clip-text">
            Us
          </span>
        </h1>
        <div className="relative z-10 mt-12 space-y-4 lg:space-y-8">
          <div className="text-2xl font-semibold text-secondary-dark dark:text-primary-base">
            What Are We Doing
          </div>
          <div className="text-3xl font-bold tracking-wide text-transparent lg:text-5xl bg-gradient-to-bl from-secondary-dark to-accent-base bg-clip-text">
            We Are On A Mission To
          </div>
          <div className="text-3xl font-bold tracking-wide lg:text-5xl text-secondary-dark dark:text-secondary-base">
            Help the Helpless
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="px-4 mb-20 lg:px-20">
        <OurActivities heading={false} glow={false} />
      </section>

      {/* Founders Message */}
      <section className="px-4 mb-20 lg:px-20">
        <h2 className="flex flex-wrap mb-8 text-5xl font-bold tracking-wide lg:text-6xl">
          <span className="text-secondary-base">Founders</span>
          <span className="ml-4 text-transparent bg-gradient-to-tr from-accent-base to-secondary-base bg-clip-text">
            Message
          </span>
        </h2>
        <div className="relative h-auto lg:h-96 bg-secondary-base/[0.25] dark:bg-secondary-base/[0.15] backdrop-blur-lg rounded-2xl p-8 lg:p-20 shadow-inner flex items-center justify-center text-center">
          <p className="text-lg font-medium lg:text-xl text-secondary-dark dark:text-primary-base">
            “Our commitment guides every action, every volunteer, and every life
            we touch.”
          </p>
        </div>
      </section>

      {/* Members */}
      <section className="px-4 mb-12 lg:px-20">
        <h3 className="mb-8 text-4xl font-bold tracking-wide lg:text-6xl text-secondary-base">
          Our Members
        </h3>
        <div className="flex flex-wrap -mx-4">
          {members.map((m) => (
            <MemberItem member={m} key={m._id} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          {/* <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="bg-primary-dark/[0.54] hover:bg-secondary-base dark:bg-secondary-base/[0.25] mx-2"
                  href="#"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className="border-2 border-secondary-dark hover:bg-secondary-base/[0.54] dark:border-secondary-base"
                  href="#"
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="bg-primary-dark/[0.54] hover:bg-secondary-base dark:bg-secondary-dark/[0.25] mx-2"
                  href="#"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </div>
      </section>
      <Volunteers />
    </main>
  )
}
