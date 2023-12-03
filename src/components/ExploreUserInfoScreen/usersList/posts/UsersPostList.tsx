import { useRoute } from '@react-navigation/native';
import { Colors } from 'const/global-styles';
import { StyleSheet, View } from 'react-native';
import { UseRouter } from 'types/screen/screenType';
import UsersPostExist from './UsersPostExist';
import NoPost from 'components/myScreen/myList/myPosts/NoPost';
import useExploreUsersPostsQuery from 'query/hooks/exploreUsers/useExploreUsersPostsQuery';
import LoadingOverlay from 'components/common/LoadingOverlay';

export default function UsersPostList() {
  const { params } = useRoute<UseRouter<'ExploreUserInfoScreen'>>();
  const { posts, postsIsLoading } = useExploreUsersPostsQuery(params.userId);
  const postsExist = posts?.posts?.length !== 0

  return (
    <View style={styles.wrap}>
      {postsIsLoading ? <LoadingOverlay /> : postsExist ? <UsersPostExist /> : <NoPost />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 2,
    paddingTop: 10,
    borderTopColor: Colors.mainGreen1,
  },
});
