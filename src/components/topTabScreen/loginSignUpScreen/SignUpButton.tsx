import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text } from 'react-native';
import { UseNavigation } from 'types/screenType';

export default function SignUpButton() {
  const { navigate } = useNavigation<UseNavigation<'LoginSignUpScreen'>>();

  const goToTermsOfUseScreenHandler = () => {
    navigate('SignUpScreen');
  };

  return (
    <Button style={styles.button} onPress={goToTermsOfUseScreenHandler}>
      <Text style={styles.text}>회원가입</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.mainGreen1,
  },
  text: {
    fontWeight: 'bold',
    color: Colors.mainWhite3,
    fontSize: Size.normalBig,
  },
});
