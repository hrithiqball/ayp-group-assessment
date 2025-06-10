import { create } from 'zustand'
import { Employee } from '@/types/employee'

interface EmployeeStore {
  employees: Employee[]
  setEmployees: (employees: Employee[]) => void
  updateEmployee: (id: number, updates: Partial<Omit<Employee, 'id'>>) => void
}

export const useEmployeeStore = create<EmployeeStore>(set => ({
  employees: [],
  setEmployees: employees => set({ employees }),
  updateEmployee: (id, updates) =>
    set(state => ({
      employees: state.employees.map(employee =>
        employee.id === id ? { ...employee, ...updates } : employee
      ),
    })),
}))
