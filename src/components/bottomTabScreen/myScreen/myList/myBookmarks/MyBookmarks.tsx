import { StyleSheet, View } from 'react-native';
import MyBookmarkTitle from './MyBookmarkTitle';
import MyBookmarkList from './MyBookmarkList';

export default function MyBookmarks() {
  return (
    <View style={styles.wrap}>
      <MyBookmarkTitle />
      <MyBookmarkList />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 15,
  },
  content: {
    width: '100%',
  },
});
