import { StyleSheet, View } from 'react-native';
import { IPost, Like } from 'types/store/myInfoType';
import { Colors } from 'const/global-styles';
import WriterNContent from './writerNContent/WriterNContent';
import ShowCommentsAndHearts from './showCommentsAndHeart/ShowCommentsAndHearts';
import PostingImages from './postingImages/PostingImages';
import PostBriefRestaurantInfo from './postBriefRestaurantInfo/PostBriefRestaurantInfo';
import HashTags from './hashtags/HashTags';

interface Props {
  posts: IPost;
  likes: Like[];
  dislikes: Like[];
}

export default function Post({ posts, likes, dislikes }: Props) {
  return (
    <View style={styles.wrap}>
      <PostBriefRestaurantInfo posts={posts} />
      <WriterNContent posts={posts} />
      <HashTags hashtags={posts.hashtags} />
      <PostingImages images={posts.images} />
      <ShowCommentsAndHearts posts={posts} likes={likes} dislikes={dislikes} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.mainGreen1,
  },
});
