import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/Button';
import Line from 'components/common/Line';
import { Colors, Size } from 'const/global-styles';
import useMyInfoQuery from 'query/hooks/useMyInfoQuery';
import { StyleSheet, Text, View } from 'react-native';
import { UseNavigation } from 'types/screen/screenType';
import { deleteToken } from 'util/tokenDB';

export default function LogoutWithdraw() {
  const { navigate } = useNavigation<UseNavigation<'MyInfoSettingScreen'>>();
  const { reMyInfo } = useMyInfoQuery();

  const logoutHandler = async () => {
    await deleteToken();
    reMyInfo();
    navigate('MyListScreen');
  };

  return (
    <View style={styles.wrap}>
      <Button onPress={logoutHandler}>
        <Text style={styles.text}>로그아웃</Text>
      </Button>
      <Line style={styles.line} />
      <Button>
        <Text style={styles.text}>회원탈퇴</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 10,
  },
  line: {
    height: '100%',
    width: 2,
    backgroundColor: Colors.mainGreen2,
  },
  text: {
    fontSize: Size.normalSmall,
  },
});
