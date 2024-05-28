const URL = "http://localhost";
const PORT = 8000;

const API = {
  // 로그인
  signin: `${URL}:${PORT}/user/login/`,
  // 회원가입
  signup: `${URL}:${PORT}/user/register/`,
  // 마이페이지
  mypage: `${URL}:${PORT}/user/mypage`,
  //질문지리스트
  letterList: `${URL}:${PORT}/latter/question/`,
  // 답장 생성
  addAnswer: `${URL}:${PORT}/latter/answer/create/`,
  // 질문 답글 상세보기
  answer: `${URL}:${PORT}/latter/detail/`,
  // 모든 라이프리스트
  totalLifeList: `${URL}:${PORT}/ecommerce/performance/`,
  // 카테고리 별 라이프
  categoryLifeList: `${URL}:${PORT}/ecommerce/performance/category/`,
  // 라이프 상세보기
  lifeDetail: `${URL}:${PORT}/ecommerce/performance/detail/`,
};
export { API };
