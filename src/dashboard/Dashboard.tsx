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
import LockupModal from '../components/LockupModal';
import { startTokenRefresh, stopTokenRefresh } from '../service/clientApi';
import { useSessionStore } from '../store/sessionStore';

const Dashboard: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user, clearSession } = useSessionStore();
  const navigate = useNavigate();
  const [showLockupModal, setShowLockupModal] = useState(false);
  const [lockupModalOpen, setLockupModalOpen] = useState(false);

  // 컴포넌트 마운트 시 자동 토큰 갱신 시작
  useEffect(() => {
    startTokenRefresh();

    // 컴포넌트 언마운트 시 자동 갱신 중지
    return () => {
      stopTokenRefresh();
    };
  }, []);

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

  const assets = [
    {
      id: 1,
      name: 'USDT',
      fullName: 'Tether USD',
      amount: '1,500',
      value: '$ 1,500',
      icon: '💵',
      color: 'bg-green-500',
    },
    {
      id: 2,
      name: 'XLT',
      fullName: 'Xylo Token',
      amount: '333,000',
      value: '$ 9,900',
      icon: '⚫',
      color: 'bg-black',
    },
    {
      id: 3,
      name: 'XUSD',
      fullName: 'Xylo Stable Coin',
      amount: '2,000',
      value: '$ 2,000',
      icon: '💰',
      color: 'bg-yellow-500',
    },
  ];

  const notifications = [
    {
      id: 1,
      type: 'announcement',
      title: '[공지] Xylo Plus 앱 정식 출시 안내',
      date: '09:00 31.07-24-2025',
      icon: '📢',
    },
  ];

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
          <Headphones className='w-6 h-6 text-black' />
          <button onClick={handleLogout} className='text-black hover:text-gray-800 transition-colors'>
            <LogOut className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      <div className='bg-white px-4 pb-4'>
        <div className='flex items-center space-x-2'>
          <span className='text-sm text-gray-700'>{user?.phone || '사용자'} 회원님, 환영합니다!</span>
          <span className='text-lg'>👋</span>
        </div>
      </div>

      {/* Balance Card */}
      <div className='mx-4 mt-4 bg-gradient-to-b from-gray-600 to-gray-900 rounded-xl shadow-lg rounded-2xl p-6 text-white'>
        <div className='text-center mb-6'>
          <div className='text-sm text-gray-300 mb-2'>총 자산</div>
          <div className='text-4xl font-bold mb-2'>$13,490</div>
          <div className='flex items-center justify-center space-x-2'>
            <span className='text-sm'>+ $730.25</span>
            <span className='text-green-400 text-sm flex items-center'>▲ 9.04%</span>
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
            <div className='w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center'>
              <div className='w-12 h-12 bg-black'></div>
            </div>

            {/* Address Info */}
            <div className='flex-1'>
              <div className='mb-3'>
                <div className='text-sm font-medium text-gray-900 mb-1'>Token Address</div>
                <div className='flex items-center justify-between'>
                  <div className='text-xs text-gray-500 truncate mr-2'>XLTMy69uUrDzWBa9JX1xq***</div>
                  <button className='text-gray-400 hover:text-gray-600'>
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
                  <button className='text-gray-400 hover:text-gray-600'>
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
          {assets.map((asset) => (
            <div key={asset.id} className='bg-white rounded-xl p-4 flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div
                  className={`w-10 h-10 ${asset.color} rounded-full flex items-center justify-center text-white font-bold`}>
                  {asset.icon}
                </div>
                <div>
                  <div className='font-bold text-gray-900'>{asset.name}</div>
                  <div className='text-xs text-gray-500'>{asset.fullName}</div>
                </div>
              </div>
              <div className='text-right'>
                <div className='font-bold text-gray-900'>{asset.amount}</div>
                <div className='text-xs text-gray-500'>{asset.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <h3 className='text-lg font-bold text-gray-900 mb-4 mt-8'>공지사항</h3>

        <div className='space-y-3'>
          {notifications.map((notification) => (
            <div key={notification.id} className='bg-white rounded-xl p-4'>
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
      <div className='h-8'></div>
    </div>
  );
};
export default Dashboard;
