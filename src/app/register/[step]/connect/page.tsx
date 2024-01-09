import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function Connect() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between rounded-md border border-gray-600 px-6 py-4">
        <span className="text-base leading-relaxed text-gray-100">
          Google Calendar
        </span>
        <Button
          className="border-white bg-transparent hover:bg-white hover:text-gray-700"
          variant="outline"
        >
          Conectar
        </Button>
      </div>
      <Button disabled={true}>
        Proximo passo
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
