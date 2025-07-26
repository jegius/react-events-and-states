import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

const VirtualScrollContext = createContext();

export const VirtualScrollProvider = ({ children, itemHeight, containerHeight }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const updateVisibleItems = (items) => {
    const startIdx = Math.floor(scrollTop / itemHeight);
    const endIdx = Math.min(
      items.length - 1,
      startIdx + Math.ceil(containerHeight / itemHeight)
    );

    setVisibleItems(items.slice(startIdx, endIdx + 1));
  };

  return (
    <VirtualScrollContext.Provider value={{ visibleItems, updateVisibleItems, containerRef }}>
      {children}
    </VirtualScrollContext.Provider>
  );
};

export const useVirtualScroll = () => {
  const context = useContext(VirtualScrollContext);
  if (!context) {
    throw new Error('useVirtualScroll must be used within a VirtualScrollProvider');
  }
  return context;
};

export const VirtualScrollContainer = ({ children, style }) => {
  const { containerRef } = useVirtualScroll();

  return (
    <div
      ref={containerRef}
      style={{
        overflowY: 'auto',
        height: '100%',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const VirtualScrollContent = ({ items, itemHeight, children }) => {
  const { updateVisibleItems } = useVirtualScroll();

  useEffect(() => {
    updateVisibleItems(items);
  }, [items, updateVisibleItems]);

  return (
    <div style={{ height: `${items.length * itemHeight}px`, position: 'relative' }}>
      {children}
    </div>
  );
};

export const VirtualScrollItems = ({ renderItem }) => {
  const { visibleItems } = useVirtualScroll();
  const itemHeight = 60; 
  return (
    <>
      {visibleItems.map((item, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `${index * itemHeight}px`,
            width: '100%',
            height: `${itemHeight}px`,
          }}
        >
          {renderItem(item)}
        </div>
      ))}
    </>
  );
};