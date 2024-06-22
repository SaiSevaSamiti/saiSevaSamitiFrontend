'use client'

import React, { useDebugValue, useEffect, useState } from 'react'
import { DataTable } from './data-table'
import { useToast } from '@/components/ui/use-toast'
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
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'isVerified',
    header: 'Is Verified',
  },
]

function DonatorPage() {
  const { toast } = useToast()
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/donate')
      const { donators } = res.data
      setData(donators)
    }

    fetchData()
  }, [])
  return (
    <div className="px-16 py-8 dark:text-primary-base">
      <div className="py-4">People who donated</div>
      <div>
        <DataTable columns={ColDef} data={data} />
      </div>
    </div>
  )
}

export default DonatorPage
