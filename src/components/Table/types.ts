import { Dispatch, ReactNode, SetStateAction } from 'react';
import { DropdownItem } from '../../types/api';

export enum MessageEnum {
  Error = 'ERROR',
  Success = 'SUCCESS',
  Info = 'INFO',
}

export type MessageType = {
  type: MessageEnum;
  text: string;
};

export type TableContextProps = {
  filters: DropdownItem[];
  setFilters: Dispatch<SetStateAction<DropdownItem[]>>;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  selectedFilter: string;
  setSelectedFilter: (selectedFilter: string) => void;
  message: MessageType;
  setMessage: (params: MessageType) => void;
  isTableLoading: boolean;
  setIsTableLoading: Dispatch<SetStateAction<boolean>>;
  isFilterLoading: boolean;
  setIsFilterLoading: Dispatch<SetStateAction<boolean>>;
};

export type ProviderProps = {
  children: ReactNode;
};
