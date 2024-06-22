'use client'

import API from '@/axios'
import Button from '@/components/Button'
import { useToast } from '@/components/ui/use-toast'
import React from 'react'

const ContactUsItem = () => {
  return (
    <div className="p-0.5 w-full lg:w-auto grow bg-gradient-to-tr from-primary-dark to-accent-base  rounded-lg">
      <div className="text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark rounded-lg p-4 flex ">
        <div className="p-0.5 w-16 h-16 bg-gradient-to-tr from-primary-dark to-accent-base rounded-full">
          <div className="h-16 w-16 rounded-full text-secondary-dark dark:text-primary-base bg-primary-base dark:bg-secondary-dark flex flex-col shadow-sm shadow-secondary-dark dark:shadow-primary-base">
            Logo
          </div>
        </div>
        <div className="pl-8 flex items-center justify-center font-extrabold text-3xl w-full">
          Address
        </div>
      </div>
    </div>
  )
}

function ContactUsPage() {
  const { toast } = useToast()
  const submitForm = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const subject = formData.get('subject')
    const message = formData.get('message')

    try {
      const res = await API.post('/contact-us', {
        name,
        email,
        subject,
        message,
      })
      if (res.status === 200) {
        toast({
          title: 'Success',
          description: 'Your message has been sent successfully.',
        })
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while sending your message.',
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An error occurred while sending your message.',
      })
    }
  }

  return (
    <div className="px-4 lg:px-20 pt-12">
      <div className="flex flex-col items-center">
        <div className="flex">
          <div className="text-6xl lg:text-7xl text-secondary-dark dark:text-secondary-base tracking-wide font-bold">
            Contact
          </div>
          <div className="h-24 text-6xl lg:text-7xl font-bold bg-gradient-to-bl dark:bg-gradient-to-tr from-accent-base to-secondary-base bg-clip-text text-transparent mx-4">
            Us
          </div>
        </div>
        <div className="mt-8 hidden lg:flex items-start text-xl font-semibold tracking-wide text-secondary-dark dark:text-primary-base text-center px-60">
          Get in touch with us to learn more about our initiatives and how you
          can contribute to our cause. Together, we can create a positive impact
          and make a difference.
        </div>
        <div className="mt-8 flex items-start lg:hidden text-xl font-semibold tracking-wide text-secondary-dark dark:text-primary-base text-center px-12">
          Get in touch with us to learn more about our initiatives.{' '}
        </div>
      </div>

      <div className="py-8">
        <div className="w-full bg-secondary-base/[0.30] lg:bg-secondary-base/[0.20] backdrop-blur-2xl rounded-lg shadow-lg shadow-secondary-dark">
          <div className="flex p-4 flex-col lg:flex-row gap-4 items-center justify-center">
            <ContactUsItem />
            <ContactUsItem />
            <ContactUsItem />
          </div>
        </div>
      </div>
      <div className="py-8 flex flex-col lg:flex-row gap-2">
        <div className="w-1/2 hidden lg:flex items-center justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56774.207058347034!2d73.68332233393394!3d27.20696737680514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396a9170adb7a653%3A0x6940f47129cdaa6e!2sNagaur%2C%20Rajasthan%20341001!5e0!3m2!1sen!2sin!4v1718101694882!5m2!1sen!2sin"
            width="650"
            height="645"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-md shadow-secondary-dark dark:shadow-primary-base"
          ></iframe>
        </div>
        <div className="w-full flex items-center justify-center lg:hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56774.207058347034!2d73.68332233393394!3d27.20696737680514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396a9170adb7a653%3A0x6940f47129cdaa6e!2sNagaur%2C%20Rajasthan%20341001!5e0!3m2!1sen!2sin!4v1718101694882!5m2!1sen!2sin"
            width="350"
            height="350"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-md shadow-secondary-dark dark:shadow-primary-base"
          ></iframe>
        </div>
        <div className="w-full lg:w-1/2 px-4 bg-secondary-base/[0.25] border-secondary-base shadow-sm shadow-secondary-dark dark:shadow-primary-base py-8 my-2 rounded-lg">
          <div className="text-xl font-bold tracking-wide text-secondary-dark dark:text-secondary-base hidden lg:flex text-justify">
            We would love to hear from you! Whether you have questions,
            suggestions, or want to get involved with Sai Seva Samiti.
          </div>
          <div className="text-lg font-bold tracking-wide text-secondary-dark dark:text-secondary-base flex text-justify pb-8">
            Please fill out the form below, and we will get back to you as soon
            as possible. Your feedback and inquiries are important to us.
          </div>
          <form onSubmit={submitForm}>
            <input
              className="w-full py-2 px-4 border-secondary-base shadow-sm shadow-secondary-dark dark:shadow-primary-base rounded-lg my-2 focus:ring-4 focus:ring-secondary-base focus:outline-none transition-all ease-in-out"
              type="text"
              name="name"
              placeholder="Name"
            />

            <input
              className="w-full py-2 px-4 border-secondary-base shadow-sm shadow-secondary-dark dark:shadow-primary-base rounded-lg my-2 focus:ring-4 focus:ring-secondary-base focus:outline-none transition-all ease-in-out"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="w-full py-2 px-4 border-secondary-base shadow-sm shadow-secondary-dark dark:shadow-primary-base rounded-lg my-2 focus:ring-4 focus:ring-secondary-base focus:outline-none transition-all ease-in-out"
              type="text"
              name="subject"
              placeholder="Subject"
            />

            <textarea
              className="w-full py-2 px-4 border-secondary-base shadow-sm shadow-secondary-dark dark:shadow-primary-base rounded-lg my-2 focus:ring-4 focus:ring-secondary-base focus:outline-none transition-all ease-in-out resize-none"
              type="text"
              name="message"
              placeholder="Message"
              cols={30}
              rows={8}
            />

            <Button text={'Submit'} type={'submit'} className={'w-full'} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
