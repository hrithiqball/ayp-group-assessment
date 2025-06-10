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
import { Button } from '../button'
import { ArrowUpDown, Filter } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu'
import { useRouter } from 'next/navigation'

type DisplayTableProps = {
  initialData: Employee[]
}

export function DisplayTable({ initialData }: DisplayTableProps) {
  const employees = useEmployeeStore(state => state.employees)
  const setEmployees = useEmployeeStore(state => state.setEmployees)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    setEmployees(initialData)
  }, [initialData, setEmployees])

  const page = Number(searchParams.get('page')) || 1
  const size = Number(searchParams.get('size')) || 20
  const sortBy = searchParams.get('sortBy') || 'id'
  const sortOrder = searchParams.get('sortOrder') || 'asc'

  const filterStatus = searchParams.get('filter[status]')
  const filter = filterStatus ? `status=${filterStatus}` : undefined

  const { data: paginatedEmployees, pagination } = paginateData(
    employees,
    page,
    size,
    sortBy,
    sortOrder,
    filter
  )

  function handleSortName() {
    const params = new URLSearchParams(searchParams.toString())

    if (sortBy !== 'name') {
      params.set('sortBy', 'name')
      params.set('sortOrder', 'asc')
      router.replace(`?${params.toString()}`)
    }

    if (sortBy === 'name' && sortOrder === 'asc') {
      params.set('sortOrder', 'desc')
      router.replace(`?${params.toString()}`)
    }

    if (sortBy === 'name' && sortOrder === 'desc') {
      params.set('sortOrder', 'asc')
      params.set('sortBy', 'id')
      router.replace(`?${params.toString()}`)
    }
  }

  function handleFilterStatus(status?: string) {
    const params = new URLSearchParams(searchParams.toString())

    switch (status) {
      case 'active':
        params.set('filter[status]', 'active')
        break
      case 'deactivated':
        params.set('filter[status]', 'deactivated')
        break
      default:
        params.set('filter[status]', '')
        break
    }

    params.set('page', '1')
    router.replace(`?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={handleSortName}>
                Name <ArrowUpDown className="size-4" />
              </Button>
            </TableHead>
            {/* TODO: email sort */}
            <TableHead>Email</TableHead>
            <TableHead>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    Status <Filter className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleFilterStatus()}>
                    All
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterStatus('active')}
                  >
                    Activated
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterStatus('deactivated')}
                  >
                    Deactivated
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableHead>
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
