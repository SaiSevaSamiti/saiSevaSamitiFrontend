'use client'

import React from 'react'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function AdminNavbar() {
  const router = useRouter()
  const navItems = [
    {
      group: 'Management',
      items: [
        { URL: '/admin/users', itemValue: 'Users' },
        { URL: '/admin/members', itemValue: 'Members' },
        { URL: '/admin/volunteers', itemValue: 'Volunteers' },
      ],
    },
    {
      group: 'Content',
      items: [
        { URL: '/admin/campaigns', itemValue: 'Campaigns' },
        { URL: '/admin/certificates', itemValue: 'Certificates' },
        { URL: '/admin/gallery', itemValue: 'Gallery' },
        { URL: '/admin/newsletter', itemValue: 'Newsletter' },
      ],
    },
    {
      group: 'Communication',
      items: [
        { URL: '/admin/contact-us', itemValue: 'Contact Us' },
        { URL: '/admin/donators', itemValue: 'Donators' },
      ],
    },
    {
      group: 'Statistics',
      items: [
        { URL: '/admin/activitiesNumber', itemValue: 'Activites Number' },
      ],
    },
  ]

  const handleLogout = () => {
    document.cookie =
      'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    router.push('/admin')
  }

  return (
    <div className="font-semibold h-[100vh] dark:text-secondary-base flex flex-col border-r-2 border-primary-dark/50">
      <div className="border-b-2 border-primary-dark/50 flex items-center p-4">
        <div className="w-8 h-8 rounded-full border-2 border-primary-dark mx-1 flex items-center justify-center">
          A
        </div>
        <div>
          <div>Admin</div>
          <div>admin@gmail.com</div>
        </div>
      </div>
      <div className="flex-grow">
        <Command className="bg-primary-base dark:bg-secondary-dark">
          <CommandList className="dark:bg-secondary-dark h-full">
            {navItems.map((item) => (
              <CommandGroup
                key={item.group}
                heading={item.group}
                className="dark:bg-secondary-dark"
              >
                {item.items.map((item) => (
                  <Link key={item.itemValue} href={item.URL}>
                    <CommandItem
                      value={item.itemValue}
                      className="dark:text-primary-base cursor-pointer"
                    >
                      {item.itemValue}
                    </CommandItem>
                  </Link>
                ))}
                <CommandSeparator />
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </div>
      <div className="h-12 flex items-center pl-8 border-t-2 border-primary-dark/50">
        <div
          className="cursor-pointer hover:scale-110 transition-all ease-in-out"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar
