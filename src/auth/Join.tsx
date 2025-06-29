import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import VerificationModal from '../components/VerificationModal';
import api from '../service/api';

interface FormData {
  mobilePhone: string;
  password: string;
  passwordChk: string;
  verifiedCode?: string;
}

const Join: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedCode, setVerifiedCode] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const response = await api.post('/spc/api/fo/v2/signup/setUserInfo', {
      ...data,
      authCode: verifiedCode,
    });
    console.log('회원가입 응답:', response.data);
    if (response.data.resultCode === 'failed') {
      alert('회원가입에 실패했습니다.');
    } else {
      alert('회원가입에 성공했습니다.');
      navigate('/auth/complete');
    }
  };

  const mobilePhone = watch('mobilePhone');
  const password = watch('password');
  const passwordChk = watch('passwordChk');
  const hasValues = mobilePhone && password && passwordChk;

  const sendVerificationCode = async () => {
    if (!mobilePhone || !/^[0-9-]+$/.test(mobilePhone)) {
      setSendResult('올바른 전화번호를 입력하세요.');
      return;
    }
    setIsSending(true);
    setSendResult(null);
    try {
      const response = await api.post('/spc/api/fo/v2/signup/auth/authCode', {
        email: '',
        mobilePhone: mobilePhone,
        typeCode: 'SMS',
      });
      if (response.data.resultCode === 'success') {
        setSendResult('인증번호가 발송되었습니다.');
        setVerificationOpen(true);
      } else {
        setSendResult(response.data.message || '인증번호 발송에 실패했습니다.');
      }
    } catch (e) {
      setSendResult('인증번호 발송 중 오류가 발생했습니다.');
    }
    setIsSending(false);
  };

  const handleResend = async () => {
    setIsResending(true);
    await sendVerificationCode();
    setIsResending(false);
  };

  const handleVerify = (code: string) => {
    setIsVerified(true);
    setVerifiedCode(code);
    setVerificationOpen(false);
  };

  const canSubmit = hasValues && isVerified;

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      {/* Back Button */}
      <div className='pt-6 pb-4 px-6'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center text-gray-600 hover:text-gray-900 transition-colors'>
          <ArrowLeft className='w-5 h-5 mr-2' />
        </button>
      </div>

      {/* Content */}
      <div className='flex-1 flex items-center justify-center px-6 py-8'>
        <div className='w-full max-w-sm'>
          {/* Logo and Title Section */}
          <div className='text-center mb-12'>
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
            <h2 className='text-lg font-bold text-gray-900 mb-6 text-center'>회원가입</h2>

            {/* ID Field */}
            <div>
              <label className='block text-sm font-medium text-gray-900 mb-3'>아이디</label>
              <div className='flex space-x-2'>
                <input
                  type='text'
                  {...register('mobilePhone', {
                    required: '아이디를 입력해주세요',
                    pattern: {
                      value: /^[0-9-]+$/,
                      message: '전화번호 형식으로 입력해주세요',
                    },
                  })}
                  className='w-full px-4 py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none'
                  placeholder='전화번호를 입력하세요'
                />
                <button
                  type='button'
                  onClick={sendVerificationCode}
                  disabled={isSending || !mobilePhone || !!errors.mobilePhone}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${
                    isSending || !mobilePhone || !!errors.mobilePhone
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800 active:bg-gray-900'
                  }`}>
                  {isSending ? '발송중...' : '인증번호 받기'}
                </button>
              </div>
              {errors.mobilePhone && <p className='text-red-500 text-sm mt-1'>{errors.mobilePhone.message}</p>}
              {sendResult && <p className='text-sm mt-1 text-gray-600'>{sendResult}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className='block text-sm font-medium text-gray-900 mb-3'>패스워드</label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: '비밀번호를 입력해주세요',
                    minLength: {
                      value: 6,
                      message: '비밀번호는 최소 6자 이상이어야 합니다',
                    },
                  })}
                  className='w-full px-4 py-4 pr-12 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none'
                  placeholder='비밀번호를 입력하세요'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
              {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('passwordChk', {
                    required: '비밀번호를 한번 더 입력해주세요',
                    validate: (value) => value === password || '비밀번호가 일치하지 않습니다',
                  })}
                  className='w-full px-4 py-4 pr-12 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none'
                  placeholder='한번 더 입력하세요'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400'>
                  {showConfirmPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                </button>
              </div>
              {errors.passwordChk && <p className='text-red-500 text-sm mt-1'>{errors.passwordChk.message}</p>}
            </div>
          </form>
        </div>
      </div>

      {/* Sign Up Button - Fixed at bottom */}
      <div className='px-6 pb-8 bg-gray-50'>
        <button
          type='submit'
          disabled={!canSubmit}
          className={`w-full py-4 font-medium text-lg rounded-xl transition-colors ${
            canSubmit
              ? 'bg-black text-white hover:bg-gray-800 active:bg-gray-900'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSubmit(onSubmit)}>
          가입하기
        </button>
      </div>

      {/* Verification Modal */}
      <VerificationModal
        open={verificationOpen}
        onClose={() => setVerificationOpen(false)}
        onResend={handleResend}
        onVerify={handleVerify}
        isResending={isResending}
      />
    </div>
  );
};

export default Join;
