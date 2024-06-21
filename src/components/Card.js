import React from 'react'

function Card({ title, content, icon, className, glow = true }) {
  return (
    <div
      className={` w-full p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base  rounded-lg ${
        glow
          ? 'relative before:absolute before:inset-0 before:bg-gradient-to-bl before:from-secondary-base before:to-primary-dark before:blur-[300px] before:-z-10'
          : ''
      } ${className}`}
    >
      <div className="h-full w-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg p-4 flex flex-col">
        <div className="flex justify-center p-8 text-secondary-dark dark:text-primary-base">
          {icon}
        </div>
        <div className="bg-gradient-to-bl from-primary-dark to-accent-base flex items-center justify-center text-3xl font-extrabold bg-clip-text text-transparent">
          {title}
        </div>
        <div className="h-full flex items-center justify-center text-justify p-4 font-semibold ">
          {content}
        </div>
      </div>
    </div>
  )
}

export default Card
