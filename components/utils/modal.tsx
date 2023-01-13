import { ReactElement } from 'react'

// author: marthel
export default function Modal({
  visible,
  onClose,
  children,
  width,
  height
}: {
  visible: boolean
  onClose: () => void
  children: ReactElement
  width: string
  height: string
}): JSX.Element {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') {
      onClose()
    }
  }

  if (!visible) return <></>
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="z-10 fixed inset-0 mt-[75px] flex items-center justify-center  bg-opacity-30 backdrop-blur-sm"
    >
      <div
        className={`${height} ${width} rounded-[20px] bg-white p-2 shadow-xl overflow-y-scroll`}
      >
        {children}
      </div>
    </div>
  )
}