// src/components/VirtualScroll.jsx
import React, { useRef, useEffect, useState } from 'react';

const VirtualScroll = ({ items, renderItem, itemHeight }) => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const buffer = 10;

  useEffect(() => {
      const container = containerRef.current;
        if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const containerHeight = containerRef.current.clientHeight;
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
      const endIndex = Math.min(items.length, Math.ceil((scrollTop + containerHeight) / itemHeight) + buffer);

    setVisibleItems(items.slice(startIndex, endIndex));
  }, [scrollTop, items, itemHeight]);

    const totalHeight = items.length * itemHeight;
    const paddingTop = Math.max(0,  Math.floor(scrollTop / itemHeight) - buffer) * itemHeight;

  return (
    <div
      ref={containerRef}
      style={{
        height: '500px',
          overflowY: 'scroll',
           position: 'relative',
      }}
    >
          <div style={{
                paddingTop: paddingTop,
              height: totalHeight - paddingTop,
               position: 'absolute',
               top: 0,
              left:0,
            right:0
              }}>
            {visibleItems.map((item, index) => (
              <div key={index}>
                {renderItem(item)}
              </div>
            ))}
          </div>
    </div>
  );
};

export default VirtualScroll;