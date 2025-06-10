'use client'

import API from '@/axios'
import Button from '@/components/Button'
import { useToast } from '@/components/ui/use-toast'
import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const ContactUsItem = ({ icon: Icon, title }) => (
  <div className="w-full lg:w-auto grow p-0.5 bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg">
    <div className="flex items-center gap-4 p-4 rounded-lg shadow-lg bg-primary-base dark:bg-secondary-dark text-secondary-dark dark:text-primary-base">
      <div className="p-3 text-white rounded-full shadow bg-gradient-to-tr from-primary-dark to-accent-base">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-xl font-semibold">{title}</div>
    </div>
  </div>
)

function ContactUsPage() {
  const { toast } = useToast()

  const submitForm = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    try {
      const res = await API.post('/contact-us', {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      })
      toast({
        title: res.status === 200 ? 'Success' : 'Error',
        description:
          res.status === 200
            ? 'Your message has been sent successfully.'
            : 'Something went wrong. Try again later.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An error occurred while sending your message.',
      })
    }
  }

  return (
    <div className="px-4 py-16 lg:px-20 bg-primary-base dark:bg-secondary-dark text-secondary-dark dark:text-primary-base">
      {/* Header */}
      <div className="space-y-4 text-center">
        <h1 className="text-5xl font-bold lg:text-6xl">
          Contact{' '}
          <span className="text-transparent bg-gradient-to-bl dark:bg-gradient-to-tr from-accent-base to-secondary-base bg-clip-text">
            Us
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-secondary-dark/80 dark:text-primary-base/70">
          Reach out to learn more about our work or how you can contribute.
          Together, we can make a real difference.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="py-12">
        <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
          <ContactUsItem icon={MapPin} title="Nagaur, Rajasthan" />
          <ContactUsItem icon={Mail} title="saisevasamiti.nagaur@gmail.com" />
          <ContactUsItem icon={Phone} title="+91 9876543210" />
        </div>
      </div>

      {/* Map and Form Section */}
      <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
        {/* Google Map */}
        <div className="w-full overflow-hidden rounded-lg shadow-md lg:w-1/2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56774.207058347034!2d73.68332233393394!3d27.20696737680514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396a9170adb7a653%3A0x6940f47129cdaa6e!2sNagaur%2C%20Rajasthan%20341001!5e0!3m2!1sen!2sin!4v1718101694882!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            className="border-0 rounded-lg"
          ></iframe>
        </div>

        {/* Form */}
        <div className="relative w-full p-6 border shadow-xl lg:w-1/2 rounded-xl bg-gradient-to-br from-secondary-base/40 to-primary-dark/30 dark:from-primary-dark/40 dark:to-secondary-base/20 backdrop-blur-md border-white/10">
          <div className="absolute -inset-[1px] rounded-xl z-[-1] bg-gradient-to-tr from-accent-base/30 to-primary-dark/20 blur-lg opacity-70"></div>

          <h2 className="mb-6 text-2xl font-semibold text-center lg:text-left">
            Send us a message
          </h2>
          <div>
            <p className="flex pb-2 text-lg font-bold tracking-wide text-justify text-secondary-dark dark:text-secondary-base">
              Please fill out the form below, and we will get back to you as
              soon as possible.
            </p>
            <p className="pb-8 text-xl font-bold tracking-wide text-justify text-secondary-dark dark:text-secondary-base lg:flex">
              We would love to hear from you!
            </p>
          </div>
          <form onSubmit={submitForm} className="space-y-4">
            <input
              name="name"
              placeholder="Name"
              className="w-full px-4 py-3 text-sm transition bg-white border rounded-lg border-secondary-base dark:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-base"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 text-sm transition bg-white border rounded-lg border-secondary-base dark:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-base"
              required
            />
            <input
              name="subject"
              placeholder="Subject"
              className="w-full px-4 py-3 text-sm transition bg-white border rounded-lg border-secondary-base dark:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-base"
              required
            />
            <textarea
              name="message"
              rows={6}
              placeholder="Message"
              className="w-full px-4 py-3 text-sm transition bg-white border rounded-lg resize-none border-secondary-base dark:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-base"
              required
            ></textarea>

            <Button text="Submit" type="submit" className="w-full" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage
