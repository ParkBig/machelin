import axios from 'axios';
import { IPost } from 'types/store/myInfoType';
import { takeToken } from 'util/tokenDB';

const axiosPosts = axios.create({
  baseURL: `${process.env.EXPO_DEV_SERVER_URL}/posts`,
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

export interface PostQueryResponse {
  ok: boolean;
  posts: IPost[];
  msg: string;
  nextPage: number | null;
}

export const neighborhoodPostsQuery = async (subLocality: string, page: number = 1) => {
  const { data } = await axiosPosts.get('/neighborhoodPosts', {
    params: {
      subLocality,
      page,
    },
  });

  return data;
};

export const usersPostsQuery = async (targetId: number | undefined, myId: number | undefined, page: number = 1) => {
  if (!targetId) {
    return { ok: true, posts: null };
  }

  const { data } = await axiosPosts.get('/usersPosts', {
    params: {
      targetId,
      myId,
      page,
    },
  });
  return data;
};

export const usersPostForMyMapQuery = async (userId: number | undefined) => {
  if (!userId) {
    return { ok: true, posts: null };
  }

  const { data } = await axiosPosts.get('/usersPostForMyMap', {
    params: {
      userId,
    },
  });
  return data;
};

export const usersPostLikesDislikesQuery = async (userId: number | undefined) => {
  if (!userId) {
    return { ok: true, usersLikes: [], usersDislikes: [] };
  }

  const { data } = await axiosPosts.get('/usersPostLikesDislikes', {
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
