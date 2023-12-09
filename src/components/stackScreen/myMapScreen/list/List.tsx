import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Bookmarks from './bookmarks/Bookmarks';
import PostsHasRestaurant from './postsHasRestaurant/PostsHasRestaurant';
import FunctionsBar from './functionsBar/FunctionsBar';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';

export type WhichOneClickedState = 'bookmarks' | 'posts' | null;

export default function List() {
  const { myInfo } = useMyInfoQuery();
  const [whichOneClicked, setWhichOneClicked] = useState<WhichOneClickedState>(null);

  return (
    <View style={styles.wrap}>
      {myInfo?.authUser && <FunctionsBar whichOneClicked={whichOneClicked} setWhichOneClicked={setWhichOneClicked} />}
      {whichOneClicked ? whichOneClicked === 'bookmarks' ? <Bookmarks /> : <PostsHasRestaurant /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
  },
});
