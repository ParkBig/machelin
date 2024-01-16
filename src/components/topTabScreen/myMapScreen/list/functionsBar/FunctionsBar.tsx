import { LayoutAnimation, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import useUsersPostForMyMapQuery from 'query/hooks/posts/useUsersPostForMyMapQuery';
import useUsersBookmarksQuery from 'query/hooks/users/useUsersBookmarksQuery';
import useUsersStampsQuery from 'query/hooks/users/useUsersStampsQuery';
import { useRecoilState } from 'recoil';
import { ClickedMyMapListTypeState, clickedMyMapListTypeState } from 'store/toggleState';
import ToMyLocation from './ToMyLocation';

export default function FunctionsBar() {
  const { myInfo } = useMyInfoQuery();
  const { stamps } = useUsersStampsQuery();
  const { posts } = useUsersPostForMyMapQuery();
  const { bookmarks } = useUsersBookmarksQuery();
  const [clickedMyMapListType, setClickedMyMapListType] = useRecoilState(clickedMyMapListTypeState);

  const stampsLength = stamps?.stamps.length ? stamps.stamps.length : 0;
  const bookmarksLength = bookmarks?.bookmarks?.length ? bookmarks?.bookmarks?.length : 0;
  const postsLength = posts?.posts?.length ? posts?.posts.length : 0;

  const changeWhichOneClickedStateHandler = (clicked: ClickedMyMapListTypeState) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (clickedMyMapListType) {
      if (clickedMyMapListType === clicked) {
        setClickedMyMapListType(null);
      } else {
        setClickedMyMapListType(clicked);
      }
    } else {
      setClickedMyMapListType(clicked);
    }
  };

  return (
    <View style={styles.wrap}>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Button style={styles.button} onPress={changeWhichOneClickedStateHandler.bind(null, 'stamps')}>
          <Ionicons
            style={styles.ionicons}
            name={clickedMyMapListType === 'stamps' ? 'paw' : 'paw-outline'}
            size={25}
            color={Colors.mainWhite3}
          />
          {myInfo?.authUser && <Text style={styles.text}>{stampsLength}</Text>}
        </Button>
        <Button style={styles.button} onPress={changeWhichOneClickedStateHandler.bind(null, 'bookmarks')}>
          <Ionicons
            style={styles.ionicons}
            name={clickedMyMapListType === 'bookmarks' ? 'bookmarks' : 'bookmarks-outline'}
            size={25}
            color={Colors.mainWhite3}
          />
          {myInfo?.authUser && <Text style={styles.text}>{bookmarksLength}</Text>}
        </Button>
        <Button style={styles.button} onPress={changeWhichOneClickedStateHandler.bind(null, 'posts')}>
          <Ionicons
            style={styles.ionicons}
            name={clickedMyMapListType === 'posts' ? 'reader' : 'reader-outline'}
            size={25}
            color={Colors.mainWhite3}
          />
          {myInfo?.authUser && <Text style={styles.text}>{postsLength}</Text>}
        </Button>
      </View>
      <ToMyLocation />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  button: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen2,
  },
  ionicons: {
    width: 25,
    height: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  text: {
    fontSize: Size.smallBig,
    color: Colors.mainWhite3,
    fontWeight: 'bold',
  },
});
