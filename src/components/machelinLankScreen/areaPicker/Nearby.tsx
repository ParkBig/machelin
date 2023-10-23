import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Button from "components/common/Button";
import { Colors } from "const/global-styles";

export default function Nearby() {
  return (
    <Button style={styles.wrap}>
      <Text>내주변</Text>
      <Ionicons name='locate-outline' size={25} color={Colors.mainGreen3} />
    </Button>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
  },
});
