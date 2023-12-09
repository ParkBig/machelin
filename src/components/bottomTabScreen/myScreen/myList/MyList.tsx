import { StyleSheet, View } from 'react-native';
import { useRecoilValue } from 'recoil';
import MyBookmarks from './myBookmarks/MyBookmarks';
import MyPosts from './myPosts/MyPosts';
import Social from './social/Social';
import { clickedMyInfoListTypeState } from 'store/userInfoState';

export default function MyList() {
  const clickedType = useRecoilValue(clickedMyInfoListTypeState);

  const viewType = clickedType === 'bookMark' ? <MyBookmarks /> : clickedType === 'posts' ? <MyPosts /> : <Social />;

  return <View style={styles.wrap}>{viewType}</View>;
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 50,
  }
})
