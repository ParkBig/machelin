import Line from 'components/common/layout/Line';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';
import BriefBookmarkInfo from 'components/bottomTabScreen/myScreen/myList/myBookmarks/BriefBookmarkInfo';
import { Colors } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Bookmarks() {
  const { myInfo } = useMyInfoQuery();
  const { bookmarks, bookmarksIsLoading } = useUsersBookmarksQuery();
  const bookmarksIsExist = bookmarks?.bookmarks && bookmarks.bookmarks.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {myInfo?.authUser ? (
        bookmarksIsLoading ? (
          <LoadingOverlay style={styles.loadingOverlay} />
        ) : bookmarksIsExist ? (
          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={bookmarks?.bookmarks}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={() => <Line style={styles.line} />}
            renderItem={({ item }) => <BriefBookmarkInfo bookmark={item} isSlide={true} />}
          />
        ) : (
          <View style={styles.none}>
            <Text>북마크한 곳이 없어요</Text>
          </View>
        )
      ) : (
        <View style={styles.none}>
          <Text>로그인 후 기록해 보아요</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    maxHeight: 272,
    backgroundColor: Colors.mainWhite1,
    borderTopWidth: 3,
    borderRadius: 5,
    borderTopColor: Colors.mainGreen2,
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingHorizontal: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  none: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
