import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const notices = [
  {
    id: 1,
    title: '[알림] Xylo Plus 앱 정식 출시 안내',
    date: '09:00 06-30-2025',
    isNew: true,
  },
  {
    id: 2,
    title: '[알림] 메뉴 기능 출시 일정 안내',
    date: '09:00 06-30-2025',
    isNew: true,
  },
];

const NoticePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-white max-w-sm mx-auto'>
      {/* Header */}
      <div className='flex items-center px-4 pt-6 pb-2'>
        <button onClick={() => navigate(-1)} className='mr-2 p-1'>
          <ChevronLeft className='w-6 h-6 text-gray-500' />
        </button>
        <h1 className='text-2xl font-bold text-gray-900 ml-1'>공지사항</h1>
      </div>

      {/* Notice List */}
      <div className='mt-4'>
        {notices.map((notice) => (
          <div key={notice.id} className='px-4 py-4 border-b border-gray-100'>
            <div className='flex items-center mb-1'>
              <span className='text-base font-medium text-gray-800'>{notice.title}</span>
              {notice.isNew && (
                <span className='ml-2 bg-lime-400 text-white text-xs font-bold rounded-full px-2 py-0.5'>N</span>
              )}
            </div>
            <div className='text-xs text-gray-400'>{notice.date}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-center mt-8 space-x-2'>
        <button
          className='w-8 h-8 flex items-center justify-center border border-gray-200 rounded bg-white text-gray-400'
          disabled>
          &lt;
        </button>
        <span className='w-8 h-8 flex items-center justify-center rounded bg-lime-400 text-white font-bold'>1</span>
        <button
          className='w-8 h-8 flex items-center justify-center border border-gray-200 rounded bg-white text-gray-400'
          disabled>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default NoticePage;
