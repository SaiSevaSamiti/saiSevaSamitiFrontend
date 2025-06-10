import API from '@/axios'
import React, { useEffect, useState } from 'react'
import { ParallaxBanner } from 'react-scroll-parallax'

// Lucide Icons
import { User, MapPin, Users, Handshake, Plus } from 'lucide-react'

function ActivitiesNumber() {
  const [activitiesNumber, setActivitiesNumber] = useState({})

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/activitiesNumber')
      const { actNumber } = res.data
      setActivitiesNumber(actNumber)
    }

    fetchData()
  }, [])

  const stats = [
    {
      icon: <User className="w-16 h-16" />,
      value: activitiesNumber.happyPeople,
      label: 'Happy People',
    },
    {
      icon: <MapPin className="w-16 h-16" />,
      value: activitiesNumber.offices,
      label: 'Offices',
    },
    {
      icon: <Users className="w-16 h-16" />,
      value: activitiesNumber.staff,
      label: 'Staff',
    },
    {
      icon: <Handshake className="w-16 h-16" />,
      value: activitiesNumber.volunteers,
      label: 'Volunteers',
    },
  ]

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
              <div className="w-full h-full py-20 bg-black/10 dark:bg-white/5">
                <div className="flex flex-col items-center justify-center h-full gap-10 px-4 py-10 lg:flex-row lg:gap-20">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center transition-all duration-300 group hover:scale-105"
                    >
                      <div className="mb-4 transition-transform text-accent-base group-hover:scale-110">
                        {stat.icon}
                      </div>
                      <div className="flex items-baseline text-4xl font-black tracking-wider text-secondary-dark dark:text-primary-base">
                        {stat.value ?? '—'}
                        <span>
                          <Plus />
                        </span>
                      </div>
                      <div className="mt-1 text-xl font-semibold tracking-wide text-secondary-dark dark:text-primary-base">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
        ]}
        className="h-[90vh] md:h-[500px] lg:h-[600px]"
      />
    </div>
  )
}

export default ActivitiesNumber
