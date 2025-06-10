import React from 'react'

function Card({ title, content, icon, className = '', glow = true }) {
  return (
    <div
      className={`relative w-full p-[1px] rounded-2xl transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${
        glow
          ? 'bg-gradient-to-br from-primary-dark to-accent-base'
          : 'bg-primary-dark'
      } ${className}`}
    >
      {glow && (
        <div className="absolute inset-0 z-0 rounded-2xl blur-[120px] opacity-30 bg-gradient-to-tr from-secondary-base to-primary-dark" />
      )}

      <div className="relative z-10 flex flex-col w-full h-full p-6 shadow-md rounded-2xl bg-primary-base/70 dark:bg-secondary-dark/70 backdrop-blur-md text-secondary-dark dark:text-primary-base">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 p-3 shadow-inner sm:w-20 sm:h-20 rounded-xl bg-gradient-to-tr from-accent-base to-secondary-dark bg-opacity-20">
            {icon}
          </div>
        </div>

        <h3 className="mb-4 text-2xl font-extrabold text-center text-transparent sm:text-3xl bg-gradient-to-bl from-primary-dark to-accent-base bg-clip-text">
          {title}
        </h3>

        <p className="text-sm font-medium leading-relaxed text-justify sm:text-base">
          {content}
        </p>
      </div>
    </div>
  )
}

export default Card
