import { cn } from 'src/utils/cn'
import { IoCloseOutline } from 'react-icons/io5'
import type { ModalsWrapperProps } from './types'

const ModalsWrapper = ({
  children,
  className,
  classNameModal,
  closeModal,
  description,
  title,
  ...props
}: ModalsWrapperProps): React.JSX.Element => {
  return (
    <div
      className={cn(
        'overflow-hidden bg-[#111111]/10 bg-blur-[14px] backdrop-blur-sm z-99 fixed w-screen h-screen top-0 left-0 flex justify-center items-start',
        className,
      )}
      onClick={closeModal}
      {...props}
    >
      <div
        className={cn(
          'relative flex-col gap-5 flex items-center justify-start p-6 rounded-3xl',
          classNameModal,
        )}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {(title || description) && (
          <>
            <div className={cn('flex justify-between w-full items-center')}>
              <div className={'flex flex-col'}>
                {title && (
                  <span className="text-white text-base font-medium">
                    {title}
                  </span>
                )}
                {description && (
                  <p className={'font-normal text-base'}>{description}</p>
                )}
              </div>

              <div
                className="bg-[#242424] p-1.25 rounded-full cursor-pointer"
                onClick={closeModal}
              >
                <IoCloseOutline size={26} />
              </div>
            </div>

            <div className="h-px w-full bg-[#1d1d1d]" />
          </>
        )}

        {children}
      </div>
    </div>
  )
}

export default ModalsWrapper
