'use client'

import React from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import HeroSection from './HeroSection'
import OurActivities from './OurActivities'
import KnowAbout from './KnowAbout'
import HeroSection2 from './HeroSection2'
import ActivitesNumber from './ActivitesNumber'
import HeroSection3 from './HeroSection3'
import TopMembers from '../about-us/TopMembers'

function HomePage() {
  return (
    <>
      <ParallaxProvider>
        <HeroSection />
        <OurActivities />
        <ActivitesNumber />
        <KnowAbout />
        <HeroSection2 />
        <TopMembers />
        <HeroSection3 />
      </ParallaxProvider>
    </>
  )
}

export default HomePage
