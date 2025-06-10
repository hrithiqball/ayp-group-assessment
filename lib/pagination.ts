import { Employee } from '@/types/employee'

export function paginateData(
  data: Employee[],
  page: number,
  size: number,
  sortBy?: string,
  sortOrder: string = 'asc',
  filter?: string
) {
  let filteredData = data
  if (filter) {
    const [filterKey, filterValue] = filter.split('=')
    // expect status
    console.log('filterKey:', filterKey)
    // expect active or deactivated
    console.log('filterValue:', filterValue)

    if (filterKey === 'status' && filterValue === 'active') {
      filteredData = data.filter(e => e.isActive)
    }

    if (filterKey === 'status' && filterValue === 'deactivated') {
      filteredData = data.filter(e => !e.isActive)
    }
  }

  if (sortBy) {
    filteredData = [...filteredData].sort((a, b) => {
      const aValue = a[sortBy as keyof Employee]
      const bValue = b[sortBy as keyof Employee]

      if (aValue == null || bValue == null) return 0
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }

  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / size)
  const startIndex = (page - 1) * size
  const endIndex = startIndex + size
  const paginatedData = filteredData.slice(startIndex, endIndex)

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      pageSize: size,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  }
}
