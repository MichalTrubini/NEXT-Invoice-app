import { useEffect, useState, useCallback } from "react";

export const useScreenWidth = () => {
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
      const widthInitial = window.innerWidth;
      setScreenWidth(widthInitial);
  
      function getWindowDimensions() {
        const widthCurrent = window.innerWidth;
        return widthCurrent;
      }
  
      function handleResize() {
        setScreenWidth(getWindowDimensions());
      }
  
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return screenWidth;
}

export const useMediaQuery = (width:number) =>
{
  const [targetReached, setTargetReached] = useState(false)

  const updateTarget = useCallback((e:any) =>
  {
    if (e.matches) setTargetReached(true)
    else setTargetReached(false)
  }, [])

  useEffect(() =>
  {
    const media = window.matchMedia(`(min-width: ${width}px)`)
    media.addEventListener('change', updateTarget)

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) setTargetReached(true)

    return () => media.removeEventListener('change', updateTarget)
  }, [width, updateTarget])

  return targetReached
}
