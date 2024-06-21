'use client'

import ArrowRightIcon from '@/svg/ArrowRightIcon'
import Link from 'next/link'
import React from 'react'
import slugify from 'slugify'
import Button from './Button'
import LocationIcon from '@/svg/LocationIcon'
import PhoneIcon from '@/svg/PhoneIcon'
import EmailIcon from '@/svg/EmailIcon'
import WhatsappIcon from '@/svg/WhatsappIcon'
import FacebookIcon from '@/svg/FacebookIcon'
import TwitterIcon from '@/svg/TwitterIcon'
import YoutubeIcon from '@/svg/YoutubeIcon'
import API from '@/axios'
import { useToast } from './ui/use-toast'
import Image from 'next/image'

function Footer() {
  const { toast } = useToast()
  const quickLinks = [
    'Home',
    'Gallery',
    'About Us',
    'Contact Us',
    'Campaigns',
    'Certificates',
  ]

  const handleNewsLetterForm = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const email = formData.get('email')

    try {
      const res = await API.post('/newsletter', { email })
      if (res.status === 200) {
        toast({
          title: 'Subscribed Successfully',
        })
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while sending your message.',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className=" w-full bg-primary-dark shadow-xl px-4 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="m-8 lg:m-0 max-w-min">
            <h1 className="text-6xl font-extrabold text-secondary-dark">
              Sai Seva Samiti
              <span className="text-primary-base">.</span>
            </h1>
          </div>

          <div className="h-40 w-40 hidden lg:flex items-center justify-center rounded-full">
            <Image
              src="/images/logo-image.jpg"
              alt="logo"
              height={100}
              width={100}
              className="w-full h-full rounded-full"
            />
          </div>

          <div className="m-8">
            <h1 className="text-primary-base font-bold tracking-wider text-xl py-4">
              Quick Links
            </h1>
            {quickLinks.map((element, index) => (
              <Link key={index} href={slugify(element, { lower: true })}>
                <div className="flex items-center font-semibold tracking-wide text-primary-base opacity-65 p-1 hover:scale-105 hover:text-primary-base hover:opacity-100 transition-all ease-in-out ">
                  <div className="px-1">
                    <ArrowRightIcon />
                  </div>
                  {element}
                </div>
              </Link>
            ))}
          </div>

          <div className="m-8">
            <h1 className="text-primary-base font-bold tracking-wider text-xl py-4">
              Get in Touch
            </h1>
            <div className="flex items-center font-semibold tracking-wide text-primary-base opacity-65 p-1 hover:scale-105 hover:text-primary-base hover:opacity-100 transition-all ease-in-out ">
              <h3 className="font-extrabold p-2">
                <LocationIcon />
              </h3>
              <p className="px-2"> Address </p>
            </div>
            <div className="flex items-center font-semibold tracking-wide text-primary-base opacity-65 p-1 hover:scale-105 hover:text-primary-base hover:opacity-100 transition-all ease-in-out ">
              <h3 className="font-extrabold p-2">
                <PhoneIcon />
              </h3>
              <p className="px-2"> +91 99887 76655 </p>
            </div>
            <div className="flex items-center font-semibold tracking-wide text-primary-base opacity-65 p-1 hover:scale-105 hover:text-primary-base hover:opacity-100 transition-all ease-in-out mb-4">
              <h3 className="font-extrabold p-2">
                <EmailIcon />
              </h3>
              <p className="px-2"> saisevasamiti.nagaur@gmail.com </p>
            </div>
            <div className="flex items-center justify-between font-semibold tracking-wide text-primary-base p-1">
              <div className="opacity-65 hover:scale-105 hover:text-primary-base hover:opacity-100 transition-all ease-in-out">
                <WhatsappIcon />
              </div>
              <div className="opacity-65 hover:scale-105 hover:text-primary-base hover:opacity-100 transition-all ease-in-out">
                <FacebookIcon />
              </div>
              <div className="opacity-65 hover:scale-105 hover:text-primary-base hover:opacity-100 transition-all ease-in-out">
                <TwitterIcon />
              </div>
              <div className="opacity-65 hover:scale-105 hover:text-primary-base hover:opacity-100 transition-all ease-in-out">
                <YoutubeIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="newsletter"
        className="bg-primary-base text-secondary-dark dark:bg-secondary-dark dark:text-primary-base font-semibold flex flex-col lg:flex-row items-center justify-center py-4"
      >
        SignUp for Our Newsletter
        <form
          onSubmit={handleNewsLetterForm}
          className="flex flex-col items-center lg:flex-row px-8 pt-2"
        >
          <input
            type="text"
            name="email"
            className="rounded-full mx-8 px-4 h-12 w-full lg:w-56 text-secondary-dark
            border-2 border-primary-dark dark:border-secondary-dark"
            placeholder="email@gmail.com"
            required
          />
          <Button
            text="Subscribe"
            type={'submit'}
            outline={true}
            className={'mt-4 lg:my-0'}
          />
        </form>
      </div>
    </>
  )
}

export default Footer
