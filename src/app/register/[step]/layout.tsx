import type { Metadata } from 'next'

import { MultiStep } from '../../../components/multi-step'

import { HEADERS } from './headers'

export const metadata: Metadata = {
  title: 'Registration | dev.call',
}

interface LayoutParams {
  children: React.ReactNode
  params: {
    step: number
  }
}

export default function RootLayout({ children, params }: LayoutParams) {
  const { step } = params

  return (
    <div className="mx-auto flex h-screen max-w-[500px] flex-col items-center justify-start pt-40">
      <div className="flex flex-col items-start self-stretch px-6">
        <h1 className="text-2xl font-bold leading-relaxed text-white">
          {HEADERS[step - 1].title}
        </h1>
        <p className="min-h-20 text-base leading-relaxed text-gray-200">
          {HEADERS[step - 1].subtitle}
        </p>
        <MultiStep className="mt-6" steps={4} currentStep={+params.step} />
      </div>

      <div className="mt-6 flex flex-col items-center gap-4 self-stretch rounded-lg border border-gray-600 bg-gray-800 p-6">
        {children}
      </div>
    </div>
  )
}
