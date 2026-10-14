import { createContext, useContext, useState } from 'react';

const VirtualScrollContext = createContext(null);

export function VirtualScrollProvider({ children }) {
  const [scrollTop, setScrollTop] = useState(0);

  return (
    <VirtualScrollContext.Provider value={{ scrollTop, setScrollTop }}>
      {children}
    </VirtualScrollContext.Provider>
  );
}

export function useVirtualScroll() {
  const context = useContext(VirtualScrollContext);

  if (!context) {
    throw new Error(
      'useVirtualScroll должен использоваться внутри VirtualScrollProvider'
    );
  }

  return context;
}