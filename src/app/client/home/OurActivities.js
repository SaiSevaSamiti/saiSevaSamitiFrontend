import Card from '@/components/Card'
import AwarenessIcon from '@/svg/AwarenessIcon'
import FoodIcon from '@/svg/FoodIcon'
import MedicalIcon from '@/svg/MedicalIcon'
import React from 'react'

function OurActivities({ heading = true, glow = true }) {
  return (
    <div className="flex flex-col gap-12 items-center justify-center px-8 py-20 lg:px-20">
      <div
        className={
          !heading
            ? 'hidden'
            : 'text-4xl lg:text-7xl font-extrabold tracking-wider bg-gradient-to-tr from-accent-base to-secondary-dark dark:bg-gradient-to-tr dark:from-accent-base dark:to-primary-base bg-clip-text text-transparent pb-2 border-b-8 border-accent-base border-dotted border-opacity-65'
        }
      >
        Our Activities
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          title="Food Distribution"
          content="As part of our commitment to combat hunger, we organize regular food distribution drives in local communities and hospitals. Our dedicated volunteers collect and distribute nutritious meals to individuals and families who are struggling to meet their basic nutritional needs"
          icon={<FoodIcon />}
          glow={glow}
        />
        <Card
          title="Medical Assistance"
          content="We understand the importance of access to proper healthcare. Sai Seva Samithi collaborates with hospitals and medical professionals to offer essential medical assistance to those in need."
          icon={<MedicalIcon />}
          glow={glow}
        />
        <Card
          title="Awareness"
          content="In addition to direct assistance, we believe in the power of education and awareness to create long-lasting change. Sai Seva Samithi conducts workshops, seminars, and awareness campaigns on various health and social issues."
          icon={<AwarenessIcon />}
          glow={glow}
        />
      </div>
    </div>
  )
}

export default OurActivities
