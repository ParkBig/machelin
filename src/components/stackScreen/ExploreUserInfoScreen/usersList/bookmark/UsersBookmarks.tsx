import { StyleSheet, View } from 'react-native';
import UsersBookmarkTitle from './UsersBookmarkTitle';
import UsersBookmarkList from './UsersBookmarkList';

export default function UsersBookmarks() {
  return (
    <View style={styles.wrap}>
      <UsersBookmarkTitle />
      <UsersBookmarkList />
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
