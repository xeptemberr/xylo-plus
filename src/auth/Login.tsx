import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import api from '../service/api';
import { startTokenRefresh } from '../service/clientApi';
import { useSessionStore } from '../store/sessionStore';
import '../styles/Auth.css';

interface LoginFormData {
  userId: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken, setUser, setRefreshToken } = useSessionStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await api.post('/spc/api/fo/userlogin/login', data);
      console.log('로그인 응답:', response.data);

      // API 응답 구조 확인을 위한 로그
      console.log('resultCode:', response.data.resultCode);
      console.log('전체 응답 데이터:', response.data);

      if (response.data.resultCode === 'failed') {
        alert('로그인에 실패했습니다.');
        if (response.data.errCode === 'NO_USER_INFO') {
          alert('회원가입이 필요합니다.');
        }
      } else if (response.data.resultCode === 'success') {
        const { accessToken, refreshToken } = response.data.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        startTokenRefresh();
        navigate('/home');
      } else {
        // resultCode가 'success'가 아닌 다른 값인 경우도 처리
        console.log('예상치 못한 resultCode:', response.data.resultCode);
        // 일단 성공으로 간주하고 진행
        const { accessToken, refreshToken, user } = response.data.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);
        startTokenRefresh();
        navigate('/home');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const userId = watch('userId');
  const password = watch('password');
  const hasValues = userId && password;

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      {/* Content */}
      <div className='flex-1 flex items-center justify-center px-6 py-8'>
        <div className='w-full max-w-sm'>
          {/* Logo and Title Section */}
          <div className='text-center mb-12'>
            {/* Logo */}
            <div className='flex justify-center items-center mb-4'>
              <img src='/logo.png' alt='logo' className='w-[108px] h-[108px]' />
            </div>

            {/* Title */}
            <h1 className='text-xl font-bold text-gray-800 mb-2'>
              Earn with <br />
              Every Connection
            </h1>
            <p className='text-sm text-gray-400'>Rewards through XYLO PLUS</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <h2 className='text-xl font-bold text-gray-900 text-center mb-8'>로그인</h2>

            {/* Phone Field */}
            <div>
              <input
                type='tel'
                {...register('userId', {
                  required: '전화번호를 입력해주세요',
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: '올바른 전화번호를 입력해주세요',
                  },
                })}
                className={`w-full px-4 py-4 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none ${
                  errors.userId ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-300'
                }`}
                placeholder='전화번호'
              />
              {errors.userId && <p className='text-red-500 text-sm mt-2'>{errors.userId.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: '비밀번호를 입력해주세요',
                    minLength: {
                      value: 6,
                      message: '비밀번호는 6자 이상이어야 합니다',
                    },
                  })}
                  className={`w-full px-4 py-4 pr-12 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none ${
                    errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-300'
                  }`}
                  placeholder='비밀번호'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
              {errors.password && <p className='text-red-500 text-sm mt-2'>{errors.password.message}</p>}
            </div>

            {/* Links */}
            <div className='flex justify-end items-center pt-2'>
              {/* <button
                type='button'
                className='text-gray-600 text-sm underline'
                onClick={() => alert('비밀번호 찾기 페이지로 이동')}>
                비밀번호를 잊으셨나요?
              </button> */}
              <button
                type='button'
                className='text-gray-900 text-sm font-bold underline'
                onClick={() => navigate('/auth/join')}>
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Login Button - Fixed at bottom */}
      <div className='px-6 pb-8 bg-gray-50'>
        <button
          type='submit'
          disabled={!hasValues || isLoading}
          className={`w-full py-4 font-medium text-lg rounded-xl transition-colors ${
            hasValues && !isLoading
              ? 'bg-black text-white hover:bg-gray-800 active:bg-gray-900'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSubmit(onSubmit)}>
          {isLoading ? '로그인 중...' : '로그인 하기'}
        </button>
      </div>
    </div>
  );
};

export default Login;
