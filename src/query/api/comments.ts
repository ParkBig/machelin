import { createAxiosInstance } from './api';

export const axiosComments = createAxiosInstance('comments');

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
