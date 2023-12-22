import { useNavigation } from '@react-navigation/native';
import Button from 'components/common/layout/Button';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { UseNavigation } from 'types/screenType';
import { Colors, Size } from 'const/global-styles';

export default function GotoLoginSignUp() {
  const { navigate } = useNavigation<UseNavigation<'MyScreen'>>();

  const gotoLoginSignUpScreenHandler = () => {
    navigate('LoginScreen');
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.title}>
        <Text style={styles.titleText}>마슐랭, </Text>
        <Text>시작해볼까요?</Text>
      </View>
      <Button style={styles.button} onPress={gotoLoginSignUpScreenHandler}>
        <Text style={styles.buttonText}>로그인/회원가입</Text>
        <Ionicons name="chevron-forward" size={Size.colossalMiddle} color={Colors.darkGray} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: Size.normalBig,
    fontWeight: 'bold',
  },
  button: {
    width: '40%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.darkGray,
    fontSize: Size.normalMiddle,
  },
});
