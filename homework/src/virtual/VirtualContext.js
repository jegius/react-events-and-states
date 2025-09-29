import { createContext, useContext } from 'react';
export const VirtualConfigContext = createContext({ itemHeight: 28, overscan: 6 });
export const useVirtualConfig = () => useContext(VirtualConfigContext);
