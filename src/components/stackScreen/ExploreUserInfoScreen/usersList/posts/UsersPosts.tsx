import { StyleSheet, View } from "react-native";
import UsersPostsTitle from "./UsersPostsTitle";
import UsersPostList from "./UsersPostList";

export default function UsersPosts() {
  return (
    <View style={styles.wrap}>
      <UsersPostsTitle />
      <UsersPostList />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 15,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});