import { useEffect } from 'react';
import { BackHandler, LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import Bookmarks from './bookmarks/Bookmarks';
import PostsHasRestaurant from './postsHasRestaurant/PostsHasRestaurant';
import FunctionsBar from './functionsBar/FunctionsBar';
import Stamps from './stamps/Stamps';
import { useRecoilState } from 'recoil';
import { clickedMyMapListTypeState } from 'store/toggleState';
import { useNetInfo } from '@react-native-community/netinfo';
import { Colors } from 'const/global-styles';

export default function List() {
  const netInfo = useNetInfo();
  const [clickedMyMapListType, setClickedMyMapListType] = useRecoilState(clickedMyMapListTypeState);

  useEffect(() => {
    const backButtonHandler = () => {
      if (clickedMyMapListType) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setClickedMyMapListType(null);
        return true;
      }
    };

    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [clickedMyMapListType, setClickedMyMapListType]);

  return (
    <View style={styles.wrap}>
      <FunctionsBar />
      {netInfo.isConnected ? (
        clickedMyMapListType ? (
          clickedMyMapListType === 'bookmarks' ? (
            <Bookmarks />
          ) : clickedMyMapListType === 'posts' ? (
            <PostsHasRestaurant />
          ) : (
            <Stamps />
          )
        ) : null
      ) : (
        <View style={styles.netInfo}>
          <Text>인터넷 연결이 불안정합니다</Text>
        </View>
      )}
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
  netInfo: {
    width: '100%',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
  },
});
