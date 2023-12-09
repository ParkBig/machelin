import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Bookmark } from 'types/store/myInfoType';

interface Props {
  bookmark: Bookmark;
}

const MemoizedMarker = memo(({ bookmark }: Props) => {
  return (
    <Marker coordinate={{ latitude: +bookmark.lat, longitude: +bookmark.lng }} title={bookmark.restaurantName}>
      <View style={styles.wrap}>
        <Image source={require('assets/png/bookmark-ping.png')} style={styles.image} resizeMode="cover" />
      </View>
    </Marker>
  );
});

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: 40,
  },
  image: {
    width: 40,
    height: 40,
  },
});

export default function BookmarkPings() {
  const { myInfo } = useMyInfoQuery();
  const { bookmarks } = useUsersBookmarksQuery(myInfo?.authUser?.id);

  return (
    <>
      {bookmarks?.bookmarks?.map((bookmark, index) => (
        <MemoizedMarker key={`${bookmark.id}_${index}`} bookmark={bookmark} />
      ))}
    </>
  );
}
