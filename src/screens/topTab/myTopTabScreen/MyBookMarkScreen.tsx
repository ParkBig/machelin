import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import BriefBookmarkInfo from 'components/topTabScreen/myBookMarkScreen/BriefBookmarkInfo';
import NoBookmark from 'components/topTabScreen/myBookMarkScreen/NoBookmark';
import { Colors } from 'const/global-styles';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

export default function MyBookMarkScreen() {
  const { bookmarks, bookmarksIsLoading, reBookmarks, isReBookmarks } = useUsersBookmarksQuery();
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshHandler = () => {
    setRefreshing(true);
    reBookmarks();
    setRefreshing(false);
  };

  const bookmarksExist = bookmarks?.bookmarks && bookmarks.bookmarks.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {bookmarksExist ? (
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshHandler} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 5 }}
          data={bookmarks?.bookmarks}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <BriefBookmarkInfo key={item.id} bookmark={item} isSlide={false} />}
        />
      ) : (
        <NoBookmark />
      )}
      {(bookmarksIsLoading || isReBookmarks) && <LoadingOverlay style={styles.loadingOverlay} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.mainWhite1,
  },
  line: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.lightGrayOpacity1,
  },
  listFooterComponent: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
