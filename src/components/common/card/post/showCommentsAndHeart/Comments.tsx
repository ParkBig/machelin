import { FlatList, StyleSheet, View } from 'react-native';
import usePostsCommentsQuery from 'query/hooks/posts/usePostsCommentsQuery';
import PostComment from './PostComment';

interface Props {
  postId: number;
}

export default function Comments({ postId }: Props) {
  const { comments, commentsIsLoading } = usePostsCommentsQuery(postId);

  return (
    <View style={styles.FlatWrap}>
      {comments && !commentsIsLoading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comments.comments}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <PostComment comment={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  FlatWrap: {
    flex: 1,
  },
});
