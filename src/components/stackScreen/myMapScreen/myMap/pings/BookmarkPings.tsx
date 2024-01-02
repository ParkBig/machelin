import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import { memo, useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { useRecoilValue } from 'recoil';
import { clickedMyMapListTypeState } from 'store/toggleState';
import { Bookmark } from 'types/types';

interface Props {
  bookmark: Bookmark;
}

const MemoizedMarker = memo(({ bookmark }: Props) => {
  const [isTrack, setIsTrack] = useState(false);
  const clickedMyMapListType = useRecoilValue(clickedMyMapListTypeState);

  useEffect(() => {
    setIsTrack(true);

    const trackOut = setTimeout(() => {
      setIsTrack(false);
    }, 600);

    return () => clearInterval(trackOut);
  }, [clickedMyMapListType]);

  return (
    <Marker
      tracksViewChanges={isTrack}
      coordinate={{ latitude: +bookmark.lat, longitude: +bookmark.lng }}
      title={bookmark.restaurantName}
    >
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
  const { bookmarks } = useUsersBookmarksQuery();
  const clickedMyMapListType = useRecoilValue(clickedMyMapListTypeState);

  return (
    <>
      {clickedMyMapListType === 'bookmarks' &&
        bookmarks?.bookmarks?.map((bookmark, index) => (
          <MemoizedMarker key={`${bookmark.id}_${index}`} bookmark={bookmark} />
        ))}
    </>
  );
}
