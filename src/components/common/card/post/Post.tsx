import { StyleSheet, View } from 'react-native';
import Writer from './writer/Writer';
import ShowCommentsAndHearts from './showCommentsAndHeart/ShowCommentsAndHearts';
import PostingImages from './postingImages/PostingImages';
import PostBriefRestaurantInfo from './postBriefRestaurantInfo/PostBriefRestaurantInfo';
import HashTags from './hashtags/HashTags';
import { InfiniteData, QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { PostQueryResponse } from 'query/posts';
import { RestaurantPosts } from 'query/hooks/restaurants/useRestaurantPostsQuery';
import Content from './content/Content';
import { Colors } from 'const/global-styles';
import { IPost } from 'types/types';

interface Props {
  posts: IPost;
  rePosts: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<PostQueryResponse | RestaurantPosts | InfiniteData<IPost>, unknown>>;
  isDetailScreen: boolean;
}

export default function Post({ posts, rePosts, isDetailScreen }: Props) {
  return (
    <View style={styles.wrap}>
      <PostBriefRestaurantInfo posts={posts} isDetailScreen={isDetailScreen} />
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
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.mainGreen1,
    backgroundColor: Colors.mainWhite1,
  },
});
