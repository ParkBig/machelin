import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { UseNavigation } from 'types/screenType';

export default function Functions() {
  const { navigate } = useNavigation<UseNavigation<'LoginScreen'>>();

  const goToFindEmailHandler = () => {
    navigate('FindMyIdScreen');
  };

  const goToTermsOfUseScreenHandler = () => {
    navigate('TermsOfUseScreen');
  };

  return (
    <View style={styles.wrap}>
      <Button onPress={goToFindEmailHandler}>
        <Text style={styles.text}>계정이 기억나지 않나요?</Text>
      </Button>
      <Button onPress={goToTermsOfUseScreenHandler}>
        <Text style={styles.text}>회원가입</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingVertical: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    color: Colors.gray,
    textDecorationLine: 'underline',
  },
});
