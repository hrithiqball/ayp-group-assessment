import { Employee } from '@/types/employee'
import { Button } from '../button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../dialog'
import { Input } from '../input'
import { Label } from '../label'
import { Switch } from '../switch'
import { useState } from 'react'
import { useEmployeeStore } from '@/hooks/employee-store'

type UpdateButtonProps = {
  employee: Employee
}

export function UpdateButton({ employee }: UpdateButtonProps) {
  const [name, setName] = useState(employee.name)
  const [email, setEmail] = useState(employee.email)
  const [isActive, setIsActive] = useState(employee.isActive)
  const [isOpen, setIsOpen] = useState(false)

  const updateEmployee = useEmployeeStore(state => state.updateEmployee)

  const handleSave = () => {
    updateEmployee(employee.id, {
      name,
      email,
      isActive,
    })
    setIsOpen(false)
  }

  const handleCancel = () => {
    setName(employee.name)
    setEmail(employee.email)
    setIsActive(employee.isActive)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Employee</DialogTitle>
        <div className="flex items-center">
          <Label className="flex-1" htmlFor="">
            Name
          </Label>
          <Input
            className="flex-3"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <Label className="flex-1" htmlFor="">
            Email
          </Label>
          <Input
            className="flex-3"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <Label className="flex-1" htmlFor="">
            Status
          </Label>
          <div className="flex-3">
            <Switch checked={isActive} onCheckedChange={setIsActive} />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button variant="outline" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
