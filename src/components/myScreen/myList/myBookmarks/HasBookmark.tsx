import { StyleSheet, View } from 'react-native';
import BriefBookmarkInfo from './BriefBookmarkInfo';
import { Bookmark } from 'types/store/myInfoType';

interface Props {
  bookmarks: Bookmark[];
}

export default function HasBookmark({ bookmarks }: Props) {
  const goToDetailRestaurantHandler = (id: number) => {
    // id를 가지고 레스토랑 디테일 페치하며 restaurant디테일 스크린으로 이동
  };

  return (
    <View>
      {bookmarks.map(bookmark => (
        <BriefBookmarkInfo
          key={bookmark.id}
          bookmark={bookmark}
          onPress={goToDetailRestaurantHandler.bind(null, bookmark.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
