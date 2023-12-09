import { usersBookmarksQuery } from 'query/bookmarks';
import { useQuery } from 'react-query';
import { Bookmark } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  bookmarks: Bookmark[];
}

export default function useExploreUsersBookmarksQuery(userId: number) {
  const {
    data: bookmarks,
    refetch: reBookmarks,
    isLoading: bookmarksIsLoading,
  } = useQuery<Data>(['exploreUsersBookmarks', userId], () => usersBookmarksQuery(userId));

  return { bookmarks, reBookmarks, bookmarksIsLoading };
}
