import SignUpInfos from "components/stackScreen/signUpScreen/SignUpInfos";
import { Colors } from "const/global-styles";
import { StyleSheet, View } from "react-native";

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
    backgroundColor: Colors.mainWhite1,
  },
});
