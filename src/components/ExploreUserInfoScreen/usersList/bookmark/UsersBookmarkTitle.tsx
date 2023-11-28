import { Size } from 'const/global-styles';
import { StyleSheet, Text, View } from 'react-native';

export default function UsersBookmarkTitle() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.titleText}>북마크</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    justifyContent: 'center',
    height: 50,
  },
  titleText: {
    fontSize: Size.normalMiddle,
    fontWeight: 'bold',
  },
});
