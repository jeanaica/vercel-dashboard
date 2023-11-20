import { Dispatch, FC, SetStateAction } from 'react';
import Modal from '../../../components/Label/Modal/Modal';
import { useTableContext } from '../../../components/Table/context';
import Alert from '../../../components/Alert';

type Props = {
  isLoading: boolean;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteProcessModal: FC<Props> = ({
  isLoading,
  isModalOpen,
  setIsModalOpen,
}) => {
  const { batchSuccessMessage, batchFailedMessage } = useTableContext();

  const handleClose = () => {
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleClose}
      title={isLoading ? 'Deletion in Progress' : 'Deletion Complete'}
      closeText={isLoading ? '' : 'Close'}
    >
      <div className='flex justify-center items-center flex-col gap-4'>
        {isLoading ? (
          <>
            Loading
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
          </>
        ) : (
          <>
            <Alert
              message={batchSuccessMessage.text}
              type={batchSuccessMessage.type}
              list={batchSuccessMessage.list}
            />
            <Alert
              message={batchFailedMessage.text}
              type={batchFailedMessage.type}
              list={batchFailedMessage.list}
            />
          </>
        )}
      </div>
    </Modal>
  );
};

export default DeleteProcessModal;
