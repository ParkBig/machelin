import { StyleSheet, View } from 'react-native';
import Writer from './writer/Writer';
import ShowCommentsAndHearts from './showCommentsAndHeart/ShowCommentsAndHearts';
import PostingImages from './postingImages/PostingImages';
import PostBriefRestaurantInfo from './postBriefRestaurantInfo/PostBriefRestaurantInfo';
import HashTags from './hashtags/HashTags';
import Content from './content/Content';
import { Colors } from 'const/global-styles';
import { IPost } from 'types/types';
import CreatedAt from './createdAt/CreatedAt';

interface Props {
  posts: IPost;
  isDetailScreen: boolean;
}

export default function Post({ posts, isDetailScreen }: Props) {
  return (
    <View style={styles.wrap}>
      <PostBriefRestaurantInfo posts={posts} isDetailScreen={isDetailScreen} />
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
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.mainGreen1,
    backgroundColor: Colors.mainWhite1,
  },
});
