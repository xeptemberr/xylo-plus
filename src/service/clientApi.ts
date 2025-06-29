import axios from 'axios';
import { useSessionStore } from '../store/sessionStore';

const clientApi = axios.create({
  baseURL: `${process.env.REACT_APP_PROTOCOL || 'https'}://${process.env.REACT_APP_SERVER_URL || 'api.example.com'}`,
  timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '5000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

// 토큰 갱신 함수
export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await clientApi.post('/spc/api/fo/userlogin/refresh', {
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

// 자동 토큰 갱신 설정
let refreshInterval: NodeJS.Timeout | null = null;

export const startTokenRefresh = (intervalMinutes: number = 30) => {
  const { refreshToken, setAccessToken, setRefreshToken, clearSession } = useSessionStore.getState();

  if (!refreshToken) {
    console.log('refreshToken이 없어서 자동 갱신을 시작할 수 없습니다.');
    return;
  }

  // 기존 인터벌이 있다면 제거
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  // 설정된 분마다 토큰 갱신
  const intervalMs = intervalMinutes * 60 * 1000;
  refreshInterval = setInterval(async () => {
    try {
      console.log(`토큰 자동 갱신 시작... (${intervalMinutes}분 간격)`);
      const currentRefreshToken = useSessionStore.getState().refreshToken;

      if (!currentRefreshToken) {
        console.log('refreshToken이 없어서 갱신을 중단합니다.');
        stopTokenRefresh();
        return;
      }

      const newTokens = await refreshAccessToken(currentRefreshToken);

      // 새로운 토큰들 저장
      setAccessToken(newTokens.accessToken);
      if (newTokens.refreshToken) {
        setRefreshToken(newTokens.refreshToken);
      }

      console.log('토큰 갱신 성공');
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      // 토큰 갱신 실패 시 세션 클리어
      clearSession();
      stopTokenRefresh();
      // 로그인 페이지로 리다이렉트
      window.location.href = '/';
    }
  }, intervalMs);

  console.log(`자동 토큰 갱신이 시작되었습니다. (${intervalMinutes}분 간격)`);
};

export const stopTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
    console.log('자동 토큰 갱신이 중지되었습니다.');
  }
};

// 클라이언트용 인터셉터 설정
clientApi.interceptors.request.use(
  (config) => {
    const { accessToken } = useSessionStore.getState();

    // Authorization 헤더 추가
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// 응답 인터셉터 - 401 에러 시 토큰 갱신 시도
clientApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken, setAccessToken, setRefreshToken, clearSession } = useSessionStore.getState();

        if (!refreshToken) {
          throw new Error('refreshToken이 없습니다.');
        }

        const newTokens = await refreshAccessToken(refreshToken);

        // 새로운 토큰들 저장
        setAccessToken(newTokens.accessToken);
        if (newTokens.refreshToken) {
          setRefreshToken(newTokens.refreshToken);
        }

        // 원래 요청 재시도
        originalRequest.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;
        return clientApi(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);
        const { clearSession } = useSessionStore.getState();
        clearSession();
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// 토큰 갱신 테스트 함수 (개발용)
export const testTokenRefresh = async () => {
  try {
    const { refreshToken } = useSessionStore.getState();

    if (!refreshToken) {
      console.error('테스트 실패: refreshToken이 없습니다.');
      return false;
    }

    console.log('토큰 갱신 테스트 시작...');
    console.log('현재 refreshToken:', refreshToken.substring(0, 20) + '...');

    const newTokens = await refreshAccessToken(refreshToken);

    console.log('토큰 갱신 테스트 성공!');
    console.log('새로운 accessToken:', newTokens.accessToken.substring(0, 20) + '...');
    console.log('새로운 refreshToken:', newTokens.refreshToken?.substring(0, 20) + '...');

    return true;
  } catch (error) {
    console.error('토큰 갱신 테스트 실패:', error);
    return false;
  }
};

// 수동 토큰 갱신 함수
export const manualTokenRefresh = async () => {
  try {
    const { refreshToken, setAccessToken, setRefreshToken } = useSessionStore.getState();

    if (!refreshToken) {
      throw new Error('refreshToken이 없습니다.');
    }

    console.log('수동 토큰 갱신 시작...');
    const newTokens = await refreshAccessToken(refreshToken);

    // 새로운 토큰들 저장
    setAccessToken(newTokens.accessToken);
    if (newTokens.refreshToken) {
      setRefreshToken(newTokens.refreshToken);
    }

    console.log('수동 토큰 갱신 성공!');
    return true;
  } catch (error) {
    console.error('수동 토큰 갱신 실패:', error);
    return false;
  }
};

export default clientApi;
