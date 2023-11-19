import React from 'react';

type TableActionsProps = {
  onRefetch: () => Promise<void>;
  onDelete: () => void;
};

const TableActions: React.FC<TableActionsProps> = ({ onRefetch, onDelete }) => {
  const handleRefetch = () => {
    void onRefetch();
  };

  return (
    <div className='flex space-x-4 mb-4 border border-gray-300 p-4 rounded relative'>
      <span className='font-semibold absolute top-0 -mt-5 bg-white p-2'>
        Actions
      </span>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-10'
        onClick={handleRefetch}
      >
        Refetch
      </button>
      <button
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded z-10'
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default TableActions;
