import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { UseNavigation } from 'types/screenType';

export default function GotoLoginButton() {
  const { navigate } = useNavigation<UseNavigation<'LoginSignUpScreen'>>();

  const gotoLoginScreenHandler = () => {
    navigate('LoginScreen');
  };

  return (
    <View style={styles.wrap}>
      <Text>이미 계정이 있나요?</Text>
      <Button onPress={gotoLoginScreenHandler}>
        <Text style={styles.buttonText}>로그인</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.mainGreen2,
    fontSize: Size.normalBig,
  },
});
