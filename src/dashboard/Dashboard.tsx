import {
  ArrowDownFromLine,
  ArrowRightLeft,
  ArrowUpFromLine,
  Check,
  ChevronRight,
  Copy,
  FileClock,
  Headphones,
  LogOut,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InquiryModal from '../components/InquiryModal';
import LockupModal from '../components/LockupModal';
import { fetchUserDashboardInfo, fetchUserInfo } from '../service/api';
import { startTokenRefresh, stopTokenRefresh } from '../service/clientApi';
import { useSessionStore } from '../store/sessionStore';

const Dashboard: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState('');
  const { user, dashboard, clearSession, accessToken, setUser, setDashboard } = useSessionStore();
  const navigate = useNavigate();
  const [lockupModalOpen, setLockupModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);

  // 컴포넌트 마운트 시 자동 토큰 갱신 시작
  useEffect(() => {
    startTokenRefresh();

    // 컴포넌트 언마운트 시 자동 갱신 중지
    return () => {
      stopTokenRefresh();
    };
  }, []);

  // Dashboard 진입 시 userInfo fetch
  useEffect(() => {
    if (accessToken && !user) {
      fetchUserInfo(accessToken).then(setUser);
      fetchUserDashboardInfo(accessToken).then(setDashboard);
    }
  }, [accessToken, user, setUser, setDashboard]);

  const handleCopyAddress = (type: React.SetStateAction<string>, address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(type);
    setTimeout(() => setCopiedAddress(''), 2000);
  };

  const handleLogout = () => {
    stopTokenRefresh(); // 로그아웃 시 자동 갱신 중지
    clearSession();
    navigate('/');
  };

  const notifications = [
    {
      id: 1,
      type: 'announcement',
      title: '[공지] Xylo Plus 앱 정식 출시 안내',
      date: '09:00 06-30-2025',
      icon: '📢',
    },
    {
      id: 2,
      type: 'announcement',
      title: '[알림] 메뉴 기능 출시 일정 안내',
      date: '09:10 06-30-2025',
      icon: '📢',
    },
  ];

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <span className='text-gray-400 text-lg'>사용자 정보를 불러오는 중...</span>
      </div>
    );
  }

  console.log('로그인 유저 정보', user);
  console.log('로그인 유저 대시보드 정보', dashboard);

  return (
    <div className='min-h-screen bg-gray-50 max-w-sm mx-auto relative'>
      {/* Toast Notification */}
      {copiedAddress && (
        <div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50'>
          <div className='bg-black text-white px-4 py-3 rounded-lg flex items-center space-x-2 shadow-lg'>
            <Check className='w-4 h-4 text-green-400' />
            <span className='text-sm font-medium'>복사되었습니다</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className='bg-white px-4 py-4 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <img src='/logo_dash.png' alt='logo' className='w-[157px] h-[26px]' />
        </div>
        <div className='flex items-center space-x-3'>
          <button
            className='text-black hover:text-gray-800 transition-colors'
            onClick={() => setInquiryModalOpen(true)}>
            <Headphones className='w-6 h-6 text-black' />
          </button>
          <button onClick={handleLogout} className='text-black hover:text-gray-800 transition-colors'>
            <LogOut className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      <div className='bg-white px-4 pb-4'>
        <div className='flex items-center space-x-2'>
          <span className='text-sm text-gray-700'>{user?.userId || '사용자'} 회원님, 환영합니다!</span>
          <span className='text-lg'>👋</span>
        </div>
      </div>

      {/* Balance Card */}
      <div className='mx-4 mt-4 bg-gradient-to-b from-gray-600 to-gray-900 rounded-xl shadow-lg rounded-2xl p-6 text-white'>
        <div className='text-center mb-6'>
          <div className='text-sm text-gray-300 mb-2'>총 자산</div>
          <div className='text-4xl font-bold mb-2'>$ {user.xltPrice.toLocaleString()}</div>
          <div className='flex items-center justify-center space-x-2'>
            {/* <span className='text-sm'>+ $730.25</span> */}
            {/* <span className='text-green-400 text-sm flex items-center'>▲ 9.04%</span> */}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-between'>
          <button className='flex flex-col items-center space-y-2' onClick={() => setLockupModalOpen(true)}>
            <div className='w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center'>
              <ArrowUpFromLine className='w-6 h-6 text-white' />
            </div>
            <span className='text-xs text-gray-300'>보내기</span>
          </button>
          <button className='flex flex-col items-center space-y-2' onClick={() => setLockupModalOpen(true)}>
            <div className='w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center'>
              <ArrowRightLeft className='w-6 h-6 text-white' />
            </div>
            <span className='text-xs text-gray-300'>스왑하기</span>
          </button>
          <button className='flex flex-col items-center space-y-2' onClick={() => setLockupModalOpen(true)}>
            <div className='w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center'>
              <ArrowDownFromLine className='w-6 h-6 text-white' />
            </div>
            <span className='text-xs text-gray-300'>받기</span>
          </button>
          <button className='flex flex-col items-center space-y-2' onClick={() => setLockupModalOpen(true)}>
            <div className='w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center'>
              <FileClock className='w-6 h-6 text-black' />
            </div>
            <span className='text-xs text-gray-300'>히스토리</span>
          </button>
        </div>
      </div>

      {/* Token Information */}
      <div className='mx-4 mt-6'>
        <h3 className='text-lg font-bold text-gray-900 mb-4'>토큰 정보</h3>

        {/* QR Code and Addresses */}
        <div className='bg-white rounded-xl p-4 mb-4'>
          <div className='flex items-start space-x-4'>
            {/* QR Code */}
            <div className='w-16 h-16 bg-white rounded-lg flex items-center justify-center'>
              <div className='w-12 h-12'>
                <img src='/token_qr.png' alt='QR CODE' />
              </div>
            </div>

            {/* Address Info */}
            <div className='flex-1'>
              <div className='mb-3'>
                <div className='text-sm font-medium text-gray-900 mb-1'>Token Address</div>
                <div className='flex items-center justify-between'>
                  <div className='text-xs text-gray-500 truncate mr-2'>XLTMy69uUrDzWBa9JX1xq***</div>
                  <button className='text-gray-400 hover:text-gray-600' onClick={() => setLockupModalOpen(true)}>
                    <Copy className='w-4 h-4' />
                  </button>
                  {/* <button
                    onClick={() => handleCopyAddress('token', 'XLTMy69uUrDzWBa9JX1xq')}
                    className='text-gray-400 hover:text-gray-600'>
                    <Copy className='w-4 h-4' />
                  </button> */}
                </div>
              </div>

              <div>
                <div className='text-sm font-medium text-gray-900 mb-1'>Wallet Address</div>
                <div className='flex items-center justify-between'>
                  <div className='text-xs text-gray-500'>락업 해제 후 활성화됩니다.</div>
                  <button className='text-gray-400 hover:text-gray-600' onClick={() => setLockupModalOpen(true)}>
                    <Copy className='w-4 h-4' />
                  </button>
                  {/* <button
                    onClick={() => handleCopyAddress('wallet', 'wallet-address')}
                    className='text-gray-400 hover:text-gray-600'>
                    <Copy className='w-4 h-4' />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assets List */}
        <h3 className='text-lg font-bold text-gray-900 mb-4'>내 자산</h3>

        <div className='space-y-3'>
          <div className='bg-white rounded-xl p-4 flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}>
                <img src={`./icon_token1.png`} alt='XLT' className='w-10 h-10' />
              </div>
              <div>
                <div className='font-bold text-gray-900'>XLT</div>
                <div className='text-xs text-gray-500'>Xylo Token</div>
              </div>
            </div>
            <div className='text-right'>
              <div className='font-bold text-gray-900'>{user.xltAmount.toLocaleString()}</div>
              <div className='text-xs text-gray-500'>${user.xltPrice.toLocaleString()}</div>
            </div>
          </div>
          <div className='bg-white rounded-xl p-4 flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}>
                <img src={`./icon_token2.png`} alt='XUSD' className='w-10 h-10' />
              </div>
              <div>
                <div className='font-bold text-gray-900'>XUSD</div>
                <div className='text-xs text-gray-500'>Xylo Stable Coin </div>
              </div>
            </div>
            <div className='text-right'>
              <div className='font-bold text-gray-900'>{user.xusdAmount.toLocaleString()}</div>
              <div className='text-xs text-gray-500'>${user.xusdPrice.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <h3 className='text-lg font-bold text-gray-900 mb-4 mt-8'>공지사항</h3>

        <div className='space-y-3'>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className='bg-white rounded-xl p-4 cursor-pointer hover:bg-gray-50 transition'
              onClick={() => navigate(`/notice/${notification.id}`)}>
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='w-8 h-8 bg-lime-400 rounded-full flex items-center justify-center'>📢</div>
                  <div className='flex-1'>
                    <div className='text-sm font-medium text-gray-900 mb-1'>{notification.title}</div>
                    <div className='text-xs text-gray-500'>{notification.date}</div>
                  </div>
                </div>
                <ChevronRight className='w-5 h-5 text-gray-400' />
              </div>
            </div>
          ))}
        </div>
      </div>
      <LockupModal open={lockupModalOpen} onClose={() => setLockupModalOpen(false)} />
      <InquiryModal open={inquiryModalOpen} onClose={() => setInquiryModalOpen(false)} />
      <div className='h-8'></div>
    </div>
  );
};
export default Dashboard;
