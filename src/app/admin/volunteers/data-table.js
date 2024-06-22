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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import API from '@/axios'
import { useToast } from '@/components/ui/use-toast'
import convertToBase64 from '@/lib/convertToBase64'

export function DataTable({ columns, data }) {
  const { toast } = useToast()
  const [selectedRow, setSelectedRow] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
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

  const handleInputChange = async (e) => {
    const { id } = e.target
    if (e.target.type === 'file') {
      const file = e.target.files[0]
      if (file) {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.05,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        })
        const imageBS64 = await convertToBase64(compressedFile)
        setEditableData((prev) => ({ ...prev, [id]: imageBS64 }))
      }
    } else {
      const { value } = e.target
      setEditableData((prev) => ({ ...prev, [id]: value }))
    }
  }

  const handleSaveChanges = async () => {
    const confirmation = confirm('Are you sure you want to Update details')

    if (!confirmation) return

    try {
      const res = await API.put(`volunteers/${editableData._id}`, editableData)
      if (res.status === 200) {
        toast({
          title: 'Volunteer Updated Successfully',
        })

        setIsEditMode(false)
        setSelectedRow(editableData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleVolunteerDelete = async () => {
    const confirmation = confirm(
      'Are you sure you want to delete this volunteer'
    )

    if (!confirmation) return

    try {
      const res = await API.delete(`volunteers/${editableData._id}`)
      if (res.status === 200) {
        toast({
          title: 'Volunteer Deleted Successfully',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fieldsToDisplay = [
    'image',
    'name',
    'email',
    'phone',
    'role',
    'joiningDate',
    'dateOfBirth',
    'isActive',
    'showInList',
    'fbURL',
    'twitterURL',
    'linkedinURL',
    'instaURL',
  ]

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
              <SheetTitle>Volunteer Details</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {fieldsToDisplay.map((field) => (
                <div
                  className="grid grid-cols-4 items-center gap-4"
                  key={field}
                >
                  <Label htmlFor={field} className="text-right">
                    {field}
                  </Label>
                  {field === 'image' ? (
                    isEditMode ? (
                      <Input
                        id={field}
                        type="file"
                        name={field}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    ) : (
                      <Image
                        src={editableData[field]}
                        alt="Profile Image"
                        width={100}
                        height={100}
                        className="col-span-3 rounded-lg"
                      />
                    )
                  ) : field === 'joiningDate' || field === 'dateOfBirth' ? (
                    isEditMode ? (
                      <Input
                        id={field}
                        type="date"
                        name={field}
                        onChange={handleInputChange}
                        value={editableData[field]}
                        className="col-span-3"
                      />
                    ) : (
                      <Input
                        id={field}
                        type="text"
                        name={field}
                        value={new Date(editableData[field]).toLocaleDateString(
                          'en-GB'
                        )}
                        className="col-span-3"
                        readOnly
                      />
                    )
                  ) : (
                    <Input
                      id={field}
                      value={editableData[field]}
                      onChange={isEditMode ? handleInputChange : undefined}
                      className="col-span-3"
                      readOnly={!isEditMode}
                    />
                  )}
                </div>
              ))}
            </div>
            <SheetFooter>
              {isEditMode ? (
                <Button type="button" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              ) : (
                <Button type="button" onClick={() => setIsEditMode(true)}>
                  Edit
                </Button>
              )}
              <Button
                variant="destructive"
                type="button"
                onClick={() => handleVolunteerDelete(editableData._id)}
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
