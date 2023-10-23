import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/Button';
import { StyleSheet, Text, View } from 'react-native';
import { UseNavigation } from 'types/screen/screenType';

export default function GotoLoginSignUp() {
  const { navigate } = useNavigation<UseNavigation<'MyListScreen'>>();

  const gotoLoginSignUpScreenHandler = () => {
    navigate('SelectLoginPlatformScreen');
  };

  return (
    <View style={styles.wrap}>
      <Text>로그인을 하여 나만의 마슐랭을 만들어요</Text>
      <Button style={styles.button} onPress={gotoLoginSignUpScreenHandler}>
        <Text>로그인/회원가입</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'tomato',
  },
});
