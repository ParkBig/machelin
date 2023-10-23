import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/Button';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screen/screenType';

export default function GoBack() {
  const { goBack } = useNavigation<UseNavigation<'SelectLoginPlatformScreen'>>()

  const goBackHandler = () => {
    goBack();
  };

  return (
    <Button style={styles.wrap} onPress={goBackHandler}>
      <Ionicons name="close-outline" size={35} />
    </Button>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    left: 15,
    zIndex: 1,
  },
});
