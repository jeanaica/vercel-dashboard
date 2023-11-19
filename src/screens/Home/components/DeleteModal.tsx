import { Dispatch, FC, SetStateAction } from 'react';
import Modal from '../../../components/Label/Modal/Modal';
import { useTableContext } from '../../../components/Table/context';
import { EnvVarTableItem } from '../types';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  onButtonClick(): Promise<void>;
  tableData: EnvVarTableItem[];
};

const DeleteModal: FC<Props> = ({
  isModalOpen,
  setIsModalOpen,
  onButtonClick,
  tableData,
}) => {
  const { selectedIds } = useTableContext();

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    void onButtonClick();
  };
  const renderConfirmComponent = () => (
    <button
      onClick={handleButtonClick}
      className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
    >
      Yes
    </button>
  );

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title='Confirm Delete'
      confirmComponent={renderConfirmComponent()}
      closeText='No'
    >
      <div>
        Are you sure you want to delete these items?
        <ul className='p-4 list-disc'>
          {selectedIds.map((id) => {
            const foundObject = tableData.find((obj) => obj.id === id);

            const foundKey = foundObject ? foundObject.key : null;
            return <li key={id}>{foundKey}</li>;
          })}
        </ul>
      </div>
    </Modal>
  );
};

export default DeleteModal;
