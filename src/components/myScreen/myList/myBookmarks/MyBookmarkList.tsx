import { StyleSheet, View } from 'react-native';
import HasBookmark from './HasBookmark';
import NoBookmark from './NoBookmark';
import { Colors } from 'const/global-styles';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export default function MyBookmarkList() {
  const { myInfo } = useMyInfoQuery();
  const { bookmarks } = useUsersBookmarksQuery(myInfo?.authUser?.id);
  const bookmarksExist = bookmarks?.bookmarks?.length;

  return (
    <View style={styles.wrap}>{bookmarksExist ? <HasBookmark bookmarks={bookmarks.bookmarks} /> : <NoBookmark />}</View>
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
