'use client'

import API from '@/axios'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const CampaignItem = ({ data }) => {
  return (
    <div className="relative w-full h-16 p-0.5 bg-gradient-to-bl from-primary-dark to-accent-base rounded-lg">
      <div className="h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg p-4 flex ">
        <div className="grow truncate">{data.name}</div>
        <div className="text-primary-base/[0.54] pl-12">
          {new Date(data.date).getFullYear()}
        </div>
      </div>
    </div>
  )
}

const FeaturedCampaign = ({ campaign }) => {
  return (
    <div className="relative w-full p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg">
      <div className="pulsing-shadow absolute inset-0 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg filter blur-lg"></div>
      <div className="relative h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg p-8 flex flex-col lg:flex-row">
        <div className="flex items-center justify-center">
          <Image
            src={campaign.image || '/images/image-not-available.jpg'}
            height={500}
            width={500}
            alt="dummy image"
            className="rounded-lg shadow-white shadow-sm w-[35vw]"
          />
        </div>
        <div className="flex flex-col text-left py-4 lg:py-0 lg:px-4">
          <h1 className="text-4xl font-bold">{campaign.name}</h1>
          <p className="">
            {campaign.description || 'No description available.'}
          </p>
        </div>
      </div>
    </div>
  )
}

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
    <div className="text-primary-base px-4 lg:px-20 py-8">
      <div className="">
        <div className=" flex flex-col lg:flex-row">
          <h1 className="text-6xl lg:text-7xl text-secondary-dark dark:text-secondary-base tracking-wide font-bold pb-4">
            Featured
          </h1>
          <h1 className="h-24 text-6xl lg:text-7xl font-bold bg-gradient-to-bl dark:bg-gradient-to-tr from-accent-base to-secondary-base bg-clip-text text-transparent mx-1 flex">
            Campaign<div className="text-secondary-base">.</div>
          </h1>
        </div>
        {featuredCampaign && <FeaturedCampaign campaign={featuredCampaign} />}
        <div>
          <div className="text-3xl font-bold pt-24 pb-8 text-secondary-dark dark:text-primary-base flex">
            Other Campaigns
          </div>
          <div className="flex flex-col gap-4">
            {campaignData.map((item) => (
              <CampaignItem key={item._id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignsPage
