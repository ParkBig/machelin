import { useInfiniteQuery } from 'react-query';
import { axiosPosts } from 'query/api/posts';
import { IPost } from 'types/types';

interface Data {
  ok: boolean;
  msg: string;
  postsLiked: IPost[];
  nextPage: number | null;
}

export default function usersPostsLikedQuery() {
  const {
    data: postsLiked,
    isLoading: postsLikedIsLoading,
    refetch: rePostsLiked,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, IPost>(
    ['postsLiked'],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosPosts.get('postsLiked', {
        params: {
          page: pageParam,
        },
      });

      return data;
    },
    {
      select: data => ({ pages: data.pages.flatMap(page => page.postsLiked), pageParams: data.pageParams }),
      getNextPageParam: lastPage => {
        return lastPage.nextPage || null;
      },
    }
  );

  const fetchNextPagePosts = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return { postsLiked, postsLikedIsLoading, rePostsLiked, fetchNextPagePosts, isFetchingNextPage };
}
