import React, { useEffect, useState } from 'react'
import API from '@/axios'
import Image from 'next/image'

const MemberItem = ({ member }) => (
  <div className="w-full h-full">
    <div className="flex flex-col items-center h-full bg-white dark:bg-[#1f1f1f] border border-secondary-dark/[0.05] dark:border-white/[0.08] rounded-2xl shadow-md dark:shadow-xl p-6 transition-transform hover:scale-[1.03]">
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

function TopMembers() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get('/members/getTopThreeMembers')
        setMembers(res.data.members)
      } catch (error) {
        console.error('Failed to fetch members:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <section className="px-4 py-20 lg:px-20 bg-primary-base dark:bg-secondary-dark">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl text-secondary-dark dark:text-secondary-base">
          Meet Our <span className="text-accent-base">Top Members</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-10 pt-16 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <MemberItem key={member._id} member={member} />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="text-xl font-semibold tracking-wide transition-all text-secondary-dark dark:text-secondary-base hover:text-accent-base hover:scale-105"
          onClick={() => (window.location.href = '/client/about-us')}
        >
          Show More →
        </button>
      </div>
    </section>
  )
}

export default TopMembers
