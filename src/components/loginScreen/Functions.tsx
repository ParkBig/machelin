import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/Button';
import { StyleSheet, Text, View } from 'react-native';
import { UseNavigation } from 'types/screen/screenType';

export default function Functions() {
  const { navigate } = useNavigation<UseNavigation<'LoginScreen'>>()

  const goToSignUpHandler = () => {
    // navigate('SignUpScreen');
    // testing~
    navigate('MobileVerificationScreen')
  };

  const goToFindEmailHandler = () => {};

  const goToFindPasswordHandler = () => {};

  return (
    <View style={styles.wrap}>
      <Button onPress={goToSignUpHandler}>
        <Text>회원가입</Text>
      </Button>
      <Button onPress={goToFindEmailHandler}>
        <Text>이메일 찾기</Text>
      </Button>
      <Button onPress={goToFindPasswordHandler}>
        <Text>비밀번호 찾기</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 30,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
});
