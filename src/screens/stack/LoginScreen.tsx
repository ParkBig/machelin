import Functions from "components/stackScreen/loginScreen/Functions";
import LoginInfos from "components/stackScreen/loginScreen/LoginInfos";
import { Colors } from "const/global-styles";
import { StyleSheet, View } from "react-native";

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
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
  },
});
