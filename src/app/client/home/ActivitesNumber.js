import API from '@/axios'
import GroupIcon from '@/svg/GroupIcon'
import LocationIcon from '@/svg/LocationIcon'
import PersonIcon from '@/svg/PersonIcon'
import VolunteerIcon from '@/svg/VolunteerIcon'
import React, { useEffect, useState } from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

function ActivitesNumber() {
  const [activitiesNumber, setActivitiesNumber] = useState({})

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/activitiesNumber')
      const { actNumber } = await res.data
      setActivitiesNumber(actNumber)
    }

    fetchData()
  }, [])

  return (
    <div className="bg-primary-base dark:bg-secondary-dark">
      <ParallaxBanner
        layers={[
          {
            image: '/images/brick-wall-dark.png',
            speed: -20,
            style: {
              filter: 'brightness(1.5)',
              backgroundSize: 'repeat',
            },
          },
          {
            speed: -1,
            children: (
              <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-32">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-secondary-base">
                    <PersonIcon />
                  </div>
                  <div className="text-3xl text-secondary-dark dark:text-primary-dark font-extrabold tracking-wider mt-4">
                    {activitiesNumber.happyPeople}
                  </div>
                  <div className="text-3xl text-secondary-dark dark:text-primary-dark font-extrabold tracking-wide mt-4 ">
                    Happy People
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-secondary-base">
                    <LocationIcon size="75px" />
                  </div>
                  <div className="text-3xl text-secondary-dark dark:text-primary-dark font-extrabold tracking-wider mt-4">
                    {activitiesNumber.offices}
                  </div>
                  <div className="text-3xl text-secondary-dark dark:text-primary-dark font-extrabold tracking-wider mt-4 ">
                    Offices
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-secondary-base">
                    <GroupIcon />
                  </div>
                  <div className="text-3xl text-secondary-dark dark:text-primary-dark font-extrabold tracking-wider mt-4">
                    {activitiesNumber.staff}
                  </div>
                  <div className="text-3xl text-secondary-dark dark:text-primary-dark font-extrabold tracking-wider mt-4 ">
                    Staff
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-secondary-base">
                    <VolunteerIcon />
                  </div>
                  <div className="text-3xl text-secondary-dark dark:text-primary-dark font-extrabold tracking-wider mt-4">
                    {activitiesNumber.volunteers}
                  </div>
                  <div className="text-3xl text-secondary-dark dark:text-primary-dark font-extrabold tracking-wider mt-4 ">
                    Volunteers
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        className="aspect-[0.7/2] lg:aspect-[2/1]"
      />
    </div>
  )
}

export default ActivitesNumber
