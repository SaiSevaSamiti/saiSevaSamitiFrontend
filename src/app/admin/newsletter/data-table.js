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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import API from '@/axios'
import { useToast } from '@/components/ui/use-toast'

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
                  htmlFor="email"
                  className="text-xl font-semibold tracking-wide"
                >
                  Email
                </Label>
                <div className="py-1 ">{editableData.email}</div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
