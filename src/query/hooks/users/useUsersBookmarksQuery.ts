import { usersBookmarksQuery } from 'query/bookmarks';
import { useQuery } from 'react-query';
import { Bookmark } from 'types/store/myInfoType';

interface Data {
  ok: boolean;
  bookmarks: Bookmark[];
}

export default function useUsersBookmarksQuery(userId?: number) {
  const {
    data: bookmarks,
    refetch: reBookmarks,
    isLoading: bookmarksIsLoading,
    isFetching: isReBookmarks,
  } = useQuery<Data>(['usersBookmarks', userId], () => usersBookmarksQuery(userId));

  return { bookmarks, reBookmarks, bookmarksIsLoading, isReBookmarks };
}
