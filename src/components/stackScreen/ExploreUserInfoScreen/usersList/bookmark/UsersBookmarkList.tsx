import { useRoute } from '@react-navigation/native';
import NoBookmark from 'components/bottomTabScreen/myScreen/myList/myBookmarks/NoBookmark';
import { Colors } from 'const/global-styles';
import useExploreUsersBookmarksQuery from 'query/hooks/exploreUsers/useExploreUsersBookmarksQuery';
import { StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';
import BriefBookmarkInfo from 'components/bottomTabScreen/myScreen/myList/myBookmarks/BriefBookmarkInfo';
import { FlatList } from 'react-native-gesture-handler';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

export default function UsersBookmarkList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { bookmarks, bookmarksIsLoading } = useExploreUsersBookmarksQuery(params.userId);
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
