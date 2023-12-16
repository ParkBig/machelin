import { StyleSheet, View } from "react-native";
import MyPostTitle from "./MyPostTitle";
import MyPostList from "./MyPostList";

export default function MyPosts() {
  return (
    <View style={styles.wrap}>
      <MyPostTitle />
      <MyPostList />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
