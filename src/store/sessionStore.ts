import Cookies from 'js-cookie';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  dashboard: any | null;
  lang: string;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUser: (user: any) => void;
  setDashboard: (dashboardInfo: any) => void;
  setLang: (lang: string) => void;
  clearSession: () => void;
  getSession: () => { accessToken: string | null; refreshToken: string | null; user: any | null };
  getLang: () => string;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      dashboard: null,
      lang: 'ko',

      setAccessToken: (token: string) => {
        set({ accessToken: token });
        // 쿠키에도 저장 (선택사항)
        Cookies.set('accessToken', token, { expires: 7 }); // 7일간 유지
      },
      setRefreshToken: (token: string) => {
        set({ refreshToken: token });
      },
      setUser: (user: any) => {
        set({ user });
      },
      setDashboard: (dashboard: any) => {
        set({ dashboard });
      },
      setLang: (lang: string) => {
        set({ lang });
        Cookies.set('lang', lang, { expires: 365 }); // 1년간 유지
      },

      clearSession: () => {
        set({ accessToken: null, refreshToken: null, user: null });
        Cookies.remove('accessToken');
      },

      getSession: () => {
        const state = get();
        return {
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          user: state.user,
        };
      },

      getLang: () => {
        const state = get();
        return state.lang;
      },
    }),
    {
      name: 'session-storage', // localStorage 키 이름
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        dashboard: state.dashboard,
        lang: state.lang,
      }),
    },
  ),
);

// 서버 사이드에서 사용할 수 있는 유틸리티 함수들
export const getSession = () => {
  // 브라우저 환경에서만 실행
  if (typeof window !== 'undefined') {
    const state = useSessionStore.getState();
    return {
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      user: state.user,
    };
  }
  return { accessToken: null, refreshToken: null, user: null };
};

export const getLang = () => {
  if (typeof window !== 'undefined') {
    return useSessionStore.getState().lang;
  }
  return 'ko'; // 기본값
};

export const cookies = () => ({
  get: (name: string) => {
    if (typeof window !== 'undefined') {
      const value = Cookies.get(name);
      return value ? { value } : undefined;
    }
    return undefined;
  },
});
