import { Colors } from 'const/global-styles';
import { Image, StyleSheet, Text } from 'react-native'
import LoginPlatform from './LoginPlatform';

export default function StartKakaoLogin() {
  const gotoKaKaoLoginHandler = () => {};

  return (
    <LoginPlatform style={styles.kakao} onPress={gotoKaKaoLoginHandler}>
      <Image style={styles.image} source={require('../../assets/logo/kakao.png')} />
      <Text>카카오로 계속하기</Text>
    </LoginPlatform>
  );
}

const styles = StyleSheet.create({
  kakao: {
    backgroundColor: Colors.kakaoBackground,
    gap: 10,
  },
  image: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
