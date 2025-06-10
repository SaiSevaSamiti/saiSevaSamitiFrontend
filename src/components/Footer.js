'use client'

import Link from 'next/link'
import React from 'react'
import slugify from 'slugify'
import Button from './Button'
import API from '@/axios'
import { useToast } from './ui/use-toast'
import Image from 'next/image'

// Lucide React icons
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Youtube,
} from 'lucide-react'

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
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')

    try {
      const res = await API.post('/newsletter', { email })
      if (res.status === 200) {
        toast({ title: 'Subscribed Successfully' })
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while sending your message.',
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <footer className="w-full px-6 py-12 shadow-2xl bg-primary-dark text-primary-base lg:px-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl text-secondary-dark">
              Sai Seva Samiti<span className="text-primary-base">.</span>
            </h1>
            <div className="hidden mt-6 overflow-hidden border-4 rounded-full h-28 w-28 border-primary-base lg:block">
              <Image
                src="/images/logo-image.jpg"
                alt="Sai Seva Samiti Logo"
                width={112}
                height={112}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-4 text-xl font-bold tracking-wide">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={`/client/${slugify(link, { lower: true })}`}>
                    <div className="flex items-center gap-2 transition opacity-75 hover:opacity-100 hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                      <span className="font-medium">{link}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="mb-4 text-xl font-bold tracking-wide">
              Get in Touch
            </h2>
            <div className="flex flex-col justify-center space-y-3">
              <Link
                href="https://maps.app.goo.gl/UWa7egPUuGz5jSnv8"
                target="_blank"
              >
                <div className="flex items-center gap-2 transition opacity-75 hover:opacity-100">
                  <MapPin className="w-6 h-10" />
                  <span>Address</span>
                </div>
              </Link>
              <Link href="tel:+919460522700">
                <div className="flex items-center gap-2 transition opacity-75 hover:opacity-100">
                  <Phone className="w-6 h-10" />
                  <span>+91 94605 22700</span>
                </div>
              </Link>
              <div className="flex items-center gap-2 transition opacity-75 cursor-pointer hover:opacity-100">
                <Mail className="w-6 h-10" />
                <span>saisevasamiti.nagaur@gmail.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-4 mt-6">
              <Link href="https://wa.me/+919460522700" target="_blank">
                <div className="transition cursor-pointer hover:scale-110">
                  <MessageCircle className="w-10 h-10" />
                </div>
              </Link>
              <Link href="#" target="_blank">
                <div className="transition cursor-pointer hover:scale-110">
                  <Facebook className="w-10 h-10" />
                </div>
              </Link>
              <Link href="#" target="_blank">
                <div className="transition cursor-pointer hover:scale-110">
                  <Twitter className="w-10 h-10" />
                </div>
              </Link>
              <Link href="#" target="_blank">
                <div className="transition cursor-pointer hover:scale-110">
                  <Youtube className="w-10 h-10" />
                </div>
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="mb-4 text-xl font-bold tracking-wide">
              Join Our Newsletter
            </h2>
            <form
              onSubmit={handleNewsLetterForm}
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="px-4 py-2 border-2 rounded-xl border-primary-base bg-primary-base text-secondary-dark dark:text-primary-base dark:border-secondary-dark focus:outline-none focus:ring-2 focus:ring-accent-base/50"
              />
              <Button
                text="Subscribe"
                type="submit"
                outline
                className="flex items-center justify-center gap-2 transition duration-200 border-secondary-dark/75 text-secondary-dark bg-secondary-base/75 hover:bg-secondary-dark/75"
              />
            </form>
          </div>
        </div>
      </footer>

      {/* Subfooter */}
      <div className="py-3 text-sm font-semibold text-center bg-primary-base text-secondary-dark dark:bg-secondary-dark dark:text-primary-base">
        © {new Date().getFullYear()} Sai Seva Samiti. All rights reserved.
      </div>
    </>
  )
}

export default Footer
