import Card from '@/components/Card'
import AwarenessIcon from '@/svg/AwarenessIcon'
import FoodIcon from '@/svg/FoodIcon'
import MedicalIcon from '@/svg/MedicalIcon'
import React from 'react'

function OurActivities({ heading = true, glow = true }) {
  return (
    <section className="flex flex-col items-center justify-center gap-16 px-6 py-20 bg-transparent lg:px-24">
      {heading && (
        <h2 className="pb-3 text-4xl font-extrabold tracking-wide text-center text-transparent border-b-4 border-dotted sm:text-5xl lg:text-6xl bg-gradient-to-tr from-accent-base to-secondary-dark dark:from-accent-base dark:to-primary-base bg-clip-text sm:border-b-8 border-accent-base border-opacity-60">
          Our Activities
        </h2>
      )}

      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl">
        <Card
          title="Food Distribution"
          content="To combat hunger, we regularly organize food drives for local communities and hospitals. Our volunteers ensure nutritious meals reach individuals and families in need."
          icon={
            <IconWrapper>
              <FoodIcon />
            </IconWrapper>
          }
          glow={glow}
        />
        <Card
          title="Medical Assistance"
          content="We collaborate with healthcare providers to offer medical assistance to the underprivileged, ensuring access to essential health services."
          icon={
            <IconWrapper>
              <MedicalIcon />
            </IconWrapper>
          }
          glow={glow}
        />
        <Card
          title="Awareness"
          content="We empower communities through awareness campaigns, seminars, and workshops on vital health and social issues for lasting impact."
          icon={
            <IconWrapper>
              <AwarenessIcon />
            </IconWrapper>
          }
          glow={glow}
        />
      </div>
    </section>
  )
}

const IconWrapper = ({ children }) => (
  <div className="flex items-center justify-center w-16 h-16 p-3 shadow-lg sm:w-20 sm:h-20 rounded-xl text-primary-base bg-gradient-to-tr from-accent-base to-secondary-dark bg-opacity-10 backdrop-blur-md">
    {children}
  </div>
)

export default OurActivities
