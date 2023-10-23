import SignUpInfos from "components/signUpScreen/SignUpInfos";
import { StyleSheet, Text, View } from "react-native";

export default function SignUpScreen() {
  return (
    <View style={styles.wrap}>
      <SignUpInfos />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
