import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VerifiedUser() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="restaurant" size={150} color={Colors.mainGreen2} />
      <Text style={styles.text}>인증된 유저입니다</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: Size.bigBig,
    fontWeight: 'bold',
    color: Colors.mainGreen2,
  },
});
