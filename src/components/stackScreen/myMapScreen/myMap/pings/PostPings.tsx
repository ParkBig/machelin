import useUsersPostForMyMapQuery from 'query/hooks/posts/useUsersPostForMyMapQuery';
import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import { useRecoilValue } from 'recoil';
import { clickedMyMapListTypeState } from 'store/toggleState';
import { IPost } from 'types/types';

interface Props {
  post: IPost;
}

const MemoizedMarker = memo(({ post }: Props) => {
  return (
    <Marker
      tracksViewChanges={true}
      coordinate={{ latitude: +post.restaurantLat, longitude: +post.restaurantLng }}
      title={post.restaurantName}
    >
      <View style={styles.wrap}>
        <Image source={require('assets/png/post-ping.png')} style={styles.image} resizeMode="cover" />
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

export default function PostPings() {
  const { posts } = useUsersPostForMyMapQuery();
  const clickedMyMapListType = useRecoilValue(clickedMyMapListTypeState);

  return (
    <>
      {clickedMyMapListType === 'posts' &&
        posts?.posts?.map((post, index) => <MemoizedMarker key={`${post.id}_${index}`} post={post} />)}
    </>
  );
}
