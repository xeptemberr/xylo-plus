import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface FormData {
  id: string;
  password: string;
  confirmPassword: string;
}

const Join: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Add your form submission logic here
    navigate('/auth/complete');
  };

  const id = watch('id');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const hasValues = id && password && confirmPassword;

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
            {/* Logo */}
            <div className='w-24 h-24 bg-lime-400 rounded-2xl mx-auto mb-8 flex items-center justify-center relative'>
              <div className='text-black font-bold text-3xl'>xy</div>
              <div className='absolute top-2 right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center'>
                <span className='text-lime-400 text-lg font-bold'>+</span>
              </div>
            </div>

            {/* Title */}
            <h1 className='text-xl font-bold text-gray-900 mb-1'>Earn with</h1>
            <h1 className='text-xl font-bold text-gray-900 mb-3'>Every Connection</h1>
            <p className='text-sm text-gray-500'>Rewards through XYLO PLUS</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <h2 className='text-lg font-bold text-gray-900 mb-6 text-center'>회원가입</h2>

            {/* ID Field */}
            <div>
              <label className='block text-sm font-medium text-gray-900 mb-3'>아이디</label>
              <input
                type='text'
                {...register('id', {
                  required: '아이디를 입력해주세요',
                  pattern: {
                    value: /^[0-9-]+$/,
                    message: '전화번호 형식으로 입력해주세요',
                  },
                })}
                className='w-full px-4 py-4 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-gray-300 focus:outline-none'
                placeholder='전화번호를 입력하세요'
              />
              {errors.id && <p className='text-red-500 text-sm mt-1'>{errors.id.message}</p>}
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
                  {...register('confirmPassword', {
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
              {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword.message}</p>}
            </div>
          </form>
        </div>
      </div>

      {/* Sign Up Button - Fixed at bottom */}
      <div className='px-6 pb-8 bg-gray-50'>
        <button
          type='submit'
          disabled={!hasValues}
          className={`w-full py-4 font-medium text-lg rounded-xl transition-colors ${
            hasValues
              ? 'bg-black text-white hover:bg-gray-800 active:bg-gray-900'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSubmit(onSubmit)}>
          가입하기
        </button>
      </div>
    </div>
  );
};

export default Join;
