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

export function DataTable({ columns, data, removeUserFromState }) {
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

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setEditableData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSaveChanges = async () => {
    const confirmation = confirm('Are you sure you want to Update details')

    if (!confirmation) return

    try {
      const res = await API.put(`users/${editableData._id}`, editableData)
      if (res.status === 200) {
        toast({
          title: 'User Updated Successfully',
        })
        setIsEditMode(false)
        setSelectedRow(editableData)
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: 'User with Email already Exists',
        })
      } else {
        toast({
          title: 'An error occurred',
          description:
            error.response?.data?.message || 'Please try again later',
        })
      }
    }
  }

  const deleteUser = async (id) => {
    const confirmation = confirm('Are you sure you want to delete this user?')

    if (!confirmation) return

    try {
      const res = await API.delete(`users/${id}`)
      if (res.status === 200) {
        toast({
          title: 'User Deleted Successfully',
        })
        removeUserFromState(id)
        setIsSheetOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fieldsToDisplay = ['name', 'email', 'password']

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
              <SheetTitle>Member Details</SheetTitle>
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
                  {field === 'password' ? (
                    <Input
                      id={field}
                      type="password"
                      value={editableData[field]}
                      onChange={isEditMode ? handleInputChange : undefined}
                      className="col-span-3"
                      readOnly={!isEditMode}
                    />
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
                onClick={() => deleteUser(editableData._id)}
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
