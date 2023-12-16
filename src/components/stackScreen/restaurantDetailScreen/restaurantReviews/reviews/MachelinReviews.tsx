import { useRoute } from '@react-navigation/native';
import Post from 'components/common/card/post/Post';
import Button from 'components/common/layout/Button';
import Line from 'components/common/layout/Line';
import { Colors } from 'const/global-styles';
import useRestaurantPostsQuery from 'query/hooks/restaurants/useRestaurantPostsQuery';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';

export default function MachelinReviews() {
  const { params } = useRoute<UseRouter<'RestaurantDetailScreen'>>();
  const { restaurantPosts, reRestaurantPosts, fetchNextPagePosts } = useRestaurantPostsQuery(params.restaurantId);
  const postsExist = restaurantPosts?.pages && restaurantPosts.pages.length !== 0 ? true : false;

  const onPressHandler = () => {
    fetchNextPagePosts();
  };

  return (
    <>
      {postsExist && (
        <FlatList
          scrollEnabled={false}
          style={styles.posts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => String(index)}
          data={restaurantPosts?.pages}
          renderItem={({ item }) => (
            <Post key={item.id} posts={item} rePosts={reRestaurantPosts} isDetailScreen={true} />
          )}
          ListHeaderComponent={() => <Line style={styles.line} />}
          ItemSeparatorComponent={() => <Line style={styles.line} />}
          ListFooterComponent={() => (
            <Button style={styles.button} onPress={onPressHandler}>
              <Text style={styles.text}>더보기</Text>
            </Button>
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  posts: {
    width: '100%',
  },
  line: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.lightGrayOpacity1,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: Colors.lightGrayOpacity1,
  },
  text: {
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
});
