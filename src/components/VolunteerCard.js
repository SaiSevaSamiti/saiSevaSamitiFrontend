import Image from 'next/image'
import React from 'react'

function VolunteerCard({ volunteer }) {
  return (
    <div className="aspect-[1/1] w-full p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base  rounded-lg group hover:scale-105 transition-all ease-in-out">
      <div className="h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg flex flex-col relative transition-all ease-in-out p-1">
        <Image
          src={`${volunteer.image}` || '/images/volunteer-image.jpg'}
          width={500}
          height={500}
          objectFit="contain"
          alt=""
          className="rounded-lg h-full"
        />
        <div className="absolute bottom-0 left-0 h-12 w-full flex flex-col  justify-center bg-gradient-to-br from-secondary-dark/[0.54] to-accent-base/[0.54] backdrop-blur-lg rounded-bl-lg rounded-br-lg group-hover:h-36 transition-all ease-in-out p-4">
          <h1 className="text-xl font-semibold tracking-wide">
            {volunteer.name}
          </h1>
          <div className="hidden group-hover:block transtion-all ease-in-out">
            {volunteer.role}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VolunteerCard
