import { useRef, useState, useEffect } from 'react';
import { useVirtualScroll } from './context/VirtualScrollContext';

const ITEM_HEIGHT = 80;
const BUFFER = 5;

export default function VirtualScroll({ items, renderItem }) {
  const containerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(300);
  const { setScrollTop } = useVirtualScroll();

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateHeight = () => {
      setContainerHeight(element.clientHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const handleScroll = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  const scrollTop = containerRef.current?.scrollTop ?? 0;
  const startIndex = Math.max(
    0,
    Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER
  );
  const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT) + BUFFER * 2;
  const endIndex = Math.min(items.length, startIndex + visibleCount);
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: 300,
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: 8,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ height: items.length * ITEM_HEIGHT, position: 'relative' }}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;

          return (
            <div
              key={item.id ?? `${item.username}-${actualIndex}`}
              style={{
               position: 'absolute',
               top: actualIndex * ITEM_HEIGHT,
               height: ITEM_HEIGHT,
               width: '100%',
               boxSizing: 'border-box',
               overflow: 'hidden',
               padding: '4px 0',
               borderBottom: '1px solid #e5e7eb',
              }}
            >
              {renderItem(item, actualIndex)}
            </div>
          );
        })}
      </div>
    </div>
  );
}