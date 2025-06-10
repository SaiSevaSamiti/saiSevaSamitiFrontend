import React, { useEffect, useState } from 'react'
import API from '@/axios'
import VolunteerCard from '@/components/VolunteerCard'

function Volunteers() {
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/volunteers/3')
      setVolunteers(res.data.volunteers)
    }

    fetchData()
  }, [])

  return (
    <section className="px-4 py-20 lg:px-20 bg-primary-base dark:bg-secondary-dark">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl text-secondary-dark dark:text-secondary-base">
          Meet Our <span className="text-accent-base">Volunteers</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-10 pt-16 pb-12 md:grid-cols-2 lg:grid-cols-3">
        {volunteers.map((vol) => (
          <VolunteerCard key={vol._id} volunteer={vol} />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="text-xl font-semibold tracking-wide transition-all text-secondary-dark dark:text-secondary-base hover:text-accent-base hover:scale-105"
          onClick={() => (window.location.href = '/client/volunteers')}
        >
          Show More →
        </button>
      </div>
    </section>
  )
}

export default Volunteers
