import { Image, StyleSheet, Text } from "react-native";
import { Colors } from "const/global-styles";
import LoginPlatform from "./LoginPlatform";

export default function StartNaverLogin() {
  const gotoNaverLoginHandler = () => {}

  return (
    <LoginPlatform style={styles.naver} onPress={gotoNaverLoginHandler}>
      <Image style={styles.image} source={require('../../assets/logo/naver.png')} />
      <Text>네이버로 계속하기</Text>
    </LoginPlatform>
  );
}

const styles = StyleSheet.create({
  naver: {
    backgroundColor: Colors.naverBackground,
    gap: 10,
  },
  image: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
