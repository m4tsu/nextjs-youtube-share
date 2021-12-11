import { useEffect, useRef, useState } from 'react';

export const useHover = <T extends HTMLElement = HTMLDivElement>() => {
  const [isHovered, setHovered] = useState(false);

  const ref = useRef<T>(null);

  const handleMouseover = () => setHovered(true);
  const handleMouseout = () => setHovered(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseover);
      node.addEventListener('mouseout', handleMouseout);
    }
    return () => {
      if (node) {
        node.removeEventListener('mouseover', handleMouseover);
        node.removeEventListener('mouseout', handleMouseout);
      }
    };
  }, [ref]);

  return { ref, isHovered };
};
