import { DisplayTable } from '@/components/home/display-table'

import { employeesByJson } from '@/employees'
import { Users } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const data = await employeesByJson()

  const hasSize = searchParams.size !== undefined
  const hasPage = searchParams.page !== undefined
  const hasSortBy = searchParams.sortBy !== undefined
  const hasSortOrder = searchParams.sortOrder !== undefined
  const hasFilter = searchParams.filter !== undefined

  if (!hasSize || !hasPage) {
    const size = hasSize ? searchParams.size : '20'
    const page = hasPage ? searchParams.page : '1'
    const sortBy = hasSortBy ? searchParams.sortBy : 'id'
    const sortOrder = hasSortOrder ? searchParams.sortOrder : 'asc'
    const filter = hasFilter ? searchParams.filter : 'filter[status]='
    redirect(
      `/?size=${size}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}&${filter}`
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Users className="size-4" />
        <h1 className="text-xl font-bold tracking-tight">
          AYP Group Employee Management
        </h1>
      </div>
      <DisplayTable initialData={data.employees} />
    </div>
  )
}
