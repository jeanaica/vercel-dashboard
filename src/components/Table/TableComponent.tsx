import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTableContext } from './context';
import SkeletonRow from './SkeletonRow';

interface Row {
  id?: string;
  checked?: boolean;
  key?: string;
}

const columnHelper = createColumnHelper<Row>();

type Props<T> = { data: T[]; searchTerm: string };

const TableComponent = <T extends Record<string, string | boolean | number>>({
  data,
  searchTerm = '',
}: Props<T>) => {
  const { selectedIds, setSelectedIds, isFilterLoading, isTableLoading } =
    useTableContext();
  const [tableData, setTableData] = useState<Row[]>([]);

  const columns = [
    columnHelper.display({
      id: 'selection',
      header: () => {
        const allChecked =
          tableData.length > 0 && tableData.every((row) => row.checked);
        return (
          <input
            type='checkbox'
            checked={allChecked}
            onChange={selectAllCheckbox}
          />
        );
      },
      cell: ({ row }) => (
        <input
          type='checkbox'
          checked={row.original.checked}
          onChange={(e) => (row.original.checked = e.target.checked)}
        />
      ),
    }),
    columnHelper.accessor('id', {
      header: 'ID',
    }),
    columnHelper.accessor('key', {
      header: 'Name',
    }),
    columnHelper.accessor('gitBranch', {
      header: 'Branch',
    }),
    columnHelper.accessor('updatedAt', {
      header: 'Updated At',
      cell: (info) => {
        const value = info.getValue();
        if (typeof value === 'string' || typeof value === 'number') {
          return new Date(value).toLocaleString();
        }
        return '';
      },
    }),
  ];

  const toggleCheckbox = useCallback(
    (id: string) => () => {
      setSelectedIds((prev) => {
        const isSelected = prev.includes(id);
        if (isSelected) {
          return prev.filter((selectedId) => selectedId !== id);
        } else {
          return [...prev, id];
        }
      });

      setTableData((oldData) =>
        oldData.map((row) => {
          if (row.id === id) {
            const isChecked = !row.checked;
            const updatedRow = { ...row, checked: isChecked };

            return updatedRow;
          }
          return row;
        })
      );
    },
    []
  );

  const selectAllCheckbox = useCallback(() => {
    const allIds = tableData.map((d: Row) => d.id ?? '');
    const areAllChecked = allIds.every((id) => selectedIds.includes(id));

    const newSelectedIds = areAllChecked ? [] : allIds;

    setSelectedIds(newSelectedIds);

    const newData = tableData.map((row) => ({
      ...row,
      checked: newSelectedIds.includes(row.id ?? ''),
    }));

    setTableData(newData);
  }, [tableData, selectedIds, setSelectedIds, setTableData]);

  useEffect(() => {
    const filteredData = searchTerm
      ? tableData.filter((row) =>
          row.key?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      : data.map((tableDataItem) => ({
          ...tableDataItem,
          checked: false,
        }));

    setTableData(filteredData);
  }, [data, searchTerm]);

  useEffect(() => {
    const initialData = data.map((tableDataItem) => ({
      ...tableDataItem,
      checked: false,
    }));
    setTableData(initialData);
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className='border-spacing border-zinc-400 border w-full'>
      <thead className='text-left'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  className='p-2 border-spacing border-zinc-400 border'
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {isTableLoading || isFilterLoading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : (
          table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={cell.id}
                    className='p-2 border-spacing border-zinc-400 border overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[100px]'
                  >
                    {cell.column.id === 'selection' ? (
                      <input
                        type='checkbox'
                        checked={cell.row.original.checked}
                        onChange={toggleCheckbox(cell.row.original.id ?? '')}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                );
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
