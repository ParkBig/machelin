import { takeToken } from 'util/tokenDB';
import axios from 'axios';
import Constants from 'expo-constants';

export const createAxiosInstance = (endpoint: string) => {
  const axiosBase = axios.create({
    baseURL: `${Constants.expoConfig?.extra?.EXPO_DEV_SERVER_URL}/${endpoint}`,
  });

  axiosBase.interceptors.request.use(async config => {
    const token = await takeToken();
    if (token) {
      config.headers['token'] = token;
    }
    return config;
  });

  return axiosBase
};
