// apiServer.ts (서버 전용 파일)
'use server';

import axios from 'axios';
import { cookies, getSession } from '../store/sessionStore';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_PROTOCOL || 'https'}://${process.env.REACT_APP_SERVER_URL || 'api.example.com'}`,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '5000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 갱신 함수
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await api.post('/spc/api/fo/userlogin/refresh', {
      refreshToken: refreshToken,
    });

    if (response.data.resultCode === 'success') {
      return response.data.data;
    } else {
      throw new Error('토큰 갱신 실패');
    }
  } catch (error) {
    console.error('토큰 갱신 중 오류:', error);
    throw error;
  }
};
// 서버 전용 인터셉터 설정
api.interceptors.request.use(
  async (config) => {
    const session = await getSession(); // 세션에서 토큰 가져오기
    const lang = cookies().get('lang')?.value; // 쿠키에서 언어 가져오기

    // Authorization 헤더 추가
    if (session?.accessToken) {
      config.headers['Authorization'] = `Bearer ${session.accessToken}`;
    }

    // Accept-Language 헤더 추가
    if (lang) {
      config.headers['Accept-Language'] = lang;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
