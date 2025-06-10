import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function KnowAbout() {
  return (
    <section className="relative px-4 py-20 bg-primary-base dark:bg-secondary-dark lg:px-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Text Section */}
        <div className="space-y-10">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-secondary-base">
              Know About Us
            </h2>
            <p className="text-lg font-medium leading-relaxed text-justify text-secondary-dark dark:text-primary-dark">
              Our vision is to build a world where every person has access to
              food, healthcare, and opportunities for a better future. Sai Seva
              Samithi envisions a society where compassion, empathy, and
              equality prevail, and where no one is marginalized or left behind.
            </p>
            <Link
              href="/client/about"
              className="inline-block mt-4 font-semibold tracking-wide transition-transform text-primary-dark dark:text-primary-base hover:text-accent-base hover:scale-105"
            >
              Read More →
            </Link>
          </div>

          <div>
            <h2 className="mb-2 text-2xl font-bold text-secondary-base">
              Our Vision
            </h2>
            <p className="text-lg font-medium leading-relaxed text-justify text-secondary-dark dark:text-primary-dark">
              Our mission is to alleviate hunger, provide vital healthcare
              support, and empower individuals through education and awareness.
              Sai Seva Samithi is dedicated to creating a compassionate society
              where no one is left behind, and every individual has access to
              basic necessities and the opportunity to lead a healthy, dignified
              life.
            </p>
            <Link
              href="/client/our-vision"
              className="inline-block mt-4 font-semibold tracking-wide transition-transform text-primary-dark dark:text-primary-base hover:text-accent-base hover:scale-105"
            >
              Read More →
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full max-w-[550px] mx-auto">
          <div className="absolute inset-0 z-[-1] blur-3xl bg-gradient-to-br from-secondary-base/20 to-accent-base/10 rounded-xl" />
          <Image
            src="/images/know-about.jpg"
            alt="know-about-image"
            height={550}
            width={550}
            className="rounded-xl shadow-lg transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  )
}

export default KnowAbout
