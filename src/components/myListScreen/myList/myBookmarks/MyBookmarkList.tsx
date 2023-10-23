import useMyInfoQuery from 'query/hooks/useMyInfoQuery';
import { StyleSheet, Text, View } from 'react-native';
import NoBookmark from './NoBookmark';
import HasBookmark from './HasBookmark';

export default function MyBookmarkList() {
  const { myInfo } = useMyInfoQuery();
  const bookmarks = myInfo?.authUser?.bookmarks.map(jsonBookmark => JSON.parse(jsonBookmark));

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text>나의 북마크</Text>
      </View>
      <View style={styles.content}>
        {bookmarks?.length ? <HasBookmark bookmarks={bookmarks} /> : <NoBookmark />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 15,
  },
  title: {
    width: '100%',
    justifyContent: 'center',
    height: 50,
  },
  content: {
    width: '100%'
  },
});
