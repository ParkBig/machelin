import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "const/global-styles";

export default function NoResults() {
  return (
    <View style={styles.wrap}>
      <Ionicons name='restaurant' color={Colors.mainGreen2} size={150} />
      <Text style={styles.text}>식당이 존재하지 않아요</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: Colors.gray,
  }
})
