import { Dialog } from '@headlessui/react';
import React, { useEffect, useRef, useState } from 'react';

interface VerificationModalProps {
  open: boolean;
  onClose: () => void;
  onResend: () => void;
  onVerify: (code: string) => void;
  isResending?: boolean;
}

const TIMER_SECONDS = 180;

const VerificationModal: React.FC<VerificationModalProps> = ({ open, onClose, onResend, onVerify, isResending }) => {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(TIMER_SECONDS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      setSeconds(TIMER_SECONDS);
      setCode('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (seconds === 0) return;
    timerRef.current = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [seconds, open]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <Dialog open={open} onClose={onClose} className='fixed inset-0 z-50 flex items-end justify-center'>
      <div className='fixed inset-0 bg-black bg-opacity-30' aria-hidden='true' />
      <div className='relative bg-white rounded-t-2xl shadow-xl w-full max-w-md mx-auto pt-2 pb-8 px-6 flex flex-col items-center animate-slideup'>
        <div className='w-12 h-1 bg-gray-200 rounded-full mb-8 mt-2' />
        <div className='w-full flex items-center mb-6'>
          <input
            type='text'
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
            maxLength={6}
            className='flex-1 px-4 py-4 border border-gray-200 rounded-lg text-2xl text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none mr-4'
            placeholder='인증번호 입력'
            autoFocus
          />
          <span className='text-lg text-gray-400 font-medium min-w-[60px] text-right'>{formatTime(seconds)}</span>
        </div>
        <button
          type='button'
          onClick={() => {
            onResend();
            setSeconds(TIMER_SECONDS);
          }}
          disabled={isResending || seconds === 0}
          className={`w-full py-3 rounded-lg font-medium text-base mb-8 transition-colors ${
            isResending || seconds === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}>
          인증번호 재전송
        </button>
        <button
          type='button'
          onClick={() => onVerify(code)}
          className='w-full py-4 rounded-xl font-bold text-lg bg-black text-white hover:bg-gray-800 active:bg-gray-900 transition-colors'>
          확인
        </button>
      </div>
    </Dialog>
  );
};

export default VerificationModal;

/* tailwind에 없으면 아래 css를 global에 추가
@keyframes slideup {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.animate-slideup {
  animation: slideup 0.25s cubic-bezier(0.4,0,0.2,1);
}
*/
