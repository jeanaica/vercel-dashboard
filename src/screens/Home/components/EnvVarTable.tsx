import { FC, useCallback, useEffect, useState } from 'react';
import { MessageEnum } from '../../../components/Table/types';
import {
  deleteEnvVariable,
  fetchEnvironment,
  fetchEnvironmentBranches,
} from '../../../api/apiClient';
import Table from '../../../components/Table/Table';
import { useTableContext } from '../../../components/Table/context';
import { EnvVarTableItem } from '../types';
import TableActions from './TableActions';
import DeleteModal from './DeleteModal';

const EnvVarTable: FC = () => {
  const [tableData, setTableData] = useState<EnvVarTableItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    selectedIds,
    setSelectedIds,
    selectedFilter,
    setSelectedFilter,
    setIsFilterLoading,
    setIsTableLoading,
    setMessage,
    setFilters,
  } = useTableContext();

  const handleFilterOptions = useCallback(async () => {
    setIsFilterLoading(true);
    setMessage({
      type: MessageEnum.Error,
      text: '',
    });

    try {
      const response = await fetchEnvironmentBranches();

      const mapItems = response.map((resp) => ({
        value: resp ?? '',
        label: resp ?? '',
      }));

      setFilters(mapItems);
      setSelectedFilter(mapItems[0].value);
    } catch (error) {
      if (error instanceof Error) {
        setMessage({
          type: MessageEnum.Error,
          text: error.message,
        });
      }
    }

    setIsFilterLoading(false);
  }, []);

  const handleTableData = useCallback(
    async (branch: string) => {
      if (selectedFilter) {
        setIsTableLoading(true);

        try {
          const response = await fetchEnvironment({ gitBranch: branch });

          setTableData(response as EnvVarTableItem[]);
        } catch (error) {
          if (error instanceof Error) {
            setMessage({
              type: MessageEnum.Error,
              text: error.message,
            });
          }
        } finally {
          setIsTableLoading(false);
        }
      }
    },
    [selectedFilter]
  );

  const handleRefetch = async () => {
    await handleTableData(selectedFilter);
  };

  const handleConfirmDelete = useCallback(async () => {
    if (selectedIds.length === 0) {
      alert('No items selected');
      return;
    }

    setIsTableLoading(true);
    setIsModalOpen(false);

    try {
      await Promise.all(selectedIds.map((id) => deleteEnvVariable(id)));
      setMessage({
        type: MessageEnum.Success,
        text: 'All selected items deleted successfully',
      });
    } catch (error) {
      setMessage({
        type: MessageEnum.Error,
        text: 'Error deleting items',
      });
    } finally {
      setSelectedIds([]);
      void handleTableData(selectedFilter);
    }
  }, [selectedIds]);

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    void handleTableData(selectedFilter);
    setSelectedIds([]);
  }, [selectedFilter]);

  useEffect(() => {
    void handleFilterOptions();
  }, []);

  return (
    <div className='flex flex-col w-4/6'>
      <TableActions onRefetch={handleRefetch} onDelete={handleDelete} />
      <Table<EnvVarTableItem> data={tableData} />
      <DeleteModal
        tableData={tableData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onButtonClick={handleConfirmDelete}
      />
    </div>
  );
};

export default EnvVarTable;
