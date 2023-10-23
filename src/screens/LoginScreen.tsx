import Functions from "components/loginScreen/Functions";
import LoginInfos from "components/loginScreen/LoginInfos";
import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.wrap}>
      <LoginInfos />
      <Functions />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
