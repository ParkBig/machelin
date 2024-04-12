import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';
import MyLocation from './myLocation/MyLocation';
import { StatusBarHeight } from 'const/dimenstions';
import GotoNeighborhoodPostTopTab from './gotoNeighborhoodPostTopTab/GotoNeighborhoodPostTopTab';

export default function Header() {
  return (
    <View style={styles.wrap}>
      <MyLocation />
      <GotoNeighborhoodPostTopTab />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 60 + StatusBarHeight!,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: StatusBarHeight,
    paddingHorizontal: 10,
    backgroundColor: Colors.mainGreen2,
    gap: 10,
  },
});
