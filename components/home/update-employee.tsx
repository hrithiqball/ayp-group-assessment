import { useIsMobile } from '@/hooks/use-is-mobile'
import { Input } from '../input'
import { Label } from '../label'
import { Switch } from '../switch'

type UpdateEmployeeProps = {
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  isActive: boolean
  setIsActive: (isActive: boolean) => void
}

export function UpdateEmployee(props: UpdateEmployeeProps) {
  const { name, setName, email, setEmail, isActive, setIsActive } = props

  return (
    <div className="space-y-4">
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
    </div>
  )
}
