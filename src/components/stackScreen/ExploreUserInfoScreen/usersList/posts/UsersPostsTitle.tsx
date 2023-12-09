import { Size } from "const/global-styles";
import { StyleSheet, Text, View } from "react-native";

export default function UsersPostsTitle() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.titleText}>게시글</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
  },
  titleText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
});
