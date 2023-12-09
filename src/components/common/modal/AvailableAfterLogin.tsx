import { Colors, Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AvailableAfterLogin() {
  return (
    <View style={styles.wrap}>
      <View>
        <Ionicons name='restaurant' size={100} color={Colors.gray} />
      </View>
      <Text style={styles.text}>로그인 후 이용 가능합니다</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray,
  },
});
