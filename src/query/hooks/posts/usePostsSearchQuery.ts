import { useInfiniteQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { postSearchInputState } from 'store/searchState';
import { IPost } from 'types/types';
import { axiosPosts } from 'query/api/posts';

interface Data {
  ok: boolean;
  msg: string;
  searchPosts: IPost[];
  nextPage: string;
}

export default function usePostsSearchQuery() {
  const { isTyping, searchText } = useRecoilValue(postSearchInputState);

  const {
    data: postsSearch,
    isLoading: postsSearchIsLoading,
    isRefetching: isRePostsSearch,
    refetch: rePostsSearch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Data, unknown, IPost>(
    ['postsSearch', searchText],
    async ({ pageParam = 1 }) => {
      const { data } = await axiosPosts.get('/searchPosts', {
        params: {
          keyword: searchText,
          page: pageParam,
        },
      });

      return data;
    },
    {
      enabled: isTyping || !searchText ? false : true,
      select: data => {
        return { pages: data.pages.flatMap(page => page.searchPosts), pageParams: data.pageParams };
      },
      getNextPageParam: lastPage => {
        return lastPage.nextPage || null;
      },
    }
  );

  const fetchNextPagePostsSearch = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    postsSearch,
    postsSearchIsLoading,
    isRePostsSearch,
    rePostsSearch,
    isFetchingNextPage,
    fetchNextPagePostsSearch,
  };
}
