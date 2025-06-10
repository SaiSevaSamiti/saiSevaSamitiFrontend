import Image from 'next/image'
import React from 'react'

function VolunteerCard({ volunteer }) {
  return (
    <div className="aspect-[1/1] w-full rounded-2xl bg-gradient-to-tr from-primary-dark to-accent-base p-[2px] transition-transform duration-300 group hover:scale-105 shadow-lg">
      <div className="relative w-full h-full overflow-hidden rounded-2xl bg-primary-base dark:bg-secondary-dark">
        <Image
          src={volunteer.image || '/images/volunteer-image.jpg'}
          width={500}
          height={500}
          alt={`${volunteer.name}'s photo`}
          className="object-cover w-full h-full transition-transform duration-300 transform rounded-2xl group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 flex flex-col items-center w-full h-16 px-4 py-3 overflow-hidden transition-all duration-300 ease-in-out group-hover:h-20 bg-gradient-to-br from-secondary-dark/60 to-accent-base/60 backdrop-blur-md text-primary-base dark:text-primary-base rounded-b-2xl">
          <h1 className="text-lg font-bold tracking-wide sm:text-xl">
            {volunteer.name}
          </h1>
          <p className="mt-1 text-sm transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            {volunteer.role}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VolunteerCard
