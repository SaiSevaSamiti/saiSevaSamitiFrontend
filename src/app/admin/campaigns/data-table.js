'use client'

import React, { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import API from '@/axios'
import { useToast } from '@/components/ui/use-toast'
import Image from 'next/image'

export function DataTable({ columns, data }) {
  const { toast } = useToast()
  const [selectedRow, setSelectedRow] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editableData, setEditableData] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleRowClick = (row) => {
    setSelectedRow(row)
    setEditableData(row)
    setIsSheetOpen(true)
  }

  const deleteData = async (id) => {
    const confirmation = confirm('Are you sure you want to delete!')

    if (!confirmation) return

    try {
      const res = await API.delete(`campaigns/${id}`)
      if (res.status === 200) {
        toast({
          title: 'Deleted Successfully',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fieldsToDisplay = ['name', 'email', 'subject', 'message', 'date']

  return (
    <div>
      <div className="rounded-md border dark:text-primary-base">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                  onClick={() => handleRowClick(row.original)}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedRow && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" style={{ display: 'none' }}>
              Open
            </Button>
          </SheetTrigger>
          <SheetContent className="dark:bg-secondary-dark dark:text-primary-base overflow-auto">
            <SheetHeader>
              <SheetTitle>Campaign Details</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="name"
                  className="text-xl font-semibold tracking-wide"
                >
                  Campaign Image
                </Label>
                <div className="py-1 ">
                  <Image
                    src={editableData.image}
                    alt={editableData.name}
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="email"
                  className="text-xl font-semibold tracking-wide"
                >
                  Campaign Title
                </Label>
                <div className="py-1 ">{editableData.name}</div>
              </div>
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="subject"
                  className="text-xl font-semibold tracking-wide"
                >
                  Description
                </Label>
                <div className="py-1 ">{editableData.description}</div>
              </div>
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="subject"
                  className="text-xl font-semibold tracking-wide"
                >
                  Upload Date
                </Label>
                <div className="py-1 ">
                  {new Date(editableData.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <SheetFooter>
              <Button
                variant="destructive"
                type="button"
                onClick={() => deleteData(editableData._id)}
              >
                Delete
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
