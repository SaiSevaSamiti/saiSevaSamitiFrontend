'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DonationForm from './DonationForm'
import API from '@/axios'

const DonatorItem = ({ donator }) => {
  return (
    <div className="bg-gradient-to-tr from-primary-dark to-accent-base p-[1px] rounded-xl my-3">
      <div className="flex items-center justify-between p-4 shadow-md bg-primary-base dark:bg-secondary-dark rounded-xl">
        <div>
          <div className="text-lg font-semibold text-secondary-dark dark:text-secondary-base">
            {donator.name}
          </div>
          <div className="text-sm text-secondary-dark/70 dark:text-secondary-base/70">
            ₹{donator.amount} /-
          </div>
        </div>
        <div className="text-sm text-secondary-dark/70 dark:text-secondary-base/70">
          {new Date(donator.date).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}

function DonatePage() {
  const [donatorsList, setDonatorsList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get('/donate/verified')
      setDonatorsList(res.data.donators || [])
    }
    fetchData()
  }, [])

  return (
    <div className="dark:text-primary-base text-secondary-dark">
      {/* Hero Section */}
      <div className="px-4 py-12 text-center lg:px-20">
        <h1 className="mb-4 text-5xl font-extrabold tracking-wide">
          Support Our Mission
        </h1>
        <p className="max-w-3xl mx-auto text-lg">
          Your contribution helps us serve the community and carry out impactful
          projects. Every donation counts. Choose how you would like to donate
          below.
        </p>
      </div>

      {/* Donation Methods + Info */}
      <div className="grid grid-cols-1 gap-8 px-4 lg:grid-cols-3 lg:px-20">
        {/* Left: Image & Info */}
        <div className="col-span-1">
          <div className="bg-gradient-to-tr from-primary-dark to-accent-base rounded-xl p-[2px]">
            <div className="overflow-hidden bg-primary-base dark:bg-secondary-dark rounded-xl">
              <Image
                src="/images/donate-now.jpg"
                alt="Donate Image"
                width={450}
                height={300}
                className="object-cover w-full h-auto rounded-t-xl"
              />
              <div className="p-6 text-base text-justify">
                <h3 className="mb-2 text-xl font-semibold text-center">
                  We are Proudly Non-Profit
                </h3>
                At Sai Seva Samiti, our mission is to create positive change in
                the world. Every rupee we receive goes directly into helping
                communities and supporting those in need. We are committed to
                transparency and social impact.
              </div>
            </div>
          </div>
        </div>

        {/* Center: Tabs */}
        <div className="flex flex-col justify-center col-span-2">
          <div className="w-full max-w-2xl mx-auto">
            <h2 className="mb-6 text-3xl font-bold text-center">Donate Now</h2>
            <Tabs defaultValue="qr" className="w-full">
              <TabsList className="flex justify-center w-full gap-4 p-2 bg-secondary-base/10 dark:bg-primary-base/10 rounded-xl">
                <TabsTrigger value="qr" className="px-6 py-2 font-semibold">
                  QR
                </TabsTrigger>
                <TabsTrigger
                  value="bankDetails"
                  className="px-6 py-2 font-semibold"
                >
                  Bank Details
                </TabsTrigger>
              </TabsList>
              <TabsContent value="qr">
                <div className="mt-6 text-center">
                  <Image
                    src="/images/qr.jpg"
                    alt="QR Code"
                    width={200}
                    height={200}
                    className="mx-auto rounded-lg"
                  />
                  <h3 className="mt-4 text-xl font-semibold">
                    Scan the QR to Donate
                  </h3>
                  <p className="mt-2 text-sm">
                    After donating, please fill out the form below to be
                    featured on our Donators list.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="bankDetails">
                <div className="mt-6 text-center">
                  <h3 className="mb-2 text-xl font-semibold">
                    Don’t have a UPI account?
                  </h3>
                  <p className="mb-4 text-lg">
                    Donate directly to our bank account:
                  </p>
                  <div className="max-w-md p-4 mx-auto text-sm text-left rounded-lg bg-secondary-base/10 dark:bg-primary-base/10">
                    <p>
                      <strong>Account Name:</strong> Sainyee Sewa Samitti
                    </p>
                    <p>
                      <strong>Account Number:</strong> 61050682251
                    </p>
                    <p>
                      <strong>Bank:</strong> State Bank of India
                    </p>
                    <p>
                      <strong>Branch:</strong> Nagaur K.U.M
                    </p>
                    <p>
                      <strong>IFSC:</strong> SBIN0031528
                    </p>
                  </div>
                  <p className="mt-4 text-sm">
                    After donating, please fill out the form below to be
                    featured on our Donators list.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Donation Form */}
      <div className="px-4 mt-12 lg:px-20">
        <div className="bg-gradient-to-tr from-accent-base to-primary-dark p-[2px] rounded-xl">
          <div className="px-6 py-10 shadow-md bg-primary-base dark:bg-secondary-dark rounded-xl lg:px-12">
            <h2 className="mb-6 text-3xl font-bold text-center">
              Donation Form
            </h2>
            <DonationForm />
          </div>
        </div>
      </div>

      {/* Donators List */}
      <div className="px-4 pb-12 mt-16 lg:px-20">
        <h2 className="mb-6 text-4xl font-bold tracking-wide text-transparent text-gradient bg-gradient-to-r from-accent-base to-primary-dark bg-clip-text">
          Top Donators
        </h2>
        {donatorsList.length === 0 ? (
          <p className="text-lg">No donators yet. Be the first!</p>
        ) : (
          <div>
            {donatorsList.map((donator) => (
              <DonatorItem key={donator.id} donator={donator} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DonatePage
