import { createContext, useContext } from 'react';
import { TableContextProps } from './types';
import { defaultState } from './constants';

const TableContext = createContext<TableContextProps>(defaultState);

export function useTableContext() {
  return useContext(TableContext);
}

export default TableContext;
