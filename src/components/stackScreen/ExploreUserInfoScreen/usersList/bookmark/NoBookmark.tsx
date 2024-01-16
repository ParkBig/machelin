import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';

export default function NoBookmark() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="bookmarks-outline" size={100} color={Colors.gray} />
      <Text style={styles.text}>북마크가 없어요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    gap: 20,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray,
  },
});
