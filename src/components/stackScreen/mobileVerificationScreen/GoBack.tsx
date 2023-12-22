import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';

export default function GoBack() {
  const { goBack } = useNavigation<UseNavigation<'LoginScreen'>>();

  const goBackHandler = () => {
    goBack();
  };

  return (
    <View style={styles.wrap}>
      <Button style={styles.button} onPress={goBackHandler}>
        <Ionicons name="close-outline" size={35} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%'
  },
  button: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
