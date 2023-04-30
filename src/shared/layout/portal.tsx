import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
   children: React.ReactNode;
   selector: string;
}

const Portal = ({ children, selector }: PortalProps) => {
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
      setMounted(true)

      return () => setMounted(false)
   }, [])

   return mounted
      ? createPortal(children,
        document.querySelector(selector)!)
      : null
}

export default Portal