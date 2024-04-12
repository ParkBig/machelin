import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Size } from 'const/global-styles';
import Button from 'components/common/layout/Button';
import useAllPostsQuery from 'query/hooks/posts/useAllPostsQuery';

export default function NoAllPosts() {
  const { reAllPosts } = useAllPostsQuery();

  const reAllPostsHandler = () => {
    reAllPosts();
  };

  return (
    <View style={styles.wrap}>
      <Ionicons name="reader-outline" size={100} color={Colors.gray} />
      <Button style={styles.button} onPress={reAllPostsHandler}>
        <Text style={styles.text}>소식이 없어요</Text>
        <Ionicons name="refresh" size={30} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    opacity: 0.7,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    fontSize: Size.normalBig,
    color: Colors.gray,
  },
});
