import axios from 'axios';
import { takeToken } from 'util/tokenDB';

export const axiosIns = axios.create({
  baseURL: `${process.env.DEV_SERVER_URL}`,
});

axiosIns.interceptors.request.use(async config => {
  const token = await takeToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});
