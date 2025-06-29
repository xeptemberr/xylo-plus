import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import React from 'react';

interface LockupModalProps {
  open: boolean;
  onClose: () => void;
}

const LockupModal: React.FC<LockupModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='fixed inset-0 bg-black bg-opacity-30' aria-hidden='true' />
      <div className='relative bg-white rounded-2xl shadow-xl w-80 max-w-full mx-auto p-6 flex flex-col items-center'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none'>
          <X className='w-6 h-6' />
        </button>
        <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 mt-2'>
          <span className='text-2xl text-gray-400'>!</span>
        </div>
        <div className='text-center text-base font-medium text-gray-700 mb-1'>
          본 기능은{' '}
          <span className='text-lime-500 font-bold'>
            락업 기간 해제 후<br /> 사용 가능
          </span>
          합니다.
        </div>
      </div>
    </Dialog>
  );
};

export default LockupModal;
