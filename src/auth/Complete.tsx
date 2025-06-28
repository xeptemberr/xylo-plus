const JoinComplete: React.FC = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6'>
      {/* 메인 컨텐츠 */}
      <div className='flex flex-col items-center justify-center flex-1 max-w-sm w-full'>
        {/* 로고 */}
        <div className='w-32 h-32 bg-lime-400 rounded-3xl flex items-center justify-center mb-12 shadow-lg'>
          <div className='text-black font-bold text-4xl'>
            <span className='inline-block transform -rotate-12'>x</span>
            <span className='inline-block'>y</span>
            <span className='text-2xl align-top'>+</span>
            <br />
            <span className='inline-block ml-2'>l</span>
            <span className='inline-block'>o</span>
          </div>
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
        <button className='w-full bg-black text-white py-4 rounded-2xl font-medium text-lg hover:bg-gray-800 transition-colors'>
          로그인 하기
        </button>
      </div>
    </div>
  );
};
export default JoinComplete;
