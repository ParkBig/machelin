import { useRoute } from '@react-navigation/native';
import Post from 'components/common/post/Post';
import useRestaurantPostsQuery from 'query/hooks/restaurants/useRestaurantPostsQuery';
import { StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';

export default function MachelinReviews() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantPosts, reRestaurantPosts } = useRestaurantPostsQuery(params.restaurantId);

  return (
    <View style={styles.wrap}>
      {restaurantPosts?.machelinPosts?.map(machelinPost => (
        <Post key={machelinPost.id} posts={machelinPost} rePosts={reRestaurantPosts} isDetailScreen={true} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingVertical: 10,
    gap: 10,
  },
});
