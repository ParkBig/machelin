import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Line from 'components/common/Line';
import { useRecoilState } from 'recoil';
import { ClickedTypeState, clickedTypeState } from 'store/myInfoState';
import { Colors, Shadow, Size } from 'const/global-styles';
import Button from 'components/common/Button';
import useMyInfoQuery from 'query/hooks/useMyInfoQuery';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';

export default function MyFunctions() {
  const { myInfo } = useMyInfoQuery();
  const { navigate } = useNavigation<UseNavigation<'MyListScreen'>>();
  const [clickedType, setClickedType] = useRecoilState(clickedTypeState);

  const changeClickedTypeHandler = (clickedType: ClickedTypeState) => {
    setClickedType(clickedType);
  };

  const gothMyMapHandler = () => {
    // 로그인이 아니라면 막아야함.
    navigate('MyMapScreen');
  };

  return (
    <View style={styles.content}>
      <Button style={styles.contentTitle} onPress={changeClickedTypeHandler.bind(null, 'bookMark')}>
        <Ionicons
          name={clickedType === 'bookMark' ? 'bookmark' : 'bookmark-outline'}
          size={25}
          color={Colors.mainBlue2}
        />
        <Text style={styles.text}>북마크</Text>
      </Button>
      <Line style={styles.lightLine} />
      <Button style={styles.contentTitle} onPress={changeClickedTypeHandler.bind(null, 'posts')}>
        <Ionicons name={clickedType === 'posts' ? 'reader' : 'reader-outline'} size={25} color={Colors.mainBlue2} />
        <Text style={styles.text}>게시글</Text>
      </Button>
      <Line style={styles.lightLine} />
      <Button style={styles.contentTitle} onPress={changeClickedTypeHandler.bind(null, 'follow')}>
        <Ionicons
          name={clickedType === 'follow' ? 'pricetags' : 'pricetags-outline'}
          size={25}
          color={Colors.mainBlue2}
        />
        <Text style={styles.text}>소셜</Text>
      </Button>
      <Line style={styles.lightLine} />
      <Button style={styles.contentTitle} onPress={gothMyMapHandler}>
        <Ionicons name="map-outline" size={25} color={Colors.mainBlue2} />
        <Text style={styles.text}>나의지도</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    height: 90,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: Colors.mainGreen1,
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
    backgroundColor: Colors.mainBlue2,
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
    color: Colors.mainBlue2,
  },
});
