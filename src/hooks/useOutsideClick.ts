import { MutableRefObject, useRef, useEffect } from 'react'

interface Handler {
  (event: MouseEvent): void
}

function useOutsideClick(
  handler: Handler,
  listenCapturing = true,
): MutableRefObject<HTMLElement | null> {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler(e)
      }
    }

    document.addEventListener('click', handleClick, listenCapturing)

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing)
    }
  }, [handler, listenCapturing])

  return ref
}

export default useOutsideClick
