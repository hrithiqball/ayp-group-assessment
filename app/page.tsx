'use client'

import { DisplayTable } from '@/components/home/display-table'

import { Employee } from '@/types/employee'
import { Loader2, Users } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  // const data = await employeesByJson()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await fetch('/employees.json')
        if (!res.ok) throw new Error('Failed to load employees.json')
        const data = await res.json()
        setEmployees(data.employees)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

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

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Users className="size-4" />
        <h1 className="text-xl font-bold tracking-tight">
          AYP Group Employee Management
        </h1>
      </div>
      <DisplayTable initialData={employees} />
    </div>
  )
}
