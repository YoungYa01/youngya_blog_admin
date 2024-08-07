import { getUserToken } from '@/utils/localstorage';

export default function checkLogin() {
  return localStorage.getItem('userStatus') === 'login' || !!getUserToken();
}
