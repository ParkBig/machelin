import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';
import Options from './options/Options';
import MyLocation from './myLocation/MyLocation';
import { StatusBarHeight } from 'const/dimenstions';

export default function Header() {
  return (
    <View style={styles.wrap}>
      <View style={styles.test}>
        <MyLocation />
        <Options />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: StatusBarHeight,
    paddingHorizontal: 10,
    backgroundColor: Colors.mainGreen2,
  },
  test: {
    minHeight: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
});
