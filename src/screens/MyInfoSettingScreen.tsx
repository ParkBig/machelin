import LogoutWithdraw from 'components/myInfoSettingScreen/LogoutWithdraw';
import MyImage from 'components/myInfoSettingScreen/MyImage';
import MyInfos from 'components/myInfoSettingScreen/MyInfos';
import { Colors } from 'const/global-styles';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function MyInfoSettingScreen() {
  return (
    <View style={styles.wrap}>
      <View>
        <MyImage />
        <MyInfos />
      </View>
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
