import { StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from 'const/global-styles';
import LoginPlatform from './LoginPlatform';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';

export default function StartEmailLogin() {
  const { navigate } = useNavigation<UseNavigation<'SelectLoginPlatformScreen'>>()

  const gotoEmailLoginHandler = () => {
    navigate('LoginScreen');
  };

  return (
    <LoginPlatform style={styles.email} onPress={gotoEmailLoginHandler}>
      <Ionicons name='mail-outline' size={20} color='black' />
      <Text>이메일로 계속하기</Text>
    </LoginPlatform>
  );
}

const styles = StyleSheet.create({
  email: {
    backgroundColor: Colors.lightGray,
    gap: 10,
  },
  image: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
