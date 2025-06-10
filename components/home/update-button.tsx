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
import { useEmployeeStore } from '@/hooks/use-employee-store'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { UpdateEmployee } from './update-employee'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../drawer'
import { toast } from 'sonner'

type UpdateButtonProps = {
  employee: Employee
}

export function UpdateButton({ employee }: UpdateButtonProps) {
  const [name, setName] = useState(employee.name)
  const [email, setEmail] = useState(employee.email)
  const [isActive, setIsActive] = useState(employee.isActive)
  const [isOpen, setIsOpen] = useState(false)

  const updateEmployee = useEmployeeStore(state => state.updateEmployee)
  const isMobile = useIsMobile()

  const handleSave = () => {
    updateEmployee(employee.id, {
      name,
      email,
      isActive,
    })
    setIsOpen(false)
    toast.success('Employee updated successfully', {
      position: isMobile ? 'top-center' : 'bottom-right',
    })
  }

  const handleCancel = () => {
    setName(employee.name)
    setEmail(employee.email)
    setIsActive(employee.isActive)
    setIsOpen(false)
  }

  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Update</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Update Employee</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <UpdateEmployee
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        </div>
        <DrawerFooter className="pt-2">
          <Button variant="outline" onClick={handleSave}>
            Save
          </Button>
          <DrawerClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Employee</DialogTitle>
        <UpdateEmployee
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          isActive={isActive}
          setIsActive={setIsActive}
        />
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
