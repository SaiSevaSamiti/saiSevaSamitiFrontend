'use client'

import React, { useEffect, useState } from 'react'
import { DataTable } from './data-table'
import API from '@/axios'

const ColDef = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
]
function NewsletterPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await API.get('/newsletter')
      const { subscribers } = res.data
      setData(subscribers)
    }

    fetchData()
  }, [])

  return (
    <div className="px-16 py-8 dark:text-primary-base">
      <div className="py-4">People Who subsribed to Our Newsletter</div>
      <div>
        <DataTable columns={ColDef} data={data} />
      </div>
    </div>
  )
}

export default NewsletterPage
