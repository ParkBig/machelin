import LogoutWithdraw from 'components/topTabScreen/myInfoScreen/logoutWithdraw/LogoutWithdraw';
import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingScreen() {
  return (
    <View style={styles.wrap}>
      <View style={styles.settings}>
        <Ionicons name="restaurant" size={150} color={Colors.mainGreen2} />
      </View>
      <LogoutWithdraw />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
    justifyContent: 'space-between',
  },
  settings: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
