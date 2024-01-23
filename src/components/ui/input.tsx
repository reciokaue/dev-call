import * as React from 'react'

import { cn } from '../../lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-12 items-baseline rounded-md border border-l-gray-900 bg-gray-900 px-4 text-sm outline-8 outline-red-500 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
          className,
        )}
      >
        {prefix && (
          <label htmlFor={prefix + '-label'} className="text-sm text-gray-400">
            {prefix}
          </label>
        )}
        <input
          type={type}
          className="flex h-full w-full bg-transparent text-white outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
          id={prefix + '-label'}
          ref={ref}
          {...props}
        />
      </div>
      // <div
      //   className={cn(
      //     'align-center flex h-10 rounded-md border border-l-gray-900 bg-gray-900 px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      //     className,
      //   )}
      // >
      //   {prefix && <span className="text-sm text-gray-400">{prefix}</span>}
      //   <input
      //     type={type}
      //     className="flex h-full w-full bg-transparent text-white placeholder:text-gray-400 disabled:cursor-not-allowed"
      //     ref={ref}
      //     {...props}
      //   />
      // </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
