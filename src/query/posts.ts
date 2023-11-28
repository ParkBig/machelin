import axios from 'axios';
import { takeToken } from 'util/tokenDB';

const axiosPosts = axios.create({
  baseURL: `${process.env.DEV_SERVER_URL}/posts`,
});

axiosPosts.interceptors.request.use(async config => {
  const token = await takeToken();
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});

interface ReportPostInput {
  postId: number;
  report: string;
}

interface TogglePostLikeDislikeInput {
  postId: number;
  which: 'like' | 'dislike';
}

export const getPostsQuery = async () => {};

export const usersPostsQuery = async (userId: number | undefined) => {
  if (!userId) {
    return;
  }

  const { data } = await axiosPosts.get('/usersPosts', {
    params: {
      userId,
    },
  });
  return data;
};

export const makePostQuery = async (makePostInput: FormData) => {
  const { data } = await axiosPosts.post('/makePost', makePostInput, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const togglePostLikeQuery = async (postId: number) => {
  const { data } = await axiosPosts.post('/togglePostLike', { postId });
  return data;
};

export const togglePostDislikeQuery = async (postId: number) => {
  const { data } = await axiosPosts.post('/togglePostDislike', { postId });
  return data;
};

export const togglePostLikeDislike = async ({ postId, which }: TogglePostLikeDislikeInput) => {
  const { data } = await axiosPosts.post('/togglePostLikeDislike', { postId, which });
  return data;
};

export const reportPostQuery = async (reportPostInput: ReportPostInput) => {
  const { data } = await axiosPosts.post('/reportPost', reportPostInput);
  return data;
};
