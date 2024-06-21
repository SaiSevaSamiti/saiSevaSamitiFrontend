'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function ClientPage() {
  const { push } = useRouter()

  useEffect(() => {
    push('/client/home')
  }, [push])

  return <div></div>
}

export default ClientPage
