import axios from 'axios';
import { takeToken } from 'util/tokenDB';
import Constants from 'expo-constants';

export const axiosComments = axios.create({
  baseURL: `${Constants.manifest?.extra?.s}/comments`,
});

axiosComments.interceptors.request.use(async config => {
  const token = await takeToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});

interface MakeCommentQueryInput {
  postId: number;
  comment: string;
}

export const postsCommentsQuery = async (postId: number) => {
  const { data } = await axiosComments.get('/postsComments', {
    params: {
      postId,
    },
  });
  return data;
};

export const makeCommentQuery = async ({ postId, comment }: MakeCommentQueryInput) => {
  const { data } = await axiosComments.post('/makeComment', { postId, comment });
  return data;
};
