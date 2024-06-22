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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
    const confirmation = confirm('Are you sure you want to delete ?')

    if (!confirmation) return

    try {
      const res = await API.delete(`donate/${id}`)
      if (res.status === 200) {
        toast({
          title: 'Deleted Successfully',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectChange = async (value) => {
    const updatedData = { ...editableData, isVerified: value }

    try {
      const res = await API.put(`donate/${editableData._id}`, updatedData)
      setEditableData(updatedData)
      if (res.status === 200) {
        console.log(res.data)
        toast({
          title: 'Updated Successfully',
        })
      } else {
        toast({
          title: 'Error',
          description: 'An error occurred while updating the data.',
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'Error',
        description: 'An error occurred while updating the data.',
      })
    }
  }

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
              <SheetTitle>Member Details</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="name"
                  className="text-xl font-semibold tracking-wide"
                >
                  Name
                </Label>
                <div className="py-1 ">{editableData.name}</div>
              </div>
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="email"
                  className="text-xl font-semibold tracking-wide"
                >
                  Email
                </Label>
                <div className="py-1 ">{editableData.email}</div>
              </div>
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="subject"
                  className="text-xl font-semibold tracking-wide"
                >
                  Mobile Number
                </Label>
                <div className="py-1 ">{editableData.phone}</div>
              </div>
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="subject"
                  className="text-xl font-semibold tracking-wide"
                >
                  Amount Donated
                </Label>
                <div className="py-1 ">{editableData.amount}</div>
              </div>
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="subject"
                  className="text-xl font-semibold tracking-wide"
                >
                  Transaction Id
                </Label>
                <div className="py-1 ">{editableData.transactionId}</div>
              </div>
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="subject"
                  className="text-xl font-semibold tracking-wide"
                >
                  Payment Method
                </Label>
                <div className="py-1 ">{editableData.paymentMode}</div>
              </div>
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="subject"
                  className="text-xl font-semibold tracking-wide"
                >
                  Donated On
                </Label>
                <div className="py-1 ">
                  {new Date(editableData.date).toLocaleDateString()}
                </div>
              </div>
              <div className="bg-primary-dark/50 rounded-lg px-2 py-1 min-w-16">
                <Label
                  htmlFor="isVerified"
                  className="text-xl font-semibold tracking-wide"
                >
                  Is Verified
                </Label>
                <Select
                  value={editableData.isVerified}
                  onValueChange={handleSelectChange}
                  className="dark:bg-secondary-base"
                >
                  <SelectTrigger className="w-full dark:bg-secondary-base">
                    <SelectValue placeholder={editableData.isVerified} />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-secondary-base">
                    <SelectGroup>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
