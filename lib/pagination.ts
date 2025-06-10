export function paginateData<T>(data: T[], page: number, size: number) {
  const startIndex = (page - 1) * size
  const endIndex = startIndex + size
  const paginatedData = data.slice(startIndex, endIndex)

  const totalPages = Math.ceil(data.length / size)
  const hasNextPage = page < totalPages
  const hasPreviousPage = page > 1

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      pageSize: size,
      totalItems: data.length,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  }
}
