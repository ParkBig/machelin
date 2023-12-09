import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';

export default function NoBookmark() {
  return (
    <View style={styles.wrap}>
      <View>
        <Ionicons name='bookmarks-outline' size={100} color={Colors.gray} />
      </View>
      <Text style={styles.text}>북마크가 없어요</Text>
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
    color: Colors.gray
  },
});
