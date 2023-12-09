import { StyleSheet, View } from 'react-native';
import { IPost } from 'types/store/myInfoType';
import { Colors } from 'const/global-styles';
import Writer from './writer/Writer';
import ShowCommentsAndHearts from './showCommentsAndHeart/ShowCommentsAndHearts';
import PostingImages from './postingImages/PostingImages';
import PostBriefRestaurantInfo from './postBriefRestaurantInfo/PostBriefRestaurantInfo';
import HashTags from './hashtags/HashTags';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { PostQueryResponse } from 'query/posts';
import { RestaurantPosts } from 'query/hooks/restaurants/useRestaurantPostsQuery';
import Content from './content/Content';

interface Props {
  posts: IPost;
  rePosts: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<PostQueryResponse | RestaurantPosts, unknown>>;
  isDetailScreen: boolean;
}

export default function Post({ posts, rePosts, isDetailScreen }: Props) {
  return (
    <View style={styles.wrap}>
      {!isDetailScreen && <PostBriefRestaurantInfo posts={posts} />}
      <Writer posts={posts} />
      <PostingImages images={posts.images} />
      <Content contents={posts.contents} />
      <HashTags hashtags={posts.hashtags} />
      <ShowCommentsAndHearts posts={posts} rePosts={rePosts} />
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
