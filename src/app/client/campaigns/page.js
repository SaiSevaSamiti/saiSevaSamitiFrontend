'use client'

import API from '@/axios'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { CalendarDays } from 'lucide-react'
import { ImageOff } from 'lucide-react'

const CampaignItem = ({ data }) => (
  <div className="relative w-full h-20 p-[2px] bg-gradient-to-bl from-primary-dark to-accent-base rounded-xl shadow-md transition hover:scale-[1.01]">
    <div className="flex items-center justify-between h-full px-5 py-4 rounded-xl bg-primary-base dark:bg-secondary-dark text-secondary-dark dark:text-primary-base">
      <span className="text-lg font-semibold truncate">{data.name}</span>
      <span className="flex items-center gap-1 text-sm text-secondary-dark/75 dark:text-primary-base/75">
        <CalendarDays size={18} />
        {new Date(data.date).getFullYear()}
      </span>
    </div>
  </div>
)

const FeaturedCampaign = ({ campaign }) => (
  <div className="relative w-full p-[2px] bg-gradient-to-tr from-primary-dark to-accent-base rounded-2xl shadow-lg">
    <div className="relative z-10 flex flex-col overflow-hidden lg:flex-row bg-primary-base dark:bg-secondary-dark rounded-2xl">
      <div className="relative w-full lg:w-[40%] h-64 lg:h-auto">
        {campaign.image ? (
          <Image
            src={campaign.image}
            cover
            className="object-cover w-full h-full"
            width={500}
            height={500}
            alt="campaign image"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-100 dark:bg-secondary-dark">
            <ImageOff size={40} />
          </div>
        )}
      </div>
      <div className="p-6 lg:p-10 flex flex-col justify-center text-left gap-4 w-full lg:w-[60%]">
        <h2 className="text-3xl font-bold tracking-tight lg:text-5xl text-secondary-dark dark:text-primary-base">
          {campaign.name}
        </h2>
        <p className="text-lg text-secondary-dark/80 dark:text-primary-base/80">
          {campaign.description || 'No description available.'}
        </p>
      </div>
    </div>
  </div>
)
function CampaignsPage() {
  const [campaignData, setCampaignData] = useState([])
  const [featuredCampaign, setFeaturedCampaign] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/campaigns')
      const { campaigns } = res.data

      if (campaigns.length > 0) {
        setFeaturedCampaign(campaigns[0])
        setCampaignData(campaigns.slice(1))
      } else {
        setCampaignData([])
      }
    }

    fetchData()
  }, [])

  return (
    <div className="px-4 py-12 space-y-16 lg:px-20 text-primary-base">
      <div className="space-y-4">
        <div className="flex flex-wrap items-end gap-x-2">
          <h1 className="pb-4 text-6xl font-bold tracking-wide lg:text-7xl text-secondary-dark dark:text-secondary-base">
            Featured
          </h1>
          <span className="pb-4 text-6xl font-bold text-transparent lg:text-7xl bg-gradient-to-bl from-accent-base to-secondary-base bg-clip-text">
            Campaign
          </span>
        </div>
        {featuredCampaign && <FeaturedCampaign campaign={featuredCampaign} />}
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-secondary-dark dark:text-primary-base">
          Other Campaigns
        </h2>
        <div className="flex flex-col gap-4">
          {campaignData.map((item) => (
            <CampaignItem key={item._id} data={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CampaignsPage
