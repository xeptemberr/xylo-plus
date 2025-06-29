import { useNavigate } from 'react-router-dom';

const JoinComplete: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6'>
      {/* 메인 컨텐츠 */}
      <div className='flex flex-col items-center justify-center flex-1 max-w-sm w-full'>
        <div className='flex justify-center items-center mb-4'>
          <img src='/logo.png' alt='logo' className='w-[108px] h-[108px]' />
        </div>
        {/* 환영 메시지 */}
        <div className='text-center mb-16'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            XYLO PLUS에 오신걸
            <br />
            환영합니다!
          </h1>
          <div className='text-gray-500 text-sm leading-relaxed'>
            <p>회원가입에 성공하셨습니다.</p>
            <p>새로운 인연을 통해 보상을 얻어가세요.</p>
          </div>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <div className='w-full max-w-sm pb-12'>
        <button
          className='w-full bg-black text-white py-4 rounded-2xl font-medium text-lg hover:bg-gray-800 transition-colors'
          onClick={() => navigate('/')}>
          로그인 하기
        </button>
      </div>
    </div>
  );
};
export default JoinComplete;
