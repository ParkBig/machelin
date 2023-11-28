import { postsCommentsQuery } from 'query/comments';
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
  } = useQuery<Data>(['postComments'], () => postsCommentsQuery(postId));

  return { comments, reComments, commentsIsLoading };
}
