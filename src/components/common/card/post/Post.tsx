import { StyleSheet, View } from 'react-native';
import Writer from './writer/Writer';
import ShowCommentsAndHearts from './showCommentsAndHeart/ShowCommentsAndHearts';
import PostingImages from './postingImages/PostingImages';
import PostBriefRestaurantInfo from './postBriefRestaurantInfo/PostBriefRestaurantInfo';
import HashTags from './hashtags/HashTags';
import Content from './content/Content';
import { Colors, Shadow } from 'const/global-styles';
import { IPost } from 'types/types';
import CreatedAt from './createdAt/CreatedAt';
import HasProblem from './hasProblem/HasProblem';

interface Props {
  posts: IPost;
}

export default function Post({ posts }: Props) {
  return (
    <View style={styles.wrap}>
      <HasProblem posts={posts} />
      <PostBriefRestaurantInfo posts={posts} />
      <Writer posts={posts} />
      <CreatedAt createdAt={posts.createdAt} />
      <PostingImages images={posts.images} />
      <Content contents={posts.contents} />
      <HashTags hashtags={posts.hashtags} />
      <ShowCommentsAndHearts posts={posts} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.mainWhite1,
    ...Shadow,
  },
});
