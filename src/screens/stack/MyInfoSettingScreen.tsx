import LogoutWithdraw from 'components/myInfoSettingScreen/logoutWithdraw/LogoutWithdraw';
import MyInfos from 'components/myInfoSettingScreen/myInfos/MyInfos';
import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';

export default function MyInfoSettingScreen() {
  return (
    <View style={styles.wrap}>
      <MyInfos />
      <LogoutWithdraw />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: Colors.mainWhite1,
    justifyContent: 'space-between',
  },
});
