import axios from 'axios';
import { takeToken } from 'util/tokenDB';
import Constants from 'expo-constants';

export const axiosStamps = axios.create({
  baseURL: `${Constants.manifest?.extra?.EXPO_PROD_SERVER_URL}/stamps`,
});

axiosStamps.interceptors.request.use(async config => {
  const token = await takeToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});

export const usersStampQuery = async () => {
  const { data } = await axiosStamps.get('/usersStamp');
  return data;
};

export const makeStampQuery = async (makeStampInput: FormData) => {
  const { data } = await axiosStamps.post('/makeStamp', makeStampInput, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteStampQuery = async (id: number) => {
  const { data } = await axiosStamps.delete('/deleteStamp', {
    params: {
      id,
    },
  });
  return data;
};
