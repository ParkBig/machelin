import Line from 'components/common/layout/Line';
import { Colors } from 'const/global-styles';
import useUsersPostForMyMapQuery from 'query/hooks/posts/useUsersPostForMyMapQuery';
import useMyInfoQuery from 'query/hooks/users/useMyInfoQuery';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PostHasRestaurant from './PostHasRestaurant';
import LoadingOverlay from 'components/common/modal/LoadingOverlay';

export default function PostsHasRestaurant() {
  const { myInfo } = useMyInfoQuery();
  const { posts, postsIsLoading } = useUsersPostForMyMapQuery(myInfo?.authUser?.id);
  const postsIsExist = posts?.posts && posts.posts.length !== 0 ? true : false;

  return (
    <View style={styles.wrap}>
      {myInfo?.authUser ? (
        postsIsLoading ? (
          <LoadingOverlay style={styles.loadingOverlay} />
        ) : postsIsExist ? (
          <FlatList
            style={styles.flatList}
            showsVerticalScrollIndicator={false}
            data={posts?.posts}
            keyExtractor={item => `${item.id}`}
            ItemSeparatorComponent={() => <Line style={styles.line} />}
            renderItem={({ item }) => <PostHasRestaurant post={item} />}
          />
        ) : (
          <View style={styles.none}>
            <Text>점수를 남긴 게시글이 없어요</Text>
          </View>
        )
      ) : (
        <View style={styles.none}>
          <Text>로그인 후 기록해 보아요</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    maxHeight: 272,
    backgroundColor: Colors.mainWhite1,
    borderTopWidth: 3,
    borderRadius: 5,
    borderTopColor: Colors.mainGreen2,
  },
  loadingOverlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    paddingHorizontal: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightGray,
  },
  none: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});