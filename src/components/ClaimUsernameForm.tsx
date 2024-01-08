import { ArrowRight } from 'lucide-react'

import { Button } from './ui/button'
import { Input } from './ui/input'

export function ClaimUsernameForm() {
  return (
    <form className="flex w-full gap-4">
      <Input
        className="w-full bg-gray-900"
        placeholder="seu-usuario"
        prefix="ignite.com/"
      />
      <Button className="to-ignite-300">
        Reservar
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  )
}
