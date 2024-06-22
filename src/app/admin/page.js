'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
  const { push } = useRouter()

  useEffect(() => {
    push('/admin/users')
  }, [push])

  return <div></div>
}
