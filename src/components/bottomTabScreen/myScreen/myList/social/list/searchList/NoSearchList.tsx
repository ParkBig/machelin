import { Colors, Size } from "const/global-styles";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

interface Props {
  msg: string;
}

export default function NoSearchList({ msg }: Props) {
  return (
    <View style={styles.wrap}>
      <View>
        <Ionicons name="people-outline" size={100} color={Colors.gray} />
      </View>
      <Text style={styles.text}>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray,
  },
});
