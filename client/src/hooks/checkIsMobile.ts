import { useState, useEffect } from 'react';

export const useIsMobile = (mobileWidth = 850) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < mobileWidth);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < mobileWidth);
    };

    checkIsMobile(); // Initial check

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [mobileWidth]);

  return isMobile;
};