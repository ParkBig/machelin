import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Bookmarks from './bookmarks/Bookmarks';
import PostsHasRestaurant from './postsHasRestaurant/PostsHasRestaurant';
import FunctionsBar from './functionsBar/FunctionsBar';
import Stamps from './stamps/Stamps';

export type WhichOneClickedState = 'bookmarks' | 'posts' | 'stamps' | null;

export default function List() {
  const [whichOneClicked, setWhichOneClicked] = useState<WhichOneClickedState>(null);

  return (
    <View style={styles.wrap}>
      <FunctionsBar whichOneClicked={whichOneClicked} setWhichOneClicked={setWhichOneClicked} />
      {whichOneClicked ? (
        whichOneClicked === 'bookmarks' ? (
          <Bookmarks />
        ) : whichOneClicked === 'posts' ? (
          <PostsHasRestaurant />
        ) : (
          <Stamps />
        )
      ) : null}
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
