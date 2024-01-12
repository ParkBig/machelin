import { Colors } from 'const/global-styles';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Options from './options/Options';
import MyLocation from './myLocation/MyLocation';

export default function Header() {
  return (
    <View style={styles.wrap}>
      <MyLocation />
      <Options />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    minHeight: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    backgroundColor: Colors.mainGreen2,
    gap: 10,
  },
});
