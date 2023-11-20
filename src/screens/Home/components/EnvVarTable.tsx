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
import DeleteProcessModal from './DeleteProcessModal';

const EnvVarTable: FC = () => {
  const [tableData, setTableData] = useState<EnvVarTableItem[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleteLoadingOpen, setIsDeleteLoadingOpen] = useState(false);

  const {
    selectedIds,
    setSelectedIds,
    filters,
    selectedFilter,
    setSelectedFilter,
    setIsFilterLoading,
    setIsTableLoading,
    setMessage,
    setFilters,
    setBatchSuccessMessage,
    setBatchFailedMessage,
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

  const handleTableData = async (branch: string) => {
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
  };

  const handleRefetch = async () => {
    setSelectedFilter(filters[0].value);

    await handleTableData(filters[0].value);
  };

  const handleConfirmDelete = useCallback(async () => {
    if (selectedIds.length === 0) {
      alert('No items selected');
      return;
    }

    setIsDeleteModalOpen(false);
    setIsDeleteLoadingOpen(true);
    setIsDeleteLoading(true);
    setBatchSuccessMessage({
      type: MessageEnum.Success,
      text: '',
      list: [],
    });
    setBatchFailedMessage({
      type: MessageEnum.Error,
      text: '',
      list: [],
    });

    const deletionResults = await Promise.allSettled(
      ['asdas'].map((id) => deleteEnvVariable(id))
    );

    const successfulDeletions = deletionResults
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<string>).value);

    const failedDeletions = deletionResults
      .filter((result) => result.status === 'rejected')
      .map((result) => (result as PromiseRejectedResult).reason.message);

    if (successfulDeletions.length > 0) {
      setBatchSuccessMessage({
        type: MessageEnum.Success,
        text: `${successfulDeletions.length} items deleted successfully`,
        list: successfulDeletions,
      });
    }

    if (failedDeletions.length > 0) {
      setBatchFailedMessage({
        type: MessageEnum.Error,
        text: `${failedDeletions.length} items failed to delete`,
        list: failedDeletions,
      });
    }

    setSelectedIds([]);
    setIsDeleteLoading(false);
    void handleTableData(selectedFilter);
  }, [selectedIds, selectedFilter]);

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
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
        isModalOpen={isDeleteModalOpen}
        setIsModalOpen={setIsDeleteModalOpen}
        onButtonClick={handleConfirmDelete}
      />
      <DeleteProcessModal
        isLoading={isDeleteLoading}
        isModalOpen={isDeleteLoadingOpen}
        setIsModalOpen={setIsDeleteLoadingOpen}
      />
    </div>
  );
};

export default EnvVarTable;
