import { StyleSheet, Text, View } from 'react-native';
import { Colors, Shadow } from 'const/global-styles';
import { useRecoilState } from 'recoil';
import { ClickedMyInfoListTypeState, clickedExploreUserInfoListTypeState } from 'store/userInfoState';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/Button';
import Line from 'components/common/Line';

export default function ExploreContentsSelector() {
  const [clickedType, setClickedType] = useRecoilState(clickedExploreUserInfoListTypeState);

  const changeClickedTypeHandler = (clickedType: ClickedMyInfoListTypeState) => {
    setClickedType(clickedType);
  };

  return (
    <View style={styles.wrap}>
      <Line style={styles.line} />
      <View style={styles.contents}>
        <Button style={styles.contentTitle} onPress={changeClickedTypeHandler.bind(null, 'posts')}>
          <Ionicons name={clickedType === 'posts' ? 'reader' : 'reader-outline'} size={25} color={Colors.mainWhite1} />
          <Text style={styles.text}>게시글</Text>
        </Button>
        <Line style={styles.lightLine} />
        <Button style={styles.contentTitle} onPress={changeClickedTypeHandler.bind(null, 'bookMark')}>
          <Ionicons
            name={clickedType === 'bookMark' ? 'bookmarks' : 'bookmarks-outline'}
            size={25}
            color={Colors.mainWhite1}
          />
          <Text style={styles.text}>북마크</Text>
        </Button>
        <Line style={styles.lightLine} />
        <Button style={styles.contentTitle} onPress={changeClickedTypeHandler.bind(null, 'follow')}>
          <Ionicons name={clickedType === 'follow' ? 'people' : 'people-outline'} size={25} color={Colors.mainWhite1} />
          <Text style={styles.text}>소셜</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  line: {
    width: '100%',
    height: 25,
    backgroundColor: Colors.mainGreen2,
    position: 'absolute',
  },
  contents: {
    flex: 1,
    height: 85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 8,
    backgroundColor: Colors.mainGreen2,
    overflow: 'hidden',
    ...Shadow,
  },
  contentTitle: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  pressed: {
    opacity: 0.75,
  },
  lightLine: {
    height: '60%',
    width: 2,
    backgroundColor: Colors.mainWhite1,
  },
  contentResults: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: Colors.gray,
    backgroundColor: Colors.lightGray,
  },
  contentResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkLine: {
    height: '60%',
    width: 2,
    backgroundColor: Colors.darkGray,
  },
  text: {
    fontWeight: 'bold',
    color: Colors.mainWhite1,
  },
});
