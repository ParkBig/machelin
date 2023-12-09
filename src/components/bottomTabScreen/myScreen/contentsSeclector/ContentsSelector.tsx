import { StyleSheet, Text, View } from 'react-native';
import { Colors, Shadow } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';
import { useRecoilState } from 'recoil';
import { ClickedMyInfoListTypeState, clickedMyInfoListTypeState } from 'store/userInfoState';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import Line from 'components/common/layout/Line';

export default function ContentsSelector() {
  const { navigate } = useNavigation<UseNavigation<'MyScreen'>>();
  const [clickedType, setClickedType] = useRecoilState(clickedMyInfoListTypeState);

  const changeClickedTypeHandler = (clickedType: ClickedMyInfoListTypeState) => {
    setClickedType(clickedType);
  };

  const gothMyMapHandler = () => {
    navigate('MyMapScreen');
  };

  return (
    <View style={styles.wrap}>
      <Line style={styles.line} />
      <View style={styles.contents}>
        <Button style={styles.contentTitle} onPress={changeClickedTypeHandler.bind(null, 'posts')}>
          <Ionicons name={clickedType === 'posts' ? 'reader' : 'reader-outline'} size={25} color={Colors.mainWhite3} />
          <Text style={styles.text}>게시글</Text>
        </Button>
        <Line style={styles.lightLine} />
        <Button style={styles.contentTitle} onPress={changeClickedTypeHandler.bind(null, 'bookMark')}>
          <Ionicons
            name={clickedType === 'bookMark' ? 'bookmarks' : 'bookmarks-outline'}
            size={25}
            color={Colors.mainWhite3}
          />
          <Text style={styles.text}>북마크</Text>
        </Button>
        <Line style={styles.lightLine} />
        <Button style={styles.contentTitle} onPress={changeClickedTypeHandler.bind(null, 'follow')}>
          <Ionicons name={clickedType === 'follow' ? 'people' : 'people-outline'} size={25} color={Colors.mainWhite3} />
          <Text style={styles.text}>소셜</Text>
        </Button>
        <Line style={styles.lightLine} />
        <Button style={styles.contentTitle} onPress={gothMyMapHandler}>
          <Ionicons name="map-outline" size={25} color={Colors.mainWhite3} />
          <Text style={styles.text}>나의지도</Text>
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
    height: 20,
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
    backgroundColor: Colors.mainWhite3,
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
    color: Colors.mainWhite3,
  },
});
