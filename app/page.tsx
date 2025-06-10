import { DisplayTable } from '@/components/home/display-table'

import { employeesByJson } from '@/employees'
import { redirect } from 'next/navigation'

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams
  const data = await employeesByJson()

  const hasSize = searchParams.size !== undefined
  const hasPage = searchParams.page !== undefined

  if (!hasSize || !hasPage) {
    const size = hasSize ? searchParams.size : '20'
    const page = hasPage ? searchParams.page : '1'
    redirect(`/?size=${size}&page=${page}`)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Employee Management
        </h1>
        <p className="text-muted-foreground">
          Manage your employee records and status
        </p>
      </div>
      <DisplayTable initialData={data.employees} />
    </div>
  )
}
