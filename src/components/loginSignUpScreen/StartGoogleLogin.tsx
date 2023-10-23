import { Image, StyleSheet, Text } from 'react-native';
import LoginPlatform from './LoginPlatform';

export default function StartGoogleLogin() {
  const gotoGoogleLoginHandler = () => {};

  return (
    <LoginPlatform style={styles.google} onPress={gotoGoogleLoginHandler}>
      <Image style={styles.image} source={require('../../assets/logo/google.png')} />
      <Text>구글로 계속하기</Text>
    </LoginPlatform>
  );
}

const styles = StyleSheet.create({
  google: {
    backgroundColor: 'white',
    gap: 10,
  },
  image: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
