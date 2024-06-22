'use client'

import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import API from '@/axios'

const ColDef = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'subject',
    header: 'Subject',
  },
]

function ContactUsPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/contact-us')
      const { entries } = res.data
      setData(entries)
    }

    fetchData()
  }, [])

  console.log(data)

  return (
    <div className="px-16 py-8 dark:text-primary-base">
      <div className="py-4">People who tried to Contact Us</div>
      <div>
        <DataTable columns={ColDef} data={data} />
      </div>
    </div>
  )
}

export default ContactUsPage
