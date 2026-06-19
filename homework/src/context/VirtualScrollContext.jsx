import { createContext, useContext, useMemo } from 'react';

const VirtualScrollContext = createContext({
  itemHeight: 82,
  overscan: 6,
});

export function VirtualScrollProvider({
  children,
  itemHeight = 82,
  overscan = 6,
}) {
  const value = useMemo(
    () => ({
      itemHeight,
      overscan,
    }),
    [itemHeight, overscan]
  );

  return (
    <VirtualScrollContext.Provider value={value}>
      {children}
    </VirtualScrollContext.Provider>
  );
}

export function useVirtualScroll() {
  return useContext(VirtualScrollContext);
}