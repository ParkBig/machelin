import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LetsSearch() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="restaurant" size={100} color={Colors.gray} />
      <Text style={styles.text}>검색해볼까요?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
    gap: 10,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray,
  },
});
