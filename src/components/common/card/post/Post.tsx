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
import CreatedLocation from './createdLocation/CreatedLocation';

interface Props {
  posts: IPost;
}

export default function Post({ posts }: Props) {
  return (
    <View style={styles.wrap}>
      <HasProblem posts={posts} />
      <Writer posts={posts} />
      <CreatedLocation ownerSubLocality={posts.ownerSubLocality} />
      <CreatedAt createdAt={posts.createdAt} />
      <PostBriefRestaurantInfo posts={posts} />
      <PostingImages images={posts.images} />
      <Content contents={posts.contents} postType={posts.postType} />
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
