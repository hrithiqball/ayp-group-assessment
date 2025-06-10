import { readFile } from 'fs/promises'
import path from 'path'
import { Employee } from '@/types/employee'

export const employeesByJson = async (): Promise<{ employees: Employee[] }> => {
  const filePath = path.join(process.cwd(), 'employees.json')
  const fileContents = await readFile(filePath, 'utf8')
  const data = JSON.parse(fileContents)
  return data
}
