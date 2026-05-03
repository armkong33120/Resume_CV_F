'use client';

import { RefObject, useCallback, useLayoutEffect, useRef, useState } from 'react';

interface SelectionPillMetrics {
  x: number;
  width: number;
  opacity: number;
}

export function useSelectionPill<TContainer extends HTMLElement, TItem extends HTMLElement>(
  activeIndex: number,
  dependencyKey: string
): {
  containerRef: RefObject<TContainer | null>;
  setItemRef: (index: number) => (node: TItem | null) => void;
  metrics: SelectionPillMetrics;
} {
  const containerRef = useRef<TContainer | null>(null);
  const itemRefs = useRef<Array<TItem | null>>([]);
  const [metrics, setMetrics] = useState<SelectionPillMetrics>({
    x: 0,
    width: 0,
    opacity: 0,
  });

  const setItemRef = useCallback((index: number) => {
    return (node: TItem | null) => {
      itemRefs.current[index] = node;
    };
  }, []);

  useLayoutEffect(() => {
    const updateMetrics = () => {
      const container = containerRef.current;
      const activeItem = itemRefs.current[activeIndex];

      if (!container || !activeItem) {
        setMetrics((current) => ({ ...current, opacity: 0 }));
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();

      setMetrics({
        x: itemRect.left - containerRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(updateMetrics);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    itemRefs.current.forEach((item) => {
      if (item) resizeObserver.observe(item);
    });

    window.addEventListener('resize', updateMetrics);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateMetrics);
    };
  }, [activeIndex, dependencyKey]);

  return { containerRef, setItemRef, metrics };
}
