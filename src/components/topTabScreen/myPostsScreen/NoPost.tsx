import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import MakePost from './MakePost';

export default function NoPost() {
  return (
    <View style={styles.wrap}>
      <Ionicons name="reader-outline" size={100} color={Colors.gray} />
      <Text style={styles.text}>게시글/리뷰를 남겨보아요</Text>
      <MakePost />
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
