import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

interface LoginFormData {
  phone: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("로그인 데이터:", data);
    // 실제 로그인 로직 구현
    alert("로그인 성공!");
  };

  const phone = watch("phone");
  const password = watch("password");
  const hasValues = phone && password;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">
          {/* Logo and Title Section */}
          <div className="text-center mb-12">
            {/* Logo */}
            <div className="w-24 h-24 bg-lime-400 rounded-2xl mx-auto mb-8 flex items-center justify-center relative">
              <div className="text-black font-bold text-3xl">
                <span className="inline-block transform -rotate-12">x</span>
                <span className="inline-block">y</span>
                <span className="inline-block transform rotate-12">l</span>
                <span className="inline-block">o</span>
              </div>
              <div className="absolute top-2 right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <span className="text-lime-400 text-lg font-bold">+</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl font-bold text-gray-800 mb-2">Earn with</h1>
            <h1 className="text-xl font-bold text-gray-800 mb-4">
              Every Connection
            </h1>
            <p className="text-sm text-gray-400">Rewards through XYLO PLUS</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
              로그인
            </h2>

            {/* Phone Field */}
            <div>
              <input
                type="tel"
                {...register("phone", {
                  required: "전화번호를 입력해주세요",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "올바른 전화번호를 입력해주세요",
                  },
                })}
                className={`w-full px-4 py-4 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none ${
                  errors.phone
                    ? "border-red-300 focus:border-red-500"
                    : "border-gray-200 focus:border-gray-300"
                }`}
                placeholder="전화번호"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "비밀번호를 입력해주세요",
                    minLength: {
                      value: 6,
                      message: "비밀번호는 6자 이상이어야 합니다",
                    },
                  })}
                  className={`w-full px-4 py-4 pr-12 border rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none ${
                    errors.password
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-gray-300"
                  }`}
                  placeholder="비밀번호"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Links */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                className="text-gray-600 text-sm underline"
                onClick={() => alert("비밀번호 찾기 페이지로 이동")}
              >
                비밀번호를 잊으셨나요?
              </button>
              <button
                type="button"
                className="text-gray-900 text-sm font-medium"
                onClick={() => navigate("/auth/join")}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Login Button - Fixed at bottom */}
      <div className="px-6 pb-8 bg-gray-50">
        <button
          type="submit"
          disabled={!hasValues}
          className={`w-full py-4 font-medium text-lg rounded-xl transition-colors ${
            hasValues
              ? "bg-black text-white hover:bg-gray-800 active:bg-gray-900"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          onClick={handleSubmit(onSubmit)}
        >
          로그인 하기
        </button>
      </div>
    </div>
  );
};

export default Login;
