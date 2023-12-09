import { Colors } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

export default function SelectKeyword() {
  return (
    <View style={styles.wrap}>
      <Text>말풍선 형식의 타입지정</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: Colors.mainGreen2,
    borderBottomWidth: 2,
  },
});
