import { axiosBookmarks } from 'query/api/bookmarks';
import { useQuery } from 'react-query';
import { Bookmark } from 'types/types';

interface Data {
  ok: boolean;
  bookmarks: Bookmark[];
}

export default function useExploreUsersBookmarksQuery(userId: number) {
  const {
    data: bookmarks,
    refetch: reBookmarks,
    isLoading: bookmarksIsLoading,
    isRefetching: isReBookmarks,
  } = useQuery<Data>(['exploreUsersBookmarks', userId], async () => {
    if (!userId) {
      return { ok: false, bookmarks: null };
    }

    const { data } = await axiosBookmarks.get('/usersBookmarks', {
      params: {
        userId,
      },
    });
    return data;
  });

  return { bookmarks, reBookmarks, bookmarksIsLoading, isReBookmarks };
}
