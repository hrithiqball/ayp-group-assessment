'use client'

import { UpdateButton } from '@/components/home/update-button'
import { Pagination } from '@/components/home/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table'
import { Employee } from '@/types/employee'
import { useEmployeeStore } from '@/hooks/employee-store'
import { paginateData } from '@/lib/pagination'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

type DisplayTableProps = {
  initialData: Employee[]
}

export function DisplayTable({ initialData }: DisplayTableProps) {
  const employees = useEmployeeStore(state => state.employees)
  const setEmployees = useEmployeeStore(state => state.setEmployees)
  const searchParams = useSearchParams()

  useEffect(() => {
    setEmployees(initialData)
  }, [initialData, setEmployees])

  const page = Number(searchParams.get('page')) || 1
  const size = Number(searchParams.get('size')) || 20

  const { data: paginatedEmployees, pagination } = paginateData(
    employees,
    page,
    size
  )

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedEmployees.map(employee => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell className="font-medium">{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell className="uppercase">
                {employee.isActive ? 'active' : 'deactivated'}
              </TableCell>
              <TableCell className="text-right">
                {employee.isActive && <UpdateButton employee={employee} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        hasNextPage={pagination.hasNextPage}
        hasPreviousPage={pagination.hasPreviousPage}
      />
    </div>
  )
}
