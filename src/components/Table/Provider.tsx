import { useState } from 'react';
import { DropdownItem } from '../../types/api';
import { MessageEnum, MessageType, TableContextProps } from './types';
import TableContext from './context';

export interface ProviderProps {
  children: React.ReactNode;
}

export function TableProvider({ children }: ProviderProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<DropdownItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const [message, setMessage] = useState<MessageType>({
    type: MessageEnum.Error,
    text: '',
  });
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [isFilterLoading, setIsFilterLoading] = useState<boolean>(false);
  const [batchSuccessMessage, setBatchSuccessMessage] = useState<MessageType>({
    type: MessageEnum.Success,
    text: '',
  });
  const [batchFailedMessage, setBatchFailedMessage] = useState<MessageType>({
    type: MessageEnum.Error,
    text: '',
  });

  const providerValue: TableContextProps = {
    selectedIds,
    setSelectedIds,
    filters,
    setFilters,
    selectedFilter,
    setSelectedFilter,
    message,
    setMessage,
    isTableLoading,
    setIsTableLoading,
    isFilterLoading,
    setIsFilterLoading,
    batchSuccessMessage,
    setBatchSuccessMessage,
    batchFailedMessage,
    setBatchFailedMessage,
  };

  return (
    <TableContext.Provider value={providerValue}>
      {children}
    </TableContext.Provider>
  );
}
