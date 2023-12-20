import axios from 'axios';
import { takeToken } from 'util/tokenDB';

const axiosStamps = axios.create({
  baseURL: `${process.env.EXPO_DEV_SERVER_URL}/stamps`,
});

axiosStamps.interceptors.request.use(async config => {
  const token = await takeToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});

interface MakeStampInput {
  restaurantId: string;
  lat: number;
  lng: number;
  restaurantName: string;
  address: string;
  rating: number;
  totalRatings: number;
}

export const usersStampQuery = async () => {
  const { data } = await axiosStamps.get('/usersStamp');
  return data;
}

export const makeStampQuery = async (makeStampInput: MakeStampInput) => {
  const { data } = await axiosStamps.post('/makeStamp', makeStampInput);
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
