import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const notices = [
  {
    id: 1,
    title: '[알림] Xylo Plus 앱 정식 출시 안내',
    date: '09:00 06-30-2025',
    isNew: true,
    content: `안녕하세요. Xylo 팀입니다.\n\n2025년 7월 1일, Xylo Plus 모바일 앱이 정식 출시되었습니다. 이제 모바일 환경에서도 자산의 입출금, 스왑, 거래 내역 확인 등 다양한 기능을 더욱 빠르고 안전하게 이용하실 수 있습니다.\n새로운 UI/UX와 함께 향상된 보안 기능을 경험해보세요.\n\n■ 앱 주요 기능 소개\n• 다양한 디지털 자산 보유 내역 확인\n• 간편한 송금 및 수신 (QR 지원)\n• 실시간 시세 기반 스왑 기능\n• 필터 기능을 활용한 거래 내역 검색\n• DAO 및 리더보드 기능 지원\n\n■ 다운로드 안내\n• 구글 플레이스토어 및 애플 앱스토어에서 'Xylo Plus' 검색\n• 공식 홈페이지 내 QR코드 스캔을 통한 설치 가능\n\n■ 이용 유의사항\n• 앱 사용을 위해서는 최초 1회 KYC 인증이 필요합니다.\n• 기존 웹 서비스 계정으로 그대로 로그인 가능합니다.\n• 향후 기능 업데이트는 앱 공지사항을 통해 안내드릴 예정입니다.\n\nXylo Plus 앱을 통해 보다 직관적이고 효율적인 자산 관리를 시작해보세요.\n감사합니다.\n\nXylo 팀 드림`,
  },
  {
    id: 2,
    title: '[알림] 메뉴 기능 출시 일정 안내',
    date: '09:00 06-30-2025',
    isNew: true,
    content: `안녕하세요. Xylo 팀입니다.\n\n현재 앱 내 메뉴 기능은 구글 플레이 스토어와 애플 앱스토어 등록 승인 후 제공될 예정입니다.\n\n빠른 시일 내 안정적으로 업데이트할 수 있도록 준비 중이오니 조금만 기다려주시기 바랍니다.\n\n더 나은 서비스로 보답하겠습니다.\n감사합니다.\n\nXylo 팀 드림`,
  },
];

const NoticeDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const notice = notices.find((n) => String(n.id) === String(id));

  if (!notice) {
    return (
      <div className='min-h-screen flex items-center justify-center text-gray-400'>공지사항을 찾을 수 없습니다.</div>
    );
  }

  // 본문 파싱: 소제목(■), 리스트(•), 일반문단 구분
  const lines = notice.content.split('\n');

  return (
    <div className='min-h-screen bg-white max-w-sm mx-auto'>
      {/* Header */}
      <div className='flex items-center px-4 pt-6 pb-2'>
        <button onClick={() => navigate(-1)} className='mr-2 p-1'>
          <ChevronLeft className='w-6 h-6 text-gray-500' />
        </button>
        <h1 className='text-2xl font-bold text-gray-900 ml-1'>공지사항</h1>
      </div>

      {/* Notice Header */}
      <div className='px-4 mt-4'>
        <div className='flex items-center mb-1'>
          <span className='text-base font-medium text-gray-800'>{notice.title}</span>
          {notice.isNew && (
            <span className='ml-2 bg-lime-400 text-white text-xs font-bold rounded-full px-2 py-0.5'>N</span>
          )}
        </div>
        <div className='text-xs text-gray-400'>{notice.date}</div>
      </div>

      <div className='border-t border-gray-100 my-4' />

      {/* Notice Content */}
      <div className='px-4 pb-12 text-[15px] text-gray-800'>
        {lines.map((line, idx) => {
          if (line.startsWith('■')) {
            return (
              <div key={idx} className='font-bold text-[16px] text-gray-900 mt-5 mb-2'>
                <span className='text-lime-700 mr-2'>■</span>
                {line.replace('■', '').trim()}
              </div>
            );
          }
          if (line.startsWith('•')) {
            return (
              <div key={idx} className='flex items-start text-[15px] text-gray-800 mb-1 ml-2'>
                <span className='mr-2 text-lime-700 mt-0.5'>•</span>
                <span>{line.replace('•', '').trim()}</span>
              </div>
            );
          }
          if (line.trim() === '') {
            return <div key={idx} className='h-3' />;
          }
          return (
            <div key={idx} className='mb-2 whitespace-pre-line'>
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoticeDetailPage;
