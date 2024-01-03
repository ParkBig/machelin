import { createAxiosInstance } from './api';

export const axiosStamps = createAxiosInstance('stamps');

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
