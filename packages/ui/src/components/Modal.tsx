import React, { ReactNode } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import * as Dialog from '@radix-ui/react-dialog'

export interface ModalTypes {
  children: ReactNode
  width?: string
  title?: string
  description?: string
  loadingTitle?: boolean
}

export interface ModalWrapperTypes {
  children: ReactNode
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export const Modal = React.forwardRef(
  (
    { children, width, title, description, loadingTitle }: ModalTypes,
    forwardedRef: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-30 bg-black bg-opacity-50" />
        <Dialog.Content
          ref={forwardedRef}
          className={`data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] z-30 overflow-hidden ${
            width || 'w-[700px]'
          } max-w-[98%] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white pt-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none`}
        >
          <div
            className={`flex items-center border-b-2 border-slate-100 px-6 pb-6 ${
              title || loadingTitle ? 'justify-between' : 'justify-end'
            }`}
          >
            {loadingTitle ? (
              <div className="animate-pulse">
                <span className="block w-[20rem] rounded-lg bg-slate-300 p-2"></span>
              </div>
            ) : (
              title && (
                <Dialog.Title className="text-lg font-semibold text-slate-900">
                  {title}
                </Dialog.Title>
              )
            )}
            <Dialog.Close className="flex h-8 w-8 items-center justify-center text-2xl text-slate-500 hover:text-slate-600">
              <MdOutlineClose />
            </Dialog.Close>
          </div>
          {description && (
            <Dialog.Description className="text-lg font-semibold text-slate-900">
              {description}
            </Dialog.Description>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    )
  },
)

export const ModalWrapper = ({
  children,
  open,
  onOpenChange,
}: ModalWrapperTypes) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
}

Modal.displayName = 'Modal'
