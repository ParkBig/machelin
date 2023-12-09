import { StyleSheet, View } from 'react-native';
import NoBookmark from './NoBookmark';
import { Colors } from 'const/global-styles';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import BriefBookmarkInfo from './BriefBookmarkInfo';
import { FlatList } from 'react-native-gesture-handler';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

export default function MyBookmarkList() {
  const { myInfo } = useMyInfoQuery();
  const { bookmarks, bookmarksIsLoading } = useUsersBookmarksQuery(myInfo?.authUser?.id);
  const bookmarksExist = bookmarks?.bookmarks && bookmarks.bookmarks.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {bookmarksIsLoading ? (
        <LoadingOverlay style={styles.loadingOverlay} />
      ) : bookmarksExist ? (
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 5 }}
          data={bookmarks?.bookmarks}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <BriefBookmarkInfo key={item.id} bookmark={item} isSlide={false} />}
        />
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
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
