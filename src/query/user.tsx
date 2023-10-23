import { Bookmark } from 'types/store/myInfoType';
import { axiosIns } from './axiosInstance';

interface Login {
  email: string;
  password: string;
}

interface SignUp extends Login {
  nickName: string;
}

interface Modify {
  nickName?: string;
  email?: string;
  pfp?: string;
}

export const userTestQuery = async () => {
  const data = await axiosIns.get('/users');
  return data;
};

export const loginQuery = async ({ email, password }: Login) => {
  const data = await axiosIns.post('/users/login', { email, password });
  return data;
};

export const signUpQuery = async ({ email, password, nickName }: SignUp) => {
  const data = await axiosIns.post('/users/signUp', { email, password, nickName });
  return data;
};

export const myInfoQuery = async () => {
  const { data } = await axiosIns.get('/users/me');
  return data;
};

export const myInfoModifyQuery = async (modify: Modify) => {
  const { data } = await axiosIns.post('/users/modifyUserInfo', modify);
  return data;
};

export const bookmarkQuery = async (bookmark: Bookmark) => {
  const { data } = await axiosIns.post('/users/bookmark', { ...bookmark });
};
