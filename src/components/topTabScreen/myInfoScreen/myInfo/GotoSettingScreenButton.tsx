import Button from 'components/common/layout/Button';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UseNavigation } from 'types/screenType';

export default function GotoSettingScreenButton() {
  const { navigate } = useNavigation<UseNavigation<'MyInfoScreen'>>();

  const gotoSettingScreenHandler = () => {
    navigate('SettingScreen');
  };

  return (
    <Button style={styles.settingButton} onPress={gotoSettingScreenHandler}>
      <Ionicons name="settings" size={35} />
    </Button>
  );
}

const styles = StyleSheet.create({
  settingButton: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
