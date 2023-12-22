import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';

export default function NoNeighborhoodPosts() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="reader-outline" size={100} color={Colors.gray} />
      <Text style={styles.text}>주변 소식이 없어요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray,
  },
});
