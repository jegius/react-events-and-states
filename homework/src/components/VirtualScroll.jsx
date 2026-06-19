import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useVirtualScroll } from '../context/VirtualScrollContext';

export default function VirtualScroll({
  items,
  renderItem,
  getKey,
  className = '',
  scrollToBottomOnItemsChange = false,
}) {
  const { itemHeight, overscan } = useVirtualScroll();

  const containerRef = useRef(null);

  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const updateContainerHeight = useCallback(() => {
    if (containerRef.current) {
      setContainerHeight(containerRef.current.clientHeight);
    }
  }, []);

  const handleContainerRef = useCallback(
    (node) => {
      containerRef.current = node;

      if (node) {
        setContainerHeight(node.clientHeight);
      }
    },
    []
  );

  const handleScroll = useCallback(
    (event) => {
      setScrollTop(event.currentTarget.scrollTop);
      updateContainerHeight();
    },
    [updateContainerHeight]
  );

  useEffect(() => {
    updateContainerHeight();

    window.addEventListener('resize', updateContainerHeight);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, [updateContainerHeight]);

  useEffect(() => {
    if (!scrollToBottomOnItemsChange || !containerRef.current) {
      return;
    }

    requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    });
  }, [items.length, scrollToBottomOnItemsChange]);

  const totalHeight = items.length * itemHeight;

  const visibleRange = useMemo(() => {
    const safeContainerHeight = containerHeight || itemHeight;

    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscan
    );

    const visibleCount =
      Math.ceil(safeContainerHeight / itemHeight) + overscan * 2;

    const endIndex = Math.min(items.length, startIndex + visibleCount);

    return {
      startIndex,
      endIndex,
    };
  }, [containerHeight, itemHeight, items.length, overscan, scrollTop]);

  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex);
  }, [items, visibleRange.endIndex, visibleRange.startIndex]);

  return (
    <div
      ref={handleContainerRef}
      className={`virtual-scroll ${className}`}
      onScroll={handleScroll}
    >
      <div className="virtual-scroll-spacer" style={{ height: totalHeight }}>
        {visibleItems.map((item, index) => {
          const itemIndex = visibleRange.startIndex + index;

          return (
            <div
              key={getKey(item, itemIndex)}
              className="virtual-scroll-item"
              style={{
                height: itemHeight,
                transform: `translateY(${itemIndex * itemHeight}px)`,
              }}
            >
              {renderItem(item, itemIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}