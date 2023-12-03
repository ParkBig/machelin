import { StyleSheet, View } from 'react-native';
import BriefBookmarkInfo from './BriefBookmarkInfo';
import { Bookmark } from 'types/store/myInfoType';

interface Props {
  bookmarks: Bookmark[];
}

export default function HasBookmark({ bookmarks }: Props) {
  return (
    <View style={styles.wrap}>
      {bookmarks.map(bookmark => (
        <BriefBookmarkInfo key={bookmark.id} bookmark={bookmark} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
});
