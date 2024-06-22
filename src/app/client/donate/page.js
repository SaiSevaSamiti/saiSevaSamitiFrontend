'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import DonationForm from './DonationForm'
import API from '@/axios'

const DonatorItem = ({ donator }) => {
  return (
    <div className="bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg p-0.5 mt-4">
      <div className="bg-primary-base dark:bg-secondary-dark rounded-lg p-2 flex px-8 items-center">
        <div className="grow">
          <div className="">{donator.name}</div>
          <div className="text-secondary-base/20 flex">
            <p className="pr-2">&#8377;</p>
            {donator.amount} /-
          </div>
        </div>
        <div className="px-4">
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
      const { donators } = await res.data

      setDonatorsList(donators)
    }

    fetchData()
  }, [])

  console.log(donatorsList)

  return (
    <>
      <div className="px-4 lg:px-20 py-10 dark:text-primary-base grid lg:grid-cols-3">
        <div className="cols-span-3 lg:col-span-1">
          <div className="bg-gradient-to-tr from-primary-dark to-accent-base rounded-lg">
            <div className="p-1">
              <div className="">
                <Image
                  src="/images/donate-now.jpg"
                  alt="donate image"
                  width={450}
                  height={500}
                  className="rounded-tr-lg rounded-tl-lg"
                />
              </div>
              <div className="bg-primary-base dark:bg-secondary-dark rounded-br-lg rounded-bl-lg">
                <div className="flex items-center justify-center text-xl font-semibold tracking-wide py-1">
                  We are Proudly Non-Profit
                </div>
                <div className="w-auto px-4 py-12 text-justify">
                  At Sai Seva Samiti, our mission is to create positive change
                  in the world, and we are proudly non-profit. This means every
                  dollar we receive is dedicated to making a difference, not
                  generating profit. Our passion for helping communities,
                  protecting the environment, and advocating for social justice
                  drives everything we do.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cols-span-3 lg:col-span-2 px-8 flex flex-col justify-center py-12 lg:py-0">
          <div className="text-4xl font-extrabold tracking-wider w-full flex justify-center">
            Donate Now
          </div>
          <div className="w-full flex items-center py-4">
            <Tabs
              defaultValue="qr"
              className="w-full flex flex-col justify-center"
            >
              <TabsList className="bg-secondary-base/90 dark:bg-secondary-base/10 text-secondary-dark dark:text-primary-base">
                <TabsTrigger value="qr">QR</TabsTrigger>
                <TabsTrigger value="bankDetails">Bank Details</TabsTrigger>
              </TabsList>
              <TabsContent value="qr">
                <div className="w-full flex justify-center">
                  <Image
                    src="/images/qr.jpg"
                    alt="qr code"
                    width={200}
                    height={200}
                    className="rounded-lg my-8"
                  />
                </div>
                <div className="flex w-full justify-center text-3xl font-semibold py-4">
                  Scan the QR to Donate
                </div>
                <div className="flex w-full justify-center text-lg font-semibold">
                  After Donating, Fill out the following form, to get your name
                  displayed in our donators list.
                </div>
              </TabsContent>
              <TabsContent value="bankDetails">
                <div className="text-xl w-full flex justify-center font-semibold py-4">
                  Dont have a UPI account ?
                </div>
                <div className="w-full text-3xl font-semibold flex justify-center pb-4">
                  Donate Directly to our Bank Account
                </div>
                <div className="w-full h-full text-xl font-medium tracking-wide flex flex-col lg:px-12 py-4">
                  <h3>Bank Details</h3>
                  <p>Account Name: Sai Seva Samiti</p>
                  <p>Account Number: 1234567890</p>
                  <p>Bank Name: HDFC Bank</p>
                  <p>IFSC Code: HDFC0001234</p>
                </div>
                <div className="flex w-full justify-center text-lg font-semibold">
                  After Donating, Fill out the following form, to get your name
                  displayed in our donators list.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="bg-primary-base dark:bg-secondary-dark px-4 lg:px-20">
        <DonationForm />
      </div>
      <div className="px-4 lg:px-20 cols-span-3 lg:cols-span-3 pb-8 dark:text-primary-base">
        <div className="h-[20vw] lg:h-[5vw] text-4xl lg:text-6xl font-bold tracking-wider bg-gradient-to-t from-accent-base to-primary-dark bg-clip-text text-transparent">
          Top Donators
        </div>
        <div>
          {donatorsList.map((donator) => (
            <DonatorItem key={donator.id} donator={donator} />
          ))}
        </div>
      </div>
    </>
  )
}

export default DonatePage
