import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';
import Button from 'components/common/layout/Button';

export default function NotLoggedIn() {
  const { navigate } = useNavigation<UseNavigation<'PostsLikedScreen'>>();

  const goToMyScreenHandler = () => {
    navigate('MyScreen');
  };

  return (
    <View style={styles.wrap}>
      <Ionicons name="restaurant" size={100} color={Colors.gray} />
      <Text style={styles.text}>로그인 후 이용가능합니다</Text>
      <Button style={styles.button} onPress={goToMyScreenHandler}>
        <Text style={styles.buttonText}>로그인 하러가기</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    opacity: 0.7,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray,
  },
  button: {
    paddingVertical: 20,
  },
  buttonText: {
    fontSize: Size.bigSmall,
    color: Colors.gray,
  },
});
