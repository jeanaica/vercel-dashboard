import { NOOP } from '../../constants/common';
import { MessageEnum, TableContextProps } from './types';

export const defaultState: TableContextProps = {
  selectedIds: [],
  setSelectedIds: NOOP,
  filters: [],
  setFilters: NOOP,
  selectedFilter: '',
  setSelectedFilter: NOOP,
  message: {
    type: MessageEnum.Error,
    text: '',
  },
  setMessage: NOOP,
  isTableLoading: false,
  setIsTableLoading: NOOP,
  isFilterLoading: false,
  setIsFilterLoading: NOOP,
};
