import { ComponentProps, ReactNode } from 'react'

interface BubbleButtonTypes extends ComponentProps<'button'> {
  children: ReactNode
}

export const BubbleButton = (props: BubbleButtonTypes) => {
  return (
    <button
      {...props}
      className=" hover:text-secondary-900 focus:shadow-violet7 data-[state=on]:bg-violet5 ml-0.5 inline-flex h-[25px] flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded bg-gray-800 px-[5px] text-[13px] leading-none outline-none first:ml-0 focus:relative focus:shadow-[0_0_0_2px] data-[withlink=true]:pointer-events-none data-[withlink=true]:bg-gray-500 data-[active=true]:bg-gray-400/50 data-[state=on]:text-white data-[active=true]:text-white data-[withlink=true]:text-slate-400"
    />
  )
}
