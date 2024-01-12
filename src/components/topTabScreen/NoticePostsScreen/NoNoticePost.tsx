import { Colors, Size } from 'const/global-styles';
import useNoticePostsQuery from 'query/hooks/posts/useNoticePostsQuery';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from 'components/common/layout/Button';

export default function NoNoticePost() {
  const { reNoticePosts } = useNoticePostsQuery();

  const reNoticePostsHandler = () => {
    reNoticePosts();
  };

  return (
    <View style={styles.wrap}>
      <Ionicons name="reader-outline" size={100} color={Colors.gray} />
      <Button style={styles.button} onPress={reNoticePostsHandler}>
        <Text style={styles.text}>공지사항이 없어요</Text>
        <Ionicons name="refresh" size={30} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.mainWhite1,
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
