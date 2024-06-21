import API from '@/axios'
import VolunteerCard from '@/components/VolunteerCard'
import React, { useEffect, useState } from 'react'

function Volunteers() {
  const [volunteer, setVolunteer] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/volunteers/3')
      const { volunteers } = res.data
      setVolunteer(volunteers)
    }
    fetchData()
  }, [])

  console.log(volunteer)

  return (
    <div className="px-4 lg:px-20">
      <div className="py-20">
        <h1 className="text-6xl lg:text-7xl text-secondary-dark dark:text-secondary-base tracking-wide font-bold">
          Meet Our <span className="text-accent-base">Volunteers</span>
        </h1>
        <div className="pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteer.map((volunteer) => (
            <VolunteerCard key={volunteer._id} volunteer={volunteer} />
          ))}
        </div>
        <div className="flex justify-end text-secondary-dark dark:text-secondary-base hover:text-accent-base font-semibold tracking-wide">
          <h1 className="hover:scale-105 transition-all ease-in-out text-xl cursor-pointer mx-2">
            Show More
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Volunteers
