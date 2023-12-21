import { axiosComments, postsCommentsQuery } from 'query/comments';
import { useQuery } from 'react-query';
import { Comment } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  comments: Comment[];
}

export default function usePostsCommentsQuery(postId: number) {
  const {
    data: comments,
    refetch: reComments,
    isLoading: commentsIsLoading,
  } = useQuery<Data>(['postComments', postId], async () => {
    const { data } = await axiosComments.get('/postsComments', {
      params: {
        postId,
      },
    });
    return data;
  });

  return { comments, reComments, commentsIsLoading };
}
