import { axiosPosts } from 'query/api/posts';
import { useInfiniteQuery } from 'react-query';
import { IPost } from 'types/types';

interface Data {
  ok: boolean;
  msg: string;
  noticePosts: IPost[];
  nextPage: string;
}

export default function useNoticePostsQuery() {
  const {
    data: noticePosts,
    isLoading: noticePostsIsLoading,
    isRefetching: isReNoticePosts,
    refetch: reNoticePosts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, IPost>(
    ['noticePosts'],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosPosts.get('/noticePosts', {
        params: {
          page: pageParam,
        },
      });

      return data;
    },
    {
      select: data => {
        return { pages: data.pages.flatMap(page => page.noticePosts), pageParams: data.pageParams };
      },
      getNextPageParam: lastPage => {
        return lastPage.nextPage || null;
      },
    }
  );

  const fetchNextPageNoticePosts = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    noticePosts,
    noticePostsIsLoading,
    isReNoticePosts,
    reNoticePosts,
    fetchNextPageNoticePosts,
    isFetchingNextPage,
  };
}
