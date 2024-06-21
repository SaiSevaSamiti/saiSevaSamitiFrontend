import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function KnowAbout() {
  return (
    <div className="py-32 px-4 lg:px-20 bg-primary-base dark:bg-secondary-dark">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full pb-20 lg:pb-0 lg:w-1/2">
          <div className="py-4">
            <h1 className="text-xl font-bold tracking-wide text-secondary-base  py-2">
              Know About Us
            </h1>
            <div className="font-semibold text-secondary-dark dark:text-primary-dark text-justify">
              Our vision is to build a world where every person has access to
              food, healthcare, and opportunities for a better future. Sai Seva
              Samithi envisions a society where compassion, empathy, and
              equality prevail, and where no one is marginalized or left behind.
            </div>
            <Link
              href={'/client/about'}
              className="text-primary-dark dark:text-primary-base hover:text-accent-base hover:scale-105 transition-all ease-in-out font-bold tracking-wide text-lg"
            >
              Read More
            </Link>
          </div>
          <div className="py-4">
            <h1 className="text-xl font-bold tracking-wide text-secondary-base py-2">
              Our Vision
            </h1>
            <div className="font-semibold text-secondary-dark dark:text-primary-dark text-justify">
              Our mission is to alleviate hunger, provide vital healthcare
              support, and empower individuals through education and awareness.
              Sai Seva Samithi is dedicated to creating a compassionate society
              where no one is left behind, and every individual has access to
              basic necessities and the opportunity to lead a healthy, dignified
              life.
            </div>
            <Link
              href={'/client/our-vision'}
              className="text-primary-dark dark:text-primary-base hover:text-accent-base hover:scale-105 transition-all ease-in-out font-bold tracking-wide text-lg"
            >
              Read More
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="before:absolute before:inset-0 before:right-0 before:bg-secondary -base  before:blur-3xl before:h-[250px] lg:before:h-[375px] before:-z-10 dark:before:bg-primary-base">
            <Image
              src="/images/know-about.jpg"
              height="550"
              width="550"
              alt="know-about-image"
              srcSet=""
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default KnowAbout
