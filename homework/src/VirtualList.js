import React, { useState } from 'react';

export const VirtualList = ({ items, itemHeight, windowHeight, renderItem }) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2);
  const endIndex = Math.min(items.length, Math.floor((scrollTop + windowHeight) / itemHeight) + 2);

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  return (
    <div 
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)} 
      style={{ height: windowHeight, overflowY: 'auto', position: 'relative', border: '1px solid #ccc', borderRadius: '4px', background: '#f9f9f9' }}
    >
      <div style={{ height: totalHeight, width: '100%' }}>
        <div style={{ transform: `translateY(${offsetY}px)`, position: 'absolute', left: 0, right: 0 }}>
          {visibleItems.map((item, index) => renderItem(item, startIndex + index))}
        </div>
      </div>
    </div>
  );
};
