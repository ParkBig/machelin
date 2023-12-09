import { useState } from "react";
import { StyleSheet, View } from "react-native";
import UsersSocialTitle from "./UsersSocialTitle";
import UsersSocialList from "./list/UsersSocialList";

export default function UsersSocial() {
  const [isFollow, setIsFollow] = useState(true);

  return (
    <View style={styles.wrap}>
      <UsersSocialTitle isFollow={isFollow} setIsFollow={setIsFollow} />
      <UsersSocialList isFollow={isFollow} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 15,
  },
});

