import Functions from "components/loginScreen/Functions";
import LoginInfos from "components/loginScreen/LoginInfos";
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
    paddingHorizontal: 15,
    alignItems: 'center',
    backgroundColor: Colors.mainWhite1,
  },
});
