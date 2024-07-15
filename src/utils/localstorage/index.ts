// 记录登录状态
export const setUserState = (status) => localStorage.setItem('userStatus', status);
// 获取登录状态
export const getUserState = () => localStorage.getItem('userStatus');

// 记录Token
export const setUserToken = (token) => localStorage.setItem('yyToken', token);

// 获取Token
export const getUserToken = () => localStorage.getItem('yyToken');

// 移除Token
export const removeUserToken = () => localStorage.removeItem('yyToken');

// 记录User
export const setUserInfo = (user) => localStorage.setItem('yyUser', JSON.stringify(user));

// 获取User
export const getUserInfo = () => JSON.parse(localStorage.getItem('yyUser'));
