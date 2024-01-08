import { cn } from '@/lib/utils'

interface MultiStepProps {
  steps: number
  currentStep?: number
  className?: string
}

export function MultiStep({
  steps,
  currentStep = 1,
  className,
}: MultiStepProps) {
  return (
    <div className={cn('flex w-full max-w-xl flex-col', className)}>
      <label className="text-sm text-gray-200">
        Passo {currentStep} de {steps}
      </label>
      <div className="mt-4 grid grid-flow-col gap-2">
        {Array.from({ length: steps }, (_, i) => i + 1).map((step: number) => (
          <div
            key={step}
            className={cn(
              'h-1 w-full rounded-[1px] bg-gray-600',
              step <= currentStep && 'bg-gray-100',
            )}
          />
        ))}
      </div>
      <div></div>
    </div>
  )
}
