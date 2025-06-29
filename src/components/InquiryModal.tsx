import { Dialog } from '@headlessui/react';
import { Mail } from 'lucide-react';
import React from 'react';

interface InquiryModalProps {
  open: boolean;
  onClose: () => void;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} className='fixed inset-0 z-50 flex items-end justify-center'>
      <div className='fixed inset-0 bg-black bg-opacity-30' aria-hidden='true' />
      <Dialog.Panel className='relative bg-white rounded-t-2xl shadow-xl w-full max-w-md mx-auto pt-2 pb-8 px-6 flex flex-col items-center animate-slideup'>
        <div className='w-12 h-1 bg-gray-200 rounded-full mb-8 mt-2' />
        <div className='w-full flex flex-col items-center justify-center mb-6'>
          <span className='text-[12px] text-gray-500 mb-4'>문의가 있으신가요?</span>
          <div className='flex items-center justify-center space-x-2 px-4 py-3 border-t border-gray-200 w-full'>
            <Mail className='w-5 h-5 text-gray-700' />
            <a
              href='mailto:info@xylo.world'
              className='text-sm text-gray-900 font-medium underline hover:text-lime-600 transition'>
              info@xylo.world
            </a>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default InquiryModal;
