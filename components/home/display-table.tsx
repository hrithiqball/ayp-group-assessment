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
import { useEmployeeStore } from '@/hooks/use-employee-store'
import { paginateData } from '@/lib/pagination'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

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
              <TableCell className="uppercase" align="center">
                <span
                  className={cn('text-xs font-semibold px-1 py-1 rounded', {
                    'bg-green-200 text-green-800': employee.isActive,
                    'bg-red-200 text-red-800': !employee.isActive,
                  })}
                >
                  {employee.isActive ? 'active' : 'deactivated'}
                </span>
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
