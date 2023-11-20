import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  confirmComponent?: React.ReactNode;
  closeText?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  confirmComponent,
  closeText,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50'>
      <div className='bg-white rounded-lg overflow-hidden shadow-xl max-w-[40vw] w-full'>
        <div className='p-4 border-b border-gray-200'>
          <h2 className='text-xl font-semibold'>{title}</h2>
        </div>
        <div className='p-4 overflow-hidden'>{children}</div>
        <div className='p-4 border-t border-gray-200 text-right gap-4 flex justify-end'>
          {confirmComponent}
          {closeText && (
            <button
              onClick={onClose}
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
            >
              {closeText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
