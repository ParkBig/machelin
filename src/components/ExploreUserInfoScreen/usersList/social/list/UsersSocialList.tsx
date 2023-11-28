import { Colors } from "const/global-styles";
import { StyleSheet, View } from "react-native";
import UsersFollowList from "./UsersFollowList";
import UsersFollowerList from "./UsersFollowerList";

interface Props {
  isFollow: boolean;
}

export default function UsersSocialList({ isFollow }: Props) {
  return (
    <View style={styles.wrap}>
      {isFollow ? <UsersFollowList /> : <UsersFollowerList />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: Colors.mainGreen1,
  },
});
