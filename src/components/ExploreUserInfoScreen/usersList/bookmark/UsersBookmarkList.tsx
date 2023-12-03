import { useRoute } from '@react-navigation/native';
import LoadingOverlay from 'components/common/LoadingOverlay';
import HasBookmark from 'components/myScreen/myList/myBookmarks/HasBookmark';
import NoBookmark from 'components/myScreen/myList/myBookmarks/NoBookmark';
import { Colors } from 'const/global-styles';
import useExploreUsersBookmarksQuery from 'query/hooks/exploreUsers/useExploreUsersBookmarksQuery';
import { StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';

export default function UsersBookmarkList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { bookmarks, bookmarksIsLoading } = useExploreUsersBookmarksQuery(params.userId);
  const bookmarksExist = bookmarks?.bookmarks?.length;

  return (
    <View style={styles.wrap}>
      {bookmarksIsLoading ? (
        <LoadingOverlay />
      ) : bookmarksExist ? (
        <HasBookmark bookmarks={bookmarks.bookmarks} />
      ) : (
        <NoBookmark />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingTop: 10,
    borderTopColor: Colors.mainGreen1,
    borderTopWidth: 2,
  },
});
