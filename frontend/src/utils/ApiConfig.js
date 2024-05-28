const URL = "http://localhost";
const PORT = 8000;

const API = {
  signin: `${URL}:${PORT}/auth/token`,
  signup: `${URL}:${PORT}/auth/user`,
  updatePW: `${URL}:${PORT}/auth/user/password`,
  deleteAccount: `${URL}:${PORT}/auth/user`,
  userpage: `${URL}:${PORT}/auth/userInfo/userPage`,
  category: `${URL}:${PORT}/nb/category`,
  post: `${URL}:${PORT}/nb/post`,
  comment: `${URL}:${PORT}/nb/comment`,
  admin: `${URL}:${PORT}/auth/admin`,
  likes: `${URL}:${PORT}/nb/like`,
  alert: `${URL}:${PORT}/nb/alert`,
  search: `${URL}:${PORT}/nb/search`,
  upload: `${URL}:${PORT}/image/upload`,
  user: `${URL}:${PORT}/auth/user/info`,
};
export { API };
