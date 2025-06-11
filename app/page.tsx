'use client'

import { DisplayTable } from '@/components/home/display-table'

import { Employee } from '@/types/employee'
import { Loader2, Users } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const basePath =
          process.env.NODE_ENV === 'production' ? '/ayp-group-assessment' : ''
        const res = await fetch(`${basePath}/employees.json`)
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

  const hasSize = searchParams.get('size') !== undefined
  const hasPage = searchParams.get('page') !== undefined
  const hasSortBy = searchParams.get('sortBy') !== undefined
  const hasSortOrder = searchParams.get('sortOrder') !== undefined
  const hasFilter = searchParams.get('filter') !== undefined

  if (!hasSize || !hasPage) {
    const size = hasSize ? searchParams.get('size') : '20'
    const page = hasPage ? searchParams.get('page') : '1'
    const sortBy = hasSortBy ? searchParams.get('sortBy') : 'id'
    const sortOrder = hasSortOrder ? searchParams.get('sortOrder') : 'asc'
    const filter = hasFilter ? searchParams.get('filter') : 'filter[status]='
    router.replace(
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

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  )
}
