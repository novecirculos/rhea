import { ComponentProps } from 'react'

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps extends ComponentProps<'select'> {
  label?: string
  options: SelectOption[]
}

export function Select({
  children,
  label,
  className,
  options,
  ...props
}: SelectProps) {
  return (
    <div className={`${className} max-w-full flex-1`}>
      {label ? <label className="text-sm text-white">{label}</label> : null}
      <div className="group mt-1 flex w-full items-baseline rounded-sm border border-gray-900 bg-gray-900 p-2 transition duration-200 ease-in-out">
        {children && (
          <div className="mr-1 h-5 w-5 self-center text-gray-400">
            {children}
          </div>
        )}
        <select
          {...props}
          className={`${
            props.disabled ? 'cursor-not-allowed' : ''
          } group-focus:border-primary-900 w-full border-0 bg-transparent text-sm text-white placeholder-gray-400 placeholder:text-sm focus:outline-none ${
            props.disabled ? 'opacity-50' : ''
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

Select.displayName = 'Select'
